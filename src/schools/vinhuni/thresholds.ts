/**
 * Ngưỡng đảm bảo chất lượng đầu vào theo từng mã ngành — Phương thức 100 (xét kết quả thi TN
 * THPT), Trường Đại học Vinh 2026. Nguồn: Phụ lục 1 "Ngưỡng bảo đảm chất lượng đầu vào và quy
 * tắc quy đổi tương đương" (PDF `nguongdbcl2026.pdf` kèm `vinhuni-quality-threshold-conversion-2026`),
 * đọc trực tiếp toàn văn (thang 30). Các ngành đào tạo giáo viên đã bao gồm ngưỡng khối GV của Bộ
 * (Thông tư 06/2026).
 *
 * NGOÀI phạm vi nhánh exact (không đưa vào bảng): Giáo dục Mầm non (7140201) và Giáo dục Thể chất
 * (7140206) — chỉ có Phương thức 405 (kết hợp năng khiếu); Kiến trúc (7580101) — yêu cầu môn Năng
 * khiếu ≥ 6; Sư phạm Tiếng Anh (7140231, 7140231TN) — điều kiện Tiếng Anh ≥ 6,5/7,0; Ngôn ngữ
 * Trung Quốc (7220204) — điều kiện "Tiếng Trung hoặc Tiếng Anh ≥ 6".
 */
export interface VinhuniProgramThreshold {
  programId: string;
  programName: string;
  thptMin30: number;
  /** Điều kiện phụ theo từng môn (thang 10, hệ số 1) — nếu có. */
  condition?: { subject: 'literature' | 'english'; min: number };
}

export const VINHUNI_PROGRAM_THRESHOLDS_2026: readonly VinhuniProgramThreshold[] = [
  // Nhóm đào tạo giáo viên
  { programId: '7140202', programName: 'Giáo dục Tiểu học', thptMin30: 22 },
  { programId: '7140205', programName: 'Giáo dục Chính trị', thptMin30: 21 },
  { programId: '7140209', programName: 'Sư phạm Toán học', thptMin30: 22 },
  { programId: '7140209TN', programName: 'Sư phạm Toán học (Chương trình tài năng)', thptMin30: 23 },
  { programId: '7140210', programName: 'Sư phạm Tin học', thptMin30: 21 },
  { programId: '7140211', programName: 'Sư phạm Vật lý', thptMin30: 21 },
  { programId: '7140212', programName: 'Sư phạm Hoá học', thptMin30: 21 },
  { programId: '7140213', programName: 'Sư phạm Sinh học', thptMin30: 21 },
  { programId: '7140217', programName: 'Sư phạm Ngữ văn', thptMin30: 21 },
  { programId: '7140218', programName: 'Sư phạm Lịch sử', thptMin30: 21 },
  { programId: '7140219', programName: 'Sư phạm Địa lý', thptMin30: 21 },
  { programId: '7140247', programName: 'Sư phạm Khoa học tự nhiên', thptMin30: 21 },
  { programId: '7140249', programName: 'Sư phạm Lịch sử - Địa lý', thptMin30: 21 },
  { programId: '7140208', programName: 'Giáo dục Quốc phòng - An ninh', thptMin30: 21 },
  // Nhóm ngoài giáo viên
  { programId: '7220201', programName: 'Ngôn ngữ Anh', thptMin30: 18, condition: { subject: 'english', min: 6 } },
  { programId: '7310601', programName: 'Quốc tế học', thptMin30: 17 },
  { programId: '7140114', programName: 'Quản lý giáo dục', thptMin30: 17 },
  { programId: '7310403', programName: 'Tâm lý học giáo dục', thptMin30: 18 },
  { programId: '7310101', programName: 'Kinh tế', thptMin30: 18 },
  { programId: '7310104', programName: 'Kinh tế đầu tư', thptMin30: 18 },
  { programId: '7310110', programName: 'Quản lý kinh tế', thptMin30: 18 },
  { programId: '7310109', programName: 'Kinh tế số', thptMin30: 18 },
  { programId: '7340101', programName: 'Quản trị kinh doanh', thptMin30: 18 },
  { programId: '7340101TA', programName: 'Quản trị kinh doanh (Chương trình tăng cường Tiếng Anh)', thptMin30: 19 },
  { programId: '7340115', programName: 'Marketing', thptMin30: 18 },
  { programId: '7340122', programName: 'Thương mại điện tử', thptMin30: 18 },
  { programId: '7340201', programName: 'Tài chính - Ngân hàng', thptMin30: 18 },
  { programId: '7340205', programName: 'Công nghệ tài chính', thptMin30: 17.5 },
  { programId: '7340301', programName: 'Kế toán', thptMin30: 18 },
  { programId: '7340302', programName: 'Kiểm toán', thptMin30: 18 },
  { programId: '7229042', programName: 'Quản lý văn hoá', thptMin30: 18 },
  { programId: '7310201', programName: 'Chính trị học', thptMin30: 18 },
  { programId: '7310205', programName: 'Quản lý nhà nước', thptMin30: 18 },
  { programId: '7310630', programName: 'Việt Nam học (Chuyên ngành Du lịch)', thptMin30: 18 },
  { programId: '7380101', programName: 'Luật', thptMin30: 20, condition: { subject: 'literature', min: 6 } },
  { programId: '7380102', programName: 'Luật hiến pháp và luật hành chính', thptMin30: 20, condition: { subject: 'literature', min: 6 } },
  { programId: '7380103', programName: 'Luật dân sự và tố tụng dân sự', thptMin30: 20, condition: { subject: 'literature', min: 6 } },
  { programId: '7380107', programName: 'Luật kinh tế', thptMin30: 20, condition: { subject: 'literature', min: 6 } },
  { programId: '7760101', programName: 'Công tác xã hội', thptMin30: 18 },
  { programId: '7480101', programName: 'Khoa học máy tính', thptMin30: 19 },
  { programId: '7480201', programName: 'Công nghệ thông tin', thptMin30: 19.5 },
  { programId: '7480201CN', programName: 'Công nghệ thông tin (Chuyên ngành Trí tuệ nhân tạo)', thptMin30: 19.5 },
  { programId: '7510205', programName: 'Công nghệ kỹ thuật ô tô', thptMin30: 19 },
  { programId: '7510206', programName: 'Công nghệ kỹ thuật nhiệt (Chuyên ngành Điện lạnh)', thptMin30: 18.5 },
  { programId: '7510301', programName: 'Công nghệ kỹ thuật điện, điện tử', thptMin30: 19 },
  { programId: '7510302', programName: 'Công nghệ kỹ thuật điện tử - viễn thông', thptMin30: 19 },
  { programId: '7510303', programName: 'Công nghệ kỹ thuật điều khiển và tự động hoá', thptMin30: 19.5 },
  { programId: '7520207', programName: 'Kỹ thuật điện tử - viễn thông', thptMin30: 19 },
  { programId: '7520216', programName: 'Kỹ thuật điều khiển và tự động hoá', thptMin30: 19.5 },
  { programId: '7580201', programName: 'Kỹ thuật xây dựng', thptMin30: 17 },
  { programId: '7580205', programName: 'Kỹ thuật xây dựng công trình giao thông', thptMin30: 17 },
  { programId: '7580301', programName: 'Kinh tế xây dựng', thptMin30: 17 },
  { programId: '7420201', programName: 'Công nghệ sinh học', thptMin30: 18 },
  { programId: '7540101', programName: 'Công nghệ thực phẩm', thptMin30: 17 },
  { programId: '7720301', programName: 'Điều dưỡng', thptMin30: 18 },
  { programId: '7620105', programName: 'Chăn nuôi', thptMin30: 15 },
  { programId: '7620109', programName: 'Nông học (Chuyên ngành Bảo vệ thực vật)', thptMin30: 15 },
  { programId: '7620110', programName: 'Khoa học cây trồng', thptMin30: 15 },
  { programId: '7620301', programName: 'Nuôi trồng thuỷ sản', thptMin30: 15 },
  { programId: '7640101', programName: 'Thú y', thptMin30: 15 },
  { programId: '7850101', programName: 'Quản lý tài nguyên và môi trường', thptMin30: 15 },
  { programId: '7850103', programName: 'Quản lý đất đai (Chuyên ngành Quản lý phát triển đô thị và bất động sản)', thptMin30: 15 },
];

export function getVinhuniProgramThreshold(programId?: string): VinhuniProgramThreshold | undefined {
  return VINHUNI_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
