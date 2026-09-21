import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUteudnCombinedExactAdmission, evaluateUteudnThptExamAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UTE THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7, chemistry: 6.5 } } };

    const result = evaluateUteudnThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uteudn-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7 } } };

    const result = evaluateUteudnThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uteudn-thpt-chemistry' }));
  });

  it('marks totals below the lowest published threshold as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUteudnThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uteudn-quality-threshold-2026' }));
  });

  it('keeps totals within the published range unresolved (varies by program)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, physics: 6, chemistry: 6 } } };

    const result = evaluateUteudnThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // Chưa chọn ngành → baseline chung (partial, không có score); trường đã verified nên generic status là 'partial'.
    expect(evaluateSchool(profile, 'uteudn', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['uteudn'], { uteudn: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateUteudnCombinedExactAdmission (THPT kết hợp học bạ, ngưỡng theo ngành)', () => {
  const a00 = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
  const withProgram = (programCode: string, base: { subjectContext: { combinationId: string; subjects: readonly SubjectId[] } } = a00) => ({ programCode, ...base });
  const profileOf = (thpt: [number, number, number], hb: [number, number, number], extra: Partial<ApplicantProfile> = {}): ApplicantProfile => ({
    thpt: { scores: { math: thpt[0], physics: thpt[1], chemistry: thpt[2] } },
    transcript: {
      grade10: { math: hb[0], physics: hb[1], chemistry: hb[2] },
      grade11: { math: hb[0], physics: hb[1], chemistry: hb[2] },
      grade12: { math: hb[0], physics: hb[1], chemistry: hb[2] },
    },
    ...extra,
  });

  it('khớp ví dụ chính thức: 23,00×0,7 + 20,50×0,3 + 0,5 = 22,75', () => {
    const r = evaluateUteudnCombinedExactAdmission(profileOf([8, 7.5, 7.5], [7, 6.75, 6.75], { priority: { region: 'KV2-NT' } }), withProgram('7510201'));
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('uteudn-thpt-hocba-exact-2026');
    expect(r.score).toEqual({ value: 22.75, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('ưu tiên giảm dần khi tổng ≥ 22,5: 27 + KV1 → 27,3', () => {
    const r = evaluateUteudnCombinedExactAdmission(profileOf([9, 9, 9], [9, 9, 9], { priority: { region: 'KV1' } }), withProgram('7510201'));
    expect(r.score?.value).toBe(27.3);
  });

  it('dưới ngưỡng ngành (Ô tô 17/30) → ineligible', () => {
    const r = evaluateUteudnCombinedExactAdmission(profileOf([5, 5, 5], [5, 5, 5]), withProgram('7510205'));
    expect(r.score?.value).toBe(15);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Công nghệ thông tin hệ số 1/0: chỉ cần điểm THPT, không đòi học bạ, ngưỡng 17', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const r = evaluateUteudnCombinedExactAdmission(profile, withProgram('7480201'));
    expect(r.score?.value).toBe(18);
    expect(r.eligibility?.status).toBe('eligible');
    expect(r.explanation.map((step) => step.id)).not.toContain('uteudn-exact-hocba');
  });

  it('thiếu học bạ ở ngành có hệ số học bạ → unknown, nêu môn thiếu', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 7.5, chemistry: 7.5 } } };
    const r = evaluateUteudnCombinedExactAdmission(profile, withProgram('7510201'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'uteudn-hocba-math' }));
  });

  it('SPKT-CNTT so tổng 3 môn THPT (không hệ số) + ưu tiên với ngưỡng 20, không so ĐXT', () => {
    const passes = evaluateUteudnCombinedExactAdmission(profileOf([7, 6.5, 6], [8, 8, 8], { priority: { region: 'KV1' } }), withProgram('7140214'));
    expect(passes.score?.value).toBe(21.6);
    expect(passes.eligibility?.status).toBe('eligible');
    const fails = evaluateUteudnCombinedExactAdmission(profileOf([7, 6, 6], [8, 8, 8], { priority: { region: 'KV1' } }), withProgram('7140214'));
    expect(fails.score?.value).toBeGreaterThan(20);
    expect(fails.eligibility?.status).toBe('ineligible');
  });

  it('học bạ: mỗi môn TB 3 năm làm tròn 2 số lẻ (7; 7; 7,5 → 7,17)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, physics: 7.5, chemistry: 7.5 } },
      transcript: {
        grade10: { math: 7, physics: 7.5, chemistry: 7.5 },
        grade11: { math: 7, physics: 7.5, chemistry: 7.5 },
        grade12: { math: 7.5, physics: 7.5, chemistry: 7.5 },
      },
    };
    const r = evaluateUteudnCombinedExactAdmission(profile, withProgram('7510201'));
    expect(r.explanation.find((step) => step.id === 'uteudn-exact-hocba')?.output).toBe(22.17);
  });

  it('tổ hợp không thuộc ngành (Xây dựng không có X07) → unknown', () => {
    const x07 = { subjectContext: { combinationId: 'X07', subjects: ['math', 'physics', 'technology'] as const } };
    const r = evaluateUteudnCombinedExactAdmission(profileOf([8, 8, 8], [8, 8, 8]), withProgram('7510103', x07));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'uteudn-combination-for-program' }));
  });

  it('Thiết kế vi mạch và Kiến trúc nằm ngoài phạm vi exact (unknown, partial)', () => {
    for (const code of ['7510302A', '7510101']) {
      const r = evaluateUteudnCombinedExactAdmission(profileOf([9, 9, 9], [9, 9, 9]), withProgram(code));
      expect(r.eligibility?.status, code).toBe('unknown');
      expect(r.confidence, code).toBe('partial');
      expect(r.missingRequirements, code).toContainEqual(expect.objectContaining({ code: 'uteudn-program-out-of-exact-scope' }));
    }
  });

  it('luôn công khai giới hạn điểm cộng thành tích', () => {
    const r = evaluateUteudnCombinedExactAdmission(profileOf([8, 7.5, 7.5], [7, 6.75, 6.75]), withProgram('7510201'));
    expect(r.missingRequirements?.map((m) => m.code)).toContain('uteudn-bonus-not-modeled');
  });

  it('adapter: có chọn ngành dùng nhánh exact, chưa chọn ngành giữ baseline', () => {
    const profile = profileOf([8, 7.5, 7.5], [7, 6.75, 6.75]);
    expect(evaluateSchool(profile, 'uteudn', { context: withProgram('7510201') }).status).toBe('calculated');
    expect(evaluateSchool(profile, 'uteudn', { context: a00 }).status).not.toBe('calculated');
  });
});
