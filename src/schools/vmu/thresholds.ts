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
