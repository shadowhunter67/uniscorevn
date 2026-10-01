/**
 * VNU-Luật (Trường Đại học Luật - Đại học Quốc gia Hà Nội) 2026 — điểm chuẩn trúng tuyển 3/3 ngành,
 * phương thức 100 (thi TN THPT 2026), đọc từ Cổng Thông tin điện tử Chính phủ (xaydungchinhsach.
 * chinhphu.vn, đăng lại thông báo chính thức VNU-Luật, 09/8/2026, `sources.ts:vnulaw-cutoff-2026`) —
 * "Điểm trúng tuyển đã bao gồm điểm ưu tiên theo đối tượng và khu vực".
 *
 * Tổ hợp: đủ 10/10 tổ hợp trường công bố (A01, A07, C01, C02, C03, C04, D01, D03, D14, D15); D03 (Toán,
 * Văn, Tiếng Pháp) tính được từ khi hệ thống có SubjectId `french` (2026-10-01).
 */
export interface VnulawFieldThreshold {
  code: string;
  name: string;
  threshold30: number;
}

export const VNULAW_FIELD_THRESHOLDS_2026: readonly VnulawFieldThreshold[] = [
  { code: '7380101', name: 'Luật', threshold30: 24.52 },
  { code: '7380107', name: 'Luật Kinh tế', threshold30: 24.83 },
  { code: '7380109', name: 'Luật Thương mại quốc tế', threshold30: 24.5 },
] as const;

export const VNULAW_ACCEPTED_COMBINATION_IDS: readonly string[] = ['A01', 'A07', 'C01', 'C02', 'C03', 'C04', 'D01', 'D03', 'D14', 'D15'];

export type VnulawFieldCode = (typeof VNULAW_FIELD_THRESHOLDS_2026)[number]['code'];

export const VNULAW_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnulawFieldThreshold> = new Map(
  VNULAW_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
