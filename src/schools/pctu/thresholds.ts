/**
 * Trường Đại học Phan Châu Trinh (PCTU) 2025 — điểm chuẩn trúng tuyển đại học hệ chính quy, nhánh
 * xét điểm thi TN THPT (PT2, cùng nhóm PT4 — xét điểm thi kết hợp chứng chỉ IELTS — dùng chung mức
 * điểm PT2 theo bảng công bố, nhưng PT4 chưa mô hình hoá quy đổi IELTS nên KHÔNG dùng ở đây).
 * Nguồn: ảnh bảng điểm chuẩn chính thức đăng trên pctu.edu.vn (`sources.ts:pctu-threshold-2025`),
 * đọc bằng vision qua Read tool (không có text layer). Khác batch trước (research 2026): batch này
 * dùng đúng NĂM 2025 cho cả formula (`pctu-admission-info-2025`) và threshold — tránh lệch năm.
 *
 * Điểm chuẩn công bố THEO NGÀNH (không tách theo từng tổ hợp — cùng 1 mức áp dụng cho mọi tổ hợp
 * xét tuyển của ngành đó, khác HUC/QBU vốn có mức riêng theo từng tổ hợp).
 */
export interface PctuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn PT2/PT4 2025 (thang 30, đã gồm điểm ưu tiên) — áp dụng chung cho mọi tổ hợp của ngành. */
  threshold30: number;
  /** Tổ hợp xét tuyển áp dụng (theo `thong-tin-tuyen-sinh-dai-hoc-nam-2025.html`). */
  combinationIds: readonly string[];
}

export const PCTU_FIELD_THRESHOLDS_2025: readonly PctuFieldThreshold[] = [
  { code: '7720101', name: 'Y khoa (Bác sĩ đa khoa)', threshold30: 21.5, combinationIds: ['A00', 'A01', 'B00', 'B08', 'D07'] },
  { code: '7720501', name: 'Răng - Hàm - Mặt', threshold30: 21.75, combinationIds: ['A00', 'A01', 'B00', 'B08', 'D07'] },
  { code: '7720301A', name: 'Điều dưỡng đa khoa', threshold30: 17, combinationIds: ['A00', 'A01', 'B00', 'B08', 'D07'] },
  { code: '7720301B', name: 'Điều dưỡng Nha khoa', threshold30: 17, combinationIds: ['A00', 'A01', 'B00', 'B08', 'D07'] },
  { code: '7720601', name: 'Kỹ thuật xét nghiệm y học', threshold30: 17, combinationIds: ['A00', 'A01', 'B00', 'B08', 'D07'] },
  { code: '7340101', name: 'Quản trị bệnh viện', threshold30: 15, combinationIds: ['A00', 'A01', 'D01', 'D07'] },
] as const;

export type PctuFieldCode = (typeof PCTU_FIELD_THRESHOLDS_2025)[number]['code'];

export const PCTU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, PctuFieldThreshold> = new Map(
  PCTU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
