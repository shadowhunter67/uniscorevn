import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHauThptExamAdmission, evaluateHauThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const infra = { ...combo, group: 'infrastructureEngineering' as const };
const construction = { ...combo, group: 'constructionEconomicsIt' as const };

describe('HAU THPT-exam eligibility 2026 (nhóm ngành không năng khiếu)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHauThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hau-subject-combination' }));
  });

  it('applies the 15/30 infrastructure-engineering floor', () => {
    const below: ApplicantProfile = { thpt: { scores: { math: 4, physics: 5, chemistry: 5.5 } } };
    const at: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    expect(evaluateHauThptExamAdmission(below, infra).eligibility?.status).toBe('ineligible');
    expect(evaluateHauThptExamAdmission(at, infra).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 18/30 construction-economics-IT floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHauThptExamAdmission(profile, construction);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'hau-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    // HAU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN).
    expect(evaluateSchool(profile, 'hau', { context: infra }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hau'], { hau: infra })[0].status).toBe('partial');
  });
});

describe('evaluateHauThptExamExactAdmission (không điểm cộng — ĐXT = tổng thô + ưu tiên)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn nhóm -> partial', () => {
    const r = evaluateHauThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'hau-program-group')).toBe(true);
  });

  it('infra (ngưỡng 15), tổng 15 -> exact-verified, eligible', () => {
    const r = evaluateHauThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }), { ...subs, group: 'infrastructureEngineering' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 15, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('construction (ngưỡng 18), tổng 17 -> ineligible', () => {
    const r = evaluateHauThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }), { ...subs, group: 'constructionEconomicsIt' });
    expect(r.eligibility?.status).toBe('ineligible');
    expect(r.score).toEqual({ value: 17, scale: 30 });
  });

  it('cộng ưu tiên KV1 đẩy đủ ngưỡng construction', () => {
    const r = evaluateHauThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }, { region: 'KV1' }), { ...subs, group: 'constructionEconomicsIt' });
    expect(r.score).toEqual({ value: 17.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible'); // 17.75 < 18
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateHauThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, group: 'infrastructureEngineering' });
    expect(r.methodId).toBe('hau-thpt-exam-exact-2026');
  });
});
