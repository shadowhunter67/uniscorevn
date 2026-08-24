export type HduProgramGroupId = 'hdu-luat';

export interface HduProgramGroupThreshold {
  groupId: HduProgramGroupId;
  groupName: string;
  thptMin30: number;
  literatureMin?: number;
  requiredText: string;
}

export const HDU_PROGRAM_GROUP_THRESHOLDS_2026: readonly HduProgramGroupThreshold[] = [
  {
    groupId: 'hdu-luat',
    groupName: 'Luật, Luật Kinh tế',
    thptMin30: 18,
    literatureMin: 6,
    requiredText:
      'HDU 2026: ngành Luật và Luật Kinh tế (phương thức PT1 - xét điểm thi TN THPT, và PT2 - xét học bạ) yêu cầu tổng điểm trung bình chung 3 môn thuộc tổ hợp xét tuyển đạt từ 18,0 điểm trở lên, trong đó môn Ngữ văn đạt từ 6,0 điểm trở lên.',
  },
];

export function getHduProgramGroupThreshold(groupId?: string): HduProgramGroupThreshold | undefined {
  return HDU_PROGRAM_GROUP_THRESHOLDS_2026.find((threshold) => threshold.groupId === groupId);
}
