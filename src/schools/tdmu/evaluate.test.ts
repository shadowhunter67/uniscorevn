import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateTdmuThptExamAdmission, evaluateTdmuThptExamExactAdmission, evaluateTdmuTranscriptAdmission, evaluateTdmuVactAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<string, number>>): ApplicantProfile {
  return { thpt: { scores } };
}

function profileWithTranscript(scores: Partial<Record<string, number>>): ApplicantProfile {
  return {
    transcript: {
      grade10: scores,
      grade11: scores,
      grade12: scores,
    },
  };
}

function profileWithVact(total: number): ApplicantProfile {
  return { exams: { vact: { total, totalSource: 'user-total-input' } } };
}

describe('evaluateTdmuThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'tdmu-subject-combination')).toBe(true);
  });

  it('nhóm standard, tổng 15 -> eligible', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm standard, tổng 14.99 -> ineligible', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law, tổng 19.99 -> ineligible (ngưỡng 20)', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({ math: 7, physics: 7, english: 5.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm teacher, tổng 20 -> eligible', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({ math: 7, physics: 7, english: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'teacher',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateTdmuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });
});

describe('evaluateTdmuTranscriptAdmission', () => {
  it('chưa chọn tổ hợp -> unknown', () => {
    const evaluation = evaluateTdmuTranscriptAdmission(profileWithTranscript({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('nhóm standard, trung bình 3 năm mỗi môn = 5.5 -> tổng 16.5 -> eligible', () => {
    const evaluation = evaluateTdmuTranscriptAdmission(profileWithTranscript({ math: 5.5, physics: 5.5, english: 5.5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.explanation[0].output).toBe(16.5);
  });

  it('nhóm law, trung bình mỗi môn 5.5 (tổng 16.5) -> ineligible (ngưỡng 21.5)', () => {
    const evaluation = evaluateTdmuTranscriptAdmission(profileWithTranscript({ math: 5.5, physics: 5.5, english: 5.5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'law',
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('thiếu điểm lớp 11 -> missingInputs + missingRequirement', () => {
    const profile: ApplicantProfile = {
      transcript: { grade10: { math: 6, physics: 6, english: 6 }, grade12: { math: 6, physics: 6, english: 6 } },
    };
    const evaluation = evaluateTdmuTranscriptAdmission(profile, { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS }, group: 'standard' });
    expect(evaluation.missingInputs.length).toBeGreaterThan(0);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'tdmu-transcript-math')).toBe(true);
  });
});

describe('evaluateTdmuVactAdmission', () => {
  it('chưa có điểm ĐGNL -> unknown + missingRequirement', () => {
    const evaluation = evaluateTdmuVactAdmission({});
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'tdmu-vact-total')).toBe(true);
  });

  it('nhóm standard, 600 -> eligible', () => {
    const evaluation = evaluateTdmuVactAdmission(profileWithVact(600), { group: 'standard' });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('nhóm law, 700 -> ineligible (ngưỡng 750)', () => {
    const evaluation = evaluateTdmuVactAdmission(profileWithVact(700), { group: 'law' });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('methodId khớp phương thức ĐGNL', () => {
    const evaluation = evaluateTdmuVactAdmission(profileWithVact(800));
    expect(evaluation.methodId).toBe('tdmu-vact-2026');
  });
});

describe('evaluateTdmuThptExamExactAdmission', () => {
  it('nhóm standard, tổng thô 15 -> eligible (so ngưỡng với tổng thô)', () => {
    const evaluation = evaluateTdmuThptExamExactAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
      isGeneralProgram: true,
    });

    expect(evaluation.confidence).toBe('exact-verified');
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.score?.value).toBe(15);
  });

  it('nhóm standard, tổng thô 14.99 -> ineligible dù cộng điểm ưu tiên vẫn đủ 15 (so với tổng THÔ, không phải ĐXT)', () => {
    const evaluation = evaluateTdmuThptExamExactAdmission(
      profileWithThpt({ math: 5, physics: 5, english: 4.99 }),
      {
        subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
        group: 'standard',
        isGeneralProgram: true,
      }
    );

    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('nhóm law, tổng thô 20 -> eligible', () => {
    const evaluation = evaluateTdmuThptExamExactAdmission(profileWithThpt({ math: 7, physics: 7, english: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'law',
      isGeneralProgram: true,
    });

    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('cộng điểm ưu tiên KV1 + ĐT nhóm 1 vào Điểm xét tuyển tham khảo (score), không đổi eligibility', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 5, physics: 5, english: 4.99 } },
      priority: { region: 'KV1', category: 'UT1' },
    };

    const evaluation = evaluateTdmuThptExamExactAdmission(profile, {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
      isGeneralProgram: true,
    });

    // Tổng thô 14,99 < 15 → vẫn ineligible dù điểm ưu tiên +2,75 đưa ĐXT tham khảo lên 17,74.
    expect(evaluation.eligibility?.status).toBe('ineligible');
    expect(evaluation.score?.value).toBe(17.74);
  });

  it('báo thiếu điểm khi hồ sơ chưa đủ 3 môn', () => {
    const evaluation = evaluateTdmuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      group: 'standard',
      isGeneralProgram: true,
    });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'tdmu-thpt-english' }));
  });

  it('yêu cầu chọn tổ hợp môn khi context rỗng', () => {
    const evaluation = evaluateTdmuThptExamExactAdmission(profileWithThpt({ math: 6, physics: 6, english: 6 }), {
      group: 'standard',
      isGeneralProgram: true,
    });

    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'tdmu-subject-combination' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters (threshold-only methods reclassify to partial)', () => {
    const profile = profileWithThpt({ math: 4, physics: 4, english: 4 });
    const context = { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS }, group: 'standard' as const };

    // TDMU đã có phương thức exact → classifyEvaluation phân loại lại kết quả threshold-only này
    // thành 'partial' (cùng tiền lệ VinhUni/HUB/HLU/CTU/TGU/...).
    expect(evaluateSchool(profile, 'tdmu', { context }).status).toBe('partial');
    expect(evaluateSchools(profile, ['tdmu'], { tdmu: context })[0].status).toBe('partial');
  });
});
