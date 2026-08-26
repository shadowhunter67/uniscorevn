/**
 * Ngưỡng đầu vào VWA 2026 (Học viện Phụ nữ Việt Nam), Thông báo 96/TB-HVPNVN (07/07/2026). Nhóm
 * ngành enum ổn định theo bảng ngưỡng chính thức, KHÔNG so khớp substring tên ngành — cùng pattern
 * `TdmuProgramGroup`. Danh mục mã ngành đầy đủ + tổ hợp môn theo từng ngành → knowledge gap
 * (`vwa-program-mapping-not-imported`); caller tự chọn group + tổ hợp môn.
 *
 * - `multimedia`: Truyền thông đa phương tiện (7320104) — ngưỡng cao nhất.
 * - `business`: Quản trị kinh doanh (+CLC), Quản trị dịch vụ du lịch & lữ hành (Hà Nội), Truyền
 *   thông xã hội, Tâm lý học.
 * - `standard`: CNTT, Thiết kế và phát triển game, Công tác xã hội, Quản lý phát triển xã hội,
 *   Giới và phát triển, Kinh tế (+CLC), Kinh tế số, Marketing, và các ngành tại phân hiệu TP.HCM.
 *
 * Luật/Luật Kinh tế KHÔNG có trong bảng — nguồn ghi "theo hướng dẫn của Bộ GDĐT", không model
 * (xem knowledgeGaps.ts).
 */
export type VwaProgramGroup = 'multimedia' | 'business' | 'standard';

const GROUP_LABELS: Record<VwaProgramGroup, string> = {
  multimedia: 'Truyền thông đa phương tiện',
  business: 'Quản trị kinh doanh, Quản trị dịch vụ du lịch & lữ hành (Hà Nội), Truyền thông xã hội, Tâm lý học',
  standard: 'CNTT, Thiết kế và phát triển game, Công tác xã hội, Quản lý phát triển xã hội, Giới và phát triển, Kinh tế, Kinh tế số, Marketing và các ngành tại phân hiệu TP.HCM',
};

export const VWA_THPT_EXAM_THRESHOLD_30: Record<VwaProgramGroup, number> = { multimedia: 19, business: 18, standard: 16 };
export const VWA_TRANSCRIPT_THRESHOLD_30: Record<VwaProgramGroup, number> = { multimedia: 23, business: 21, standard: 19 };

export interface VwaEligibilityResult {
  pass: boolean;
  requiredText: string;
}

/** Phương thức thi TN THPT 2026 — điểm thô thang 30, không cần quy đổi. */
export function checkVwaThptExamThreshold(totalScore30: number, group: VwaProgramGroup): VwaEligibilityResult {
  const threshold = VWA_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển ≥ ${threshold} (thang 30) — áp dụng nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

/** Phương thức học bạ — điểm trung bình 3 môn tổ hợp qua 6 học kỳ (lớp 10/11/12), thang 30. */
export function checkVwaTranscriptThreshold(totalScore30: number, group: VwaProgramGroup): VwaEligibilityResult {
  const threshold = VWA_TRANSCRIPT_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Điểm trung bình 3 môn tổ hợp xét tuyển (cả năm lớp 10, 11 và 12) ≥ ${threshold} (thang 30) — áp dụng nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as VWA_PROGRAM_GROUP_LABELS };
