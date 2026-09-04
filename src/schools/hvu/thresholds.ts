/**
 * HVU (Trường Đại học Hùng Vương, Phú Thọ, mã trường THV) 2026 — điểm chuẩn trúng tuyển đợt 1 (nhánh
 * TS01, xét kết quả thi TN THPT 2026, thang 30, KHÔNG hệ số, ĐÃ bao gồm điểm ưu tiên theo suy luận
 * chuẩn — điểm trúng tuyển là điểm xét tuyển thực tế cuối danh sách) cho 7/27 ngành đại học chính quy
 * (`sources.ts:hvu-threshold-2026`, cross-check `hvu-threshold-secondary-2026`). Tổ hợp môn/mã ngành
 * lấy từ Quyết định 226/QĐ-ĐHHV CHÍNH CHỦ (`sources.ts:hvu-admission-scheme-2026`).
 *
 * Loại trừ 20/27 ngành:
 * - 4 ngành năng khiếu (Giáo dục Mầm non, Giáo dục Thể chất, Sư phạm Âm nhạc, Sư phạm Mỹ thuật) — dùng
 *   thang 40 (hệ số 2 cho môn năng khiếu), môn năng khiếu (NK GDMN/GDTC/ÂN/MT) không có SubjectId.
 * - 5 ngành (Ngôn ngữ Anh, Thú y, Công nghệ thông tin, Khoa học cây trồng, Chăn nuôi) — nguồn
 *   `hvu-threshold-2026` ghi rõ CHƯA có điểm chuẩn đợt 1 chốt (trường tuyển bổ sung), không đủ dữ
 *   liệu để tính ngưỡng.
 * - 11 ngành còn lại (Điều dưỡng, Thú y không lặp lại, Công tác xã hội, Quản trị dịch vụ Du lịch và
 *   Lữ hành, Du lịch, Ngôn ngữ Trung Quốc, Kế toán, Quản trị kinh doanh, Tài chính - Ngân hàng, Kinh
 *   tế, Công nghệ kỹ thuật cơ khí, Công nghệ Kỹ thuật điện, điện tử) — chỉ có số liệu điểm chuẩn từ
 *   nguồn thứ cấp LÀM TRÒN NHÓM (vd "18 điểm" gộp 6 ngành khác nhau) không đủ chính xác theo NGÀNH cụ
 *   thể — không mô hình hoá để tránh dùng số liệu ước lượng (xem knowledgeGaps.ts).
 */
export interface HvuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn Quyết định 226/QĐ-ĐHHV. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

const MATH_LIT_SOCIAL_COMBINATIONS = ['C00', 'D14', 'X70', 'X74'] as const;
const MATH_SCIENCE_COMBINATIONS = ['A00', 'A01', 'B00', 'X14'] as const;
const PRIMARY_ED_COMBINATIONS = ['C01', 'C03', 'D01', 'X01'] as const;
const ENGLISH_ED_COMBINATIONS = ['D01', 'D14', 'D15', 'X78'] as const;
const MATH_ED_COMBINATIONS = ['A00', 'D01', 'X06', 'X25'] as const;
const PSYCHOLOGY_COMBINATIONS = ['C00', 'D01', 'X70', 'X74'] as const;

export const HVU_FIELD_THRESHOLDS_2026: readonly HvuFieldThreshold[] = [
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 26.5, combinationIds: MATH_ED_COMBINATIONS },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 26.267, combinationIds: MATH_LIT_SOCIAL_COMBINATIONS },
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lí', threshold30: 26.142, combinationIds: MATH_LIT_SOCIAL_COMBINATIONS },
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 25.76, combinationIds: MATH_SCIENCE_COMBINATIONS },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 25.643, combinationIds: PRIMARY_ED_COMBINATIONS },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 25.2, combinationIds: ENGLISH_ED_COMBINATIONS },
  { code: '7310401', name: 'Tâm lý học', threshold30: 22.63, combinationIds: PSYCHOLOGY_COMBINATIONS },
] as const;

export type HvuFieldCode = (typeof HVU_FIELD_THRESHOLDS_2026)[number]['code'];

export const HVU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HvuFieldThreshold> = new Map(
  HVU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
