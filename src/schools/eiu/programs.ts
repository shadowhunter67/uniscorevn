export interface EiuProgramEntry {
  /** Mã ngành (không kèm tiền tố mã xét tuyển B/N/C/E). */
  code: string;
  name: string;
  combinations?: readonly string[];
  outOfScopeReason?: string;
}

const BUSINESS = ['A00', 'A01', 'X05', 'X06', 'A07', 'B00', 'C01', 'C02', 'C03', 'C04', 'X01', 'D01', 'X02', 'D07', 'D09', 'D10', 'X25', 'X26'] as const;
const TECH = ['A00', 'A01', 'X05', 'X06', 'B00', 'C01', 'C02', 'X01', 'D01', 'X02', 'D07', 'X25', 'X26'] as const;

// Bảng "Ngành tuyển sinh" trang đề án tuyển sinh 2026 (eiu.edu.vn): 10 ngành, tổ hợp phương thức 1-2 (giống nhau).
export const EIU_PROGRAMS_2026: readonly EiuProgramEntry[] = [
  { code: '7340101', name: 'Quản trị kinh doanh', combinations: BUSINESS },
  { code: '7310101', name: 'Kinh tế', combinations: BUSINESS },
  {
    code: '7720301',
    name: 'Điều dưỡng',
    outOfScopeReason: 'Điều dưỡng áp dụng ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm (không phải ngưỡng chung 15/18), chưa có trong nguồn.',
  },
  { code: '7480103', name: 'Kỹ thuật phần mềm', combinations: TECH },
  { code: '7480102', name: 'Mạng máy tính và truyền thông dữ liệu', combinations: TECH },
  { code: '7520201', name: 'Kỹ thuật điện', combinations: TECH },
  { code: '7520207', name: 'Kỹ thuật điện tử – viễn thông', combinations: TECH },
  { code: '7520216', name: 'Kỹ thuật điều khiển và tự động hóa', combinations: TECH },
  { code: '7520114', name: 'Kỹ thuật cơ điện tử', combinations: TECH },
  { code: '7520103', name: 'Kỹ thuật cơ khí', combinations: TECH },
];

export function getEiuProgram(code: string | undefined): EiuProgramEntry | undefined {
  return EIU_PROGRAMS_2026.find((program) => program.code === code);
}
