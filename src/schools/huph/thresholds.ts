/**
 * HUPH (Trường Đại học Y tế công cộng, mã trường YTC, Hà Nội — trực thuộc Bộ Y tế) 2026,
 * phương thức xét kết quả thi tốt nghiệp THPT năm 2026.
 *
 * Tổ hợp môn: `sources.ts:huph-thongtin-tuyensinh-314-2026` (Bảng 1 "Số lượng tuyển sinh năm 2026",
 * trang 4-8 — mỗi ngành liệt kê tổ hợp kèm chú giải tên môn đầy đủ). Trường xác nhận trực tiếp
 * "không quy định chênh lệch điểm xét tuyển giữa các tổ hợp đối với các thí sinh đăng ký xét tuyển
 * cùng một ngành học", nên mỗi ngành chỉ có MỘT điểm trúng tuyển dùng chung cho mọi tổ hợp.
 *
 * Điểm trúng tuyển: `sources.ts:huph-diemtrungtuyen-743-2026` (Thông báo 743/TB-ĐHYTCC, 09/8/2026,
 * đợt 1) — 6/6 ngành đại học chính quy, thang 30, không nhân hệ số.
 */
export interface HuphProgram {
  /** Mã ngành / mã xét tuyển (trùng nhau trong Bảng 1). */
  code: string;
  name: string;
  combinationIds: readonly string[];
  /** Điểm trúng tuyển đợt 1 năm 2026, thang 30. */
  threshold30: number;
}

export const HUPH_PROGRAMS: readonly HuphProgram[] = [
  {
    code: '7720701',
    name: 'Y tế công cộng',
    combinationIds: ['B00', 'B03', 'B08', 'C02', 'D01', 'D13'],
    threshold30: 20.0,
  },
  {
    code: '7720401',
    name: 'Dinh dưỡng',
    combinationIds: ['B00', 'B03', 'B08', 'C02', 'D01', 'D07'],
    threshold30: 22.0,
  },
  {
    code: '7720601',
    name: 'Kỹ thuật xét nghiệm y học',
    combinationIds: ['A00', 'A01', 'B00', 'B08', 'C01', 'D01'],
    threshold30: 20.25,
  },
  {
    code: '7720603',
    name: 'Kỹ thuật phục hồi chức năng',
    combinationIds: ['A00', 'A01', 'B00', 'B03', 'C01', 'D01'],
    threshold30: 22.0,
  },
  {
    code: '7760101',
    name: 'Công tác xã hội',
    combinationIds: ['C00', 'C20', 'D01', 'D14', 'D15', 'D66', 'X74', 'X78'],
    threshold30: 22.9,
  },
  {
    code: '7460108',
    name: 'Khoa học dữ liệu',
    combinationIds: ['A00', 'A01', 'B00', 'D01', 'D07', 'X26'],
    threshold30: 18.8,
  },
] as const;

export const HUPH_PROGRAM_BY_CODE: ReadonlyMap<string, HuphProgram> = new Map(HUPH_PROGRAMS.map((program) => [program.code, program]));

/** Trần điểm của biểu thức [M1+M2+M3+điểm khuyến khích] trước khi cộng điểm ưu tiên. */
export const HUPH_PRE_PRIORITY_CAP_30 = 30;
