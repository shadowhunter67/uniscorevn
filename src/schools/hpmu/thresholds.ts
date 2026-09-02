/**
 * Trường Đại học Y Dược Hải Phòng (HPMU) 2025 — điểm chuẩn đại học chính quy công bố 22/08/2025,
 * đăng lại qua 2 nguồn báo độc lập (VietNamNet `sources.ts:hpmu-threshold-2025`, Công lý
 * `sources.ts:hpmu-threshold-secondary-2025`, cross-check khớp số liệu) — nguồn gốc chính thức
 * (Cổng TTĐT Chính phủ, `hpmu-threshold-chinhphu-2025`) chỉ đăng dạng ảnh (SPA render), không đọc
 * được bằng text extraction thông thường, dùng làm nguồn tham chiếu bổ sung, KHÔNG phải nguồn chính
 * cho bảng số.
 *
 * VietNamNet trích dẫn NGUYÊN VĂN thông báo trường: "Điểm trúng tuyển đã bao gồm điểm ưu tiên khu
 * vực, ưu tiên đối tượng và điểm thưởng" — XÁC NHẬN TRỰC TIẾP điểm chuẩn ĐÃ CỘNG ưu tiên (không cần
 * judgment call cho việc CÓ áp dụng). Cũng nêu: "Điểm trúng tuyển là điểm đã quy đổi tương đương
 * giữa 2 phương thức xét kết quả thi tốt nghiệp THPT năm 2025 và xét học bạ THPT" — GHI CHÚ QUAN
 * TRỌNG: ngưỡng công bố là 1 con số DUY NHẤT áp dụng cho CẢ 2 phương thức sau khi quy đổi tương
 * đương; batch này chỉ mô hình hoá NHÁNH xét điểm thi TN THPT (điểm xét = tổng thô 3 môn/thang 30,
 * đã ở cùng thang điểm với ngưỡng công bố — không cần quy đổi thêm), KHÔNG mô hình hoá nhánh học bạ
 * (công thức quy đổi giữa 2 phương thức không được công bố chi tiết, xem knowledgeGaps.ts).
 *
 * Mô hình hoá 7/7 ngành đại học chính quy hệ thi TN THPT (toàn bộ ngành, không có ngành nào loại
 * trừ) — TẤT CẢ cùng dùng chung 5 tổ hợp: A00, A01, B00, D07, D08 (nguồn tổ hợp:
 * `sources.ts:hpmu-scheme-2025`, đề án tuyển sinh đăng lại qua tuyensinh247.com).
 */
export interface HpmuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn 2025 (đã quy đổi tương đương, thang 30, ĐÃ gồm điểm ưu tiên) — nhánh thi TN THPT. */
  threshold30: number;
}

/** Cả 7 ngành đều dùng chung tập tổ hợp này (nguồn `hpmu-scheme-2025`). */
export const HPMU_COMBINATION_IDS: readonly string[] = ['A00', 'A01', 'B00', 'D07', 'D08'];

export const HPMU_FIELD_THRESHOLDS_2025 = [
  { code: '7720101', name: 'Y khoa', threshold30: 25.33 },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 24.63 },
  { code: '7720115', name: 'Y học cổ truyền', threshold30: 24.03 },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 23.23 },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 22.22 },
  { code: '7720201', name: 'Dược học', threshold30: 20 },
  { code: '7720110', name: 'Y học dự phòng', threshold30: 19.35 },
] as const satisfies readonly HpmuFieldThreshold[];

export type HpmuFieldCode = (typeof HPMU_FIELD_THRESHOLDS_2025)[number]['code'];

export const HPMU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HpmuFieldThreshold> = new Map(
  HPMU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
