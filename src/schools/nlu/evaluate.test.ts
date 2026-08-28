import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateNluThptExamAdmission, evaluateNluThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('NLU THPT band eligibility 2026', () => {
  it('marks profiles below the common 16/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateNluThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'nlu-threshold-2026' }));
  });

  it('keeps profiles between the 16/30 baseline and the 18/30 highest group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5.5, chemistry: 5.5 } } };

    const result = evaluateNluThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('16');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateNluThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'nlu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateNluThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'nlu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    // NLU giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN/HAU/NTU-HN/UMT/DLU).
    expect(evaluateSchool(profile, 'nlu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['nlu'], { nlu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateNluThptExamExactAdmission (thi TN THPT — ĐXT theo mã xét tuyển)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

  it('chưa chọn mã xét tuyển -> partial', () => {
    const r = evaluateNluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'nlu-program-code')).toBe(true);
  });

  it('Nông học (sàn 16), tổng 16 -> exact-verified, eligible', () => {
    const r = evaluateNluThptExamExactAdmission(p({ math: 6, physics: 5, chemistry: 5 }), { ...subs, programCode: '7620109' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.eligibility?.status).toBe('eligible');
    expect(r.score).toEqual({ value: 16, scale: 30 });
  });

  it('CNTT (sàn 18), tổng 17 -> ineligible', () => {
    const r = evaluateNluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 5 }), { ...subs, programCode: '7480201' });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('cộng ưu tiên KV1 không ảnh hưởng eligibility (so tổng thô)', () => {
    const r = evaluateNluThptExamExactAdmission(p({ math: 5, physics: 5, chemistry: 5 }, { region: 'KV1' }), { ...subs, programCode: '7620109' });
    expect(r.score).toEqual({ value: 15.75, scale: 30 });
    expect(r.eligibility?.status).toBe('ineligible'); // tổng thô 15 < 16
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateNluThptExamExactAdmission(p({ math: 6, physics: 6, chemistry: 6 }), { ...subs, programCode: '7620109' });
    expect(r.methodId).toBe('nlu-thpt-exam-exact-2026');
  });
});
