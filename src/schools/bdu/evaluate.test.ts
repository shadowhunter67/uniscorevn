import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateBduThptExamAdmission, evaluateBduThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('BDU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateBduThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'bdu-admission-2026' }));
  });

  it('keeps profiles between the baseline and the highest published group floor unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateBduThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateBduThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bdu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateBduThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bdu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // BDU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/.../HIU/TDU/UDA/...).
    expect(evaluateSchool(profile, 'bdu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['bdu'], { bdu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateBduThptExamExactAdmission', () => {
  it('nhóm standard, tổng thô 15 -> eligible (so tổng thô)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { ...a00Context, thresholdGroup: 'standard' });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(15);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm standard, tổng thô 14.99 + ưu tiên vẫn ineligible (so tổng thô)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, chemistry: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { ...a00Context, thresholdGroup: 'standard' });

    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(17.74);
  });

  it('nhóm lawOrPharmacy, ĐXT đạt 20 dù tổng thô dưới 20 -> eligible (so ĐXT)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, chemistry: 6 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { ...a00Context, thresholdGroup: 'lawOrPharmacy' });

    expect(evaluation.score?.value).toBe(20.75);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm lawOrPharmacy, tổng thô + ưu tiên dưới 20 -> ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { ...a00Context, thresholdGroup: 'lawOrPharmacy' });

    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { ...a00Context, thresholdGroup: 'standard' });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'bdu-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const evaluation = evaluateBduThptExamExactAdmission(profile, { thresholdGroup: 'standard' });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'bdu-subject-combination' }));
  });
});
