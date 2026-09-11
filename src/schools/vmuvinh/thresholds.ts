/**
 * VMU-Vinh (Trường Đại học Y khoa Vinh, mã trường YKV, Nghệ An — trực thuộc UBND tỉnh Nghệ An)
 * 2026, Phương thức 100 (xét tuyển dựa vào kết quả kỳ thi tốt nghiệp THPT).
 *
 * Công thức (`sources.ts:vmuvinh-thongtin-tuyensinh-2026`, mục IV.4.1.a): Điểm xét tuyển = tổng
 * điểm thi 3 môn theo tổ hợp + điểm ưu tiên + điểm cộng, làm tròn 2 chữ số thập phân, tối đa 30;
 * "các môn trong tổ hợp môn xét tuyển có trọng số ngang nhau" và "không quy định điểm chênh lệch
 * giữa các tổ hợp môn xét tuyển" — nên mỗi ngành chỉ có một mức điểm trúng tuyển.
 *
 * Điểm trúng tuyển + tổ hợp: `sources.ts:vmuvinh-diemtrungtuyen-809-2026` (Thông báo
 * 809/TB-ĐHYKV, 10/8/2026), cột "Phương thức xét kết quả thi THPT".
 */
export interface VmuVinhProgram {
  /** Mã xét tuyển (trùng mã ngành với 5 chương trình đại học chính quy). */
  code: string;
  name: string;
  combinationIds: readonly string[];
  /** Điểm trúng tuyển đợt 1 năm 2026 theo phương thức thi TN THPT, thang 30. */
  threshold30: number;
}

export const VMUVINH_PROGRAMS: readonly VmuVinhProgram[] = [
  { code: '7720101', name: 'Y khoa', combinationIds: ['A00', 'B00'], threshold30: 23.5 },
  { code: '7720201', name: 'Dược học', combinationIds: ['A00', 'B00', 'D07'], threshold30: 20.0 },
  { code: '7720110', name: 'Y học dự phòng', combinationIds: ['A00', 'B00', 'D07'], threshold30: 18.0 },
  { code: '7720301', name: 'Điều dưỡng', combinationIds: ['A00', 'B00', 'D07'], threshold30: 19.0 },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', combinationIds: ['A00', 'B00', 'D07'], threshold30: 23.25 },
] as const;

export const VMUVINH_PROGRAM_BY_CODE: ReadonlyMap<string, VmuVinhProgram> = new Map(VMUVINH_PROGRAMS.map((program) => [program.code, program]));

/** "Điểm xét tuyển tối đa là 30 điểm" (Thông tin tuyển sinh, mục IV.4.1.a). */
export const VMUVINH_SCORE_CAP_30 = 30;
