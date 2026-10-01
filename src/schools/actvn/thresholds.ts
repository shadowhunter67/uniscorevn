/**
 * ACTVN (Học viện Kỹ thuật Mật mã, hệ đào tạo phục vụ lĩnh vực kinh tế - xã hội) 2026 — điểm chuẩn
 * trúng tuyển 4 mã xét tuyển, nhánh Phương thức xét kết quả thi TN THPT 2026, thang 30. Nguồn: Quyết
 * định 44/QĐ-HĐTS ngày 13/08/2026 của Chủ tịch HĐTS Học viện (`sources.ts:actvn-cutoff-2026`, đọc bằng
 * vision từ ảnh scan), ghi chú nguyên văn: "Điểm chuẩn trúng tuyển được quy đổi tương đương về điểm thi
 * THPT (thang điểm 30) và bao gồm điểm ưu tiên, điểm cộng (nếu có)".
 *
 * Tổ hợp từng mã lấy từ Thông báo tuyển sinh đại học chính quy 2026 (`actvn-notice-2026`): các môn trong
 * tổ hợp hệ số 1, "không có chênh lệch điểm xét tuyển giữa các tổ hợp". Riêng Kỹ thuật Điện tử - Viễn
 * thông chỉ xét điểm thi TN THPT (không dùng phương thức khác).
 */
export interface ActvnFieldThreshold {
  /** Mã xét tuyển chính thức của Học viện. */
  code: string;
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

const ACTVN_IT_COMBINATIONS = ['A00', 'A01', 'X26', 'X06', 'C01'] as const;

export const ACTVN_FIELD_THRESHOLDS_2026: readonly ActvnFieldThreshold[] = [
  { code: '7480202KA', name: 'An toàn thông tin (phía Bắc, Hà Nội)', threshold30: 25.8, combinationIds: ACTVN_IT_COMBINATIONS },
  { code: '7480201KA', name: 'Công nghệ thông tin (Hà Nội)', threshold30: 24.63, combinationIds: ACTVN_IT_COMBINATIONS },
  { code: '7520207KA', name: 'Kỹ thuật Điện tử - Viễn thông (Hà Nội)', threshold30: 23.96, combinationIds: ['A00', 'A01', 'X06', 'X07'] },
  { code: '7480202KP', name: 'An toàn thông tin (phía Nam, TP.HCM)', threshold30: 24.63, combinationIds: ACTVN_IT_COMBINATIONS },
];

export const ACTVN_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, ActvnFieldThreshold> = new Map(
  ACTVN_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
