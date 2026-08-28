import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateOuThptExamAdmission, evaluateOuThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };
const CNTT = '7480201'; // ngưỡng 17/30

describe('OU THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateOuThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (reclassified to partial once exact exists)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8, physics: 8, chemistry: 8 } } };

    // OU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/.../BDU/...).
    expect(evaluateSchool(profile, 'ou', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['ou'], { ou: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateOuThptExamExactAdmission', () => {
  it('tổng thô 17 -> eligible (mã CNTT, ngưỡng 17/30)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 5 } } };
    const evaluation = evaluateOuThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(17);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tổng thô 16.99 + ưu tiên vẫn ineligible (không cộng ưu tiên)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateOuThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(evaluation.score?.value).toBe(16.99);
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('mã ngành không có trong bảng (vd Luật) -> partial (ngoài phạm vi)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9, chemistry: 9 } } };
    const evaluation = evaluateOuThptExamExactAdmission(profile, { programCode: '7380101', ...a00Context });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ code: 'ou-program-out-of-scope' }));
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };
    const evaluation = evaluateOuThptExamExactAdmission(profile, { programCode: CNTT, ...a00Context });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'ou-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const evaluation = evaluateOuThptExamExactAdmission(profile, { programCode: CNTT });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'ou-subject-combination' }));
  });
});
