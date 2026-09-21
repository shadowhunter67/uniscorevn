export interface VguProgram {
  majorCode: string;
  name: string;
  /** Điểm sàn PT5 (thi TN THPT), thang 30, ĐÃ gồm điểm ưu tiên/điểm cộng — ảnh "Mức điểm sàn xét tuyển"
   * của bài công bố chính thức 09/07/2026. */
  floor30: number;
  /** Yêu cầu điểm TB môn Anh 3 năm THPT (thay cho chứng chỉ): 8,0; riêng Kỹ thuật và QL Xây dựng 7,5. */
  englishAverageMin: number;
  /** Tổ hợp PT5 mô hình hoá được (`COMMON_SUBJECT_COMBINATIONS`). D03/D05/D26 (Pháp/Đức) chưa có SubjectId
   * riêng nên nằm ngoài phạm vi. `undefined` = nguồn không công bố tổ hợp thi THPT (Kiến trúc). */
  combinations?: readonly string[];
}

const BUSINESS = ['A00', 'A01', 'D01', 'D07'] as const;
const ENGINEERING = ['A00', 'A01', 'D07'] as const;

export const VGU_PROGRAMS_2026: readonly VguProgram[] = [
  { majorCode: '7580101', name: 'Kiến trúc', floor30: 18, englishAverageMin: 8 },
  { majorCode: '7580201', name: 'Kỹ thuật và quản lý xây dựng', floor30: 17, englishAverageMin: 7.5, combinations: ENGINEERING },
  { majorCode: '7340101', name: 'Quản trị kinh doanh', floor30: 19, englishAverageMin: 8, combinations: BUSINESS },
  { majorCode: '7340202', name: 'Tài chính và Kế toán', floor30: 19, englishAverageMin: 8, combinations: BUSINESS },
  { majorCode: '7480101', name: 'Khoa học máy tính', floor30: 19, englishAverageMin: 8, combinations: ENGINEERING },
  { majorCode: '7520208', name: 'Kỹ thuật điện và máy tính', floor30: 18.5, englishAverageMin: 8, combinations: ENGINEERING },
  { majorCode: '7520103', name: 'Kỹ thuật cơ khí', floor30: 19, englishAverageMin: 8, combinations: ENGINEERING },
  { majorCode: '7510206', name: 'Kỹ thuật quy trình sản xuất bền vững', floor30: 18, englishAverageMin: 8, combinations: ['A00', 'A01', 'B00', 'D07'] },
  { majorCode: '7510104', name: 'Kỹ thuật giao thông thông minh', floor30: 18, englishAverageMin: 8, combinations: ENGINEERING },
  { majorCode: '7520114', name: 'Kỹ thuật cơ điện tử', floor30: 22, englishAverageMin: 8, combinations: ENGINEERING },
  { majorCode: '7310101', name: 'Kinh tế học', floor30: 19, englishAverageMin: 8, combinations: BUSINESS },
  { majorCode: '7520212', name: 'Kỹ thuật y sinh', floor30: 18, englishAverageMin: 8, combinations: ['A00', 'A01', 'A02', 'D01', 'D07'] },
  { majorCode: '7340122', name: 'Quản trị số và Kinh doanh quốc tế', floor30: 19, englishAverageMin: 8, combinations: BUSINESS },
];

export function getVguProgram(majorCode: string | undefined): VguProgram | undefined {
  return VGU_PROGRAMS_2026.find((program) => program.majorCode === majorCode);
}

/** Bảng quy đổi IELTS Học thuật → điểm thi tiếng Anh THPT (ảnh "Bảng quy đổi điểm thi tiếng Anh THPT và
 * chứng chỉ IELTS Học thuật"): "quy đổi sang giá trị CAO NHẤT trong khoảng điểm tương ứng". IELTS 5.5 ứng
 * với khoảng mở "trên 8,0 – dưới 8,5" không có giá trị cao nhất xác định ⇒ CỐ Ý không quy đổi (undefined). */
export function convertVguIeltsToEnglishScore(ielts: number | undefined): number | undefined {
  if (ielts === undefined) return undefined;
  const band = Math.floor(ielts * 2) / 2;
  if (band >= 7) return 10;
  if (band === 6.5) return 9.4;
  if (band === 6) return 8.9;
  if (band === 5) return 8;
  return undefined;
}
