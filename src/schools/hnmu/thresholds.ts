/**
 * Trường Đại học Thủ đô Hà Nội (HNMU) 2026 — "Đạt mức điểm sàn này thí sinh có thể vào học Trường
 * ĐH Thủ đô Hà Nội 2026" (`sources.ts:hnmu-threshold-2026`, giadinh.suckhoedoisong.vn 13/07/2026,
 * trích dẫn NGUYÊN VĂN thông báo chính thức HNMU — không tìm được PDF/trang gốc hnmu.edu.vn cho
 * batch này, corroborate qua 1 báo chuyên trang giáo dục uy tín, cùng mức độ tin cậy đã áp dụng
 * cho `schools/hmu`). Nguyên văn: "Ngưỡng đảm bảo chất lượng đầu vào theo kết quả thi tốt nghiệp
 * THPT năm 2026 đối với thí sinh ở khu vực 3 có mức điểm tối thiểu (không nhân hệ số) của tất cả
 * các tổ hợp gồm 3 bài thi/môn thi theo thang điểm 30, không tính điểm cộng, không phân biệt kết
 * quả thi của thí sinh học chương trình 2006 và 2018".
 */
export type HnmuGroupId = 'teacher-training' | 'physical-education-teacher-training' | 'law' | 'other';

export interface HnmuGroupThreshold {
  groupId: HnmuGroupId;
  /** Tên nhóm ngành đúng nguyên văn thông báo. */
  groupName: string;
  /** Ngưỡng đảm bảo chất lượng đầu vào — thang 30, tổng thô 3 môn (thí sinh KV3, không nhân hệ số). */
  threshold30: number;
}

export const HNMU_GROUP_THRESHOLDS_2026: readonly HnmuGroupThreshold[] = [
  { groupId: 'teacher-training', groupName: 'Chương trình đào tạo giáo viên trình độ đại học', threshold30: 20 },
  { groupId: 'physical-education-teacher-training', groupName: 'Chương trình đào tạo Giáo dục Thể chất', threshold30: 19 },
  { groupId: 'law', groupName: 'Chương trình đào tạo thuộc lĩnh vực pháp luật', threshold30: 20 },
  { groupId: 'other', groupName: 'Các ngành/chương trình đào tạo khác', threshold30: 16 },
];

export const HNMU_GROUP_THRESHOLD_BY_ID: ReadonlyMap<HnmuGroupId, HnmuGroupThreshold> = new Map(
  HNMU_GROUP_THRESHOLDS_2026.map((entry) => [entry.groupId, entry])
);
