export const THANHDO_THPT_THRESHOLD = {
  min30: 16,
  max30: 20,
  requiredText:
    'ThanhDo 2026 (phương thức thi TN THPT): điểm chuẩn dao động 16,0-20,0/30 tuy ngành (vd Ke toan/Quan tri Văn phong/Quan tri Khach san/Viet Nam hoc/Giáo dục hoc 16,0; Quan tri kinh doanh 16,5; O to/Tiếng Anh 17,0; CNTT/Dien-Dien tu/Tieng Trung 17,5; Điều dưỡng 18,0; Luật/Dược học 20,0).',
};

/**
 * ThanhDo 2026 — 14 nganh dao tao, phuong thuc thi TN THPT. Trang chinh thuc thanhdo.edu.vn
 * (bai "chính thức công bố điểm chuẩn trúng tuyển đại học chính quy năm 2026") cong bo DAY DU
 * bang diem chuan theo 6 muc (khop 14/14 nganh, xac nhan lai 2026-08-28).
 */
export type ThanhdoProgramGroup = 'tier16' | 'tier16_5' | 'tier17' | 'tier17_5' | 'tier18' | 'tier20';

export const THANHDO_PROGRAM_GROUP_LABELS: Record<ThanhdoProgramGroup, string> = {
  tier16: 'Ke toan, Quan tri Van phong, Quan tri Khach san, Viet Nam hoc (HDDL), Giao duc hoc',
  tier16_5: 'Quan tri kinh doanh',
  tier17: 'Công nghệ kỹ thuật O to, Ngon ngu Anh',
  tier17_5: 'Công nghệ thông tin, Công nghệ kỹ thuật Dien - Dien tu, Ngon ngu Trung Quoc',
  tier18: 'Điều dưỡng',
  tier20: 'Luat, Duoc hoc',
};

export const THANHDO_PROGRAM_GROUP_THRESHOLD_30: Record<ThanhdoProgramGroup, number> = {
  tier16: 16,
  tier16_5: 16.5,
  tier17: 17,
  tier17_5: 17.5,
  tier18: 18,
  tier20: 20,
};

export interface ThanhdoExactEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkThanhdoExactThreshold(totalScore30: number, group: ThanhdoProgramGroup): ThanhdoExactEligibilityResult {
  const threshold = THANHDO_PROGRAM_GROUP_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển (không nhân hệ số, không tính điểm cộng) + điểm ưu tiên khu vực/đối tượng (nếu có) >= ${threshold} (thang 30) — áp dụng ngành: ${THANHDO_PROGRAM_GROUP_LABELS[group]}.`,
  };
}
