import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateUdaAdmission, evaluateUdaThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('UDA THPT threshold eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5, chemistry: 5 } } };

    const result = evaluateUdaAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uda-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 5 } } };

    const result = evaluateUdaAdmission(profile, a00Context);

    expect(result.missingInputs).toHaveLength(1);
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uda-thpt-chemistry' }));
  });

  it('marks totals below 15/30 as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateUdaAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'uda-threshold-2026' }));
  });

  it('marks totals at or above 15/30 as eligible for the general-major scope', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };

    const result = evaluateUdaAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('eligible');
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // UDA đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/TDMU/HALONGU/SGU/HUBT/HSU/HIU/TDU/...).
    expect(evaluateSchool(profile, 'uda', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['uda'], { uda: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateUdaThptExamExactAdmission', () => {
  it('tổng thô 15 -> eligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const evaluation = evaluateUdaThptExamExactAdmission(profile, a00Context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(15);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tổng thô 14.99 -> ineligible (không cộng ưu tiên)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, chemistry: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateUdaThptExamExactAdmission(profile, a00Context);

    // Không cộng ưu tiên khi so ngưỡng — điểm ưu tiên bị bỏ qua hoàn toàn.
    expect(evaluation.score?.value).toBe(14.99);
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };
    const evaluation = evaluateUdaThptExamExactAdmission(profile, a00Context);

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'uda-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const evaluation = evaluateUdaThptExamExactAdmission(profile);

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'uda-subject-combination' }));
  });
});
