/**
 * VNKGU (Trường Đại học Kiên Giang) 2026 — điểm trúng tuyển thật theo MÃ XÉT TUYỂN, Phương thức 2
 * (thi TN THPT, mã 100), đủ 28/28 mã xét tuyển đại học chính quy. Điểm chuẩn từ Thông báo Số
 * 04/TB-HĐTS (`sources.ts:vnkgu-cutoff-2026`, PDF ký tên + đóng dấu), tổ hợp môn từ "Chỉ tiêu tuyển
 * sinh theo từng phương thức và tổ hợp môn xét tuyển" (`sources.ts:vnkgu-combination-2026`), đối
 * chiếu khớp với Đề án tuyển sinh 2026 chính thức. "GDCD" trong chú giải gốc dùng chung SubjectId
 * `civic-economic-law` (cùng 3 môn thành phần với "GDKTPL" các trường khác dùng).
 */
export interface VnkguFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const VNKGU_FIELD_THRESHOLDS_2026: readonly VnkguFieldThreshold[] = [
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 28.55, combinationIds: ['A00', 'A01', 'A02', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'D07'] },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 26.7, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01'] },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 26.1, combinationIds: ['D01', 'D11', 'D12', 'D13', 'D14', 'D15', 'D66', 'X78'] },
  { code: '7140201', name: 'Giáo dục Mầm non', threshold30: 21.55, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01'] },
  { code: '7380101', name: 'Luật', threshold30: 20, combinationIds: ['C00', 'C04', 'C14', 'X01', 'C19', 'X70', 'D01', 'D14', 'D15', 'D66', 'X78'] },
  { code: '7220101', name: 'Tiếng Việt và Văn hóa Việt Nam', threshold30: 18, combinationIds: ['B03', 'C00', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D14', 'D15'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 16, combinationIds: ['D01', 'D11', 'D12', 'D13', 'D14', 'D15', 'D66', 'X78'] },
  { code: '7810101', name: 'Du lịch', threshold30: 16, combinationIds: ['B03', 'C00', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D14', 'D15'] },
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D07'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D07'] },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D07'] },
  { code: '7340120', name: 'Kinh doanh quốc tế', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D07'] },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01', 'D07'] },
  { code: '7420201', name: 'Công nghệ sinh học', threshold30: 15, combinationIds: ['A02', 'B00', 'B02', 'B03', 'B04', 'B08', 'X13', 'C08', 'D01'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'D84', 'X06', 'X25'] },
  { code: '7510103', name: 'Công nghệ kỹ thuật xây dựng', threshold30: 15, combinationIds: ['A00', 'A01', 'A03', 'A04', 'A10', 'X05', 'C01', 'C04', 'D01', 'X06'] },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', threshold30: 15, combinationIds: ['A00', 'A01', 'A03', 'A04', 'A10', 'X05', 'C01', 'C04', 'D01', 'X06'] },
  { code: '7510406', name: 'Công nghệ kỹ thuật môi trường', threshold30: 15, combinationIds: ['A00', 'A01', 'A02', 'A06', 'A09', 'X21', 'B00', 'C02', 'C04', 'C14', 'X01', 'D01', 'D07', 'D10'] },
  { code: '7520216', name: 'Kỹ thuật điều khiển và tự động hóa', threshold30: 15, combinationIds: ['A00', 'A01', 'A03', 'A04', 'A10', 'X05', 'C01', 'X06'] },
  { code: '7540101', name: 'Công nghệ thực phẩm', threshold30: 15, combinationIds: ['A00', 'A05', 'A06', 'A11', 'X09', 'B00', 'C02', 'D01', 'D07'] },
  { code: '7620110', name: 'Khoa học cây trồng', threshold30: 15, combinationIds: ['A02', 'B00', 'B02', 'B03', 'B04', 'B08', 'X13', 'C04', 'C08', 'D01'] },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01'] },
  { code: '7850101', name: 'Quản lý tài nguyên và môi trường', threshold30: 15, combinationIds: ['A00', 'A01', 'A02', 'A06', 'A09', 'X21', 'B00', 'C02', 'C04', 'C14', 'X01', 'D01', 'D07', 'D10'] },
  { code: '7620301', name: 'Nuôi trồng thủy sản', threshold30: 15, combinationIds: ['A02', 'B00', 'B02', 'B03', 'B04', 'B08', 'X13', 'C04', 'C08', 'D01'] },
  { code: '7620105', name: 'Chăn nuôi', threshold30: 15, combinationIds: ['A02', 'B00', 'B02', 'B03', 'B04', 'B08', 'X13', 'C08', 'D01'] },
  { code: '7480107', name: 'Trí tuệ nhân tạo', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'D84', 'X06', 'X25'] },
  { code: '7640101', name: 'Thú y', threshold30: 15, combinationIds: ['A02', 'B00', 'B02', 'B03', 'B04', 'B08', 'X13', 'C08', 'D01'] },
  { code: '7810202', name: 'Quản trị nhà hàng và Dịch vụ ăn uống', threshold30: 15, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'X01', 'D01'] },
] as const;

export type VnkguFieldCode = (typeof VNKGU_FIELD_THRESHOLDS_2026)[number]['code'];

export const VNKGU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnkguFieldThreshold> = new Map(
  VNKGU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
