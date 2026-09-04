/**
 * PXU (Trường Đại học Phú Xuân, mã trường DPX, Huế; tên miền cũ phuxuan.edu.vn nay 301-redirect
 * sang pxu.edu.vn) 2026 — nguồn `sources.ts:pxu-thongbao-041-2026` (Thông tin tuyển sinh năm 2026,
 * Số 041/TB-PXU, ký 19/3/2026, PDF scan có chữ ký + con dấu Hiệu trưởng TS. Nguyễn Hữu Chúc, đọc
 * qua vision) mục II.4 "Số lượng tuyển sinh" (trang 5-6) liệt kê 9 ngành/chuyên ngành, mã ngành, tổ
 * hợp môn xét tuyển. Ngưỡng đầu vào công bố tại mục II.3 (trang 2-3): Phương thức 1 (thi TN THPT)
 * >= 15,00/30; Phương thức 2 (học bạ) >= 16,00/30 (thang điểm 10/môn, tổng 30).
 *
 * Điểm TRÚNG TUYỂN CHÍNH THỨC (`sources.ts:pxu-diemtrungtuyen-2026` — "PXU công bố điểm trúng
 * tuyển đại học chính quy năm 2026", đăng 16/8/2026, ảnh trong bài đọc qua vision) xác nhận bảng
 * "ĐIỂM TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY NĂM 2026" — CẢ 9/9 ngành đều lấy đúng 15,00 (cột "Điểm thi
 * tốt nghiệp THPT") và 18,00 (cột "Điểm kết quả học tập bậc THPT") — KHÔNG phân biệt theo ngành.
 * Phương thức 1 điểm trúng tuyển = đúng ngưỡng đầu vào (15,00, không cạnh tranh). Phương thức 2
 * điểm trúng tuyển (18,00) CAO HƠN ngưỡng đầu vào công bố hồi tháng 3 (16,00) — đây là cạnh tranh
 * thật giữa các hồ sơ, không phải chỉ lặp lại điểm sàn — nên module này dùng 18,00 (giá trị CUỐI,
 * công bố sau khi có kết quả) làm threshold runtime cho Phương thức 2, không dùng 16,00.
 */
export interface PxuProgram {
  /** ID nội bộ UniscoreVN — không phải mã ngành chính thức (2 chuyên ngành CNTT và 2 chuyên ngành
   * QTKD/QLCN dùng CHUNG 1 mã ngành nhưng khác tên/chỉ tiêu trong bảng II.4, xem STT 1-2 và 3/8). */
  code: string;
  /** Mã ngành đào tạo (Thông tin tuyển sinh năm 2026, mục II.4). */
  maNganh: string;
  /** Tên ngành/chuyên ngành đúng nguyên văn bảng II.4. */
  name: string;
  /**
   * Tổ hợp môn xét tuyển ĐÃ mô hình hoá được trong `core/subjects.ts` — là TẬP CON của tổ hợp
   * chính thức trường công bố. Các tổ hợp có môn Tiếng Trung Quốc (D04, D45, D65, X37) BỊ LOẠI vì
   * `core/subjects.ts` chưa có subject id cho "Tiếng Trung Quốc" (xem `knowledgeGaps.ts:
   * pxu-chinese-combination-not-modeled`). Ngành Ngôn ngữ Trung Quốc (nntq) và Quản trị dịch vụ Du
   * lịch và Lữ hành (qtdl) vẫn tính được qua các tổ hợp không-Tiếng-Trung còn lại trong danh sách
   * chính thức của ngành đó.
   */
  combinationIds: readonly string[];
}

export const PXU_PROGRAMS: readonly PxuProgram[] = [
  {
    code: 'cntt',
    maNganh: '7480201',
    name: 'Công nghệ thông tin (Kỹ thuật phần mềm, Quản trị mạng)',
    combinationIds: ['A00', 'A01', 'A02', 'C01', 'C02', 'D01', 'X02', 'X06', 'X10', 'X26'],
  },
  {
    code: 'cntt-dohoa',
    maNganh: '7480201',
    name: 'Công nghệ thông tin — Chuyên ngành Đồ họa Kỹ thuật số',
    combinationIds: ['A00', 'A01', 'A02', 'C01', 'C02', 'D01', 'X02', 'X06', 'X10', 'X26'],
  },
  {
    code: 'qtkd',
    maNganh: '7340101',
    name: 'Quản trị kinh doanh (Kinh doanh số & Trí tuệ nhân tạo, Truyền thông và Marketing số)',
    combinationIds: ['A00', 'A01', 'D01', 'D09', 'D10', 'X01', 'X25'],
  },
  {
    code: 'nna',
    maNganh: '7220201',
    name: 'Ngôn ngữ Anh (Tiếng Anh thương mại, Tiếng Anh du lịch)',
    combinationIds: ['A01', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X25', 'X26'],
  },
  {
    code: 'nntq',
    maNganh: '7220204',
    name: 'Ngôn ngữ Trung Quốc (Tiếng Trung thương mại, Tiếng Trung du lịch)',
    combinationIds: ['A01', 'C00', 'C03', 'C04', 'D01', 'X01'],
  },
  {
    code: 'qtdl',
    maNganh: '7810103',
    name: 'Quản trị dịch vụ Du lịch và Lữ hành (Quản trị du lịch và khách sạn, Quản trị du lịch và lữ hành)',
    combinationIds: ['A01', 'C00', 'C03', 'C04', 'D01', 'X25'],
  },
  {
    code: 'cnkt-oto',
    maNganh: '7510205',
    name: 'Công nghệ kỹ thuật ô tô (Công nghệ kỹ thuật ô tô, Công nghệ ô tô điện, Quản lý dịch vụ kỹ thuật ô tô)',
    combinationIds: ['A00', 'A01', 'A02', 'C01', 'D01', 'D07', 'D10', 'X06', 'X25', 'X26'],
  },
  {
    code: 'qlcn',
    maNganh: '7510601',
    name: 'Quản lý công nghiệp',
    combinationIds: ['A00', 'A01', 'D01', 'D09', 'D10', 'X01', 'X25'],
  },
  {
    code: 'ttdpt',
    maNganh: '7320104',
    name: 'Truyền thông đa phương tiện',
    combinationIds: ['A00', 'A01', 'D01', 'D14', 'D15', 'X01', 'X25'],
  },
] as const;

export type PxuProgramCode = (typeof PXU_PROGRAMS)[number]['code'];

export const PXU_PROGRAM_BY_CODE: ReadonlyMap<string, PxuProgram> = new Map(PXU_PROGRAMS.map((p) => [p.code, p]));

/** Phương thức 1 (thi TN THPT 2026) — điểm trúng tuyển CHÍNH THỨC 16/8/2026, đồng nhất 9/9 ngành. */
export const PXU_THPT_EXAM_THRESHOLD_30 = 15;

/** Phương thức 2 (học bạ THPT) — điểm trúng tuyển CHÍNH THỨC 16/8/2026, đồng nhất 9/9 ngành (khác
 * ngưỡng đầu vào 16,00 công bố hồi tháng 3, xem ghi chú đầu file). */
export const PXU_TRANSCRIPT_THRESHOLD_30 = 18;
