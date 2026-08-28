import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateHsuThptExamAdmission, evaluateHsuThptExamExactAdmission, evaluateHsuTranscriptAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<(typeof A01_SUBJECTS)[number], number>>): ApplicantProfile {
  return { thpt: { scores } };
}

describe('evaluateHsuThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateHsuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'hsu-subject-combination')).toBe(true);
  });

  it('nhóm standard: 15 pass, 14.99 fail', () => {
    expect(
      evaluateHsuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
        subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
        thresholdGroup: 'standard',
      }).eligibility?.status
    ).toBe('eligible');
    expect(
      evaluateHsuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
        subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
        thresholdGroup: 'standard',
      }).eligibility?.status
    ).toBe('ineligible');
  });

  it('nhóm law: 20 pass, tổng 15 dưới ngưỡng -> ineligible', () => {
    const evaluation = evaluateHsuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateHsuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (reclassified to partial once exact exists)', () => {
    const profile = profileWithThpt({ math: 8, physics: 8, english: 8 });
    const context = { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS }, thresholdGroup: 'standard' as const };

    // HSU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/TDMU/HALONGU/SGU/HUBT/...).
    expect(evaluateSchool(profile, 'hsu', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['hsu'], { hsu: context })[0].status).toBe('partial');
  });
});

describe('evaluateHsuThptExamExactAdmission', () => {
  it('nhóm standard, tổng thô 15 -> eligible (so tổng thô, không phải ĐXT)', () => {
    const evaluation = evaluateHsuThptExamExactAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.score?.value).toBe(15);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm standard, tổng thô 14.99 + ưu tiên vẫn ineligible (so tổng thô)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, english: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const evaluation = evaluateHsuThptExamExactAdmission(profile, {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });

    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(17.74);
  });

  it('nhóm law, ĐXT (thô+ưu tiên) đạt 20 dù tổng thô dưới 20 -> eligible (so ĐXT)', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 6, physics: 6, english: 6 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const evaluation = evaluateHsuThptExamExactAdmission(profile, {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });

    // Tổng thô 18 + ưu tiên 2,75 = 20,75 >= 20 -> eligible dù tổng thô (18) < 20.
    expect(evaluation.score?.value).toBe(20.75);
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm law, tổng thô + ưu tiên dưới 20 -> ineligible', () => {
    const evaluation = evaluateHsuThptExamExactAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'law',
    });

    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const evaluation = evaluateHsuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      thresholdGroup: 'standard',
    });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'hsu-thpt-english' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const evaluation = evaluateHsuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6, english: 6 }), {
      thresholdGroup: 'standard',
    });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'hsu-subject-combination' }));
  });
});

describe('evaluateHsuTranscriptAdmission', () => {
  it('chưa nhập tổng điểm, nhóm standard -> unknown', () => {
    const evaluation = evaluateHsuTranscriptAdmission(profileWithThpt({}), { thresholdGroup: 'standard' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'hsu-transcript-total-score')).toBe(true);
  });

  it('nhóm standard: 18 pass, 17.99 fail', () => {
    expect(evaluateHsuTranscriptAdmission(profileWithThpt({}), { totalScore30: 18, thresholdGroup: 'standard' }).eligibility?.status).toBe('eligible');
    expect(evaluateHsuTranscriptAdmission(profileWithThpt({}), { totalScore30: 17.99, thresholdGroup: 'standard' }).eligibility?.status).toBe('ineligible');
  });

  it('nhóm law: luôn unknown kèm gap (ngưỡng chưa công bố), kể cả khi có điểm', () => {
    const evaluation = evaluateHsuTranscriptAdmission(profileWithThpt({}), { totalScore30: 25, thresholdGroup: 'law' });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'hsu-law-non-thpt-threshold-unpublished')).toBe(true);
  });

  it('methodId khớp phương thức học bạ', () => {
    expect(evaluateHsuTranscriptAdmission(profileWithThpt({}), { totalScore30: 18 }).methodId).toBe('hsu-transcript-2026');
  });
});
