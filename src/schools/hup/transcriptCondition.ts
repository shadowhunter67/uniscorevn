import type { ApplicantProfile } from '../../core/applicantProfile';
import type { SubjectId } from '../../core/subjects';

/**
 * HUP 2026 PT4 ngành Dược học — điều kiện học bạ (Quyết định 352/QĐ-ĐHN, mục 6.2.b): "Kết quả học
 * tập THPT từng năm học của môn Toán và hai trong ba môn Vật lý, Hoá học, Sinh học không dưới 7,0".
 * Hiểu là: mỗi lớp 10/11/12, Toán >= 7,0 và có ít nhất 2 trong 3 môn Lý/Hoá/Sinh >= 7,0.
 */
export const HUP_DUOC_PROGRAM_ID = '7720201';
export const HUP_DUOC_TRANSCRIPT_MIN = 7;

const GRADES = ['grade10', 'grade11', 'grade12'] as const;
const SCIENCE: readonly SubjectId[] = ['physics', 'chemistry', 'biology'];

export type HupDuocTranscriptResult =
  | { status: 'pass' | 'fail'; detail: string }
  | { status: 'missing'; detail: string };

export function checkHupDuocTranscriptCondition(profile: ApplicantProfile): HupDuocTranscriptResult {
  const failures: string[] = [];
  for (const grade of GRADES) {
    const year = profile.transcript?.[grade];
    const math = year?.math;
    if (math === undefined) return { status: 'missing', detail: `Thiếu điểm TB môn Toán ${grade.replace('grade', 'lớp ')} trong học bạ.` };
    const science = SCIENCE.map((s) => year?.[s]);
    const known = science.filter((v): v is number => v !== undefined);
    const passing = known.filter((v) => v >= HUP_DUOC_TRANSCRIPT_MIN).length;
    const unknown = science.length - known.length;
    // Chưa chắc đạt (chưa đủ 2 môn >= 7 và còn môn thiếu) => thiếu dữ liệu, không kết luận trượt.
    if (passing < 2 && passing + unknown >= 2) return { status: 'missing', detail: `Thiếu điểm TB môn Lý/Hoá/Sinh ${grade.replace('grade', 'lớp ')} trong học bạ.` };
    if (math < HUP_DUOC_TRANSCRIPT_MIN) failures.push(`Toán ${grade.replace('grade', 'lớp ')} = ${math}`);
    else if (passing < 2) failures.push(`${grade.replace('grade', 'lớp ')}: chỉ ${passing}/3 môn Lý/Hoá/Sinh >= ${HUP_DUOC_TRANSCRIPT_MIN}`);
  }
  if (failures.length > 0) return { status: 'fail', detail: `Học bạ chưa đạt điều kiện ngành Dược học (Toán và 2/3 môn Lý/Hoá/Sinh từng năm >= ${HUP_DUOC_TRANSCRIPT_MIN}): ${failures.join('; ')}.` };
  return { status: 'pass', detail: `Học bạ đạt điều kiện ngành Dược học (Toán và 2/3 môn Lý/Hoá/Sinh >= ${HUP_DUOC_TRANSCRIPT_MIN} cả 3 năm).` };
}
