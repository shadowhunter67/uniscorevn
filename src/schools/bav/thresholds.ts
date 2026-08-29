/**
 * BAV 2026 (Học viện Ngân hàng) — "Thông tin tuyển sinh năm 2026" (Quyết định 2028/QĐ-HVNH ngày
 * 31/3/2026, `sources.ts:bav-admission-info-2026`, đọc qua curl + vision-read pdftotext bị hỏng
 * dấu tiếng Việt — đọc bằng vision) công bố bảng ĐẦY ĐỦ 45 mã xét tuyển (mã ngành, mã xét tuyển,
 * tên chương trình, 4 tổ hợp xét tuyển, môn chính mỗi tổ hợp). Kết hợp với "Thông báo về ngưỡng đảm
 * bảo chất lượng đầu vào..." (Số 3508/TB-HVNH ngày 07/7/2026, `sources.ts:bav-threshold-2026`, đọc
 * bằng vision — file scan):
 * - Các mã xét tuyển thuộc chương trình đào tạo CHUẨN và CHẤT LƯỢNG CAO (HVNH tự cấp bằng): ngưỡng
 *   21,50/30.
 * - Các mã xét tuyển thuộc chương trình LIÊN KẾT ĐÀO TẠO QUỐC TẾ (cấp song bằng với đối tác nước
 *   ngoài — ĐH Sunderland/West of England (UWE)/CityU/Genoa): ngưỡng 19,00/30.
 * - Riêng lĩnh vực Pháp luật (LAW01/LAW03/LAW04 — Luật kinh tế, Luật): ngưỡng "sẽ căn cứ theo ngưỡng
 *   bảo đảm chất lượng đầu vào do Bộ GD&ĐT công bố trong thời gian tới" — CHƯA có số cụ thể tại thời
 *   điểm research, KHÔNG đưa vào bảng này (xem `knowledgeGaps.ts`).
 *
 * Ngưỡng so với ĐIỂM XÉT (đã quy đổi: tổng 3 môn theo tổ hợp, môn chính (Toán) nhân đôi, quy đổi về
 * thang 30 — tức nhân 0,75 trên tổng thang 40), theo đúng câu chữ mục 1 của thông báo ngưỡng: "được
 * tính trên tổng điểm thi 3 môn thi tốt nghiệp THPT 2026 theo tổ hợp tối ưu nhất tương ứng với từng
 * mã xét tuyển, trong đó nhân đôi điểm đối với môn chính và quy đổi về thang 30". Bảng mã ngành xác
 * nhận môn chính = Toán cho toàn bộ 42 mã ở đây (Văn chỉ dùng cho 3 mã Luật bị loại trừ).
 */
export interface BavProgramThreshold {
  /** Mã xét tuyển (vd 'BANK01'). */
  code: string;
  /** Mã ngành (7 chữ số). */
  majorCode: string;
  /** Tên ngành + tên chương trình đào tạo. */
  name: string;
  /** 4 tổ hợp xét tuyển hợp lệ — mọi tổ hợp trong bảng đều có Toán là môn chính (nhân đôi). */
  combinationIds: readonly string[];
  /** Ngưỡng đảm bảo chất lượng đầu vào — thang 30, ĐÃ áp dụng nhân đôi môn chính + quy đổi thang 30. */
  threshold30: number;
  /** true nếu là chương trình liên kết đào tạo quốc tế cấp song bằng (ngưỡng 19,00 thay vì 21,50). */
  jointDegree?: boolean;
}

const STANDARD_THRESHOLD_30 = 21.5;
const JOINT_DEGREE_THRESHOLD_30 = 19.0;

export const BAV_PROGRAM_THRESHOLDS: readonly BavProgramThreshold[] = [
  { code: 'ACT01', majorCode: '7340301', name: 'Kế toán — Chất lượng cao Kế toán', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ACT02', majorCode: '7340301', name: 'Kế toán', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ACT03', majorCode: '7340301', name: 'Kế toán (Liên kết ĐH Sunderland, Anh — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'ACT04', majorCode: '7340302', name: 'Kiểm toán', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ACT05', majorCode: '7340302', name: 'Kiểm toán — Chất lượng cao Kiểm toán', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ACT06', majorCode: '7340301', name: 'Kế toán (Định hướng Nhật Bản — HVNH cấp bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK01', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Chất lượng cao Ngân hàng', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK02', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Ngân hàng', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK03', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Ngân hàng số', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK04', majorCode: '7340201', name: 'Tài chính - Ngân hàng (Liên kết ĐH Sunderland, Anh — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'BANK06', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Chất lượng cao Ngân hàng và Tài chính quốc tế', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK07', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Chất lượng cao Ngân hàng trung ương và chính sách công', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BANK08', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Ngân hàng Tài chính (ĐH West of England, Anh — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'BUS01', majorCode: '7340101', name: 'Quản trị kinh doanh — Chất lượng cao Quản trị kinh doanh', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS02', majorCode: '7340101', name: 'Quản trị kinh doanh', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS03', majorCode: '7340101', name: 'Quản trị kinh doanh — Quản trị du lịch', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS04', majorCode: '7340101', name: 'Quản trị kinh doanh (Liên kết ĐH CityU, Hoa Kỳ — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'BUS06', majorCode: '7340115', name: 'Marketing — Chất lượng cao Marketing số', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS07', majorCode: '7340115', name: 'Marketing', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS08', majorCode: '7340404', name: 'Quản trị nhân lực — Chất lượng cao Quản trị nhân lực', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS09', majorCode: '7340101', name: 'Quản trị kinh doanh — Chất lượng cao Kinh doanh số', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'BUS10', majorCode: '7340101', name: 'Quản trị kinh doanh, Hàng hải & Logistics (ĐH Genoa, Ý — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'BUS11', majorCode: '7340115', name: 'Marketing (ĐH West of England, Anh — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'DS01', majorCode: '7460108', name: 'Khoa học dữ liệu — Khoa học dữ liệu trong kinh tế và kinh doanh', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ECON01', majorCode: '7310101', name: 'Kinh tế — Kinh tế đầu tư', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ECON02', majorCode: '7310101', name: 'Kinh tế — Chất lượng cao Kinh tế đầu tư', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'ECON03', majorCode: '7310106', name: 'Kinh tế quốc tế', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FIN01', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Chất lượng cao Tài chính', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FIN02', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Tài chính', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FIN04', majorCode: '7340201', name: 'Tài chính - Ngân hàng — Chất lượng cao Hoạch định và tư vấn tài chính', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FIN05', majorCode: '7340205', name: 'Công nghệ tài chính', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FL01', majorCode: '7220201', name: 'Ngôn ngữ Anh — Ngôn ngữ Anh Tài chính - Ngân hàng', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'FL02', majorCode: '7220201', name: 'Ngôn ngữ Anh — Chất lượng cao Ngôn ngữ Anh Tài chính - Ngân hàng', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB01', majorCode: '7340120', name: 'Kinh doanh quốc tế', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB02', majorCode: '7340120', name: 'Kinh doanh quốc tế — Logistics và quản lý chuỗi cung ứng', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB04', majorCode: '7340120', name: 'Kinh doanh quốc tế — Chất lượng cao Kinh doanh quốc tế', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB05', majorCode: '7340122', name: 'Thương mại điện tử — Chất lượng cao Thương mại điện tử', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB06', majorCode: '7340120', name: 'Kinh doanh quốc tế — Chất lượng cao Logistics và Quản lý chuỗi cung ứng', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'IB07', majorCode: '7340120', name: 'Kinh doanh quốc tế — Quản trị kinh doanh quốc tế (ĐH West of England, Anh — cấp song bằng)', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: JOINT_DEGREE_THRESHOLD_30, jointDegree: true },
  { code: 'IT01', majorCode: '7480201', name: 'Công nghệ thông tin', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'MIS01', majorCode: '7340405', name: 'Hệ thống thông tin quản lý', combinationIds: ['A00', 'A01', 'D01', 'D07'], threshold30: STANDARD_THRESHOLD_30 },
  { code: 'MIS02', majorCode: '7340405', name: 'Hệ thống thông tin quản lý — Chất lượng cao Hệ thống thông tin quản lý', combinationIds: ['A01', 'D01', 'D07', 'D09'], threshold30: STANDARD_THRESHOLD_30 },
];

export const BAV_THRESHOLD_BY_CODE: ReadonlyMap<string, BavProgramThreshold> = new Map(
  BAV_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);
