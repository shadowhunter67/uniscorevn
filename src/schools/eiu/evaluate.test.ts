import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';
import { eiuComparisonAdapter } from './comparison';
import { evaluateEiuProgramExactAdmission, evaluateEiuThptExamAdmission, evaluateEiuTranscriptAdmission, evaluateEiuVactAdmission } from './evaluate';
import { EIU_PROGRAMS_2026 } from './programs';

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

describe('evaluateEiuProgramExactAdmission (ngưỡng theo ngành, trừ Điều dưỡng)', () => {
  const KEYS = ['grade10Sem1', 'grade10Sem2', 'grade11Sem1', 'grade11Sem2', 'grade12Sem1', 'grade12Sem2'] as const;
  const semesters = (perSubject: Partial<Record<SubjectId, number[]>>): NonNullable<ApplicantProfile['transcript']>['bySemester'] => {
    const out: Record<string, Record<string, number>> = {};
    KEYS.forEach((key, index) => {
      out[key] = {};
      for (const [subject, values] of Object.entries(perSubject)) out[key][subject] = values![index];
    });
    return out;
  };
  const flat = (value: number) => [value, value, value, value, value, value];
  const a00 = { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as readonly SubjectId[] };
  const ctx = (programCode: string, pathway: 'thpt' | 'transcript' = 'thpt', subjectContext = a00) => ({ programCode, pathway, subjectContext });
  const thpt = (a: number, b: number, c: number): ApplicantProfile => ({ thpt: { scores: { math: a, physics: b, chemistry: c } } });
  const withTranscript = (profile: ApplicantProfile, perSubject: Partial<Record<SubjectId, number[]>>): ApplicantProfile => ({ ...profile, transcript: { bySemester: semesters(perSubject) } });

  it('10 ngành, mã không trùng, Điều dưỡng ngoài phạm vi', () => {
    expect(EIU_PROGRAMS_2026).toHaveLength(10);
    expect(new Set(EIU_PROGRAMS_2026.map((p) => p.code)).size).toBe(10);
    expect(EIU_PROGRAMS_2026.filter((p) => !p.combinations).map((p) => p.code)).toEqual(['7720301']);
  });

  it('thi TN THPT: 15,00 đạt, 14,75 không (Kỹ thuật phần mềm, tổ hợp A00)', () => {
    const pass = evaluateEiuProgramExactAdmission(thpt(5, 5, 5), ctx('7480103'));
    expect(pass.confidence).toBe('exact-verified');
    expect(pass.methodId).toBe('eiu-program-exact-2026');
    expect(pass.eligibility?.status).toBe('eligible');
    expect(evaluateEiuProgramExactAdmission(thpt(5, 5, 4.75), ctx('7480103')).eligibility?.status).toBe('ineligible');
  });

  it('học bạ: TB 6 học kỳ 18,00 + điểm thi 15 → eligible; 17,83 → ineligible', () => {
    const pass = evaluateEiuProgramExactAdmission(withTranscript(thpt(5, 5, 5), { math: flat(6), physics: flat(6), chemistry: flat(6) }), ctx('7480103', 'transcript'));
    expect(pass.eligibility?.status).toBe('eligible');
    const fail = evaluateEiuProgramExactAdmission(withTranscript(thpt(5, 5, 5), { math: [5, 6, 6, 6, 6, 6], physics: flat(6), chemistry: flat(6) }), ctx('7480103', 'transcript'));
    expect(fail.explanation.find((step) => step.id === 'eiu-exact-transcript')?.output).toBe(17.83);
    expect(fail.eligibility?.status).toBe('ineligible');
  });

  it('học bạ: điểm thi tổ hợp 14 nhưng Toán + Văn + môn khác ≥ 15 vẫn đạt điều kiện kèm theo', () => {
    const profile: ApplicantProfile = {
      thpt: { scores: { math: 7, literature: 6, physics: 2, chemistry: 2, english: 3 } },
      transcript: { bySemester: semesters({ math: flat(6), physics: flat(6), chemistry: flat(6) }) },
    };
    const r = evaluateEiuProgramExactAdmission(profile, ctx('7480103', 'transcript'));
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('học bạ: điểm thi tổ hợp < 15 và thiếu Toán/Văn để thử phương án khác → unknown, không kết luận ineligible', () => {
    const r = evaluateEiuProgramExactAdmission(withTranscript(thpt(4, 4, 4), { math: flat(6), physics: flat(6), chemistry: flat(6) }), ctx('7480103', 'transcript'));
    expect(r.eligibility?.status).toBe('unknown');
  });

  it('học bạ chỉ có TB cả năm (không có 6 học kỳ) → unknown, không dùng TB năm làm proxy', () => {
    const profile: ApplicantProfile = { thpt: thpt(5, 5, 5).thpt, transcript: { grade10: { math: 6, physics: 6, chemistry: 6 }, grade11: { math: 6, physics: 6, chemistry: 6 }, grade12: { math: 6, physics: 6, chemistry: 6 } } };
    const r = evaluateEiuProgramExactAdmission(profile, ctx('7480103', 'transcript'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'eiu-transcript-semesters-math' }));
  });

  it('Điều dưỡng ngoài phạm vi exact (ngưỡng do Bộ công bố)', () => {
    const r = evaluateEiuProgramExactAdmission(thpt(9, 9, 9), ctx('7720301'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'eiu-program-out-of-exact-scope' }));
  });

  it('tổ hợp không thuộc ngành (Kỹ thuật phần mềm không có A07) → unknown; Kinh tế có A07', () => {
    const a07 = { combinationId: 'A07', subjects: ['math', 'history', 'geography'] as readonly SubjectId[] };
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, history: 6, geography: 6 } } };
    expect(evaluateEiuProgramExactAdmission(profile, ctx('7480103', 'thpt', a07)).missingRequirements).toContainEqual(expect.objectContaining({ code: 'eiu-combination-for-program' }));
    expect(evaluateEiuProgramExactAdmission(profile, ctx('7310101', 'thpt', a07)).eligibility?.status).toBe('eligible');
  });

  it('thiếu ngành / thiếu điểm môn → unknown', () => {
    expect(evaluateEiuProgramExactAdmission(thpt(9, 9, 9), { subjectContext: a00 }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'eiu-program' }));
    const partial: ApplicantProfile = { thpt: { scores: { math: 9, physics: 9 } } };
    expect(evaluateEiuProgramExactAdmission(partial, ctx('7480103')).missingRequirements).toContainEqual(expect.objectContaining({ code: 'eiu-thpt-chemistry' }));
  });

  it('adapter: có chọn ngành dùng nhánh exact (kể cả phương thức học bạ), chưa chọn ngành giữ baseline', () => {
    const profile = thpt(5, 5, 5);
    expect(eiuComparisonAdapter.evaluate(profile, ctx('7480103')).evaluation.methodId).toBe('eiu-program-exact-2026');
    expect(eiuComparisonAdapter.evaluate(profile, { subjectContext: a00 }).evaluation.methodId).toBe('eiu-thpt-exam-2026');
  });
});
