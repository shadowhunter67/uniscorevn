/**
 * NDUN (Trường Đại học Điều dưỡng Nam Định, mã trường YDD — trực thuộc Bộ Y tế) 2026,
 * Phương thức 100 (xét kết quả kỳ thi tốt nghiệp THPT năm 2026).
 *
 * Công thức: `sources.ts:ndun-thongtin-tuyensinh-1155-2026` mục 2.2.2 —
 *     ĐXT = (ĐPT2 + KK) + UT,  ĐPT2 = (M1 + M2 + M3),  trần = điểm tối đa của thang xét (30).
 *
 * Tổ hợp theo ngành + xác nhận KHÔNG chênh lệch giữa các tổ hợp:
 * `sources.ts:ndun-nguong-dochenh-2026` mục 2 ("Độ chênh lệch giữa các tổ hợp xét tuyển ... so với
 * tổ hợp B00 (tổ hợp gốc)") — mọi tổ hợp của cả 3 ngành đều có độ chênh = 0.
 *
 * Điểm chuẩn: `sources.ts:ndun-diemchuan-2058-2026` (Thông báo 2058/TB-ĐDN, 10/8/2026), cột
 * "Phương thức xét tuyển điểm thi TN THPT 2026".
 */
export interface NdunProgram {
  /** Mã ngành (Thông báo 2058/TB-ĐDN). */
  code: string;
  name: string;
  /** Tổ hợp xét tuyển của phương thức thi TN THPT (bảng "độ chênh" mục 2). */
  combinationIds: readonly string[];
  /** Ngưỡng đảm bảo chất lượng đầu vào (điểm xét tối thiểu, không tính điểm cộng), thang 30. */
  qualityFloor30: number;
  /** Nguồn tuyển — tổng thô 3 môn tối thiểu theo Thông tin tuyển sinh mục 1, thang 30. */
  sourceFloor30: number;
  /** Điểm chuẩn trúng tuyển 2026 (HSPT-KV3), thang 30. */
  threshold30: number;
}

/** Tổ hợp của ngành Điều dưỡng và Hộ sinh (8 mã, độ chênh 0 so với B00). */
const NURSING_COMBINATIONS = ['B00', 'A00', 'A01', 'B03', 'B08', 'C02', 'D01', 'D07'] as const;
/** Tổ hợp của ngành Dinh dưỡng (10 mã, độ chênh 0 so với B00). */
const NUTRITION_COMBINATIONS = ['B00', 'A00', 'A01', 'B03', 'B04', 'B08', 'C02', 'C20', 'D01', 'D07'] as const;

export const NDUN_PROGRAMS: readonly NdunProgram[] = [
  {
    code: '7720301',
    name: 'Điều dưỡng',
    combinationIds: NURSING_COMBINATIONS,
    qualityFloor30: 18.0,
    sourceFloor30: 16.5,
    threshold30: 21.1,
  },
  {
    code: '7720302',
    name: 'Hộ sinh',
    combinationIds: NURSING_COMBINATIONS,
    qualityFloor30: 18.0,
    sourceFloor30: 16.5,
    threshold30: 18.3,
  },
  {
    code: '7720401',
    name: 'Dinh dưỡng',
    combinationIds: NUTRITION_COMBINATIONS,
    qualityFloor30: 15.0,
    sourceFloor30: 15.0,
    threshold30: 16.25,
  },
] as const;

export const NDUN_PROGRAM_BY_CODE: ReadonlyMap<string, NdunProgram> = new Map(NDUN_PROGRAMS.map((program) => [program.code, program]));

/** Trần thang điểm xét tuyển ("Điểm xét tuyển không vượt mức điểm tối đa của thang điểm xét"). */
export const NDUN_SCORE_CAP_30 = 30;
