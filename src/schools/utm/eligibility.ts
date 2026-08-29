export const UTM_THPT_THRESHOLD = {
  min30: 15,
  requiredText:
    'UTM 2026 (phương thức xét điểm thi TN THPT, không gồm ngành Luật và Luật kinh tế - ngưỡng riêng theo quy định Bộ GD&ĐT): tổng 3 môn thi TN THPT theo tổ hợp xét tuyển từ 15/30 điểm trở lên.',
};

/**
 * UTM 2026 — nhánh exact, phương thức xét điểm thi TN THPT, áp dụng cho "các ngành đào tạo" (mọi
 * ngành TRỪ Luật và Luật kinh tế — 2 ngành này có ngưỡng riêng "theo quy định của Bộ Giáo dục và
 * Đào tạo", không phải 15/30, chưa mô hình hoá). Thông báo chính thức utm.edu.vn (đọc trực tiếp
 * qua curl 2026-08-29, xem `sources.ts:utm-threshold-2026`) công bố NGUYÊN VĂN "Các ngành đào tạo:
 * từ 15 điểm" cho phương thức thi TN THPT — nguồn im lặng hoàn toàn về điểm ưu tiên khu vực/đối
 * tượng (không loại trừ trực tiếp như Đại Nam, cũng không xác nhận cộng vào) => áp judgment call
 * chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT còn hiệu lực 2026), cùng tiền lệ đã dùng ở
 * `schools/ctu`/`schools/utc`/`schools/ptit`/`schools/hub`/`schools/tgu`.
 */
export const UTM_GENERAL_THRESHOLD_30 = 15;

export interface UtmExactEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkUtmExactThreshold(rawTotalScore30: number): UtmExactEligibilityResult {
  return {
    pass: rawTotalScore30 >= UTM_GENERAL_THRESHOLD_30,
    requiredText: `Ngưỡng đảm bảo chất lượng đầu vào = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển (thang 30, không nhân hệ số) >= ${UTM_GENERAL_THRESHOLD_30} — áp dụng "các ngành đào tạo" trừ Luật và Luật kinh tế.`,
  };
}
