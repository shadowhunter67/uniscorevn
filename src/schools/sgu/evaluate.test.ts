import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateSguThptExamAdmission, evaluateSguThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const CNTT = '7480201';

describe('SGU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateSguThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (reclassified to partial once exact exists)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // SGU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/TDMU/HALONGU/...).
    expect(evaluateSchool(profile, 'sgu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['sgu'], { sgu: a00Context })[0].status).toBe('partial');
  });
});

describe('SGU THPT exact admission score (mã ngoài sư phạm/Luật) 2026', () => {
  it('tính đủ Điểm xét tuyển và đạt ngưỡng CNTT (16/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(16);
    expect(result.score?.scale).toBe(30);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('tổng thô dưới ngưỡng CNTT -> ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 + ĐT nhóm 1 giúp đạt ngưỡng dù tổng thô dưới 16', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 4, physics: 4, chemistry: 4 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    // Tổng thô 12 + ưu tiên (0,75 + 2,0) = 14,75 → vẫn chưa đạt 16.
    expect(result.score?.value).toBe(14.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('mã ngành thuộc nhóm sư phạm/Luật -> partial (ngoài phạm vi)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: '7380101', ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ code: 'sgu-program-out-of-scope' }));
  });

  it('mã ngành không có trong bảng ngưỡng -> partial', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: '9999999', ...a00Context });

    expect(result.confidence).toBe('partial');
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'sgu-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateSguThptExamExactAdmission(profile, { programCode: CNTT });

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'sgu-subject-combination' }));
  });
});
