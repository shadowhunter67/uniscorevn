import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVguThptExamAdmission, evaluateVguThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('VGU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 17/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateVguThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vgu-floor-score-press-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateVguThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('17');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateVguThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vgu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateVguThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'vgu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    // Chưa chọn ngành → baseline chung (partial, không có score); trường đã verified nên generic status là 'partial'.
    expect(evaluateSchool(profile, 'vgu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vgu'], { vgu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateVguThptExamExactAdmission (PT5, điểm sàn theo ngành)', () => {
  type Subject = 'math' | 'physics' | 'chemistry' | 'english' | 'literature' | 'biology';
  const ctx = (programCode: string, combinationId: string, subjects: readonly Subject[]) => ({ programCode, subjectContext: { combinationId, subjects } });
  const bbaA00 = ctx('7340101', 'A00', ['math', 'physics', 'chemistry']);
  const bceA00 = ctx('7580201', 'A00', ['math', 'physics', 'chemistry']);
  const thpt = (scores: NonNullable<ApplicantProfile['thpt']>['scores'], extra: Partial<ApplicantProfile> = {}): ApplicantProfile => ({ thpt: { scores }, ...extra });
  const englishAvg = (value: number) => ({ transcript: { grade10: { english: value }, grade11: { english: value }, grade12: { english: value } } });

  it('đạt điểm sàn 19 (Quản trị kinh doanh) + IELTS 6.0 → eligible, score exact', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 7, physics: 6.5, chemistry: 6 }, { certificates: { ielts: 6 } }), bbaA00);
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('vgu-thpt-exam-exact-2026');
    expect(r.score).toEqual({ value: 19.5, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('chưa đạt điểm sàn → ineligible dù đủ tiếng Anh', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 6.25, physics: 6.25, chemistry: 6.25 }, { certificates: { ielts: 7 } }), bbaA00);
    expect(r.score?.value).toBe(18.75);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Cơ điện tử có điểm sàn cao nhất 22: 22,5 đạt, 21,75 không', () => {
    const mec = ctx('7520114', 'A00', ['math', 'physics', 'chemistry']);
    const withIelts = { certificates: { ielts: 5 } };
    expect(evaluateVguThptExamExactAdmission(thpt({ math: 7.5, physics: 7.5, chemistry: 7.5 }, withIelts), mec).eligibility?.status).toBe('eligible');
    expect(evaluateVguThptExamExactAdmission(thpt({ math: 7.25, physics: 7.25, chemistry: 7.25 }, withIelts), mec).eligibility?.status).toBe('ineligible');
  });

  it('điểm sàn ĐÃ gồm ưu tiên: Xây dựng 16,5 + KV1 0,75 = 17,25 ≥ 17', () => {
    const scores = { math: 5.5, physics: 5.5, chemistry: 5.5 };
    const withIelts = { certificates: { ielts: 5 } };
    expect(evaluateVguThptExamExactAdmission(thpt(scores, withIelts), bceA00).eligibility?.status).toBe('ineligible');
    const r = evaluateVguThptExamExactAdmission(thpt(scores, { ...withIelts, priority: { region: 'KV1' } }), bceA00);
    expect(r.score?.value).toBe(17.25);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('tổng thô < 15 vẫn ineligible dù cộng ưu tiên đủ điểm sàn (14,5 + 2,75 = 17,25)', () => {
    const r = evaluateVguThptExamExactAdmission(
      thpt({ math: 5, physics: 4.75, chemistry: 4.75 }, { certificates: { ielts: 5 }, priority: { region: 'KV1', category: 'UT1' } }),
      bceA00
    );
    expect(r.score?.value).toBe(17.25);
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('tiếng Anh đạt qua điểm TB 3 năm ≥ 8,0 (Xây dựng chỉ cần ≥ 7,5)', () => {
    const scores = { math: 7, physics: 6.5, chemistry: 6 };
    expect(evaluateVguThptExamExactAdmission(thpt(scores, englishAvg(8)), bbaA00).eligibility?.status).toBe('eligible');
    expect(evaluateVguThptExamExactAdmission(thpt(scores, englishAvg(7.8)), bbaA00).eligibility?.status).toBe('unknown');
    expect(evaluateVguThptExamExactAdmission(thpt({ math: 7, physics: 6, chemistry: 6 }, englishAvg(7.5)), bceA00).eligibility?.status).toBe('eligible');
  });

  it('đủ điểm sàn nhưng Anh TB thấp và không IELTS → unknown, nhắc bài thi VGU 75/100', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 7, physics: 6.5, chemistry: 6 }, englishAvg(7)), bbaA00);
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.eligibility?.reasons.join(' ')).toContain('75/100');
    expect(r.confidence).toBe('exact-verified');
  });

  it('đủ điểm sàn nhưng chưa có dữ liệu tiếng Anh → unknown + yêu cầu nhập', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 7, physics: 6.5, chemistry: 6 }), bbaA00);
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vgu-english-evidence' }));
  });

  it('IELTS thay môn Anh theo giá trị cao nhất của khoảng (D01: 6 + 6 + IELTS 6.5→9.4 = 21,4)', () => {
    const d01 = ctx('7340101', 'D01', ['math', 'literature', 'english']);
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 6, literature: 6, english: 5 }, { certificates: { ielts: 6.5 } }), d01);
    expect(r.score?.value).toBe(21.4);
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('IELTS 5,5 KHÔNG được quy đổi (khoảng mở) → giữ điểm thi Anh', () => {
    const d01 = ctx('7340101', 'D01', ['math', 'literature', 'english']);
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 6, literature: 6, english: 5 }, { certificates: { ielts: 5.5 } }), d01);
    expect(r.score?.value).toBe(17);
  });

  it('Kiến trúc chưa có tổ hợp công bố → unknown, confidence partial', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 9, physics: 9, chemistry: 9 }), ctx('7580101', 'A00', ['math', 'physics', 'chemistry']));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vgu-architecture-out-of-exact-scope' }));
  });

  it('tổ hợp không thuộc ngành (Kinh tế học không có A02) → unknown', () => {
    const r = evaluateVguThptExamExactAdmission(thpt({ math: 9, physics: 9, biology: 9 }), ctx('7310101', 'A02', ['math', 'physics', 'biology']));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'vgu-combination-for-program' }));
  });

  it('thiếu ngành / thiếu điểm môn → unknown', () => {
    expect(evaluateVguThptExamExactAdmission(thpt({ math: 9 }), { subjectContext: bbaA00.subjectContext }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'vgu-program' }));
    expect(evaluateVguThptExamExactAdmission(thpt({ math: 9, physics: 9 }), bbaA00).missingRequirements).toContainEqual(expect.objectContaining({ code: 'vgu-thpt-chemistry' }));
  });

  it('adapter: có chọn ngành dùng nhánh exact, chưa chọn ngành giữ baseline', () => {
    const profile = thpt({ math: 7, physics: 6.5, chemistry: 6 }, { certificates: { ielts: 6 } });
    expect(evaluateSchool(profile, 'vgu', { context: bbaA00 }).status).toBe('calculated');
    expect(evaluateSchool(profile, 'vgu', { context: a00Context }).status).not.toBe('calculated');
  });
});
