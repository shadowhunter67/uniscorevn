/** HPU 2026 — điểm chuẩn trúng tuyển thật theo mã ngành, phương thức thi TN THPT
 * (`sources.ts:hpu-cutoff-notice-2026`). */
export const HPU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7480201': 16.0, // Công nghệ thông tin
  '7510301': 18.0, // Công nghệ kỹ thuật điện, điện tử
  '7520320': 15.0, // Kỹ thuật môi trường
  '7340101': 18.5, // Quản trị kinh doanh
  '7310630': 16.0, // Việt Nam học
  '7220201': 15.0, // Ngôn ngữ Anh
  '7220204': 16.0, // Ngôn ngữ Trung Quốc
};

export const HPU_PROGRAM_LABELS: Record<string, string> = {
  '7480201': 'Công nghệ thông tin',
  '7510301': 'Công nghệ kỹ thuật điện, điện tử',
  '7520320': 'Kỹ thuật môi trường',
  '7340101': 'Quản trị kinh doanh',
  '7310630': 'Việt Nam học',
  '7220201': 'Ngôn ngữ Anh',
  '7220204': 'Ngôn ngữ Trung Quốc',
};

export type HpuProgramCode = keyof typeof HPU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;
