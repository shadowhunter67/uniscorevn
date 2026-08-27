export const HCE_THPT_THRESHOLD = {
  min30: 15,
  max30: 17,
  requiredText:
    'HCE 2026 (phương thức xét điểm thi TN THPT): mức điểm sàn thi THPT từ 15-17 điểm tùy từng ngành trong tổng 22 ngành đào tạo; UniscoreVN chưa nhập bảng ngưỡng theo từng ngành cụ thể.',
};

/**
 * Ngưỡng theo ngành HCE 2026 (Trường Đại học Kinh tế, Đại học Huế, mã trường DHK), đọc trực tiếp
 * Phụ lục 1 của Thông báo 42/TB-HĐTSĐH (`hce-hueu-threshold-appendix-2026`), mục III. Áp dụng
 * cho phương thức thi TN THPT, thí sinh khu vực 3 (chưa cộng điểm ưu tiên/điểm cộng).
 */
export type HceProgramGroup = 'standard' | 'elevated';

const GROUP_LABELS: Record<HceProgramGroup, string> = {
  standard: 'Kinh tế, Kinh tế chính trị, Kinh tế quốc tế, Thống kê kinh tế, Kinh tế số, Quản trị kinh doanh, Kinh doanh thương mại, Thương mại điện tử, Tài chính - Ngân hàng, Kế toán, Kiểm toán, Quản trị nhân lực, Hệ thống thông tin quản lý, Kinh tế nông nghiệp, Song ngành Kinh tế - Tài chính',
  elevated: 'Marketing, Kinh doanh quốc tế, Logistics và Quản lý chuỗi cung ứng',
};

export const HCE_PROGRAM_THRESHOLD_30: Record<HceProgramGroup, number> = {
  standard: 15,
  elevated: 17,
};

export interface HceProgramEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkHceProgramThreshold(totalScore30: number, group: HceProgramGroup): HceProgramEligibilityResult {
  const min = HCE_PROGRAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= min,
    requiredText: `Tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển (không nhân hệ số), chưa cộng điểm cộng/điểm ưu tiên, ≥ ${min} (thang 30) — nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as HCE_PROGRAM_GROUP_LABELS };
