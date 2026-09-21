import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import type { SubjectId } from '../../core/subjects';
import { eautComparisonAdapter } from './comparison';
import { evaluateEautTranscriptAdmission, evaluateEautTranscriptExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'A00', subjects: ['math', 'physics', 'chemistry'] as const } };

const passingTranscript = { math: 6, physics: 6, chemistry: 6 };
const passingThpt = { math: 5, physics: 5, chemistry: 5 };

function transcriptProfile(perSubject: Partial<Record<'math' | 'physics' | 'chemistry', number>>): ApplicantProfile['transcript'] {
  const grades: NonNullable<ApplicantProfile['transcript']> = { grade10: {}, grade11: {}, grade12: {} };
  for (const [subject, score] of Object.entries(perSubject)) {
    (grades.grade10 as Record<string, number>)[subject] = score!;
    (grades.grade11 as Record<string, number>)[subject] = score!;
    (grades.grade12 as Record<string, number>)[subject] = score!;
  }
  return grades;
}

describe('EAUT transcript eligibility 2026 (method 1)', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'eaut-subject-combination' }));
  });

  it('reports missing transcript years and missing THPT scores separately', () => {
    const profile: ApplicantProfile = { transcript: { grade12: passingTranscript }, thpt: { scores: { math: 5, physics: 5 } } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'eaut-transcript-math' }));
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'profile-input', code: 'eaut-thpt-chemistry' }));
    expect(result.eligibility?.status).toBe('unknown');
  });

  it('marks ineligible when transcript average is below 18/30 even if THPT floor passes', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile({ math: 5, physics: 5, chemistry: 5 }), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks ineligible when THPT floor (15/30) fails even if transcript average passes', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: { math: 4, physics: 4, chemistry: 4 } } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('ineligible');
  });

  it('marks eligible when both transcript average >= 18/30 and THPT total >= 15/30', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    const result = evaluateEautTranscriptAdmission(profile, combo);

    expect(result.eligibility?.status).toBe('eligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'eaut-admission-methods-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };

    // Chưa chọn ngành → baseline chung (partial, không có score); trường đã verified nên generic status là 'partial'.
    expect(evaluateSchool(profile, 'eaut', { context: combo }).status).toBe('partial');
    expect(evaluateSchools(profile, ['eaut'], { eaut: combo })[0].status).toBe('partial');
  });
});

describe('evaluateEautTranscriptExactAdmission (học bạ 6 học kỳ + điều kiện điểm thi, theo ngành)', () => {
  type Sem = 'grade10Sem1' | 'grade10Sem2' | 'grade11Sem1' | 'grade11Sem2' | 'grade12Sem1' | 'grade12Sem2';
  const KEYS: Sem[] = ['grade10Sem1', 'grade10Sem2', 'grade11Sem1', 'grade11Sem2', 'grade12Sem1', 'grade12Sem2'];
  const semesters = (perSubject: Partial<Record<SubjectId, number[]>>): NonNullable<ApplicantProfile['transcript']>['bySemester'] => {
    const out: Record<string, Record<string, number>> = {};
    KEYS.forEach((key, index) => {
      out[key] = {};
      for (const [subject, values] of Object.entries(perSubject)) out[key][subject] = values![index];
    });
    return out;
  };
  const flat = (value: number) => [value, value, value, value, value, value];
  const withProgram = (programCode: string, subjectContext: { combinationId: string; subjects: readonly SubjectId[] } = combo.subjectContext) => ({ programCode, subjectContext });
  const profileOf = (transcript: number[][], thpt: [number, number, number]): ApplicantProfile => ({
    transcript: { bySemester: semesters({ math: transcript[0], physics: transcript[1], chemistry: transcript[2] }) },
    thpt: { scores: { math: thpt[0], physics: thpt[1], chemistry: thpt[2] } },
  });

  it('học bạ 18,00 + điểm thi 15,00 → eligible (CNTT, tổ hợp A00)', () => {
    const r = evaluateEautTranscriptExactAdmission(profileOf([flat(6), flat(6), flat(6)], [5, 5, 5]), withProgram('7480201'));
    expect(r.confidence).toBe('exact-verified');
    expect(r.methodId).toBe('eaut-transcript-program-exact-2026');
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('dùng trung bình 6 học kỳ đúng nghĩa: 18,17 đạt, 17,83 không đạt', () => {
    const pass = evaluateEautTranscriptExactAdmission(profileOf([[5, 6, 6, 6, 7, 7], flat(6), flat(6)], [5, 5, 5]), withProgram('7480201'));
    expect(pass.explanation.find((step) => step.id === 'eaut-exact-transcript')?.output).toBe(18.17);
    expect(pass.eligibility?.status).toBe('eligible');
    const fail = evaluateEautTranscriptExactAdmission(profileOf([[5, 6, 6, 6, 6, 6], flat(6), flat(6)], [5, 5, 5]), withProgram('7480201'));
    expect(fail.explanation.find((step) => step.id === 'eaut-exact-transcript')?.output).toBe(17.83);
    expect(fail.eligibility?.status).toBe('ineligible');
  });

  it('điểm thi tốt nghiệp < 15 → ineligible dù học bạ đủ', () => {
    const r = evaluateEautTranscriptExactAdmission(profileOf([flat(7), flat(7), flat(7)], [5, 5, 4.75]), withProgram('7480201'));
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('chỉ có TB cả năm (không có 6 học kỳ) → unknown, KHÔNG dùng TB năm làm proxy', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile(passingTranscript), thpt: { scores: passingThpt } };
    const r = evaluateEautTranscriptExactAdmission(profile, withProgram('7480201'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'eaut-transcript-semesters-math' }));
  });

  it('tổ hợp không thuộc ngành (Ngôn ngữ Anh không có A00) → unknown', () => {
    const r = evaluateEautTranscriptExactAdmission(profileOf([flat(7), flat(7), flat(7)], [6, 6, 6]), withProgram('7220201'));
    expect(r.eligibility?.status).toBe('unknown');
    expect(r.missingRequirements).toContainEqual(expect.objectContaining({ code: 'eaut-combination-for-program' }));
  });

  it('Ngôn ngữ Anh với tổ hợp C00 hợp lệ', () => {
    const c00 = { combinationId: 'C00', subjects: ['literature', 'history', 'geography'] as readonly SubjectId[] };
    const profile: ApplicantProfile = {
      transcript: { bySemester: semesters({ literature: flat(6), history: flat(6), geography: flat(6) }) },
      thpt: { scores: { literature: 5, history: 5, geography: 5 } },
    };
    expect(evaluateEautTranscriptExactAdmission(profile, withProgram('7220201', c00)).eligibility?.status).toBe('eligible');
  });

  it('khối Sức khỏe (Dược học, Điều dưỡng) ngoài phạm vi exact (ngưỡng do Bộ công bố)', () => {
    for (const code of ['7720201', '7720301']) {
      const r = evaluateEautTranscriptExactAdmission(profileOf([flat(9), flat(9), flat(9)], [9, 9, 9]), withProgram(code));
      expect(r.eligibility?.status, code).toBe('unknown');
      expect(r.confidence, code).toBe('partial');
      expect(r.missingRequirements, code).toContainEqual(expect.objectContaining({ code: 'eaut-program-out-of-exact-scope' }));
    }
  });

  it('thiếu ngành / thiếu tổ hợp → unknown', () => {
    const profile = profileOf([flat(6), flat(6), flat(6)], [5, 5, 5]);
    expect(evaluateEautTranscriptExactAdmission(profile, combo).missingRequirements).toContainEqual(expect.objectContaining({ code: 'eaut-program' }));
    expect(evaluateEautTranscriptExactAdmission(profile, { programCode: '7480201' }).missingRequirements).toContainEqual(expect.objectContaining({ code: 'eaut-subject-combination' }));
  });

  it('adapter: có chọn ngành dùng nhánh exact, chưa chọn giữ baseline', () => {
    const profile = profileOf([flat(6), flat(6), flat(6)], [5, 5, 5]);
    expect(eautComparisonAdapter.evaluate(profile, withProgram('7480201')).evaluation.methodId).toBe('eaut-transcript-program-exact-2026');
    expect(eautComparisonAdapter.evaluate(profile, combo).evaluation.methodId).toBe('eaut-transcript-2026');
  });
});
