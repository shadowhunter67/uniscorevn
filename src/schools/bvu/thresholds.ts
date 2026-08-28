/**
 * Ngưỡng đầu vào BVU 2026, phương thức xét điểm thi TN THPT — bài đăng chính thức 10/08/2026
 * (`bvu-diem-trung-tuyen-2026`) công bố bảng theo nhóm ngành, KHÔNG cộng điểm ưu tiên khu vực/đối
 * tượng (trích nguyên văn: "... đạt từ 15 điểm, không cộng điểm ưu tiên khu vực, đối tượng").
 */
export type BvuThptProgramGroup = 'pharmacy' | 'nursing' | 'law' | 'standard';

export const BVU_THPT_GROUP_LABELS: Record<BvuThptProgramGroup, string> = {
  pharmacy: 'Dược học',
  nursing: 'Điều dưỡng',
  law: 'Luật',
  standard: 'các ngành khác',
};

export const BVU_THPT_THRESHOLD_30: Record<BvuThptProgramGroup, number> = {
  pharmacy: 20,
  nursing: 18,
  law: 20,
  standard: 15,
};
