import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTguThptExamAdmission, evaluateTguThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TGU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTguThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tgu-admission-scheme-2026' }));
  });

  it('keeps profiles between the baseline and the Law floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateTguThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTguThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tgu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTguThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tgu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // TGU đã có phương thức exact (Phương thức 1, "các ngành khác") → classifyEvaluation phân loại
    // lại kết quả threshold-only baseline này thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/...).
    expect(evaluateSchool(profile, 'tgu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tgu'], { tgu: a00Context })[0].status).toBe('partial');
  });
});

describe('TGU THPT exact admission score (Phương thức 1, "các ngành khác") 2026', () => {
  it('tính đủ Điểm xét tuyển và đạt cả 2 điều kiện (tổng ≥15/30 và Toán/Văn ≥ 1/3 ĐXT)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateTguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16);
    expect(result.score?.scale).toBe(30);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('đạt tổng ≥15/30 nhưng KHÔNG đạt điều kiện môn chính (Toán/Văn < 1/3 ĐXT) → ineligible', () => {
    // Toán 2, Vật lý 8, Hóa 8 → tổng 18/30 (≥15) nhưng Toán 2 < 18/3 = 6.
    const profile: ApplicantProfile = { thpt: { scores: { math: 2, physics: 8, chemistry: 8 } } };

    const result = evaluateTguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.eligibility?.reasons.join(' ')).toContain('Toán/Ngữ văn cao hơn');
  });

  it('cộng điểm ưu tiên KV1 + ĐT nhóm 1 vào Điểm xét tuyển', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 10, physics: 3, chemistry: 2 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluateTguThptExamExactAdmission(profile, a00Context);

    // Tổng thô 15 + ưu tiên (0,75 + 2,0) = 17,75; điểm Toán 10 ≥ 17,75/3 ≈ 5,92 → đạt cả 2 điều kiện.
    expect(result.score?.value).toBe(17.75);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('từ chối tổ hợp không có Toán và Ngữ văn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { physics: 8, chemistry: 8, biology: 8 } } };
    const context = { subjectContext: { combinationId: 'B00', subjects: ['physics', 'chemistry', 'biology'] as const } };

    const result = evaluateTguThptExamExactAdmission(profile, context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('báo thiếu điểm môn thi khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tgu-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTguThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tgu-subject-combination' }));
  });
});
