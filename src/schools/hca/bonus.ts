import { round2 } from '../../core/round2';

/**
 * HCA 2025/2026 — Điểm cộng Khuyến khích (Phụ lục 3 của `sources.ts:hca-de-an-2026`), cộng trực
 * tiếp vào Điểm xét tuyển theo mục 6.1.6 phần II (phương thức 100 — thi TN THPT): "Điểm xét tuyển =
 * M1 + M2 + M3 + Điểm Khuyến khích (nếu có) + Điểm ưu tiên (nếu có)", với "Lưu ý: Điểm cộng khuyến
 * khích của Học viện được quy định tại mục 7.2 phần II" (= Phụ lục 3). Phụ lục 3 tự ghi "mã phương
 * thức: 200" ở dòng "Đối tượng áp dụng" — đối chiếu với bảng phương thức ở mục 2 (100 = thi TN
 * THPT, 200 = học bạ) thì đây RÕ RÀNG là lỗi đánh máy/sao chép của chính văn bản gốc (mục 6.1.6,
 * thuộc phương thức 100, dẫn chiếu thẳng tới Phụ lục 3 làm nguồn điểm khuyến khích của MÌNH) — xem
 * `knowledgeGaps.ts` cho gap này. KHÔNG có field chuẩn trong `ApplicantProfile` (giải HSG, chứng
 * chỉ ngoại ngữ theo khung 6 bậc) — caller tự truyền qua context, cùng tiền lệ BMTU/HUP.
 */
export type HcaBonusGroup1Level = 'national-encouragement' | 'provincial-1' | 'provincial-2' | 'provincial-3' | 'provincial-encouragement';
export type HcaBonusGroup2Level = 'level-6' | 'level-5' | 'level-4' | 'level-3';

export const HCA_BONUS_GROUP1_30: Record<HcaBonusGroup1Level, number> = {
  'national-encouragement': 1.5,
  'provincial-1': 1.0,
  'provincial-2': 0.8,
  'provincial-3': 0.6,
  'provincial-encouragement': 0.4,
};

export const HCA_BONUS_GROUP2_30: Record<HcaBonusGroup2Level, number> = {
  'level-6': 1.5,
  'level-5': 1.0,
  'level-4': 0.8,
  'level-3': 0.6,
};

/** Phụ lục 3 mục III: tổng điểm khuyến khích của mỗi thí sinh không vượt quá 10% mức điểm tối đa
 * của thang điểm xét tuyển (= 3,0/30). Mỗi nhóm (1 hoặc 2) đã tự giới hạn <= 1,5 nên chỉ cần cộng
 * 2 nhóm rồi cắt trần 3,0 phòng trường hợp dữ liệu context sai lệch. */
export const HCA_BONUS_CAP_30 = 3.0;

export function calculateHcaBonus30(input: { group1?: HcaBonusGroup1Level; group2?: HcaBonusGroup2Level }): number {
  const group1 = input.group1 ? HCA_BONUS_GROUP1_30[input.group1] ?? 0 : 0;
  const group2 = input.group2 ? HCA_BONUS_GROUP2_30[input.group2] ?? 0 : 0;
  return round2(Math.min(HCA_BONUS_CAP_30, group1 + group2));
}
