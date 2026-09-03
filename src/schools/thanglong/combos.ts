import type { ThanglongGroup } from './thresholds';

/**
 * TLU-HN 2025 — "Mức chênh lệch điểm so với tổ hợp gốc" theo Thông báo số 25072301/TB-ĐHTL ngày
 * 23/7/2025 (`sources.ts:thanglong-combo-delta-2025`). Điểm trúng tuyển công bố tại
 * `thresholds.ts` là mức cho TỔ HỢP GỐC của nhóm; điểm trúng tuyển hiệu lực cho một tổ hợp khác
 * trong cùng nhóm = điểm trúng tuyển tổ hợp gốc + mức chênh lệch của tổ hợp đó.
 *
 * 3 tổ hợp gốc (D04, D06, DD2 — Nhóm 2, chênh lệch 0) dùng ngoại ngữ Trung/Nga/Đức làm môn thứ 3,
 * KHÔNG có SubjectId tương ứng trong hệ thống UniscoreVN — bỏ khỏi bảng chênh lệch bên dưới (không
 * mô hình hoá), xem `knowledgeGaps.ts`. Nhóm 4 (Thanh nhạc, Thiết kế đồ hoạ) không có bảng quy đổi
 * (chỉ 1 phương thức duy nhất) — không xuất hiện ở đây, xem `thresholds.ts`.
 */
export interface ThanglongGroupCombos {
  group: ThanglongGroup;
  /** Tổ hợp gốc — mức điểm trúng tuyển công bố tại `thresholds.ts` áp dụng trực tiếp (chênh lệch 0). */
  baseCombinationId: string;
  /** Chênh lệch điểm (thang 30) so với tổ hợp gốc, theo từng mã tổ hợp. */
  deltaByCombinationId: Readonly<Record<string, number>>;
}

export const THANGLONG_GROUP_COMBOS: Readonly<Record<ThanglongGroup, ThanglongGroupCombos>> = {
  1: {
    group: 1,
    baseCombinationId: 'A00',
    deltaByCombinationId: {
      A00: 0,
      A07: 0,
      X01: 0,
      X06: 0,
      X25: 0,
      X26: 0,
      A01: -1,
      D01: -1,
      D07: -1,
      D09: -1,
      D10: -1,
    },
  },
  2: {
    group: 2,
    baseCombinationId: 'D01',
    deltaByCombinationId: {
      D01: 0,
      C00: 2,
      X70: 2,
      X74: 2,
      C03: 1,
      C04: 1,
      D14: 1,
      D15: 1,
      X01: 1,
      X78: 1,
    },
  },
  3: {
    group: 3,
    baseCombinationId: 'B00',
    deltaByCombinationId: {
      B00: 0,
      A00: 1,
      B03: 1,
      C02: 1,
      B08: 0,
      D07: 0,
    },
  },
} as const;
