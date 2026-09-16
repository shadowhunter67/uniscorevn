/**
 * DUT (Trường Đại học Bách khoa - Đại học Đà Nẵng, mã trường DDK) 2026 — điểm chuẩn trúng tuyển
 * 49/49 ngành/chuyên ngành, nhánh xét kết quả thi TN THPT 2026 (100% các dòng DUT trong bảng gốc ghi
 * "Xét điểm thi THPT", không phải phương thức kết hợp), đọc trực tiếp từ trang chính chủ hệ thống
 * Đại học Đà Nẵng (ts.udn.vn, `sources.ts:dut-cutoff-2026`) — bảng HTML text thật (không cần vision),
 * gộp điểm chuẩn của TẤT CẢ cơ sở đào tạo thành viên ĐHĐN trong 1 trang.
 *
 * DUT KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng ngành trong bảng này (chỉ có mã ngành + tên
 * + điểm) — module chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn, cùng cách xử lý DHV/HPU2, xem
 * `knowledgeGaps.ts`.
 */
export interface DutFieldThreshold {
  code: string;
  /** Tên ngành/chuyên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  threshold30: number;
}

export const DUT_FIELD_THRESHOLDS_2026: readonly DutFieldThreshold[] = [
  { code: '7420201', name: 'Công nghệ sinh học', threshold30: 21.25 },
  { code: '7420201A', name: 'Công nghệ sinh học, chuyên ngành Công nghệ sinh học Y Dược', threshold30: 22.0 },
  { code: '7480106', name: 'Kỹ thuật máy tính', threshold30: 24.87 },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 23.0 },
  { code: '7480201A', name: 'Công nghệ thông tin (ngoại ngữ Nhật)', threshold30: 22.0 },
  { code: '7480201B', name: 'Công nghệ thông tin, chuyên ngành Khoa học dữ liệu và Trí tuệ nhân tạo', threshold30: 26.38 },
  { code: '7480201C', name: 'Công nghệ thông tin, chuyên ngành An toàn thông tin trên không gian số', threshold30: 24.63 },
  { code: '7480201TN', name: 'Chương trình đào tạo kỹ sư tài năng Công nghệ thông tin (định hướng Khoa học dữ liệu và Trí tuệ nhân tạo)', threshold30: 27.0 },
  { code: '7510105', name: 'Công nghệ kỹ thuật vật liệu xây dựng', threshold30: 20.0 },
  { code: '7510202', name: 'Công nghệ chế tạo máy', threshold30: 23.1 },
  { code: '7510601', name: 'Quản lý công nghiệp', threshold30: 21.5 },
  { code: '7510701', name: 'Công nghệ dầu khí và khai thác dầu', threshold30: 22.0 },
  { code: '7520103A', name: 'Kỹ thuật Cơ khí, chuyên ngành Cơ khí động lực', threshold30: 23.96 },
  { code: '7520103B', name: 'Kỹ thuật Cơ khí, chuyên ngành Cơ khí hàng không', threshold30: 23.5 },
  { code: '7520103C', name: 'Kỹ thuật Cơ khí, chuyên ngành Kỹ thuật phương tiện đường sắt tốc độ cao', threshold30: 21.25 },
  { code: '7520103E', name: 'Kỹ thuật Cơ khí, chuyên ngành Cơ khí hàng không (Hợp tác doanh nghiệp, dạy và học bằng tiếng Anh)', threshold30: 20.25 },
  { code: '7520114', name: 'Kỹ thuật Cơ điện tử', threshold30: 25.57 },
  { code: '7520114TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật cơ điện tử', threshold30: 25.8 },
  { code: '7520115', name: 'Kỹ thuật nhiệt', threshold30: 23.23 },
  { code: '7520115A', name: 'Kỹ thuật nhiệt, chuyên ngành Quản lý Năng lượng', threshold30: 22.35 },
  { code: '7520118', name: 'Kỹ thuật hệ thống công nghiệp', threshold30: 21.75 },
  { code: '7520122', name: 'Kỹ thuật Tàu thủy', threshold30: 19.75 },
  { code: '7520130', name: 'Kỹ thuật ô tô', threshold30: 23.96 },
  { code: '7520130TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật ô tô', threshold30: 24.44 },
  { code: 'PFIEV', name: 'Chương trình đào tạo kỹ sư chất lượng cao Việt - Pháp (PFIEV)', threshold30: 20.5 },
  { code: '7520201', name: 'Kỹ thuật Điện', threshold30: 24.24 },
  { code: '7520201TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật điện', threshold30: 25.17 },
  { code: '7520207', name: 'Kỹ thuật điện tử - viễn thông', threshold30: 24.68 },
  { code: '7520207A', name: 'Kỹ thuật Điện tử - Viễn thông, chuyên ngành Vi điện tử - Thiết kế vi mạch', threshold30: 26.62 },
  { code: '7520207TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật điện tử - viễn thông', threshold30: 26.03 },
  { code: '7520207VM', name: 'Chương trình tiên tiến Việt-Mỹ ngành Điện tử viễn thông', threshold30: 23.0 },
  { code: '7520215', name: 'Chương trình tiên tiến Việt - Mỹ chuyên ngành Hệ thống nhúng và IoT thuộc ngành Kỹ thuật điện, điện tử', threshold30: 23.5 },
  { code: '7520216', name: 'Kỹ thuật Điều khiển và Tự động hóa', threshold30: 26.4 },
  { code: '7520216TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật điều khiển và tự động hóa', threshold30: 27.1 },
  { code: '7520301', name: 'Kỹ thuật hóa học', threshold30: 24.4 },
  { code: '7520320', name: 'Kỹ thuật môi trường', threshold30: 18.25 },
  { code: '7540101', name: 'Công nghệ thực phẩm', threshold30: 20.85 },
  { code: '7580101', name: 'Kiến trúc', threshold30: 19.85 },
  { code: '7580201', name: 'Kỹ thuật xây dựng, chuyên ngành Xây dựng dân dụng và công nghiệp', threshold30: 20.35 },
  { code: '7580201A', name: 'Kỹ thuật xây dựng, chuyên ngành Tin học xây dựng', threshold30: 20.0 },
  { code: '7580201B', name: 'Kỹ thuật xây dựng, chuyên ngành Kỹ thuật và quản lý xây dựng đô thị thông minh', threshold30: 21.1 },
  { code: '7580201C', name: 'Kỹ thuật xây dựng, chuyên ngành Mô hình thông tin và trí tuệ nhân tạo trong xây dựng', threshold30: 22.25 },
  { code: '7580201TN', name: 'Chương trình đào tạo kỹ sư tài năng Kỹ thuật xây dựng', threshold30: 23.72 },
  { code: '7580202', name: 'Kỹ thuật xây dựng công trình thủy', threshold30: 18.35 },
  { code: '7580205', name: 'Kỹ thuật xây dựng công trình giao thông', threshold30: 18.85 },
  { code: '7580205A', name: 'Kỹ thuật xây dựng công trình giao thông, chuyên ngành Xây dựng đường sắt tốc độ cao và đường sắt đô thị', threshold30: 19.5 },
  { code: '7580210', name: 'Kỹ thuật cơ sở hạ tầng', threshold30: 19.5 },
  { code: '7580301', name: 'Kinh tế xây dựng', threshold30: 20.6 },
  { code: '7850101', name: 'Quản lý tài nguyên và môi trường', threshold30: 18.5 },
] as const;

export type DutFieldCode = (typeof DUT_FIELD_THRESHOLDS_2026)[number]['code'];

export const DUT_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DutFieldThreshold> = new Map(
  DUT_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
