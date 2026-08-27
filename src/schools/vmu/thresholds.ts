export type VmuProgramGroupId = 'vmu-engineering' | 'vmu-econ-lang' | 'vmu-law';

export interface VmuProgramGroupThreshold {
  groupId: VmuProgramGroupId;
  groupName: string;
  thptMin30: number;
}

export const VMU_PROGRAM_GROUP_THRESHOLDS_2026: readonly VmuProgramGroupThreshold[] = [
  { groupId: 'vmu-engineering', groupName: 'Khối ngành Kỹ thuật, Công nghệ', thptMin30: 17 },
  { groupId: 'vmu-econ-lang', groupName: 'Khối ngành Kinh tế, Ngôn ngữ', thptMin30: 19 },
  { groupId: 'vmu-law', groupName: 'Khối ngành Luật', thptMin30: 20 },
];

export function getVmuProgramGroupThreshold(groupId?: string): VmuProgramGroupThreshold | undefined {
  return VMU_PROGRAM_GROUP_THRESHOLDS_2026.find((threshold) => threshold.groupId === groupId);
}

/**
 * Ngưỡng sàn chung PT1 do Thông báo 1329/TB-ĐHHHVN công bố trực tiếp (mục 2.1): tổng 3 môn ≥ 15,00
 * trên thang 30. Đây là ngưỡng duy nhất trích được nguyên văn — mức 17/19/20 theo khối ngành ở
 * `VMU_PROGRAM_GROUP_THRESHOLDS_2026` đến từ nguồn nghiên cứu cũ, chưa đối chiếu lại với văn bản
 * chính thức 2026 nên nhánh exact không dùng.
 */
export const VMU_PT1_BASELINE_THRESHOLD_30 = 15;

/** Mã CTĐT có điều kiện phụ, ngoài phạm vi tính exact PT1. */
export const VMU_OUT_OF_SCOPE_PROGRAMS: Record<string, string> = {
  D127: 'Kiến trúc và nội thất — phải sơ tuyển/đạt thi năng khiếu Vẽ mỹ thuật ≥ 5,0 (phương thức kết hợp năng khiếu, ngoài phạm vi PT1 thuần).',
};
