import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateEiuThptExamAdmission, evaluateEiuTranscriptAdmission, evaluateEiuVactAdmission } from './evaluate';

const A01_SUBJECTS = ['math', 'physics', 'english'] as const;

function profileWithThpt(scores: Partial<Record<string, number>>, graduationYear?: number): ApplicantProfile {
  return { thpt: { scores }, graduationYear };
}

function profileWithTranscript(scores: Partial<Record<string, number>>, graduationYear?: number): ApplicantProfile {
  return {
    transcript: { grade10: scores, grade11: scores, grade12: scores },
    graduationYear,
  };
}

function profileWithVact(total: number, graduationYear?: number): ApplicantProfile {
  return { exams: { vact: { total, totalSource: 'user-total-input' } }, graduationYear };
}

describe('evaluateEiuThptExamAdmission', () => {
  it('chưa chọn tổ hợp -> unknown + missingRequirement school-context', () => {
    const evaluation = evaluateEiuThptExamAdmission(profileWithThpt({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'eiu-subject-combination')).toBe(true);
  });

  it('tổng 15 -> eligible', () => {
    const evaluation = evaluateEiuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 5 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tổng 14.99 -> ineligible', () => {
    const evaluation = evaluateEiuThptExamAdmission(profileWithThpt({ math: 5, physics: 5, english: 4.99 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('ngành Điều dưỡng -> unknown (ngưỡng Bộ GD&ĐT chưa model)', () => {
    const evaluation = evaluateEiuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
      program: 'nursing',
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('confidence luôn partial, không có score', () => {
    const evaluation = evaluateEiuThptExamAdmission(profileWithThpt({ math: 9, physics: 9, english: 9 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.confidence).toBe('partial');
    expect(evaluation.score).toBeUndefined();
  });
});

describe('evaluateEiuTranscriptAdmission', () => {
  it('chưa chọn tổ hợp -> unknown', () => {
    const evaluation = evaluateEiuTranscriptAdmission(profileWithTranscript({}));
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('trung bình mỗi môn 6.0 (tổng 18), tốt nghiệp 2025 -> eligible (chưa cần điều kiện kết hợp)', () => {
    const evaluation = evaluateEiuTranscriptAdmission(profileWithTranscript({ math: 6, physics: 6, english: 6 }, 2025), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('eligible');
    expect(evaluation.explanation[0].output).toBe(18);
  });

  it('tổng 17.99 -> ineligible', () => {
    const evaluation = evaluateEiuTranscriptAdmission(profileWithTranscript({ math: 5.99, physics: 6, english: 6 }, 2025), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('chưa biết năm tốt nghiệp -> unknown + missingRequirement eiu-graduation-year', () => {
    const evaluation = evaluateEiuTranscriptAdmission(profileWithTranscript({ math: 6, physics: 6, english: 6 }), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'eiu-graduation-year')).toBe(true);
  });

  it('tốt nghiệp 2026, đạt học bạ nhưng thiếu điểm thi TN THPT -> unknown', () => {
    const evaluation = evaluateEiuTranscriptAdmission(profileWithTranscript({ math: 6, physics: 6, english: 6 }, 2026), {
      subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS },
    });
    expect(evaluation.eligibility?.status).toBe('unknown');
  });

  it('tốt nghiệp 2026, đạt học bạ và đạt điều kiện kết hợp thi TN THPT -> eligible', () => {
    const profile: ApplicantProfile = {
      transcript: { grade10: { math: 6, physics: 6, english: 6 }, grade11: { math: 6, physics: 6, english: 6 }, grade12: { math: 6, physics: 6, english: 6 } },
      thpt: { scores: { math: 5, physics: 5, english: 5 } },
      graduationYear: 2026,
    };
    const evaluation = evaluateEiuTranscriptAdmission(profile, { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS } });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('tốt nghiệp 2026, đạt học bạ nhưng KHÔNG đạt điều kiện kết hợp thi TN THPT -> ineligible', () => {
    const profile: ApplicantProfile = {
      transcript: { grade10: { math: 6, physics: 6, english: 6 }, grade11: { math: 6, physics: 6, english: 6 }, grade12: { math: 6, physics: 6, english: 6 } },
      thpt: { scores: { math: 4, physics: 4, english: 4 } },
      graduationYear: 2026,
    };
    const evaluation = evaluateEiuTranscriptAdmission(profile, { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS } });
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('thiếu điểm lớp 11 -> missingInputs + missingRequirement', () => {
    const profile: ApplicantProfile = {
      transcript: { grade10: { math: 6, physics: 6, english: 6 }, grade12: { math: 6, physics: 6, english: 6 } },
    };
    const evaluation = evaluateEiuTranscriptAdmission(profile, { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS } });
    expect(evaluation.missingInputs.length).toBeGreaterThan(0);
    expect(evaluation.missingRequirements?.some((r) => r.code === 'eiu-transcript-math')).toBe(true);
  });
});

describe('evaluateEiuVactAdmission', () => {
  it('chưa có điểm ĐGNL -> unknown + missingRequirement', () => {
    const evaluation = evaluateEiuVactAdmission({});
    expect(evaluation.eligibility?.status).toBe('unknown');
    expect(evaluation.missingRequirements?.some((r) => r.code === 'eiu-vact-total')).toBe(true);
  });

  it('600, tốt nghiệp 2025 -> eligible', () => {
    const evaluation = evaluateEiuVactAdmission(profileWithVact(600, 2025));
    expect(evaluation.eligibility?.status).toBe('eligible');
  });

  it('599 -> ineligible', () => {
    const evaluation = evaluateEiuVactAdmission(profileWithVact(599, 2025));
    expect(evaluation.eligibility?.status).toBe('ineligible');
  });

  it('methodId khớp phương thức ĐGNL', () => {
    const evaluation = evaluateEiuVactAdmission(profileWithVact(800, 2025));
    expect(evaluation.methodId).toBe('eiu-vact-2026');
  });

  it('tốt nghiệp 2026, đạt ĐGNL và điều kiện kết hợp thi TN THPT -> eligible', () => {
    const profile: ApplicantProfile = {
      exams: { vact: { total: 700, totalSource: 'user-total-input' } },
      thpt: { scores: { math: 5, physics: 5, english: 5 } },
      graduationYear: 2026,
    };
    const evaluation = evaluateEiuVactAdmission(profile, { subjectContext: { combinationId: 'A01', subjects: A01_SUBJECTS } });
    expect(evaluation.eligibility?.status).toBe('eligible');
  });
});
