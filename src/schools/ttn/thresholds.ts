/**
 * TTN 2026 (Trường Đại học Tây Nguyên) — mức điểm nhận hồ sơ / ngưỡng đảm bảo chất lượng đầu vào
 * phương thức 100 (xét kết quả thi TN THPT), đợt 1. Nguồn: Thông báo mức điểm nhận hồ sơ 2026
 * (`sources.ts:ttn-threshold-notice-2026`), mục 1.2 (bảng) + mục 3.1.
 *
 * Ngưỡng so với TỔNG THÔ 3 môn (thang 30, KV3 — "không bao gồm điểm ưu tiên, điểm thưởng"). Thí
 * sinh khu vực khác được cộng điểm ưu tiên vào trước khi so ngưỡng (mục 3.1) ⇒ nhánh exact so
 * Điểm xét tuyển (đã gồm ưu tiên) với ngưỡng.
 */
export type TtnThresholdGroup = 'medicine' | 'teacher' | 'nursingMedtech' | 'standard';

export const TTN_THPT_EXAM_THRESHOLD_30: Record<TtnThresholdGroup, number> = {
  medicine: 22,
  teacher: 20,
  nursingMedtech: 18,
  standard: 15,
};

export const TTN_THRESHOLD_GROUP_LABELS: Record<TtnThresholdGroup, string> = {
  medicine: 'ngành Y khoa (7720101)',
  teacher: 'nhóm ngành đào tạo giáo viên (trừ Giáo dục Mầm non, Giáo dục Thể chất)',
  nursingMedtech: 'ngành Điều dưỡng (7720301), Kỹ thuật xét nghiệm y học (7720601)',
  standard: 'các ngành còn lại (ngưỡng chung 15/30)',
};

/** Mã xét tuyển phương thức 100 theo nhóm ngưỡng (mục 1.2 Thông báo). Giáo dục Mầm non (7140201,
 * ngưỡng 20) và Giáo dục Thể chất (7140206, ngưỡng 19) chỉ tuyển qua phương thức 405 (kết hợp
 * năng khiếu) — ngoài phạm vi nhánh exact. */
export const TTN_PROGRAM_CODES_BY_GROUP: Record<TtnThresholdGroup, readonly string[]> = {
  medicine: ['7720101'],
  teacher: ['7140202', '7140202JR', '7140205', '7140209', '7140211', '7140212', '7140213', '7140217', '7140231', '7140247'],
  nursingMedtech: ['7720301', '7720601'],
  standard: [
    '7220201', '7229001', '7229030', '7310101', '7310105', '7310403', '7340101', '7340121', '7340201', '7340205',
    '7340301', '7420201', '7420201YD', '7480201', '7540101', '7620105', '7620110', '7620112', '7620115', '7620205',
    '7640101', '7850103',
  ],
};

export const TTN_GROUP_BY_CODE: ReadonlyMap<string, TtnThresholdGroup> = new Map(
  (Object.entries(TTN_PROGRAM_CODES_BY_GROUP) as [TtnThresholdGroup, readonly string[]][]).flatMap(([group, codes]) =>
    codes.map((code) => [code, group] as const)
  )
);
