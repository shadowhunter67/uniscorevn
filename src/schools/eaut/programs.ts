export interface EautProgram {
  code: string;
  name: string;
  /** Tổ hợp xét tuyển công bố cho ngành (ảnh "Các ngành đào tạo - Mã trường DDA"). `undefined` = ngoài phạm vi. */
  combinations?: readonly string[];
  outOfScopeReason?: string;
}

const ENGINEERING = ['A00', 'A01', 'A02', 'A03', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'C01', 'C02', 'C03', 'C14', 'D01', 'D07'] as const;
const BUSINESS = ['A00', 'A01', 'A03', 'A05', 'A06', 'A07', 'A08', 'A09', 'A10', 'A11', 'C01', 'C02', 'C03', 'C04', 'C14', 'D01', 'D07', 'D10'] as const;
const LANGUAGE_TOURISM = ['C00', 'C01', 'C02', 'C03', 'C04', 'C14', 'C19', 'C20', 'D01', 'D14', 'D15', 'D04', 'D06', 'D78', 'D83', 'D66'] as const;
const HEALTH_REASON = 'Khối ngành Sức khỏe áp dụng ngưỡng đảm bảo chất lượng đầu vào do Bộ GDĐT công bố (không phải ngưỡng 18/15 của EAUT), chưa có trong nguồn.';

// Cùng mã ngành có nhiều chuyên ngành (CNTT: AI ứng dụng, Thiết kế đồ họa số; Chế tạo máy: Cơ điện tử...) dùng chung tổ hợp.
export const EAUT_PROGRAMS_2026: readonly EautProgram[] = [
  // Khối ngành Kỹ thuật (Công nghệ Thực phẩm có thêm B00, D08; Kiến trúc/Thiết kế đồ họa số có thêm khối H, V năng khiếu — chưa mô hình hoá)
  { code: '7480201', name: 'Công nghệ thông tin (Trí tuệ nhân tạo ứng dụng, Thiết kế đồ họa số)', combinations: ENGINEERING },
  { code: '7510202', name: 'Công nghệ Chế tạo máy (Cơ điện tử)', combinations: ENGINEERING },
  { code: '7510205', name: 'Công nghệ Kỹ thuật Ô tô', combinations: ENGINEERING },
  { code: '7510301', name: 'Công nghệ Kỹ thuật Điện - Điện tử (Công nghệ Bán dẫn)', combinations: ENGINEERING },
  { code: '7510303', name: 'Công nghệ Kỹ thuật Điều khiển và Tự động hóa', combinations: ENGINEERING },
  { code: '7510206', name: 'Công nghệ kỹ thuật Nhiệt (Điện lạnh và Điều hòa không khí)', combinations: ENGINEERING },
  { code: '7510406', name: 'Công nghệ Kỹ thuật Môi trường (Công nghệ nước)', combinations: ENGINEERING },
  { code: '7580201', name: 'Kỹ thuật Xây dựng', combinations: ENGINEERING },
  { code: '7580101', name: 'Kiến trúc (Kiến trúc nội thất)', combinations: ENGINEERING },
  { code: '7540101', name: 'Công nghệ Thực phẩm', combinations: [...ENGINEERING, 'B00', 'D08'] },
  // Khối ngành Kinh tế - Xã hội
  { code: '7340101', name: 'Quản trị Kinh doanh (Quản trị kinh doanh Thời trang)', combinations: BUSINESS },
  { code: '7340404', name: 'Quản trị Nhân lực', combinations: BUSINESS },
  { code: '7340115', name: 'Marketing', combinations: BUSINESS },
  { code: '7510605', name: 'Logistics và Quản lý Chuỗi cung ứng', combinations: BUSINESS },
  { code: '7340201', name: 'Tài chính Ngân hàng', combinations: BUSINESS },
  { code: '7340205', name: 'Công nghệ Tài chính', combinations: BUSINESS },
  { code: '7340301', name: 'Kế toán (Kế toán định hướng ACCA)', combinations: BUSINESS },
  { code: '7380101', name: 'Luật', combinations: BUSINESS },
  { code: '7220201', name: 'Ngôn ngữ Anh', combinations: LANGUAGE_TOURISM },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', combinations: LANGUAGE_TOURISM },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', combinations: LANGUAGE_TOURISM },
  { code: '7220209', name: 'Ngôn ngữ Nhật', combinations: LANGUAGE_TOURISM },
  { code: '7810201', name: 'Quản trị Khách sạn', combinations: LANGUAGE_TOURISM },
  { code: '7810103', name: 'Quản trị Dịch vụ Du lịch và Lữ hành', combinations: LANGUAGE_TOURISM },
  // Khối ngành Sức khỏe
  { code: '7720201', name: 'Dược học', outOfScopeReason: HEALTH_REASON },
  { code: '7720301', name: 'Điều dưỡng', outOfScopeReason: HEALTH_REASON },
];

export function getEautProgram(code: string | undefined): EautProgram | undefined {
  return EAUT_PROGRAMS_2026.find((program) => program.code === code);
}
