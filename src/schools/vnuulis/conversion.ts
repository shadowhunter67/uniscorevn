import type { ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';

export interface VnuulisExamConversionResult {
  total40: number;
  total30: number;
  missingSubjects: SubjectId[];
}

/**
 * VNU-ULIS 2026 THPT exam-route conversion: the foreign-language subject (modeled here as
 * 'english', the only foreign-language SubjectId available in the shared taxonomy) counts with
 * coefficient 2. Total is out of 40 (10 + 10 + 10*2), then linearly rescaled to /30.
 * Source: https://ulis.vnu.edu.vn/tbtsdh26/ ("Điểm môn Ngoại ngữ ... tính hệ số 2"; "Tổng điểm
 * trên thang điểm 40 được quy đổi về điểm xét tuyển trên thang điểm 30").
 */
export function convertVnuulisExamScore(
  profile: ApplicantProfile,
  subjects: readonly SubjectId[],
  languageSubject: SubjectId = 'english'
): VnuulisExamConversionResult | { missingSubjects: SubjectId[] } {
  const missingSubjects: SubjectId[] = [];
  let total40 = 0;
  for (const subjectId of subjects) {
    const score = profile.thpt?.scores?.[subjectId];
    if (score === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    total40 += subjectId === languageSubject ? score * 2 : score;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  const total40Rounded = Math.round(total40 * 100) / 100;
  const total30 = Math.round(total40Rounded * 0.75 * 100) / 100;
  return { total40: total40Rounded, total30, missingSubjects };
}

export interface VnuulisTranscriptConversionResult {
  total30: number;
  missingSubjects: SubjectId[];
}

function transcriptAverage(profile: ApplicantProfile, subjectId: SubjectId): number | undefined {
  const scores = [
    profile.transcript?.grade10?.[subjectId],
    profile.transcript?.grade11?.[subjectId],
    profile.transcript?.grade12?.[subjectId],
  ];
  if (scores.some((score) => score === undefined)) return undefined;
  return (scores[0]! + scores[1]! + scores[2]!) / 3;
}

/**
 * VNU-ULIS 2026 transcript-route (international-partnership programs only): sum of the 3-year
 * transcript averages for the three combination subjects, on a /30 scale, no coefficient noted
 * for this route in the source.
 */
export function convertVnuulisTranscriptScore(
  profile: ApplicantProfile,
  subjects: readonly SubjectId[]
): VnuulisTranscriptConversionResult | { missingSubjects: SubjectId[] } {
  const missingSubjects: SubjectId[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const average = transcriptAverage(profile, subjectId);
    if (average === undefined) {
      missingSubjects.push(subjectId);
      continue;
    }
    total += average;
  }
  if (missingSubjects.length > 0) return { missingSubjects };
  return { total30: Math.round(total * 100) / 100, missingSubjects };
}
