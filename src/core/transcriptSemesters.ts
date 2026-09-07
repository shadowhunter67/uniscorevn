import type { ApplicantProfile } from './applicantProfile';
import { round2 } from './round2';
import type { SubjectId } from './subjects';

/**
 * Độ chi tiết THEO HỌC KỲ của học bạ — bổ sung (KHÔNG thay thế) `transcript.grade10/11/12` vốn lưu
 * TB CẢ NĂM. Lý do tồn tại: nhiều trường công bố công thức học bạ tính trên "TRUNG BÌNH CỘNG CỦA 06
 * HỌC KỲ" (VLU Phương thức 2/3, HUTECH xét học bạ, HCMULAW Phương thức 2/3) — TB cả năm theo Thông
 * tư 22/2021 thường = (TB HK1 + 2×TB HK2)/3, KHÔNG tương đương trung bình cộng đơn giản của 2 học
 * kỳ, nên KHÔNG suy ngược được từ dữ liệu TB năm mà không có sai số.
 *
 * Đây là dữ liệu OPT-IN: hồ sơ cũ (và đa số hồ sơ mới) không có `bySemester`, mọi consumer phải xử
 * lý đúng trạng thái "thiếu" bằng cách báo thiếu input — TUYỆT ĐỐI không lấy TB năm làm proxy cho
 * học kỳ (đó chính là sai số mà gap này sinh ra để tránh).
 */
export const TRANSCRIPT_SEMESTER_KEYS = [
  'grade10Sem1',
  'grade10Sem2',
  'grade11Sem1',
  'grade11Sem2',
  'grade12Sem1',
  'grade12Sem2',
] as const;

export type TranscriptSemesterKey = (typeof TRANSCRIPT_SEMESTER_KEYS)[number];

export const TRANSCRIPT_SEMESTER_LABELS: Record<TranscriptSemesterKey, string> = {
  grade10Sem1: 'Lớp 10 · HK1',
  grade10Sem2: 'Lớp 10 · HK2',
  grade11Sem1: 'Lớp 11 · HK1',
  grade11Sem2: 'Lớp 11 · HK2',
  grade12Sem1: 'Lớp 12 · HK1',
  grade12Sem2: 'Lớp 12 · HK2',
};

export type TranscriptBySemester = Partial<Record<TranscriptSemesterKey, Partial<Record<SubjectId, number>>>>;

export interface SubjectSemesterAverage {
  /** `undefined` nếu THIẾU bất kỳ học kỳ nào trong 6 — không tính trung bình trên tập con. */
  average?: number;
  missingSemesters: TranscriptSemesterKey[];
}

/**
 * TB 6 học kỳ của MỘT môn. Trả `average: undefined` ngay khi thiếu 1 học kỳ bất kỳ (all-or-nothing)
 * — trung bình trên 4/6 học kỳ không phải con số trường công bố, đưa ra sẽ là bịa.
 *
 * KHÔNG làm tròn ở đây: caller quyết định làm tròn ở bước nào (thường chỉ làm tròn TỔNG cuối cùng),
 * tránh tích luỹ sai số làm tròn 2 lần khi cộng 3 môn.
 */
export function averageSubjectAcrossSemesters(bySemester: TranscriptBySemester | undefined, subjectId: SubjectId): SubjectSemesterAverage {
  const missingSemesters: TranscriptSemesterKey[] = [];
  let total = 0;
  for (const key of TRANSCRIPT_SEMESTER_KEYS) {
    const score = bySemester?.[key]?.[subjectId];
    if (score === undefined) missingSemesters.push(key);
    else total += score;
  }
  if (missingSemesters.length > 0) return { missingSemesters };
  return { average: total / TRANSCRIPT_SEMESTER_KEYS.length, missingSemesters };
}

export interface CombinationSemesterTotal {
  /** Tổng TB 6 học kỳ của 3 môn tổ hợp (thang 30) — `undefined` nếu bất kỳ môn nào thiếu học kỳ. */
  total30?: number;
  /** TB từng môn (làm tròn 2 chữ số) để hiển thị trong `explanation` — chỉ có khi `total30` có. */
  subjectAverages?: { subjectId: SubjectId; average: number }[];
  missingBySubject: { subjectId: SubjectId; missingSemesters: TranscriptSemesterKey[] }[];
}

/**
 * "Tổng điểm trung bình 03 môn theo tổ hợp xét tuyển của 06 học kỳ" (thang 30) — công thức dùng
 * chung của VLU/HUTECH (cùng câu chữ trong thông báo chính thức của cả 2 trường). Cộng TB CHƯA làm
 * tròn của từng môn rồi mới làm tròn 2 chữ số ở tổng, để kết quả không lệch do làm tròn 2 lần.
 */
export function sumCombinationAveragesAcrossSemesters(
  bySemester: TranscriptBySemester | undefined,
  subjects: readonly SubjectId[]
): CombinationSemesterTotal {
  const missingBySubject: { subjectId: SubjectId; missingSemesters: TranscriptSemesterKey[] }[] = [];
  const subjectAverages: { subjectId: SubjectId; average: number }[] = [];
  let total = 0;
  for (const subjectId of subjects) {
    const { average, missingSemesters } = averageSubjectAcrossSemesters(bySemester, subjectId);
    if (average === undefined) {
      missingBySubject.push({ subjectId, missingSemesters });
      continue;
    }
    total += average;
    subjectAverages.push({ subjectId, average: round2(average) });
  }
  if (missingBySubject.length > 0) return { missingBySubject };
  return { total30: round2(total), subjectAverages, missingBySubject };
}

/** Có ít nhất 1 điểm học kỳ nào đó trong hồ sơ — dùng cho UI (mở/gấp mục) và summary. */
export function hasAnySemesterScore(profile: ApplicantProfile): boolean {
  const bySemester = profile.transcript?.bySemester;
  if (!bySemester) return false;
  return TRANSCRIPT_SEMESTER_KEYS.some((key) => Object.values(bySemester[key] ?? {}).some((value) => value !== undefined));
}
