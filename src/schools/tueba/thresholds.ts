/**
 * TUEBA (Trường Đại học Kinh tế và Quản trị kinh doanh - Đại học Thái Nguyên) 2026 — ngưỡng đảm
 * bảo chất lượng đầu vào (điểm sàn) hệ đại học chính quy, phương thức xét kết quả thi TN THPT 2026.
 * Nguồn: `sources.ts:tueba-threshold-2026` (tuyensinh.tueba.edu.vn, thông báo 08/07/2026). Mức điểm
 * sàn công bố THEO NGÀNH (3 mức: 17.0 / 17.5 / 20.0), áp dụng chung cho mọi tổ hợp xét tuyển của
 * ngành đó — giống PCTU (không tách theo tổ hợp như HUC/QBU).
 */
export interface TuebaFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  /** Điểm sàn 2026 (thang 30, đã gồm điểm ưu tiên khu vực/đối tượng) — áp dụng chung mọi tổ hợp. */
  threshold30: number;
}

export const TUEBA_FIELD_THRESHOLDS_2026: readonly TuebaFieldThreshold[] = [
  { code: '7460108', name: 'Khoa học dữ liệu', threshold30: 17.5 },
  { code: '7340205', name: 'Công nghệ tài chính', threshold30: 17.5 },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 17.5 },
  { code: '7310109', name: 'Kinh tế số', threshold30: 17.5 },
  { code: '7340301', name: 'Kế toán', threshold30: 17.5 },
  { code: '7340101A', name: 'Kinh doanh số', threshold30: 17.5 },
  { code: '7340101B', name: 'Quản trị kinh doanh', threshold30: 17.5 },
  { code: '7340404', name: 'Quản trị nhân lực', threshold30: 17.5 },
  { code: '7340115A', name: 'Digital Marketing', threshold30: 17.5 },
  { code: '7340115B', name: 'Quản trị Marketing', threshold30: 17.5 },
  { code: '7510605', name: 'Logistics và Quản lý chuỗi cung ứng', threshold30: 17.5 },
  { code: '7340120', name: 'Kinh doanh quốc tế', threshold30: 17.5 },
  { code: '7340403', name: 'Quản lý công', threshold30: 17.5 },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 17.5 },
  { code: '7810103A', name: 'Quản trị giải trí và Sự kiện', threshold30: 17.5 },
  { code: '7810103B', name: 'Quản trị kinh doanh khách sạn và Du lịch', threshold30: 17.5 },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 20 },
  { code: '7310101', name: 'Kinh tế', threshold30: 17.5 },
  { code: '7310104', name: 'Kinh tế đầu tư', threshold30: 17 },
  { code: '7310105', name: 'Kinh tế phát triển', threshold30: 17 },
  { code: '7310110', name: 'Quản lý kinh tế', threshold30: 17 },
  { code: '7340101TA', name: 'Quản trị kinh doanh khách sạn và Du lịch (dạy và học bằng Tiếng Anh)', threshold30: 17.5 },
  { code: '7340115TA', name: 'Quản trị Marketing (Tiếng Anh)', threshold30: 17.5 },
  { code: '7340201TA', name: 'Tài chính (Tiếng Anh)', threshold30: 17.5 },
  { code: '7810103TA', name: 'Quản trị du lịch và Khách sạn (Tiếng Anh)', threshold30: 17.5 },
  { code: '7510605TQ', name: 'Logistics Quốc tế (tiếng Trung Quốc)', threshold30: 17.5 },
  { code: '7340122TQ', name: 'Thương mại điện tử xuyên biên giới (tiếng Trung Quốc)', threshold30: 17.5 },
  { code: '7340301HG', name: 'Kế toán (Phân hiệu Hà Giang)', threshold30: 17.5 },
  { code: '7310110HG', name: 'Quản lý kinh tế (Phân hiệu Hà Giang)', threshold30: 17 },
] as const;

export type TuebaFieldCode = (typeof TUEBA_FIELD_THRESHOLDS_2026)[number]['code'];

export const TUEBA_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TuebaFieldThreshold> = new Map(
  TUEBA_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
