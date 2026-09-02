/**
 * Trường Đại học Thủy lợi (TLU) 2025 — "Điểm chuẩn Trường Đại học Thủy lợi 2025" đăng lại nguyên
 * văn thông báo chính thức của trường trên Cổng TTĐT Chính phủ (`sources.ts:tlu-threshold-2025`,
 * công bố 25/08/2025 09:00). PT1 = Phương thức xét kết quả thi tốt nghiệp THPT 2025 (thang 30, tổng
 * thô 3 môn không nhân hệ số + điểm ưu tiên KV/ĐT — công thức chuẩn quốc gia cho phương thức xét
 * điểm thi THPT, KHÔNG có tuyên bố riêng của trường về việc điểm chuẩn PT1 đã gồm ưu tiên hay chưa,
 * dùng judgment call chuẩn quốc gia cùng tiền lệ `schools/tmu`/`schools/hdiu` — điểm chuẩn công bố
 * luôn là điểm xét tuyển ĐÃ CỘNG ưu tiên theo định nghĩa "điểm xét tuyển" tại Thông tư
 * 06/2025/TT-BGDĐT). Đây là ĐIỂM CHUẨN TRÚNG TUYỂN THỰC TẾ (không phải điểm sàn) — mạnh hơn nhiều
 * trường khác trong batch này (so sánh trực tiếp Điểm xét với điểm chuẩn dự đoán eligible/ineligible
 * chính xác hơn so với so với điểm sàn).
 *
 * Mô hình hoá 43/43 ngành đại học chính quy hệ tiêu chuẩn (không gồm phân hiệu TLS cơ sở 2) —
 * MỖI ngành chỉ dùng các tổ hợp có đủ môn trong `SubjectId` (nguồn tổ hợp: `sources.ts:tlu-scheme-
 * 2025`, tuyensinh247.com đăng lại đề án tuyển sinh) — loại trừ tổ hợp trường riêng dùng mã X02/X06/
 * X26/X10/X14/X09/X78/K00/A02/D04/D08/D45/D55/D63/C05/B01/B02/B03 (không có trong danh mục môn dùng
 * chung/không xác định chắc chắn thành phần môn).
 *
 * Tiêu chí phụ CHƯA mô hình hoá (xem `knowledgeGaps.ts`): (1) TTNV (thứ tự nguyện vọng) tối đa cho
 * từng ngành — thí sinh đạt điểm nhưng đặt NV ngoài giới hạn công bố có thể KHÔNG trúng tuyển dù đạt
 * điểm chuẩn; (2) Luật/Luật kinh tế có thêm điều kiện phụ "Ngữ văn ≥ 6 hoặc Toán+Ngữ văn ≥ 12".
 */
export interface TluFieldThreshold {
  code: string;
  /** Tên ngành theo đúng nguyên văn bảng điểm chuẩn (Cổng TTĐT Chính phủ). */
  name: string;
  /** Điểm chuẩn PT1 (xét điểm thi TN THPT 2025) — thang 30. */
  threshold30: number;
  /** Tổ hợp môn hợp lệ đã mô hình hoá (tập con của tổ hợp thật do trường công bố). */
  combinationIds: readonly string[];
}

export const TLU_FIELD_THRESHOLDS_2025 = [
  { code: 'TLA101', name: 'Xây dựng và quản lý công trình thủy', threshold30: 18.48, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA104', name: 'Kỹ thuật xây dựng dân dụng và công nghiệp', threshold30: 18.76, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA111', name: 'Công nghệ kỹ thuật xây dựng', threshold30: 19.48, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA113', name: 'Kỹ thuật xây dựng công trình giao thông', threshold30: 18.5, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA114', name: 'Quản lý xây dựng', threshold30: 19.96, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA102', name: 'Kỹ thuật tài nguyên nước', threshold30: 18.49, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA107', name: 'Kỹ thuật cấp thoát nước', threshold30: 18, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA110', name: 'Xây dựng và quản lý hạ tầng đô thị', threshold30: 19, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA103', name: 'Tài nguyên nước và môi trường', threshold30: 18, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA119', name: 'Công nghệ sinh học', threshold30: 18.76, combinationIds: ['A00', 'B00'] },
  { code: 'TLA109', name: 'Kỹ thuật môi trường', threshold30: 17.75, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA118', name: 'Kỹ thuật hóa học', threshold30: 20.5, combinationIds: ['A00', 'D07', 'C02', 'B00'] },
  { code: 'TLA106', name: 'Công nghệ thông tin', threshold30: 23.23, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA116', name: 'Hệ thống thông tin', threshold30: 21.75, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA117', name: 'Kỹ thuật phần mềm', threshold30: 21.55, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA126', name: 'Trí tuệ nhân tạo và khoa học dữ liệu', threshold30: 22.12, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA127', name: 'An ninh mạng', threshold30: 22.04, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA105', name: 'Kỹ thuật cơ khí', threshold30: 22.6, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA122', name: 'Công nghệ chế tạo máy', threshold30: 20.75, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA123', name: 'Kỹ thuật Ô tô', threshold30: 22.5, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA120', name: 'Kỹ thuật cơ điện tử', threshold30: 23.33, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA112', name: 'Kỹ thuật điện', threshold30: 22, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA121', name: 'Kỹ thuật điều khiển và tự động hóa', threshold30: 24.1, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA124', name: 'Kỹ thuật điện tử - viễn thông', threshold30: 22.5, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA128', name: 'Kỹ thuật Robot và Điều khiển thông minh', threshold30: 21.15, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01'] },
  { code: 'TLA401', name: 'Kinh tế', threshold30: 21.91, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA404', name: 'Kinh tế xây dựng', threshold30: 20.73, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA407', name: 'Logistics và quản lý chuỗi cung ứng', threshold30: 23, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA406', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 21.48, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA405', name: 'Thương mại điện tử', threshold30: 22.98, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA410', name: 'Kinh tế số', threshold30: 22.11, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA402', name: 'Quản trị kinh doanh', threshold30: 22.1, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA403', name: 'Kế toán', threshold30: 22.25, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA411', name: 'Kế toán tích hợp chứng chỉ quốc tế', threshold30: 18.09, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA408', name: 'Tài chính – Ngân hàng', threshold30: 22.26, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA412', name: 'Công nghệ tài chính', threshold30: 19.5, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA409', name: 'Kiểm toán', threshold30: 21.44, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
  { code: 'TLA301', name: 'Luật', threshold30: 25.17, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D14'] },
  { code: 'TLA302', name: 'Luật kinh tế', threshold30: 25.5, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D14'] },
  { code: 'TLA203', name: 'Ngôn ngữ Anh', threshold30: 22.59, combinationIds: ['A01', 'D01', 'D07', 'D09', 'D10', 'D14'] },
  { code: 'TLA204', name: 'Ngôn ngữ Trung Quốc', threshold30: 25.45, combinationIds: ['D01'] },
  { code: 'TLA201', name: 'Chương trình tiên tiến Kỹ thuật xây dựng', threshold30: 17, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
  { code: 'TLA202', name: 'Chương trình tiên tiến Kỹ thuật tài nguyên nước', threshold30: 17.35, combinationIds: ['A00', 'A01', 'D01', 'D07', 'C01', 'C02'] },
] as const satisfies readonly TluFieldThreshold[];

export type TluFieldCode = (typeof TLU_FIELD_THRESHOLDS_2025)[number]['code'];

export const TLU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TluFieldThreshold> = new Map(
  TLU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
