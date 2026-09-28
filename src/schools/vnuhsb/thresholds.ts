/**
 * VNU-HSB (Trường Quản trị và Kinh doanh - Đại học Quốc gia Hà Nội, mã trường QHD) 2026 — điểm
 * chuẩn trúng tuyển 6/7 chương trình đại học chính quy, nhánh Phương thức 100 (xét kết quả thi TN
 * THPT 2026), thang 30. Nguồn điểm chuẩn: thông báo tổng hợp CHÍNH THỨC của ĐHQGHN
 * (`sources.ts:vnuhsb-cutoff-vnu-2026`), mục 11 "Trường Quản trị và Kinh doanh", ghi rõ "Điểm trúng
 * tuyển đã bao gồm điểm ưu tiên theo đối tượng và khu vực". Tổ hợp xét tuyển lấy từ thông báo chi
 * tiết của chính HSB (`vnuhsb-notice-2026`) — xác nhận CẢ 6 chương trình dùng CHUNG 1 bộ tổ hợp, "Sử
 * dụng tất cả các tổ hợp (A01, D01, D07, D08, D09, D10, X25, X26, X27, X28)", "Chênh lệch điểm xét
 * tuyển: Không quy định" (không có combo nào bị trừ điểm riêng).
 *
 * Mã xét tuyển (code) dùng mã chính thức của HSB (MET/MAC/HAT/MAS/BNS/HAS) — KHÔNG dùng mã ngành
 * đào tạo quốc gia vì 3 chương trình dùng chung mã 7340401 và 3 chương trình dùng chung mã 7340101,
 * sẽ trùng key nếu dùng mã ngành.
 *
 * Chương trình thứ 7 (BBNS — Kinh doanh, chuyên ngành kép Marketing và Phân tích kinh doanh) có
 * thông báo tuyển sinh RIÊNG (link riêng trên trang HSB) không nằm trong bảng điểm chuẩn tổng hợp
 * của ĐHQGHN đã thu thập — KHÔNG mô hình hoá vì chưa có điểm chuẩn xác nhận.
 *
 * Tổ hợp X27 (Toán, Công nghệ công nghiệp, Tiếng Anh) và X28 (Toán, Công nghệ nông nghiệp, Tiếng
 * Anh) không có SubjectId tương ứng trong hệ thống UniscoreVN — loại khỏi combinationIds, còn lại
 * 8/10 tổ hợp (A01/D01/D07/D08/D09/D10/X25/X26) áp dụng cho cả 6 chương trình.
 */
export interface VnuhsbFieldThreshold {
  /** Mã xét tuyển chính thức của HSB. */
  code: string;
  /** Tên chương trình đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

const VNUHSB_COMBINATION_IDS = ['A01', 'D01', 'D07', 'D08', 'D09', 'D10', 'X25', 'X26'] as const;

export const VNUHSB_FIELD_THRESHOLDS_2026: readonly VnuhsbFieldThreshold[] = [
  { code: 'MET', name: 'Quản trị doanh nghiệp và công nghệ', threshold30: 19.5, combinationIds: VNUHSB_COMBINATION_IDS },
  { code: 'MAC', name: 'Marketing và truyền thông', threshold30: 20.75, combinationIds: VNUHSB_COMBINATION_IDS },
  { code: 'HAT', name: 'Quản trị nhân lực và nhân tài', threshold30: 19, combinationIds: VNUHSB_COMBINATION_IDS },
  { code: 'MAS', name: 'Quản trị và An ninh', threshold30: 19, combinationIds: VNUHSB_COMBINATION_IDS },
  { code: 'BNS', name: 'Quản trị An ninh phi truyền thống', threshold30: 19, combinationIds: VNUHSB_COMBINATION_IDS },
  { code: 'HAS', name: 'Quản trị dịch vụ khách hàng và Chăm sóc sức khỏe', threshold30: 19, combinationIds: VNUHSB_COMBINATION_IDS },
];

export const VNUHSB_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuhsbFieldThreshold> = new Map(
  VNUHSB_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
