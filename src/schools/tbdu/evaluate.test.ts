import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTbduThptExamAdmission, evaluateTbduThptExamExactAdmission } from './evaluate';

const a00Context = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

describe('TBDU THPT baseline eligibility 2026', () => {
  it('marks profiles below the common 15/30 baseline as ineligible', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateTbduThptExamAdmission(profile, a00Context);

    expect(result.confidence).toBe('partial');
    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'tbdu-admission-info-2026' }));
  });

  it('keeps profiles between the baseline and the Law/Economic-Law rule unresolved', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTbduThptExamAdmission(profile, a00Context);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.eligibility?.reasons.join(' ')).toContain('15');
  });

  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };

    const result = evaluateTbduThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tbdu-subject-combination' }));
  });

  it('reports missing THPT subject scores', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };

    const result = evaluateTbduThptExamAdmission(profile, a00Context);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tbdu-thpt-chemistry' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    // TBDU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/.../HUCE/...).
    expect(evaluateSchool(profile, 'tbdu', { context: a00Context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tbdu'], { tbdu: a00Context })[0].status).toBe('partial');
  });
});

describe('evaluateTbduThptExamExactAdmission', () => {
  it('tổng thô 15 -> eligible (so tổng thô)', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 5, physics: 5, chemistry: 5 } } };
    const evaluation = evaluateTbduThptExamExactAdmission(profile, a00Context);

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(15);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tổng thô 14.99 + ưu tiên vẫn ineligible (so tổng thô)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, chemistry: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };
    const evaluation = evaluateTbduThptExamExactAdmission(profile, a00Context);

    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(17.74);
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6 } } };
    const evaluation = evaluateTbduThptExamExactAdmission(profile, a00Context);

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tbdu-thpt-chemistry' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, physics: 6, chemistry: 6 } } };
    const evaluation = evaluateTbduThptExamExactAdmission(profile);

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tbdu-subject-combination' }));
  });
});
