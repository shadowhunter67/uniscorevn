import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';
import { evaluateSchool } from '../../evaluation/schoolEvaluation';
import { hnueComparisonAdapter } from './comparison';
import { evaluateHnueFloorExactAdmission } from './evaluate';
import { HNUE_PROGRAMS_2026, getHnueProgram } from './programs';

const a00 = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as readonly SubjectId[] };
const ctx = (programCode: string, subjectContext = a00) => ({ programCode, subjectContext });
const scores = (a: number, b: number, c: number, extra: Partial<ApplicantProfile> = {}): ApplicantProfile => ({
  thpt: { scores: { math: a, physics: b, chemistry: c } },
  ...extra,
});

describe('bảng điểm sàn HNUE 2026', () => {
  it('57 ngành, mã không trùng, 51 có điểm sàn và 6 ngành năng khiếu ngoài phạm vi', () => {
    expect(HNUE_PROGRAMS_2026).toHaveLength(57);
    expect(new Set(HNUE_PROGRAMS_2026.map((p) => p.code)).size).toBe(57);
    expect(HNUE_PROGRAMS_2026.filter((p) => p.floor30 !== undefined)).toHaveLength(51);
    expect(HNUE_PROGRAMS_2026.filter((p) => p.floor30 === undefined).map((p) => p.code)).toEqual(['7140201', '7140201K', '7140206', '7140221', '7140222', '7810302']);
  });

  it('một số mốc theo bảng chính thức', () => {
    expect(getHnueProgram('7140209')?.floor30).toBe(21);
    expect(getHnueProgram('7140209K')?.floor30).toBe(22);
    expect(getHnueProgram('7440112')?.floor30).toBe(18.5);
    expect(getHnueProgram('7480201')?.floor30).toBe(20);
    expect(getHnueProgram('7140203')?.floor30).toBe(22);
  });
});

describe('evaluateHnueFloorExactAdmission (điểm sàn theo ngành)', () => {
  it('SP Toán 21: tổng 21 đạt (eligible), không có score', () => {
    const r = evaluateHnueFloorExactAdmission(scores(7, 7, 7), ctx('7140209'));
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('hnue-thpt-exam-floor-exact-2026');
    expect(r.eligibility?.status).toBe('eligible');
    expect(r.score).toBeUndefined();
  });

  it('thiếu 0,25 và không có ưu tiên → ineligible', () => {
    const r = evaluateHnueFloorExactAdmission(scores(7, 7, 6.75), ctx('7140209'));
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('ưu tiên tối đa vẫn không đủ → ineligible chắc chắn (18 + KV1 0,75 < 21)', () => {
    const r = evaluateHnueFloorExactAdmission(scores(6, 6, 6, { priority: { region: 'KV1' } }), ctx('7140209'));
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('vùng giữa: thô 20,5 < sàn 21 nhưng + KV1 0,75 ≥ 21 → unknown (không đoán)', () => {
    const r = evaluateHnueFloorExactAdmission(scores(7, 7, 6.5, { priority: { region: 'KV1' } }), ctx('7140209'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'hnue-priority-vs-floor-unspecified' }));
  });

  it('ưu tiên không làm đổi kết quả khi đã đạt sàn thô', () => {
    const r = evaluateHnueFloorExactAdmission(scores(7, 7, 7, { priority: { region: 'KV1' } }), ctx('7140209'));
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('điểm sàn dùng chung mọi tổ hợp (D01 cùng mức với A00)', () => {
    const d01 = { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as readonly SubjectId[] };
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7 } } };
    expect(evaluateHnueFloorExactAdmission(profile, ctx('7140209', d01)).eligibility?.status).toBe('eligible');
  });

  it('ngành năng khiếu (GD Thể chất, SP Âm nhạc, Mỹ thuật, Mầm non, HL thể thao) → unknown, partial', () => {
    for (const code of ['7140201', '7140206', '7140221', '7140222', '7810302']) {
      const r = evaluateHnueFloorExactAdmission(scores(9, 9, 9), ctx(code));
      expect(r.eligibility?.status, code).toBe('unknown');
      expect(r.confidence, code).toBe('partial');
      expect(r.missingRequirements, code).toContainEqual(expect.objectContaining({ code: 'hnue-program-out-of-exact-scope' }));
    }
  });

  it('thiếu ngành / tổ hợp / điểm môn → unknown với yêu cầu đúng', () => {
    expect(evaluateHnueFloorExactAdmission(scores(9, 9, 9), { subjectContext: a00 }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'hnue-program' }));
    expect(evaluateHnueFloorExactAdmission(scores(9, 9, 9), { programCode: '7140209' }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'hnue-subject-combination' }));
    const partial: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9 } } };
    expect(evaluateHnueFloorExactAdmission(partial, ctx('7140209')).missingRequirements).toContainEqual(expect.objectContaining({ code: 'hnue-thpt-chemistry' }));
  });

  it('adapter: có chọn ngành dùng nhánh sàn theo ngành, chưa chọn giữ baseline', () => {
    const profile = scores(7, 7, 7);
    expect(hnueComparisonAdapter.evaluate(profile, ctx('7140209')).evaluation.methodId).toBe('hnue-thpt-exam-floor-exact-2026');
    expect(hnueComparisonAdapter.evaluate(profile, { subjectContext: a00 }).evaluation.methodId).toBe('hnue-thpt-exam-2026');
    expect(evaluateSchool(profile, 'hnue', { context: ctx('7140209') }).status).toBe('eligible');
  });
});
