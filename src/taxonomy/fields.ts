/**
 * Danh sách lĩnh vực đào tạo cấp cao — CỐ ĐỊNH, dùng chung cho toàn UniScoreVN (không để mỗi
 * trường tự đặt category riêng). 1 ngành có thể map vào nhiều field (vd "Khoa học dữ liệu" →
 * cntt-may-tinh + ai-du-lieu). Xem `majorOfferings.ts` cho việc map ngành thật vào field.
 */
export interface Field {
  id: string;
  name: string;
  shortName: string;
  /** Từ khóa/biến thể tên dùng để nhận diện ngành thuộc field này — xem `fieldMappingRules.ts`. */
  aliases: readonly string[];
}

export const FIELDS: readonly Field[] = [
  { id: 'cntt-may-tinh', name: 'Công nghệ thông tin & Máy tính', shortName: 'CNTT & Máy tính', aliases: ['công nghệ thông tin', 'khoa học máy tính', 'kỹ thuật phần mềm', 'hệ thống thông tin', 'mạng máy tính', 'an toàn thông tin', 'kỹ thuật máy tính'] },
  { id: 'ai-du-lieu', name: 'Trí tuệ nhân tạo & Khoa học dữ liệu', shortName: 'AI & Dữ liệu', aliases: ['trí tuệ nhân tạo', 'khoa học dữ liệu', 'data science', 'thống kê', 'phân tích dữ liệu'] },
  { id: 'dien-tu-vien-thong', name: 'Điện – Điện tử – Viễn thông', shortName: 'Điện – Điện tử', aliases: ['kỹ thuật điện', 'điện tử', 'viễn thông', 'điện tử viễn thông', 'vi mạch', 'bán dẫn'] },
  { id: 'co-khi-tu-dong-hoa', name: 'Cơ khí – Chế tạo – Tự động hóa', shortName: 'Cơ khí – Chế tạo', aliases: ['cơ khí', 'kỹ thuật ô tô', 'tự động hóa', 'cơ điện tử', 'chế tạo máy', 'hàng không', 'tàu thủy', 'điều khiển', 'vật liệu', 'sản xuất thông minh'] },
  { id: 'xay-dung-kien-truc', name: 'Xây dựng – Kiến trúc', shortName: 'Xây dựng – Kiến trúc', aliases: ['xây dựng', 'kiến trúc', 'quy hoạch', 'kỹ thuật công trình', 'đô thị'] },
  { id: 'kinh-te-quan-tri', name: 'Kinh tế & Quản trị kinh doanh', shortName: 'Kinh tế & Kinh doanh', aliases: ['kinh tế', 'quản trị kinh doanh', 'quản trị', 'marketing', 'kinh doanh quốc tế', 'thương mại điện tử', 'logistics', 'kinh doanh', 'bất động sản', 'quản lý công', 'quan hệ lao động'] },
  { id: 'tai-chinh-ke-toan', name: 'Tài chính – Ngân hàng – Kế toán', shortName: 'Tài chính & Ngân hàng', aliases: ['tài chính', 'ngân hàng', 'kế toán', 'kiểm toán', 'bảo hiểm', 'thuế', 'chứng khoán'] },
  { id: 'luat', name: 'Luật', shortName: 'Luật', aliases: ['luật', 'luật kinh tế', 'luật quốc tế'] },
  { id: 'y-duoc-suc-khoe', name: 'Y – Dược – Sức khỏe', shortName: 'Y – Dược – Sức khỏe', aliases: ['y khoa', 'y đa khoa', 'dược', 'điều dưỡng', 'răng hàm mặt', 'y tế công cộng', 'kỹ thuật xét nghiệm', 'y học cổ truyền'] },
  { id: 'su-pham-giao-duc', name: 'Sư phạm & Giáo dục', shortName: 'Sư phạm & Giáo dục', aliases: ['sư phạm', 'giáo dục'] },
  { id: 'ngon-ngu-quoc-te', name: 'Ngoại ngữ & Quốc tế học', shortName: 'Ngoại ngữ', aliases: ['ngôn ngữ anh', 'ngôn ngữ', 'quốc tế học', 'đông phương học', 'tiếng anh', 'nhật bản học', 'hàn quốc học', 'việt nam học', 'quan hệ quốc tế'] },
  { id: 'truyen-thong-bao-chi', name: 'Truyền thông & Báo chí', shortName: 'Truyền thông & Báo chí', aliases: ['báo chí', 'truyền thông', 'quan hệ công chúng', 'quảng cáo'] },
  { id: 'du-lich-dich-vu', name: 'Du lịch & Dịch vụ', shortName: 'Du lịch & Dịch vụ', aliases: ['du lịch', 'khách sạn', 'nhà hàng', 'lữ hành'] },
  { id: 'nong-lam-thuy-san', name: 'Nông – Lâm – Thủy sản', shortName: 'Nông – Lâm – Thủy sản', aliases: ['nông nghiệp', 'lâm nghiệp', 'thủy sản', 'chăn nuôi', 'thú y', 'thực phẩm', 'thu hoạch', 'thực vật', 'nông thôn'] },
  { id: 'khoa-hoc-tu-nhien', name: 'Khoa học tự nhiên', shortName: 'Khoa học tự nhiên', aliases: ['toán học', 'vật lý', 'hóa học', 'sinh học', 'môi trường', 'địa chất', 'hải dương học', 'toán ứng dụng', 'toán tin', 'hạt nhân', 'địa lý'] },
  { id: 'khoa-hoc-xa-hoi', name: 'Khoa học xã hội & Nhân văn', shortName: 'Khoa học xã hội', aliases: ['xã hội học', 'tâm lý học', 'lịch sử', 'triết học', 'văn học', 'nhân học', 'công tác xã hội', 'hán nôm', 'tôn giáo', 'chính trị học'] },
  { id: 'nghe-thuat-thiet-ke', name: 'Nghệ thuật & Thiết kế', shortName: 'Nghệ thuật & Thiết kế', aliases: ['thiết kế đồ họa', 'mỹ thuật', 'thiết kế thời trang', 'thiết kế nội thất', 'nghệ thuật'] },
] as const;

export type FieldId = (typeof FIELDS)[number]['id'];

export const FIELD_BY_ID: ReadonlyMap<FieldId, Field> = new Map(FIELDS.map((field) => [field.id, field]));

export function getField(fieldId: FieldId): Field | undefined {
  return FIELD_BY_ID.get(fieldId);
}
