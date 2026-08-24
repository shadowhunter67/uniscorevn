export type AjcProgramGroupId = 'baochi-xuatban' | 'lyluan-lichsu-truyenthong';

export interface AjcProgramGroupThreshold {
  groupId: AjcProgramGroupId;
  groupName: string;
  /** Thang điểm áp dụng: nhóm Báo chí-Xuất bản dùng thang 40 (Ngữ văn nhân hệ số 2). */
  scale: 30 | 40;
  minScore: number;
}

/**
 * Thông báo 293/TB-HVBCTT-ĐT ngày 10/07/2026 (ajc.hcma.vn) công bố ngưỡng đảm bảo chất lượng đầu
 * vào theo phương thức xét điểm thi TN THPT, giữ nguyên so với 2025. Số liệu đối chiếu chéo khớp
 * giữa 2 nguồn báo chí độc lập (thuvienphapluat.vn, huongnghiep.hocmai.vn) vì file PDF đính kèm
 * trên ajc.hcma.vn trỏ tới host nội bộ không truy cập công khai được.
 */
export const AJC_PROGRAM_GROUP_THRESHOLDS_2026: readonly AjcProgramGroupThreshold[] = [
  { groupId: 'baochi-xuatban', groupName: 'Nhóm ngành Báo chí - Xuất bản', scale: 40, minScore: 25 },
  { groupId: 'lyluan-lichsu-truyenthong', groupName: 'Nhóm ngành Lý luận, Lịch sử, Truyền thông - Quảng cáo - Quan hệ quốc tế', scale: 30, minScore: 18 },
];

export function getAjcProgramGroupThreshold(groupId?: string): AjcProgramGroupThreshold | undefined {
  return AJC_PROGRAM_GROUP_THRESHOLDS_2026.find((threshold) => threshold.groupId === groupId);
}
