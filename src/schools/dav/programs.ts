export interface DavProgram {
  programCode: string;
  name: string;
  majorCode: string;
  quota: number;
  isLawField: boolean;
}

export const DAV_PROGRAMS_2026: readonly DavProgram[] = [
  { programCode: 'HQT01', name: 'Quan hệ quốc tế', majorCode: '7310206', quota: 400, isLawField: false },
  { programCode: 'HQT02', name: 'Ngôn ngữ Anh', majorCode: '7220201', quota: 200, isLawField: false },
  { programCode: 'HQT03', name: 'Kinh tế quốc tế', majorCode: '7310106', quota: 260, isLawField: false },
  { programCode: 'HQT04', name: 'Luật quốc tế', majorCode: '7380108', quota: 200, isLawField: true },
  { programCode: 'HQT05', name: 'Truyền thông quốc tế', majorCode: '7320107', quota: 400, isLawField: false },
  { programCode: 'HQT06', name: 'Kinh doanh quốc tế', majorCode: '7340120', quota: 260, isLawField: false },
  { programCode: 'HQT07', name: 'Luật thương mại quốc tế', majorCode: '7380109', quota: 200, isLawField: true },
  { programCode: 'HQT08', name: 'Hàn Quốc học', majorCode: '7310614', quota: 80, isLawField: false },
  { programCode: 'HQT09', name: 'Hoa Kỳ học', majorCode: '7310640', quota: 40, isLawField: false },
  { programCode: 'HQT10', name: 'Nhật Bản học', majorCode: '7310613', quota: 40, isLawField: false },
  { programCode: 'HQT11', name: 'Trung Quốc học', majorCode: '7310612', quota: 120, isLawField: false },
];

/** Bảng 1 PDF thông tin tuyển sinh 2026 (PT4): tổ hợp xét tuyển theo từng ngành. Chỉ liệt kê tổ hợp
 * mô hình hoá được trong `COMMON_SUBJECT_COMBINATIONS`; D03/D04/D06/DD2 (môn ngoại ngữ Pháp/Trung/
 * Nhật/Hàn) chưa có SubjectId riêng nên nằm ngoài phạm vi exact. */
const DAV_ALL_MODELED = ['A00', 'A01', 'C00', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'] as const;
export const DAV_THPT_COMBINATIONS_BY_PROGRAM: Record<string, readonly string[]> = {
  HQT01: DAV_ALL_MODELED,
  HQT02: ['A01', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'],
  HQT03: ['A00', 'A01', 'D01', 'D07', 'D09', 'D10'],
  HQT04: DAV_ALL_MODELED,
  HQT05: DAV_ALL_MODELED,
  HQT06: ['A00', 'A01', 'D01', 'D07', 'D09', 'D10'],
  HQT07: DAV_ALL_MODELED,
  HQT08: ['A00', 'A01', 'C00', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'],
  HQT09: ['A00', 'A01', 'C00', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'],
  HQT10: ['A00', 'A01', 'C00', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'],
  HQT11: ['A00', 'A01', 'C00', 'D01', 'D07', 'D09', 'D10', 'D14', 'D15'],
};

export function getDavProgram(programCode: string | undefined): DavProgram | undefined {
  return DAV_PROGRAMS_2026.find((program) => program.programCode === programCode);
}
