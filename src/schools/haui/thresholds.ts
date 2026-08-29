/**
 * HAUI 2026 (Trường Đại học Công nghiệp Hà Nội) — "Ngưỡng đảm bảo chất lượng đầu vào và Quy tắc
 * quy đổi điểm xét tuyển, điểm trúng tuyển của các phương thức xét tuyển đại học chính quy năm
 * 2026" (`sources.ts:haui-threshold-2026`, đọc TRỰC TIẾP qua curl 2026-08-29, HTTP 200). Mục
 * "I.1. Ngưỡng đảm bảo chất lượng đầu vào phương thức 3 - Xét tuyển dựa trên kết quả thi tốt
 * nghiệp THPT năm 2026" công bố bảng ĐẦY ĐỦ 72 mã xét tuyển (mã ngành/chương trình đào tạo, tổ hợp
 * xét tuyển, mức điểm điều kiện đăng ký xét tuyển) — nhập đủ nguyên văn dưới đây.
 *
 * Ngưỡng là "mức điểm điều kiện ĐĂNG KÝ xét tuyển" (tổng thô 3 môn theo tổ hợp, thang 30, không
 * nhân hệ số) — nguồn KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng ở mục này (khác mục phương thức
 * 2/4/5, nơi công thức có "+ Điểm ưu tiên" tường minh) => áp judgment call chuẩn quốc gia cho điểm
 * ưu tiên khi hiển thị "Điểm xét tuyển" (xem `priority.ts`), nhưng NGƯỠNG so với tổng thô (không
 * cộng ưu tiên) — cùng tiền lệ CTU/UTC/UTM/PTIT/HUB/TGU/UTT.
 *
 * Mã 74801081 (Vi mạch bán dẫn) có ghi chú "dự kiến* ≥ 18,00" trong nguồn — mức điểm CHÍNH THỨC và
 * điều kiện bổ sung (nếu có) sẽ công bố sau khi có hướng dẫn Bộ GD&ĐT (`knowledgeGaps.ts`).
 */
export interface HauiProgramThreshold {
  /** Mã xét tuyển (mã ngành/chương trình đào tạo). */
  code: string;
  name: string;
  /** Tổ hợp xét tuyển hợp lệ cho ngành (tham khảo — nhánh exact KHÔNG validate tổ hợp có thuộc
   * danh sách này hay không, xem knowledge gap). Một số mã dùng ký hiệu tổ hợp riêng của HAUI
   * (X05/X06/X07/X25) — nguồn không công bố thành phần môn của các tổ hợp này trong thông báo này. */
  combinationIds: readonly string[];
  /** Mức điểm điều kiện đăng ký xét tuyển — tổng thô 3 môn, thang 30, KHÔNG gồm điểm ưu tiên. */
  threshold30: number;
  /** true cho mã 74801081 (Vi mạch bán dẫn) — mức điểm ghi "dự kiến*", chưa chính thức. */
  provisional?: boolean;
}

export const HAUI_PROGRAM_THRESHOLDS: readonly HauiProgramThreshold[] = [
  { code: '7210404', name: 'Thiết kế thời trang', combinationIds: ['C01', 'C03', 'C04', 'D01'], threshold30: 17 },
  { code: '7220201', name: 'Ngôn ngữ Anh', combinationIds: ['D01'], threshold30: 18 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', combinationIds: ['D01', 'D04'], threshold30: 18 },
  { code: '7220204LK', name: 'Ngôn ngữ Trung Quốc (Chương trình liên kết đào tạo 2+2 với ĐH Khoa học kỹ thuật Quảng Tây - Trung Quốc)', combinationIds: ['D01', 'D04'], threshold30: 18 },
  { code: '7220209', name: 'Ngôn ngữ Nhật', combinationIds: ['D01', 'D06'], threshold30: 18 },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', combinationIds: ['D01', 'DD2'], threshold30: 18 },
  { code: '7229020', name: 'Ngôn ngữ học', combinationIds: ['D01', 'D14'], threshold30: 18 },
  { code: '7310612', name: 'Trung Quốc học', combinationIds: ['D01', 'D04'], threshold30: 18 },
  { code: '7310104', name: 'Kinh tế đầu tư', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7340101', name: 'Quản trị kinh doanh', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7340101TA', name: 'Quản trị kinh doanh (CTĐT bằng Tiếng Anh)', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '73401012', name: 'Phân tích dữ liệu kinh doanh', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340115', name: 'Marketing', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7340115TA', name: 'Marketing (CTĐT bằng Tiếng Anh)', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340201', name: 'Tài chính - Ngân hàng', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7340201TA', name: 'Tài chính - Ngân hàng (CTĐT bằng Tiếng Anh)', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340301', name: 'Kế toán', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340301TA', name: 'Kế toán (CTĐT bằng Tiếng Anh)', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340302', name: 'Kiểm toán', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7340404', name: 'Quản trị nhân lực', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7340406', name: 'Quản trị văn phòng', combinationIds: ['A01', 'D01', 'X25'], threshold30: 17 },
  { code: '7420201', name: 'Công nghệ sinh học', combinationIds: ['A02', 'B00', 'B03', 'D08'], threshold30: 17 },
  { code: '7480101', name: 'Khoa học máy tính', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7480101TA', name: 'Khoa học máy tính (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '74801012', name: 'Trí tuệ nhân tạo', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '7480102', name: 'Mạng máy tính và truyền thông dữ liệu', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7480103', name: 'Kỹ thuật phần mềm', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7480104', name: 'Hệ thống thông tin', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7480108', name: 'Công nghệ kỹ thuật máy tính', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '74801081', name: 'Vi mạch bán dẫn', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18, provisional: true },
  { code: '7480201', name: 'Công nghệ thông tin', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '7480201TA', name: 'Công nghệ thông tin (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '74802012', name: 'Công nghệ đa phương tiện', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7480202', name: 'An toàn thông tin', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510201', name: 'Công nghệ kỹ thuật cơ khí', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '7510201TA', name: 'Công nghệ kỹ thuật cơ khí (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '75102012', name: 'Công nghệ kỹ thuật khuôn mẫu', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '75102013', name: 'Thiết kế cơ khí và kiểu dáng công nghiệp', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510203', name: 'Công nghệ kỹ thuật cơ điện tử', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '7510203TA', name: 'Công nghệ kỹ thuật cơ điện tử (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '75102032', name: 'Robot và trí tuệ nhân tạo', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '75102033', name: 'Công nghệ kỹ thuật cơ điện tử ô tô', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510205TA', name: 'Công nghệ kỹ thuật ô tô (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '7510206', name: 'Công nghệ kỹ thuật nhiệt', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '7510301TA', name: 'Công nghệ kỹ thuật điện, điện tử (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '75190071', name: 'Năng lượng tái tạo', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510302', name: 'Công nghệ kỹ thuật điện tử - viễn thông', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510302TA', name: 'Công nghệ kỹ thuật điện tử - viễn thông (CTĐT bằng Tiếng Anh)', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '75103021', name: 'Công nghệ kỹ thuật điện tử y sinh', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510303', name: 'Công nghệ kỹ thuật điều khiển và tự động hóa', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 20 },
  { code: '75103031', name: 'Kỹ thuật sản xuất thông minh', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7510401', name: 'Công nghệ kỹ thuật hoá học', combinationIds: ['A00', 'B00', 'C02', 'D07'], threshold30: 18 },
  { code: '7510402', name: 'Công nghệ vật liệu', combinationIds: ['A00', 'B00', 'C02', 'D07'], threshold30: 17 },
  { code: '7510406', name: 'Công nghệ kỹ thuật môi trường', combinationIds: ['A00', 'B00', 'C02', 'D07'], threshold30: 17 },
  { code: '7510605', name: 'Logistics và quản lý chuỗi cung ứng', combinationIds: ['A01', 'D01', 'X25'], threshold30: 18 },
  { code: '7520116', name: 'Kỹ thuật cơ khí động lực', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '75201162', name: 'Kỹ thuật ô tô và năng lượng mới', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 17 },
  { code: '7520118', name: 'Kỹ thuật hệ thống công nghiệp', combinationIds: ['A00', 'A01', 'X06', 'X07'], threshold30: 18 },
  { code: '7540101', name: 'Công nghệ thực phẩm', combinationIds: ['A00', 'B00', 'C02', 'D07'], threshold30: 18 },
  { code: '7540203', name: 'Công nghệ vật liệu dệt, may', combinationIds: ['A00', 'A01', 'A02', 'X05'], threshold30: 17 },
  { code: '7540204', name: 'Công nghệ dệt, may', combinationIds: ['A00', 'A01', 'A02', 'X05'], threshold30: 17 },
  { code: '7720203', name: 'Hóa dược', combinationIds: ['A00', 'B00', 'C02', 'D07'], threshold30: 18 },
  { code: '7810101', name: 'Du lịch', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810101TA', name: 'Du lịch (CTĐT bằng Tiếng Anh)', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810103TA', name: 'Quản trị dịch vụ du lịch và lữ hành (CTĐT bằng Tiếng Anh)', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810201', name: 'Quản trị khách sạn', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810201TA', name: 'Quản trị khách sạn (CTĐT bằng Tiếng Anh)', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810202', name: 'Quản trị nhà hàng và dịch vụ ăn uống', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
  { code: '7810202TA', name: 'Quản trị nhà hàng và dịch vụ ăn uống (CTĐT bằng Tiếng Anh)', combinationIds: ['D01', 'D14', 'D15'], threshold30: 17 },
];

export const HAUI_THRESHOLD_BY_CODE: ReadonlyMap<string, HauiProgramThreshold> = new Map(
  HAUI_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);
