/** TKS 2026 — điểm chuẩn trúng tuyển thật (đã gồm ưu tiên), nhóm "Luật, Luật kinh tế, Ngôn ngữ
 * Anh" (`sources.ts:tks-cutoff-notice-2026`). KHÔNG bao gồm "Luật, chuyên ngành Kiểm sát" — cutoff
 * riêng theo giới tính, ngoài phạm vi ApplicantProfile hiện tại. */
export type TksProgramGroup = 'lawMain' | 'lawEconomicsMain' | 'englishLanguageMain' | 'lawHcm';

export const TKS_THPT_EXAM_THRESHOLD_30: Record<TksProgramGroup, number> = {
  lawMain: 23.4,
  lawEconomicsMain: 23.9,
  englishLanguageMain: 21.5,
  lawHcm: 22.8,
};

export const TKS_PROGRAM_GROUP_LABELS: Record<TksProgramGroup, string> = {
  lawMain: 'Luật (Trụ sở chính)',
  lawEconomicsMain: 'Luật kinh tế (Trụ sở chính)',
  englishLanguageMain: 'Ngôn ngữ Anh (Trụ sở chính)',
  lawHcm: 'Luật (Phân hiệu TP. Hồ Chí Minh)',
};

/** Độ lệch điểm so với tổ hợp gốc D01, Phụ lục II (`sources.ts:tks-conversion-table-2026`). Tổ hợp
 * không có trong bảng (A02, B00...) chưa được TKS công bố độ lệch — ngoài phạm vi. */
export const TKS_COMBINATION_DEVIATION_30: Record<string, number> = {
  D01: 0,
  A01: 0,
  D07: 0,
  D09: 0,
  D14: 0,
  A00: 1.45,
  C01: 0.8,
  C02: 0.8,
  C03: 0.8,
  C04: 0.8,
  D15: -0.88,
};
