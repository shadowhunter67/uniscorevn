/**
 * DUMTP (Trường Đại học Kỹ thuật Y - Dược Đà Nẵng, mã trường YDN) 2025 — điểm trúng tuyển đại học
 * chính quy, phương thức 1 (xét kết quả thi TN THPT 2025, mã phương thức 100). Nguồn
 * `sources.ts:dumtp-threshold-2025` (Quyết định 625/QĐ-ĐHKTYDĐN, 22/8/2025) công bố MỘT mức điểm
 * (thang 30) áp dụng chung cho cả 4 tổ hợp của mỗi ngành/chuyên ngành — nguồn
 * `sources.ts:dumtp-dean-2025` mục 3.2 xác nhận "điểm trúng tuyển ... theo thang điểm 30 cho tất
 * cả các tổ hợp xét tuyển". `code` dùng MÃ NGÀNH/CHUYÊN NGÀNH đúng theo Quyết định (Điều dưỡng có
 * 3 chuyên ngành A/B/C dùng chung mã ngành 7720301).
 */
export interface DumtpFieldThreshold {
  code: string;
  /** Tên ngành/chuyên ngành đúng nguyên văn Quyết định 625/QĐ-ĐHKTYDĐN. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30), áp dụng cho cả 4 tổ hợp. Nguồn `sources.ts:dumtp-threshold-2025`. */
  threshold30: number;
}

/** 4 tổ hợp duy nhất của trường, áp dụng đồng nhất cho MỌI ngành (`sources.ts:dumtp-dean-2025` mục 5.1). */
export const DUMTP_COMBINATION_IDS = ['A00', 'B00', 'B08', 'D07'] as const;

export const DUMTP_FIELD_THRESHOLDS_2025: readonly DumtpFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa', threshold30: 22.85 },
  { code: '7720201', name: 'Dược học', threshold30: 19 },
  { code: '7720301A', name: 'Điều dưỡng (Chuyên ngành: Điều dưỡng đa khoa)', threshold30: 20.5 },
  { code: '7720301B', name: 'Điều dưỡng (Chuyên ngành: Điều dưỡng nha khoa)', threshold30: 20.5 },
  { code: '7720301C', name: 'Điều dưỡng (Chuyên ngành: Điều dưỡng gây mê hồi sức)', threshold30: 20.7 },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 20.85 },
  { code: '7720602', name: 'Kỹ thuật hình ảnh y học', threshold30: 20.2 },
  { code: '7720603', name: 'Kỹ thuật phục hồi chức năng', threshold30: 21.1 },
  { code: '7720701', name: 'Y tế công cộng', threshold30: 15 },
] as const;

export type DumtpFieldCode = (typeof DUMTP_FIELD_THRESHOLDS_2025)[number]['code'];

export const DUMTP_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DumtpFieldThreshold> = new Map(
  DUMTP_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
