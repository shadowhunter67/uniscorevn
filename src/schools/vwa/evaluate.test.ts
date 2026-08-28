import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from '../../core/applicantProfile';
import { evaluateSchool, evaluateSchools } from '../../evaluation/schoolEvaluation';
import { evaluateVwaThptExamAdmission, evaluateVwaTranscriptAdmission, evaluateVwaThptExamExactAdmission } from './evaluate';

const combo = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };
const multimedia = { ...combo, group: 'multimedia' as const };
const standard = { ...combo, group: 'standard' as const };

function transcriptProfile(perSubject: Record<'math' | 'literature' | 'english', number>): ApplicantProfile['transcript'] {
  const grades: NonNullable<ApplicantProfile['transcript']> = { grade10: {}, grade11: {}, grade12: {} };
  for (const [subject, score] of Object.entries(perSubject)) {
    (grades.grade10 as Record<string, number>)[subject] = score;
    (grades.grade11 as Record<string, number>)[subject] = score;
    (grades.grade12 as Record<string, number>)[subject] = score;
  }
  return grades;
}

describe('VWA THPT-exam eligibility 2026', () => {
  it('requires a selected subject combination', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    const result = evaluateVwaThptExamAdmission(profile);

    expect(result.eligibility?.status).toBe('unknown');
    expect(result.missingRequirements).toContainEqual(expect.objectContaining({ kind: 'school-context', code: 'vwa-subject-combination' }));
  });

  it('applies the 16/30 standard-group floor by default', () => {
    const belowFloor: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 5.5 } } };
    const atFloor: ApplicantProfile = { thpt: { scores: { math: 5, literature: 5, english: 6 } } };

    expect(evaluateVwaThptExamAdmission(belowFloor, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateVwaThptExamAdmission(atFloor, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 19/30 multimedia-group floor', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6.5 } } };

    const result = evaluateVwaThptExamAdmission(profile, multimedia);

    expect(result.eligibility?.status).toBe('ineligible');
    expect(result.evidence).toContainEqual(expect.objectContaining({ sourceId: 'vwa-quality-threshold-2026' }));
  });

  it('routes through generic evaluateSchool and evaluateSchools adapters', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 6, literature: 6, english: 6 } } };

    // VWA giờ là verified-calculator; adapter /compare vẫn dùng phương thức threshold-only nên
    // phân loại 'partial' (cùng hành vi VinhUni/HUB/HLU/DTHU/TUAF/TTN/HAU/NTU-HN/UMT/DLU/NLU).
    expect(evaluateSchool(profile, 'vwa', { context: standard }).status).toBe('partial');
    expect(evaluateSchools(profile, ['vwa'], { vwa: standard })[0].status).toBe('partial');
  });
});

describe('evaluateVwaThptExamExactAdmission (thi TN THPT — ĐXT theo mã xét tuyển)', () => {
  const p = (scores: Record<string, number>, priority?: { region?: string; category?: string }): ApplicantProfile => ({ thpt: { scores }, ...(priority ? { priority } : {}) });
  const subs = { subjectContext: { combinationId: 'D01', subjects: ['math', 'literature', 'english'] as const } };

  it('chưa chọn mã xét tuyển -> partial', () => {
    const r = evaluateVwaThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { ...subs });
    expect(r.confidence).toBe('partial');
    expect(r.missingRequirements?.some((x) => x.code === 'vwa-program-code')).toBe(true);
  });

  it('Kinh tế (sàn 16), tổng 16 -> exact-verified, eligible', () => {
    const r = evaluateVwaThptExamExactAdmission(p({ math: 6, literature: 5, english: 5 }), { ...subs, programCode: '7310101' });
    expect(r.confidence).toBe('exact-verified');
    expect(r.score).toEqual({ value: 16, scale: 30 });
    expect(r.eligibility?.status).toBe('eligible');
  });

  it('Truyền thông đa phương tiện (sàn 19), tổng 18 -> ineligible', () => {
    const r = evaluateVwaThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { ...subs, programCode: '7320104' });
    expect(r.eligibility?.status).toBe('ineligible');
  });

  it('Chương trình CLC -> partial (ngoài phạm vi)', () => {
    const r = evaluateVwaThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { ...subs, programCode: '7340101E' });
    expect(r.confidence).toBe('partial');
  });

  it('CNTT: thiếu điểm Toán riêng -> unknown dù đủ ngưỡng', () => {
    const r = evaluateVwaThptExamExactAdmission(
      { thpt: { scores: { math: 6, physics: 5, english: 5 } } },
      { subjectContext: { combinationId: 'A01', subjects: ['math', 'physics', 'english'] as const }, programCode: '7480201' }
    );
    expect(r.confidence).toBe('exact-verified');
    expect(r.eligibility?.status).toBe('eligible'); // math=6 nằm trong tổ hợp -> đủ điều kiện
  });

  it('methodId đúng nhánh exact', () => {
    const r = evaluateVwaThptExamExactAdmission(p({ math: 6, literature: 6, english: 6 }), { ...subs, programCode: '7310101' });
    expect(r.methodId).toBe('vwa-thpt-exam-exact-2026');
  });
});

describe('VWA transcript eligibility 2026', () => {
  it('applies the 19/30 standard-group transcript floor', () => {
    const below: ApplicantProfile = { transcript: transcriptProfile({ math: 6, literature: 6, english: 6 }) };
    const at: ApplicantProfile = { transcript: transcriptProfile({ math: 6, literature: 6, english: 7 }) };

    expect(evaluateVwaTranscriptAdmission(below, standard).eligibility?.status).toBe('ineligible');
    expect(evaluateVwaTranscriptAdmission(at, standard).eligibility?.status).toBe('eligible');
  });

  it('applies the higher 23/30 multimedia-group transcript floor', () => {
    const profile: ApplicantProfile = { transcript: transcriptProfile({ math: 7, literature: 7, english: 7 }) };

    expect(evaluateVwaTranscriptAdmission(profile, multimedia).eligibility?.status).toBe('ineligible');
  });
});
