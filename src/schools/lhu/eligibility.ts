export const LHU_THPT_THRESHOLD = {
  min30: 15,
  requiredText:
    'LHU 2026 (phương thức xét kết quả thi TN THPT, không gồm Dược/Luật/Luật kinh tế — 3 ngành này áp ngưỡng riêng theo Bộ GD&ĐT): Điểm môn 1 + Điểm môn 2 + Điểm môn 3 (tổ hợp xét tuyển) ≥ 15 điểm, thang 30.',
};

/**
 * LHU (Trường Đại học Lạc Hồng) 2026 — nhánh exact, phương thức xét điểm thi TN THPT, áp dụng cho
 * mọi ngành TRỪ Dược, Luật, Luật kinh tế (3 ngành này "điểm xét tuyển theo ngưỡng đảm bảo chất
 * lượng đầu vào do Bộ GD&ĐT công bố" — không phải 15/30 cố định, chưa mô hình hoá). Thông báo
 * chính thức lhu.edu.vn (đọc trực tiếp qua curl 2026-08-30, xem `sources.ts:lhu-threshold-2026`)
 * công bố NGUYÊN VĂN "Điểm môn 1 + Điểm môn 2 + Điểm môn 3 ≥ 15 điểm" — nguồn im lặng hoàn toàn về
 * điểm ưu tiên khu vực/đối tượng => áp judgment call chuẩn quốc gia (Điều 7 Thông tư 06/2026/TT-
 * BGDĐT), cùng tiền lệ `schools/utm`/`schools/ctu`/`schools/utc`/`schools/ptit`/`schools/hub`.
 */
export const LHU_GENERAL_THRESHOLD_30 = 15;

export interface LhuExactEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkLhuExactThreshold(rawTotalScore30: number): LhuExactEligibilityResult {
  return {
    pass: rawTotalScore30 >= LHU_GENERAL_THRESHOLD_30,
    requiredText: `Điều kiện xét tuyển chung LHU 2026 = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển (thang 30, không nhân hệ số) >= ${LHU_GENERAL_THRESHOLD_30} — áp dụng mọi ngành trừ Dược, Luật, Luật kinh tế.`,
  };
}
