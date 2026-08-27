import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVkuThptExamAdmission, evaluateVkuCombinedAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

const combinedA00 = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
/** học bạ toàn 8/7/8 mỗi năm -> TB môn 8/7/8 -> tổng 23 ; thi 8/7/7 -> tổng 22 ; học lực = 23*0.6 + 22*0.4 = 22.6 */
const baseCombinedProfile: ApplicantProfile = {
  thpt: { scores: { math: 8, physics: 7, chemistry: 7 } },
  transcript: {
    grade10: { math: 8, physics: 7, chemistry: 8 },
    grade11: { math: 8, physics: 7, chemistry: 8 },
    grade12: { math: 8, physics: 7, chemistry: 8 },
  },
};

describe('VKU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateVkuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vku-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateVkuThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vku-thpt-chemistry' }));
  });

  it('marks totals below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateVkuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vku-quality-threshold-2026' }));
  });

  it('keeps totals within the published range unresolved (varies by program)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateVkuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // VKU is now a verified-calculator (combined-method exact path); the /compare adapter still
    // drives the threshold-only route, which the generic classifier reports as 'partial' for a
    // verified-calculator school when it returns no score.
    expect(evaluateSchool(profile, 'vku', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vku'], { vku: a00Context })[0].status).toBe('partial');
  });
});

describe('VKU combined method (Phương thức 2) — exact ĐXT', () => {
  it('computes ĐXT = học bạ×0,6 + thi×0,4 with no bonus/priority', () => {
    const result = evaluateVkuCombinedAdmission(baseCombinedProfile, combinedA00);
    expect(result.confidence).toBe('exact-verified');
    expect(result.methodId).toBe('vku-combined-exact-2026');
    expect(result.explanation.find((s) => s.id === 'vku-transcript-total')?.output).toBe(23);
    expect(result.explanation.find((s) => s.id === 'vku-thpt-total')?.output).toBe(22);
    expect(result.explanation.find((s) => s.id === 'vku-academic-score')?.output).toBe(22.6);
    expect(result.score).toEqual({ value: 22.6, scale: 30 });
    // ngưỡng ĐBCL PT2 chưa công bố -> eligibility unknown dù score exact
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('adds KV/ĐT priority with the ≥22,5 reduction formula', () => {
    const result = evaluateVkuCombinedAdmission({ ...baseCombinedProfile, priority: { region: 'KV1' } }, combinedA00);
    // học lực 22,6 ≥ 22,5 -> ĐUT = (30 − 22,6)/7,5 × 0,75 = 0,74 ; ĐXT = 22,6 + 0,74 = 23,34
    expect(result.explanation.find((s) => s.id === 'vku-priority')?.output).toBe(0.74);
    expect(result.score).toEqual({ value: 23.34, scale: 30 });
  });

  it('adds the certificate bonus (IELTS 6.5 → 1,25) and re-pivots the priority reduction', () => {
    const result = evaluateVkuCombinedAdmission(
      { ...baseCombinedProfile, certificates: { ielts: 6.5 }, priority: { region: 'KV1' } },
      combinedA00
    );
    expect(result.explanation.find((s) => s.id === 'vku-bonus')?.output).toBe(1.25);
    // pivot = 22,6 + 1,25 = 23,85 ; ĐUT = (30 − 23,85)/7,5 × 0,75 = 0,62 ; ĐXT = 22,6 + 1,25 + 0,62 = 24,47
    expect(result.explanation.find((s) => s.id === 'vku-priority')?.output).toBe(0.62);
    expect(result.score).toEqual({ value: 24.47, scale: 30 });
  });

  it('stays partial (no score) when the applicant declares an achievement bonus', () => {
    const result = evaluateVkuCombinedAdmission({ ...baseCombinedProfile }, { ...combinedA00, achievementBonus30: 1.5 });
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vku-achievement-bonus-out-of-scope' }));
  });

  it('stays partial when transcript years are missing for a combination subject', () => {
    const result = evaluateVkuCombinedAdmission(
      { thpt: { scores: { math: 8, physics: 7, chemistry: 7 } }, transcript: { grade10: { math: 8 } } },
      combinedA00
    );
    expect(result.confidence).toBe('partial');
    expect(result.score).toBeUndefined();
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vku-transcript-physics' }));
  });
});
