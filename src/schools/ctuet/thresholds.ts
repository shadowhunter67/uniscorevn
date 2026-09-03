/**
 * CTUET (Trường Đại học Kỹ thuật - Công nghệ Cần Thơ, mã trường KCC) 2025 — điểm trúng tuyển đại
 * học chính quy, phương thức xét kết quả thi TN THPT 2025 (cột "KQ thi TN THPT", thang 30). Nguồn:
 * `sources.ts:ctuet-threshold-2025` (Thông báo 79/TB-ĐHKTCN, 22/8/2025). Tổ hợp xét tuyển từng
 * ngành lấy từ `sources.ts:ctuet-thongtin-2025` (mục 4.2 Chỉ tiêu tuyển sinh, Thông tin tuyển sinh
 * 2025). Ngành "Công nghệ sinh học" còn 1 tổ hợp X16 (Toán, Sinh học, CN nông nghiệp) KHÔNG liệt kê
 * ở đây vì "CN nông nghiệp" không có `SubjectId` tương ứng (xem `knowledgeGaps.ts`).
 */
export interface CtuetFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30, cột "KQ thi TN THPT" — đã gồm điểm ưu tiên khu vực/đối tượng
   * theo Điều 2.7/2.9 Quy chế tuyển sinh CTUET, `sources.ts:ctuet-quyche-2025`). */
  threshold30: number;
  /** Danh sách tổ hợp xét tuyển công bố cho ngành này (`sources.ts:ctuet-thongtin-2025` mục 4.2). */
  combinationIds: readonly string[];
}

const GROUP_TECH_1 = ['A00', 'A01', 'C01', 'D01', 'X01', 'X05', 'X06', 'X25'] as const;
const GROUP_TECH_2 = ['A00', 'A01', 'C01', 'C02', 'D01', 'X01', 'X05', 'X06'] as const;
const GROUP_BUSINESS = ['A00', 'A01', 'C01', 'D01', 'X01', 'X02', 'X05', 'X25'] as const;

export const CTUET_FIELD_THRESHOLDS_2025: readonly CtuetFieldThreshold[] = [
  { code: '7480101', name: 'Khoa học máy tính', threshold30: 22.54, combinationIds: GROUP_TECH_1 },
  { code: '7460108', name: 'Khoa học dữ liệu', threshold30: 21.24, combinationIds: GROUP_TECH_1 },
  { code: '7480104', name: 'Hệ thống thông tin', threshold30: 21.92, combinationIds: GROUP_TECH_1 },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 24.23, combinationIds: GROUP_TECH_1 },
  { code: '7480103', name: 'Kỹ thuật phần mềm', threshold30: 22.94, combinationIds: GROUP_TECH_1 },
  { code: '7520118', name: 'Kỹ thuật hệ thống công nghiệp', threshold30: 20.98, combinationIds: GROUP_TECH_2 },
  { code: '7510605', name: 'Logistics và quản lý chuỗi cung ứng', threshold30: 23.89, combinationIds: GROUP_TECH_2 },
  { code: '7510601', name: 'Quản lý công nghiệp', threshold30: 22.22, combinationIds: GROUP_BUSINESS },
  { code: '7580302', name: 'Quản lý xây dựng', threshold30: 20.95, combinationIds: GROUP_TECH_2 },
  { code: '7510102', name: 'Công nghệ kỹ thuật công trình xây dựng', threshold30: 20.15, combinationIds: ['A00', 'A01', 'C01', 'C02', 'D01', 'D07', 'X05', 'X06'] },
  { code: '7510403', name: 'Công nghệ kỹ thuật năng lượng', threshold30: 21.24, combinationIds: ['A00', 'A01', 'C01', 'C05', 'X05', 'X06', 'X07', 'X59'] },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', threshold30: 23.37, combinationIds: ['A00', 'A01', 'C01', 'C05', 'X05', 'X06', 'X07', 'X59'] },
  { code: '7510203', name: 'Công nghệ kỹ thuật cơ - điện tử', threshold30: 23.37, combinationIds: ['A00', 'A01', 'A02', 'A03', 'A04', 'C01', 'X05', 'X06'] },
  { code: '7510303', name: 'Công nghệ kỹ thuật điều khiển và tự động hoá', threshold30: 23.13, combinationIds: ['A00', 'A01', 'A02', 'A03', 'A04', 'C01', 'X05', 'X06'] },
  { code: '7510401', name: 'Công nghệ kỹ thuật hóa học', threshold30: 23.04, combinationIds: ['A00', 'B00', 'C02', 'C05', 'C08', 'D07', 'D12', 'X10'] },
  { code: '7540101', name: 'Công nghệ thực phẩm', threshold30: 23.26, combinationIds: ['A00', 'B00', 'B03', 'B08', 'C02', 'C08', 'D07', 'X10'] },
  { code: '7420201', name: 'Công nghệ sinh học', threshold30: 22.55, combinationIds: ['B00', 'B03', 'B08', 'C08', 'X13', 'D13', 'X14'] },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 23.43, combinationIds: GROUP_BUSINESS },
  { code: '7340301', name: 'Kế toán', threshold30: 23.29, combinationIds: GROUP_BUSINESS },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 23.04, combinationIds: GROUP_BUSINESS },
  { code: '7380101', name: 'Luật', threshold30: 24.68, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D14', 'D15', 'X70', 'X74'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 23.74, combinationIds: ['D01', 'D09', 'D10', 'D11', 'D14', 'D15', 'X25', 'X78'] },
] as const;

export type CtuetFieldCode = (typeof CTUET_FIELD_THRESHOLDS_2025)[number]['code'];

export const CTUET_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, CtuetFieldThreshold> = new Map(
  CTUET_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
