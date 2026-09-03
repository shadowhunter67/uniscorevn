import { round2 } from '../../core/round2';

/**
 * BMTU 2026 — "7. Chính sách ưu tiên" (mục 7 đề án, Quyết định 396/QĐ-YDBMT): điểm thưởng cho thí
 * sinh đoạt giải kỳ thi chọn học sinh giỏi các môn Toán/Hóa/Sinh/Lý/Anh, cộng trực tiếp vào tổng
 * điểm xét tuyển (giải trong 3 năm gần nhất tính tới thời điểm xét). KHÔNG có field tương ứng trong
 * `ApplicantProfile` dùng chung (giống tiền lệ HUP) — caller cung cấp riêng qua context
 * `hsgAwardLevel`, không mặc định.
 */
export type BmtuHsgAwardLevel = 'national-1-2-3' | 'national-encouragement' | 'provincial-1' | 'provincial-2' | 'provincial-3';

export const BMTU_HSG_BONUS_30: Record<BmtuHsgAwardLevel, number> = {
  'national-1-2-3': 3.0,
  'national-encouragement': 1.5,
  'provincial-1': 1.5,
  'provincial-2': 1.0,
  'provincial-3': 0.5,
};

export function calculateBmtuHsgBonus30(level: BmtuHsgAwardLevel | undefined): number {
  if (!level) return 0;
  return round2(BMTU_HSG_BONUS_30[level] ?? 0);
}
