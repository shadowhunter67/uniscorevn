import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateDavAdmission, evaluateDavThptExamExactAdmission } from './evaluate';

const d01Context = {
  programCode: 'HQT01',
  subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const },
};

describe('DAV 2026 threshold eligibility evaluator', () => {
  it('requires a program before applying program-specific scope', () => {
    const result = evaluateDavAdmission({}, { methodId: 'dav-thpt-exam-2026', subjectContext: d01Context.subjectContext });

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'dav-program' }));
  });

  it('checks THPT threshold for a selected combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 7.5 } } };
    const result = evaluateDavAdmission(profile, { methodId: 'dav-thpt-exam-2026', ...d01Context });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.score).toBeUndefined();
    expect(result.explanation[0]?.output).toBe(21.5);
  });

  it('uses IELTS conversion as an English-language substitute when requested', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 7, literature: 7, english: 6 } }, certificates: { ielts: 7.0 } };
    const result = evaluateDavAdmission(profile, { methodId: 'dav-thpt-exam-2026', ...d01Context, useEnglishCertificateForThpt: true });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation[0]?.output).toBe(23);
    expect(result.score).toBeUndefined();
  });

  it('applies law-field Math/Literature constraints', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5.5, physics: 9, literature: 9, english: 9 } } };
    const result = evaluateDavAdmission(profile, {
      methodId: 'dav-thpt-exam-2026',
      programCode: 'HQT04',
      subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const },
    });

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('Math');
  });

  it('checks method 3 converted SAT/ACT plus language certificate threshold', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 8, literature: 8, english: 8 } },
      certificates: { ielts: 7.0, sat: 1450 },
    };
    const result = evaluateDavAdmission(profile, {
      methodId: 'dav-sat-act-certificate-2026',
      programCode: 'HQT03',
      subjectContext: d01Context.subjectContext,
    });

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.explanation[0]?.id).toBe('dav-method3-conversion');
    expect(result.explanation[0]?.output).toBe(28);
  });

  it('routes through generic evaluateSchool and evaluateSchools', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, literature: 8, english: 8 } } };
    const context = { methodId: 'dav-thpt-exam-2026' as const, ...d01Context };

    expect(evaluateSchool(profile, 'dav', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['dav'], { dav: context })[0].status).toBe('partial');
  });
});

describe('evaluateDavThptExamExactAdmission (PT4, ngành không phải Luật)', () => {
  const a00 = { programCode: 'HQT01', subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
  const c00 = { programCode: 'HQT01', subjectContext: { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as const } };
  const thpt = (scores: NonNullable<ApplicantProfile['thpt']>['scores'], extra: Partial<ApplicantProfile> = {}): ApplicantProfile => ({ thpt: { scores }, ...extra });

  it('tính điểm xét = tổng 3 môn và đạt ngưỡng 22 (A00)', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 8, physics: 7, chemistry: 7.25 }), a00);
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('dav-thpt-exam-exact-2026');
    expect(r.score).toEqual({ value: 22.25, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('chưa đạt ngưỡng khi thiếu 0,25 điểm', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 7.5, physics: 7, chemistry: 7.25 }), a00);
    expect(r.score?.value).toBe(21.75);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('C00 dùng ngưỡng 23; tổng 22,5 + ưu tiên KV1 (giảm còn (30−22,5)/7,5×0,75 = 0,75) = 23,25', () => {
    const scores = { literature: 7.5, history: 7.5, geography: 7.5 };
    expect(evaluateDavThptExamExactAdmission(thpt(scores), c00).eligibility?.status).toBe('ineligible');
    const withPriority = evaluateDavThptExamExactAdmission(thpt(scores, { priority: { region: 'KV1' } }), c00);
    expect(withPriority.score?.value).toBe(23.25);
    expect(withPriority.eligibility?.status).toBe('eligible');
  });

  it('ưu tiên giảm dần khi tổng ≥ 22,5: 28 + KV1 → 28,2', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 9, physics: 9.5, chemistry: 9.5 }, { priority: { region: 'KV1' } }), a00);
    expect(r.score?.value).toBe(28.2);
  });

  it('ưu tiên đầy đủ khi tổng < 22,5 (không giảm): 21 + UT1 (2) → 23', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 7, physics: 7, chemistry: 7 }, { priority: { category: 'UT1' } }), a00);
    expect(r.score?.value).toBe(23);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('chọn điểm quy đổi IELTS thay môn Anh khi có lợi hơn (D01: 7+7+IELTS 7.0→9 = 23)', () => {
    const d01 = { programCode: 'HQT01', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 7, literature: 7, english: 5 }, { certificates: { ielts: 7.0 } }), d01);
    expect(r.score?.value).toBe(23);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('giữ điểm thi Anh khi cao hơn điểm quy đổi', () => {
    const d01 = { programCode: 'HQT01', subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 7, literature: 7, english: 9.5 }, { certificates: { ielts: 6.0 } }), d01);
    expect(r.score?.value).toBe(23.5);
  });

  it('ngành Luật nằm ngoài phạm vi exact (unknown)', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 9, physics: 9, chemistry: 9 }), { ...a00, programCode: 'HQT04' });
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'dav-law-out-of-exact-scope' }));
  });

  it('tổ hợp không có trong Bảng 1 của ngành thì unknown (HQT02 không có A00)', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 9, physics: 9, chemistry: 9 }), { ...a00, programCode: 'HQT02' });
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'dav-combination-for-program' }));
  });

  it('thiếu điểm môn → unknown và nêu môn còn thiếu', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 9, physics: 9 }), a00);
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'dav-thpt-chemistry' }));
  });

  it('luôn công khai giới hạn phạm vi: điểm xét thưởng + chứng chỉ ngoài tiếng Anh', () => {
    const r = evaluateDavThptExamExactAdmission(thpt({ math: 8, physics: 7, chemistry: 7.25 }), a00);
    expect((r.missingRequirements ?? []).map((m) => m.code)).toEqual(expect.arrayContaining(['dav-bonus-not-modeled', 'dav-other-language-certificate-not-modeled']));
  });

  it('adapter mặc định của DAV dùng nhánh exact', () => {
    const r = evaluateSchool(thpt({ math: 8, physics: 7, chemistry: 7.25 }), 'dav', { context: a00 });
    expect(r.status).toBe('calculated');
  });
});
