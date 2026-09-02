/**
 * Trường Đại học Tài nguyên và Môi trường Hà Nội (HUNRE) 2025 — điểm chuẩn 22/22 ngành đại học
 * chính quy, nhánh xét điểm thi TN THPT, công bố 22/08/2025 (thông báo số 2468/TB-TĐHHN, theo
 * giaoduc.net.vn). LƯU Ý: trường có 1 cơ sở TP.HCM tên gần giống (HCMUNRE, mã ngành khác, KHÔNG
 * liên quan) — batch này CHỈ nghiên cứu cơ sở Hà Nội (catalog id `hunre`).
 *
 * Nguồn chính: Viettelstore.vn (`sources.ts:hunre-threshold-2025`, bảng đầy đủ theo ngành), cross-
 * check dải điểm với Giaoduc.net.vn (`hunre-threshold-secondary-2025`, dải 15-26,65 khớp tuyệt đối,
 * ngành cao nhất Marketing khớp). Cổng chính thức (hunre.edu.vn, chinhphu.vn) xác nhận có thông báo
 * nhưng bảng chỉ hiển thị dạng ảnh.
 *
 * Nguồn xác nhận nguyên văn: "Mức điểm chuẩn dưới đây đã bao gồm điểm ưu tiên (nếu có)" /
 * "Điểm chuẩn... là tổng điểm tổ hợp xét tuyển cộng điểm ưu tiên (nếu có)" — xác nhận TRỰC TIẾP
 * điểm chuẩn ĐÃ CỘNG điểm ưu tiên. Mức điểm ưu tiên cụ thể không được trường công bố — dùng khung
 * quốc gia hiện hành làm judgment call cho giá trị bảng.
 *
 * Mỗi ngành công bố NHIỀU tổ hợp nhưng nguồn 2025 thu thập được chỉ hiển thị 1 mức điểm CHUNG cho
 * cả ngành (không tách theo tổ hợp) — dữ liệu năm liền kề (2024/2026, trangedu.com/baodanang.vn)
 * xác nhận MỌI ngành đều CÓ tổ hợp D01 trong danh sách công bố, và tìm kiếm riêng xác nhận "ngưỡng
 * D01... dao động từ 15 đến 26,65" khớp CHÍNH XÁC dải điểm bảng 2025 — đủ cơ sở để modeled AN TOÀN
 * chỉ với tổ hợp D01 (không suy đoán các tổ hợp khác B03/C01/C02/C03/C04/X01/X02/X03/X04 riêng của
 * trường vì thành phần/áp dụng theo từng năm chưa xác minh cho đúng năm 2025).
 *
 * Mã ngành dùng mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT), xác nhận qua tuyensinh247 (đăng lại
 * danh mục ngành + mã ngành của trường).
 */
export interface HunreFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const HUNRE_FIELD_THRESHOLDS_2025 = [
  { code: '7340115', name: 'Marketing', threshold30: 26.65, combinationIds: ['D01'] },
  { code: '7510605', name: 'Logistics và Quản lý chuỗi cung ứng', threshold30: 26.5, combinationIds: ['D01'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 26.4, combinationIds: ['D01'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 26, combinationIds: ['D01'] },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 25.6, combinationIds: ['D01'] },
  { code: '7810201', name: 'Quản trị khách sạn', threshold30: 25.6, combinationIds: ['D01'] },
  { code: '7380101', name: 'Luật', threshold30: 25.5, combinationIds: ['D01'] },
  { code: '7340301', name: 'Kế toán', threshold30: 25.25, combinationIds: ['D01'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 24.35, combinationIds: ['D01'] },
  { code: '7340116', name: 'Bất động sản', threshold30: 23.85, combinationIds: ['D01'] },
  { code: '7850103', name: 'Quản lý đất đai', threshold30: 23.5, combinationIds: ['D01'] },
  { code: '7850101', name: 'Quản lý tài nguyên và môi trường', threshold30: 21.25, combinationIds: ['D01'] },
  { code: '7510406', name: 'Công nghệ kỹ thuật môi trường', threshold30: 15.5, combinationIds: ['D01'] },
  { code: '7440222', name: 'Khí tượng và khí hậu học', threshold30: 15, combinationIds: ['D01'] },
  { code: '7440224', name: 'Thủy văn học', threshold30: 15, combinationIds: ['D01'] },
  { code: '7440298', name: 'Biến đổi khí hậu và phát triển bền vững', threshold30: 15, combinationIds: ['D01'] },
  { code: '7520501', name: 'Kỹ thuật địa chất', threshold30: 15, combinationIds: ['D01'] },
  { code: '7520503', name: 'Kỹ thuật trắc địa – bản đồ', threshold30: 15, combinationIds: ['D01'] },
  { code: '7540106', name: 'Đảm bảo chất lượng và an toàn thực phẩm', threshold30: 15, combinationIds: ['D01'] },
  { code: '7850102', name: 'Kinh tế tài nguyên thiên nhiên', threshold30: 15, combinationIds: ['D01'] },
  { code: '7850198', name: 'Quản lý tài nguyên nước', threshold30: 15, combinationIds: ['D01'] },
  { code: '7850199', name: 'Quản lý biển', threshold30: 15, combinationIds: ['D01'] },
] as const satisfies readonly HunreFieldThreshold[];

export type HunreFieldCode = (typeof HUNRE_FIELD_THRESHOLDS_2025)[number]['code'];

export const HUNRE_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HunreFieldThreshold> = new Map(
  HUNRE_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
