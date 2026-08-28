export const THANHDO_THPT_THRESHOLD = {
  min30: 16,
  max30: 20,
  requiredText:
    'ThanhDo 2026 (phuong thuc thi TN THPT): diem chuan dao dong 16,0-20,0/30 tuy nganh (vd Ke toan/Quan tri Van phong/Quan tri Khach san/Viet Nam hoc/Giao duc hoc 16,0; Quan tri kinh doanh 16,5; O to/Tieng Anh 17,0; CNTT/Dien-Dien tu/Tieng Trung 17,5; Dieu duong 18,0; Luat/Duoc hoc 20,0).',
};

/**
 * ThanhDo 2026 — 14 nganh dao tao, phuong thuc thi TN THPT. Trang chinh thuc thanhdo.edu.vn
 * (bai "chinh thuc cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026") cong bo DAY DU
 * bang diem chuan theo 6 muc (khop 14/14 nganh, xac nhan lai 2026-08-28).
 */
export type ThanhdoProgramGroup = 'tier16' | 'tier16_5' | 'tier17' | 'tier17_5' | 'tier18' | 'tier20';

export const THANHDO_PROGRAM_GROUP_LABELS: Record<ThanhdoProgramGroup, string> = {
  tier16: 'Ke toan, Quan tri Van phong, Quan tri Khach san, Viet Nam hoc (HDDL), Giao duc hoc',
  tier16_5: 'Quan tri kinh doanh',
  tier17: 'Cong nghe ky thuat O to, Ngon ngu Anh',
  tier17_5: 'Cong nghe thong tin, Cong nghe ky thuat Dien - Dien tu, Ngon ngu Trung Quoc',
  tier18: 'Dieu duong',
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
