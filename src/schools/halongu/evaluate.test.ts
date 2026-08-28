import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHalonguThptExamAdmission, evaluateHalonguThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('HALONGU PT1 THPT threshold eligibility 2026 (nhóm ngành ngoài sư phạm)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHalonguThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'halongu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateHalonguThptExamAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'halongu-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHalonguThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'halongu-quality-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHalonguThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    // HALONGU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only
    // này thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/TDMU/...).
    expect(evaluateSchool(profile, 'halongu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['halongu'], { halongu: a00Context })[0].status).toBe('partial');
  });
});

describe('HALONGU THPT exact admission score (PT1, mã 100, nhóm ngoài sư phạm) 2026', () => {
  it('tính đủ Điểm xét tuyển và đạt ngưỡng 15/30', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateHalonguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.score?.value).toBe(15);
    expect(result.score?.scale).toBe(30);
    expect(result.eligibility?.status).toBe('eligible');
  });

  it('tổng thô dưới ngưỡng -> ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateHalonguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('exact-verified');
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('cộng điểm ưu tiên KV1 + ĐT nhóm 1 giúp đạt ngưỡng dù tổng thô dưới 15', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 4, physics: 4, chemistry: 4 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const result = evaluateHalonguThptExamExactAdmission(profile, a00Context);

    // Tổng thô 12 + ưu tiên (0,75 + 2,0) = 14,75 → vẫn chưa đạt 15.
    expect(result.score?.value).toBe(14.75);
    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateHalonguThptExamExactAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'halongu-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateHalonguThptExamExactAdmission(profile);

    expect(result.confidence).toBe('partial');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'halongu-subject-combination' }));
  });
});
