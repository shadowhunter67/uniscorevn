/**
 * EPU (Trường Đại học Điện lực, mã trường DDL, Hà Nội — trực thuộc Bộ Công Thương) 2026.
 *
 * Danh mục ngành + tổ hợp xét tuyển: `sources.ts:epu-thongtin-tuyensinh-466-2026` (Thông báo số
 * 466/TB-ĐHĐL ngày 26/02/2026, mục II.4.1 "Số lượng tuyển sinh (dự kiến)", trang 4-5). Bảng này
 * gom 38 mã xét tuyển thành 6 KHỐI, mỗi khối có 1 dòng "Xét tuyển kết quả thi tốt nghiệp THPT;
 * THXT: ..." riêng — module này CHỈ dùng danh sách tổ hợp của dòng "kết quả thi tốt nghiệp THPT"
 * (không dùng danh sách của nhánh học bạ / học bạ + chứng chỉ tiếng Anh, vốn khác nhau).
 *
 * Điểm trúng tuyển: `sources.ts:epu-diemtrungtuyen-3020-2026` (Thông báo số 3020/TB-ĐHĐL ngày
 * 09/8/2026, bảng STT 1-38) — công bố CHÍNH THỨC cho phương thức xét điểm thi TN THPT 2026, đủ
 * 38/38 mã xét tuyển, KHÔNG phân biệt theo tổ hợp (1 mức/ngành).
 */
export interface EpuProgram {
  /** Mã xét tuyển chính thức (đồng thời là id nội bộ — không trùng lặp trong bảng 38 dòng). */
  code: string;
  /** Tên ngành nguyên văn Thông báo 3020/TB-ĐHĐL. */
  name: string;
  /** Tổ hợp xét tuyển của nhánh "Xét tuyển kết quả thi tốt nghiệp THPT" (Thông báo 466, mục II.4.1). */
  combinationIds: readonly string[];
  /** Điểm trúng tuyển 2026, thang 30 (Thông báo 3020/TB-ĐHĐL). */
  threshold30: number;
}

/** Khối 1 (STT 1-29 bảng II.4.1) — THXT nhánh thi TN THPT: A00, A01, D01, D07. */
const BLOCK_1 = ['A00', 'A01', 'D01', 'D07'] as const;
/** Khối 2 (Luật kinh tế) — THXT nhánh thi TN THPT: D01, D09, D10, D84, D14, D66, X78, X25, C00. */
const BLOCK_LAW = ['D01', 'D09', 'D10', 'D84', 'D14', 'D66', 'X78', 'X25', 'C00'] as const;
/** Khối 3 (Kỹ thuật nhiệt + nhóm Công nghệ hóa học, vật liệu, luyện kim và môi trường) — A00, A01, A02, B00, D01, D07. */
const BLOCK_CHEM = ['A00', 'A01', 'A02', 'B00', 'D01', 'D07'] as const;
/** Khối 4 (Ngôn ngữ Anh) — D01, D09, D10, D84, D14, D66, X78, X25. */
const BLOCK_LANG = ['D01', 'D09', 'D10', 'D84', 'D14', 'D66', 'X78', 'X25'] as const;
/**
 * Khối 5 (Toán tin) — nguồn công bố A00, A01, D01, D07, X02, X56. X56 BỊ LOẠI: `core/subjects.ts`
 * (danh mục tổ hợp dùng chung) chưa có mã tổ hợp X56 và Thông báo 466 không chú giải thành phần môn
 * của mã này — không suy đoán (xem `knowledgeGaps.ts:epu-x56-combination-not-modeled`).
 */
const BLOCK_MATHIT = ['A00', 'A01', 'D01', 'D07', 'X02'] as const;
/** Khối 6 (Vật lý kỹ thuật) — A00, A01, D01, D07, X06, C01. */
const BLOCK_PHYS = ['A00', 'A01', 'D01', 'D07', 'X06', 'C01'] as const;

export const EPU_PROGRAMS: readonly EpuProgram[] = [
  { code: '7220201', name: 'Ngôn ngữ Anh', combinationIds: BLOCK_LANG, threshold30: 21.0 },
  { code: '7340101', name: 'Quản trị kinh doanh', combinationIds: BLOCK_1, threshold30: 21.25 },
  { code: '7340115', name: 'Marketing', combinationIds: BLOCK_1, threshold30: 22.0 },
  { code: '7340120', name: 'Kinh doanh quốc tế', combinationIds: BLOCK_1, threshold30: 16.0 },
  { code: '7340122', name: 'Thương mại Điện tử', combinationIds: BLOCK_1, threshold30: 22.75 },
  { code: '7340201', name: 'Tài chính - Ngân hàng', combinationIds: BLOCK_1, threshold30: 21.25 },
  { code: '7340205', name: 'Công nghệ tài chính', combinationIds: BLOCK_1, threshold30: 20.25 },
  { code: '7340301', name: 'Kế toán', combinationIds: BLOCK_1, threshold30: 21.5 },
  { code: '7340302', name: 'Kiểm toán', combinationIds: BLOCK_1, threshold30: 21.0 },
  { code: '7380107', name: 'Luật kinh tế', combinationIds: BLOCK_LAW, threshold30: 20.5 },
  { code: '7460108', name: 'Khoa học dữ liệu', combinationIds: BLOCK_1, threshold30: 20.25 },
  { code: '7460117', name: 'Toán tin', combinationIds: BLOCK_MATHIT, threshold30: 19.0 },
  { code: '7480102', name: 'Mạng máy tính và truyền thông dữ liệu', combinationIds: BLOCK_1, threshold30: 16.0 },
  { code: '7480106', name: 'Kỹ thuật máy tính', combinationIds: BLOCK_1, threshold30: 22.0 },
  { code: '7480107', name: 'Trí tuệ nhân tạo', combinationIds: BLOCK_1, threshold30: 21.0 },
  { code: '7480201', name: 'Công nghệ thông tin', combinationIds: BLOCK_1, threshold30: 21.35 },
  { code: '7510102', name: 'Công nghệ kỹ thuật công trình xây dựng', combinationIds: BLOCK_1, threshold30: 21.25 },
  { code: '7510201', name: 'Công nghệ kỹ thuật cơ khí', combinationIds: BLOCK_1, threshold30: 23.5 },
  { code: '7510203', name: 'Công nghệ kỹ thuật cơ điện tử', combinationIds: BLOCK_1, threshold30: 24.25 },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', combinationIds: BLOCK_1, threshold30: 23.25 },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', combinationIds: BLOCK_1, threshold30: 24.15 },
  { code: '7510302', name: 'Công nghệ kỹ thuật điện tử - viễn thông', combinationIds: BLOCK_1, threshold30: 23.15 },
  { code: '7510303', name: 'Công nghệ kỹ thuật điều khiển và tự động hoá', combinationIds: BLOCK_1, threshold30: 24.6 },
  { code: '7510402', name: 'Công nghệ vật liệu (bán dẫn và vi mạch)', combinationIds: BLOCK_CHEM, threshold30: 21.25 },
  { code: '7510403', name: 'Công nghệ kỹ thuật năng lượng', combinationIds: BLOCK_CHEM, threshold30: 21.5 },
  { code: '7510406', name: 'Công nghệ kỹ thuật môi trường', combinationIds: BLOCK_CHEM, threshold30: 18.25 },
  { code: '7510407', name: 'Công nghệ kỹ thuật hạt nhân', combinationIds: BLOCK_CHEM, threshold30: 21.75 },
  { code: '7510601', name: 'Quản lý công nghiệp', combinationIds: BLOCK_1, threshold30: 21.5 },
  { code: '7510602', name: 'Quản lý năng lượng', combinationIds: BLOCK_1, threshold30: 19.75 },
  { code: '7510605', name: 'Logistics và Quản lý chuỗi cung ứng', combinationIds: BLOCK_1, threshold30: 23.25 },
  { code: '7520107', name: 'Kỹ thuật Robot', combinationIds: BLOCK_1, threshold30: 21.5 },
  { code: '7520115', name: 'Kỹ thuật nhiệt', combinationIds: BLOCK_CHEM, threshold30: 22.75 },
  { code: '7520117', name: 'Kỹ thuật công nghiệp', combinationIds: BLOCK_1, threshold30: 20.0 },
  { code: '7520118', name: 'Kỹ thuật hệ thống công nghiệp', combinationIds: BLOCK_1, threshold30: 17.5 },
  { code: '7520401', name: 'Vật lý kỹ thuật', combinationIds: BLOCK_PHYS, threshold30: 16.5 },
  { code: '7580302', name: 'Quản lý xây dựng', combinationIds: BLOCK_1, threshold30: 18.0 },
  { code: '7810103', name: 'Quản trị dịch vụ Du lịch và Lữ hành', combinationIds: BLOCK_1, threshold30: 20.75 },
  { code: '7810201', name: 'Quản trị khách sạn', combinationIds: BLOCK_1, threshold30: 20.75 },
] as const;

export const EPU_PROGRAM_BY_CODE: ReadonlyMap<string, EpuProgram> = new Map(EPU_PROGRAMS.map((program) => [program.code, program]));
