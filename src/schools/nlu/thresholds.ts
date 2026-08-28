/**
 * NLU 2026 (Trường Đại học Nông Lâm TP.HCM) — ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) theo
 * mã xét tuyển, phương thức THPT (xét điểm thi TN THPT). Nguồn: `sources.ts:nlu-threshold-2026`
 * — bảng ảnh trên ts.hcmuaf.edu.vn, đọc bằng vision (không phải OCR PDF) 2026-08-28.
 *
 * "Áp dụng cho thí sinh thuộc khu vực 3, không hưởng ưu tiên theo đối tượng" — ngưỡng so với TỔNG
 * THÔ (KV3). 53/56 mã xét tuyển có cột THPT; Giáo dục Mầm non (CĐ/ĐH) và Sư phạm Kỹ thuật nông
 * nghiệp áp ngưỡng riêng của Bộ GD&ĐT (TT 06/2026) — ngoài phạm vi.
 */
export interface NluProgramThreshold {
  code: string;
  programId: string;
  name: string;
  /** Ngưỡng ĐKXT phương thức THPT (KV3, tổng thô), thang 30. */
  threshold30: number;
}

export const NLU_PROGRAM_THRESHOLDS: readonly NluProgramThreshold[] = [
  { code: '7220201', programId: 'ngon-ngu-anh', name: 'Ngôn ngữ Anh', threshold30: 18 },
  { code: '7220201N', programId: 'ngon-ngu-anh-ninh-thuan', name: 'Ngôn ngữ Anh (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7310101', programId: 'kinh-te', name: 'Kinh tế', threshold30: 16 },
  { code: '7310101C', programId: 'kinh-te-nang-cao', name: 'Kinh tế (Chương trình nâng cao, chuyên ngành Kinh tế Nông nghiệp)', threshold30: 16 },
  { code: '7340101', programId: 'quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', threshold30: 16 },
  { code: '7340101N', programId: 'quan-tri-kinh-doanh-ninh-thuan', name: 'Quản trị kinh doanh (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7340101C', programId: 'quan-tri-kinh-doanh-nang-cao', name: 'Quản trị kinh doanh (Chương trình nâng cao)', threshold30: 16 },
  { code: '7340116', programId: 'bat-dong-san', name: 'Bất động sản', threshold30: 16 },
  { code: '7340301', programId: 'ke-toan', name: 'Kế toán', threshold30: 16 },
  { code: '7340301N', programId: 'ke-toan-ninh-thuan', name: 'Kế toán (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7420201', programId: 'cong-nghe-sinh-hoc', name: 'Công nghệ sinh học', threshold30: 16 },
  { code: '7420201C', programId: 'cong-nghe-sinh-hoc-nang-cao', name: 'Công nghệ sinh học (Chương trình nâng cao)', threshold30: 16 },
  { code: '7440301', programId: 'khoa-hoc-moi-truong', name: 'Khoa học môi trường', threshold30: 16 },
  { code: '7480104', programId: 'he-thong-thong-tin', name: 'Hệ thống thông tin', threshold30: 16 },
  { code: '7480201', programId: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin', threshold30: 18 },
  { code: '7480201N', programId: 'cong-nghe-thong-tin-ninh-thuan', name: 'Công nghệ thông tin (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7480201C', programId: 'cong-nghe-thong-tin-nang-cao', name: 'Công nghệ thông tin (Chương trình nâng cao)', threshold30: 18 },
  { code: '7510201', programId: 'cnkt-co-khi', name: 'Công nghệ kỹ thuật cơ khí', threshold30: 16 },
  { code: '7510203', programId: 'cnkt-co-dien-tu', name: 'Công nghệ kỹ thuật cơ điện tử', threshold30: 16 },
  { code: '7510205', programId: 'cnkt-o-to', name: 'Công nghệ kỹ thuật ô tô', threshold30: 16 },
  { code: '7510206', programId: 'cnkt-nhiet', name: 'Công nghệ kỹ thuật nhiệt', threshold30: 16 },
  { code: '7510201C', programId: 'cnkt-co-khi-nang-cao', name: 'Công nghệ kỹ thuật cơ khí (Chương trình nâng cao)', threshold30: 16 },
  { code: '7510401', programId: 'cnkt-hoa-hoc', name: 'Công nghệ kỹ thuật hoá học', threshold30: 18 },
  { code: '7510401C', programId: 'cnkt-hoa-hoc-nang-cao', name: 'Công nghệ kỹ thuật hóa học (Chương trình nâng cao)', threshold30: 18 },
  { code: '7519007', programId: 'cnkt-nang-luong-tai-tao', name: 'Công nghệ kỹ thuật năng lượng tái tạo', threshold30: 16 },
  { code: '7519007N', programId: 'cnkt-nang-luong-tai-tao-ninh-thuan', name: 'Công nghệ kỹ thuật năng lượng tái tạo (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7520216', programId: 'ky-thuat-dieu-khien-tu-dong-hoa', name: 'Kỹ thuật điều khiển và tự động hoá', threshold30: 16 },
  { code: '7520320', programId: 'ky-thuat-moi-truong', name: 'Kỹ thuật môi trường', threshold30: 16 },
  { code: '7540101', programId: 'cong-nghe-thuc-pham', name: 'Công nghệ thực phẩm', threshold30: 18 },
  { code: '7540101T', programId: 'cong-nghe-thuc-pham-tien-tien', name: 'Công nghệ thực phẩm (Chương trình tiên tiến)', threshold30: 18 },
  { code: '7540101C', programId: 'cong-nghe-thuc-pham-nang-cao', name: 'Công nghệ thực phẩm (Chương trình nâng cao)', threshold30: 18 },
  { code: '7540105', programId: 'cong-nghe-che-bien-thuy-san', name: 'Công nghệ chế biến thuỷ sản', threshold30: 16 },
  { code: '7540106', programId: 'dam-bao-chat-luong-attp', name: 'Đảm bảo chất lượng và An toàn thực phẩm', threshold30: 18 },
  { code: '7549001', programId: 'cong-nghe-che-bien-lam-san', name: 'Công nghệ chế biến lâm sản', threshold30: 16 },
  { code: '7620105', programId: 'chan-nuoi', name: 'Chăn nuôi', threshold30: 16 },
  { code: '7620105C', programId: 'chan-nuoi-nang-cao', name: 'Chăn nuôi (Chương trình nâng cao)', threshold30: 16 },
  { code: '7620109', programId: 'nong-hoc', name: 'Nông học', threshold30: 16 },
  { code: '7620112', programId: 'bao-ve-thuc-vat', name: 'Bảo vệ thực vật', threshold30: 16 },
  { code: '7620114', programId: 'kinh-doanh-nong-nghiep', name: 'Kinh doanh nông nghiệp', threshold30: 16 },
  { code: '7620116', programId: 'phat-trien-nong-thon', name: 'Phát triển nông thôn', threshold30: 16 },
  { code: '7620201', programId: 'lam-hoc', name: 'Lâm học', threshold30: 16 },
  { code: '7620202', programId: 'lam-nghiep-do-thi', name: 'Lâm nghiệp đô thị', threshold30: 16 },
  { code: '7620211', programId: 'quan-ly-tai-nguyen-rung', name: 'Quản lý tài nguyên rừng', threshold30: 16 },
  { code: '7620301', programId: 'nuoi-trong-thuy-san', name: 'Nuôi trồng thuỷ sản', threshold30: 16 },
  { code: '7640101', programId: 'thu-y', name: 'Thú y', threshold30: 18 },
  { code: '7640101N', programId: 'thu-y-ninh-thuan', name: 'Thú y (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7640101T', programId: 'thu-y-tien-tien', name: 'Thú y (Chương trình tiên tiến)', threshold30: 18 },
  { code: '7850101', programId: 'quan-ly-tai-nguyen-moi-truong', name: 'Quản lý tài nguyên và môi trường', threshold30: 16 },
  { code: '7850103', programId: 'quan-ly-dat-dai', name: 'Quản lý đất đai', threshold30: 16 },
  { code: '7850103C', programId: 'quan-ly-dat-dai-nang-cao', name: 'Quản lý đất đai (Chương trình nâng cao)', threshold30: 16 },
  { code: '7859002', programId: 'tai-nguyen-du-lich-sinh-thai', name: 'Tài nguyên và Du lịch sinh thái', threshold30: 16 },
  { code: '7859002N', programId: 'tai-nguyen-du-lich-sinh-thai-ninh-thuan', name: 'Tài nguyên và Du lịch sinh thái (Phân hiệu Ninh Thuận)', threshold30: 16 },
  { code: '7859007', programId: 'canh-quan-ky-thuat-hoa-vien', name: 'Cảnh quan và Kỹ thuật hoa viên', threshold30: 16 },
];

export const NLU_THRESHOLD_BY_CODE: ReadonlyMap<string, NluProgramThreshold> = new Map(
  NLU_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);
