import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHdiuThptExamAdmission, evaluateHdiuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HDIU THPT baseline eligibility 2025', () => {
  it('marks profiles below the lowest published band as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } };

    const result = evaluateHdiuThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hdiu-admission-info-2025' }));
  });

  it('keeps profiles between the two published bands unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5.5 } } };

    const result = evaluateHdiuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks profiles at/above the highest published band as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHdiuThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHdiuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hdiu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 3, physics: 3, chemistry: 3 } } };

    expect(evaluateSchool(profile, 'hdiu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hdiu'], { hdiu: a00Context })[0].status).toBe('partial');
  });
});

describe('HDIU THPT exact per-field calculator 2025', () => {
  it('marks a profile at threshold as eligible (other fields, 14/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 4 } } };

    const result = evaluateHdiuThptExamExactAdmission(profile, { fieldId: 'information-technology', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score?.value).toBe(14);
  });

  it('marks a profile below the field threshold as ineligible (pharmacy, 19/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, biology: 5 } } };

    const result = evaluateHdiuThptExamExactAdmission(profile, { fieldId: 'pharmacy', subjectContext: { combinationId: 'A02', subjects: ['math', 'physics', 'biology'] } });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score?.value).toBe(15);
  });

  it('requires a selected field', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHdiuThptExamExactAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hdiu-field' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7 } } };

    const result = evaluateHdiuThptExamExactAdmission(profile, { fieldId: 'accounting', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hdiu-thpt-chemistry' }));
  });

  it('rejects a field id not modeled in the threshold table', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 7, chemistry: 7 } } };

    const result = evaluateHdiuThptExamExactAdmission(profile, { fieldId: 'graphic-design' as never, subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] } });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hdiu-field' }));
  });
});

describe('HDIU foreign-language combinations (D04, D06, DD2)', () => {
  it('computes the Chinese, Japanese and Korean combinations now that the subjects exist', () => {
    const cases = [
      { fieldId: 'chinese-language' as const, combinationId: 'D04', subjects: ['math', 'literature', 'chinese'] as const, scores: { math: 5, literature: 5, chinese: 5 } },
      { fieldId: 'japanese-language' as const, combinationId: 'D06', subjects: ['math', 'literature', 'japanese'] as const, scores: { math: 5, literature: 5, japanese: 5 } },
      { fieldId: 'korean-language' as const, combinationId: 'DD2', subjects: ['math', 'literature', 'korean'] as const, scores: { math: 5, literature: 5, korean: 5 } },
    ];
    for (const item of cases) {
      const result = evaluateHdiuThptExamExactAdmission(
        { thpt: { scores: item.scores }, priority: { region: 'KV3' } },
        { fieldId: item.fieldId, subjectContext: { combinationId: item.combinationId, subjects: item.subjects } }
      );

      expect(result.confidence, item.combinationId).toBe('exact-verified');
      expect(result.score?.value, item.combinationId).toBe(15);
      expect(result.eligibility?.status, item.combinationId).toBe('eligible');
    }
  });
});
