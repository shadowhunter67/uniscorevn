/**
 * HTU (Trường Đại học Hà Tĩnh, mã trường HHT) 2025 — điểm trúng tuyển đại học chính quy đợt 1,
 * phương thức 1 (xét kết quả thi TN THPT 2025). Nguồn `sources.ts:htu-threshold-2025` (Thông báo
 * 72/TB-HĐTSCQ, 22/8/2025) công bố cột "Thi TN THPT (gốc)" — MỘT mức áp dụng chung cho mọi tổ hợp
 * của 17/18 ngành; riêng ngành Giáo dục Tiểu học (7140202) có mức khác nhau theo tổ hợp. `code`
 * dùng MÃ XÉT TUYỂN (khoá trường tự công bố, phân biệt cả các chuyên ngành cùng mã ngành 7 chữ số
 * như Quản trị kinh doanh/Quản trị thương mại điện tử/Quản trị logistics). Danh sách tổ hợp theo
 * `sources.ts:htu-dean-2025` mục 5.d (bảng tổ hợp xét tuyển theo từng mã xét tuyển, Phương thức 1).
 */
export interface HtuFieldThreshold {
  code: string;
  /** Tên ngành/chương trình đúng nguyên văn bảng điểm trúng tuyển + đề án tuyển sinh. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30) áp dụng cho mọi tổ hợp của ngành, TRỪ khi có trong
   * `combinationThresholdOverrides`. Nguồn `sources.ts:htu-threshold-2025`. */
  defaultThreshold30: number;
  /** Tổ hợp xét tuyển công bố chính thức cho ngành này (phương thức 1), nguồn `sources.ts:htu-dean-2025`. */
  combinationIds: readonly string[];
  /** Override điểm trúng tuyển riêng theo tổ hợp — CHỈ ngành Giáo dục Tiểu học có (các ngành khác
   * công bố một mức chung, xem `defaultThreshold30`). */
  combinationThresholdOverrides?: Readonly<Record<string, number>>;
}

const GDTH_COMBOS = ['B03', 'C04', 'C14', 'D01', 'X01'] as const;
const KINHDOANH_COMBOS = ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'D01', 'X01', 'X02'] as const;
const LUAT_COMBOS = ['C01', 'C02', 'C03', 'C04', 'C14', 'D01', 'X01'] as const;
const ANTOANMT_COMBOS = ['A00', 'B03', 'C01', 'C02', 'C04', 'C14', 'D01', 'D07', 'X01'] as const;
const CNTT_COMBOS = ['A00', 'A01', 'A02', 'C01', 'C02', 'X02', 'X06', 'X10', 'X14', 'X26'] as const;
const XAYDUNG_COMBOS = ['A00', 'A01', 'A02', 'A09', 'B03', 'C01', 'C02', 'C04', 'C14', 'D01', 'X01', 'X02', 'X06', 'X21'] as const;
const NONGNGHIEP_COMBOS = ['A00', 'B00', 'B03', 'C01', 'C02', 'C04', 'C14', 'D01', 'D07', 'X01'] as const;
const KINHTENN_COMBOS = ['A00', 'B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'D01', 'X01', 'X02'] as const;
const NGANNGUANH_COMBOS = ['D01', 'D10', 'D14', 'D15', 'D66', 'X78'] as const;
const NGANNGUTQ_COMBOS = ['C00', 'C03', 'C04', 'C14', 'D01', 'D10', 'D14', 'D15', 'X01'] as const;
const CHINHTRI_COMBOS = ['A00', 'C00', 'C03', 'C04', 'C14', 'D01', 'X01'] as const;
const DULICH_COMBOS = ['B03', 'C01', 'C02', 'C03', 'C04', 'C14', 'D01', 'X01', 'X02'] as const;

export const HTU_FIELD_THRESHOLDS_2025: readonly HtuFieldThreshold[] = [
  {
    code: '7140202',
    name: 'Giáo dục Tiểu học',
    defaultThreshold30: 26.35,
    combinationIds: GDTH_COMBOS,
    combinationThresholdOverrides: { D01: 25.85 },
  },
  { code: '7340101_01', name: 'Quản trị kinh doanh', defaultThreshold30: 15, combinationIds: KINHDOANH_COMBOS },
  { code: '7340101_02', name: 'Quản trị thương mại điện tử (Quản trị kinh doanh)', defaultThreshold30: 15, combinationIds: KINHDOANH_COMBOS },
  { code: '7340101_03', name: 'Quản trị logistics (Quản trị kinh doanh)', defaultThreshold30: 15, combinationIds: KINHDOANH_COMBOS },
  { code: '7340201', name: 'Tài chính - Ngân hàng', defaultThreshold30: 15, combinationIds: KINHDOANH_COMBOS },
  { code: '7340301', name: 'Kế toán', defaultThreshold30: 15, combinationIds: KINHDOANH_COMBOS },
  { code: '7380101', name: 'Luật', defaultThreshold30: 18, combinationIds: LUAT_COMBOS },
  { code: '7440301', name: 'An toàn, sức khoẻ và môi trường (Khoa học môi trường)', defaultThreshold30: 15, combinationIds: ANTOANMT_COMBOS },
  { code: '7480201', name: 'Công nghệ thông tin', defaultThreshold30: 15, combinationIds: CNTT_COMBOS },
  { code: '7580201_01', name: 'Xây dựng Dân dụng và Công nghiệp (Kỹ thuật xây dựng)', defaultThreshold30: 15, combinationIds: XAYDUNG_COMBOS },
  { code: '7580201_02', name: 'Tin học xây dựng (Kỹ thuật xây dựng)', defaultThreshold30: 15, combinationIds: XAYDUNG_COMBOS },
  { code: '7620110', name: 'Nông nghiệp công nghệ cao (Khoa học cây trồng)', defaultThreshold30: 15, combinationIds: NONGNGHIEP_COMBOS },
  { code: '7620115', name: 'Kinh tế nông nghiệp', defaultThreshold30: 15, combinationIds: KINHTENN_COMBOS },
  { code: '7640101', name: 'Thú y', defaultThreshold30: 15, combinationIds: NONGNGHIEP_COMBOS },
  { code: '7220201', name: 'Ngôn ngữ Anh', defaultThreshold30: 15, combinationIds: NGANNGUANH_COMBOS },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', defaultThreshold30: 20, combinationIds: NGANNGUTQ_COMBOS },
  { code: '7310201', name: 'Chính trị học', defaultThreshold30: 15, combinationIds: CHINHTRI_COMBOS },
  { code: '7810103', name: 'QTDV Du lịch và Lữ hành', defaultThreshold30: 15, combinationIds: DULICH_COMBOS },
] as const;

export type HtuFieldCode = (typeof HTU_FIELD_THRESHOLDS_2025)[number]['code'];

export const HTU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, HtuFieldThreshold> = new Map(
  HTU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);

export function resolveHtuThreshold30(entry: HtuFieldThreshold, combinationId: string): number {
  return entry.combinationThresholdOverrides?.[combinationId] ?? entry.defaultThreshold30;
}
