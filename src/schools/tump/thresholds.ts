/**
 * TUMP (Trường Đại học Y - Dược, Đại học Thái Nguyên, mã trường DTY) 2025 — điểm trúng tuyển đại
 * học chính quy, phương thức xét kết quả thi TN THPT (mã phương thức 100). Nguồn
 * `sources.ts:tump-threshold-2025` (Thông báo 996/TB-ĐHYD, 22/8/2025) công bố "Điểm trúng tuyển"
 * MỘT mức áp dụng chung cho ngành (đã bao gồm điểm cộng, điểm ưu tiên, và quy đổi tương đương giữa
 * các phương thức/tổ hợp — xem chú thích trong `sources.ts`). Tổ hợp xét tuyển của phương thức 100
 * cho từng ngành lấy từ `sources.ts:tump-thongtin-2025` (mục 3, bảng DTY101–DTY603).
 */
export interface TumpFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30), nguồn `sources.ts:tump-threshold-2025`. */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho phương thức 100 (xét kết quả thi TN THPT) của ngành này. */
  combinationIds: readonly string[];
}

const GROUP_NO_ENGLISH_NO_LIT = ['A00', 'A02', 'B00', 'D07', 'D08'] as const;
const GROUP_WITH_A01 = ['A00', 'A01', 'A02', 'B00', 'D07', 'D08'] as const;
const GROUP_WITH_D00 = ['A00', 'A02', 'B00', 'D00', 'D07', 'D08'] as const;

export const TUMP_FIELD_THRESHOLDS_2025: readonly TumpFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 25.85, combinationIds: GROUP_NO_ENGLISH_NO_LIT },
  { code: '7720110', name: 'Y học dự phòng', threshold30: 18.3, combinationIds: GROUP_NO_ENGLISH_NO_LIT },
  { code: '7720201', name: 'Dược học', threshold30: 22.8, combinationIds: GROUP_WITH_A01 },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 20, combinationIds: GROUP_WITH_D00 },
  { code: '7720302', name: 'Hộ sinh', threshold30: 18.75, combinationIds: GROUP_WITH_D00 },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 26.15, combinationIds: GROUP_NO_ENGLISH_NO_LIT },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 22.5, combinationIds: GROUP_WITH_A01 },
  { code: '7720602', name: 'Kỹ thuật hình ảnh y học', threshold30: 21.25, combinationIds: GROUP_WITH_A01 },
  { code: '7720603', name: 'Kỹ thuật phục hồi chức năng', threshold30: 20.5, combinationIds: GROUP_WITH_A01 },
] as const;

export type TumpFieldCode = (typeof TUMP_FIELD_THRESHOLDS_2025)[number]['code'];

export const TUMP_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TumpFieldThreshold> = new Map(
  TUMP_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
