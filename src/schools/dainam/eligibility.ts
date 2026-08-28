export const DAINAM_THPT_THRESHOLD = {
  min30: 15,
  requiredText:
    'Đại Nam 2026 (mã trường DDN), thông báo chính thức tuyensinh.dainam.edu.vn "công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026" (đọc trực tiếp qua curl 2026-08-28): ngưỡng đảm bảo chất lượng đầu vào (điểm nhận đăng ký xét tuyển) theo phương thức xét kết quả thi tốt nghiệp THPT là 15 điểm (thang 30, không nhân hệ số, KHÔNG bao gồm điểm cộng, điểm ưu tiên khu vực và đối tượng, không tính điểm quy đổi từ chứng chỉ ngoại ngữ quốc tế), áp dụng cho các ngành ngoài lĩnh vực Sức khoẻ và Pháp luật. Nhóm ngành Luật/Luật kinh tế (học lực lớp 12 Giỏi trở lên và tổng 3 môn thi TN THPT >= 18,00 HOẶC điểm xét tốt nghiệp THPT >= 8,50), Y khoa/Dược học (học lực Giỏi trở lên và tổng 3 môn >= 20,00 HOẶC điểm xét tốt nghiệp THPT >= 8,50), và Điều dưỡng (học lực Khá trở lên và tổng 3 môn >= 16,50 HOẶC điểm xét tốt nghiệp THPT >= 6,50) có ngưỡng riêng, CHƯA mô hình hoá vì cần thêm dữ liệu xếp loại học lực/điểm xét tốt nghiệp THPT.',
};

/**
 * Đại Nam 2026 — nhánh exact, phương thức xét kết quả thi TN THPT, áp dụng cho các ngành NGOÀI
 * lĩnh vực Sức khoẻ và Pháp luật. Thông báo chính thức tuyensinh.dainam.edu.vn (đọc trực tiếp qua
 * curl 2026-08-28) xác nhận TRỰC TIẾP: ngưỡng 15 điểm "không bao gồm điểm cộng, điểm ưu tiên khu
 * vực và đối tượng" — tức điểm ưu tiên KHÔNG được cộng khi so với ngưỡng này (không phải judgment
 * call — tuyên bố trực tiếp của trường).
 */
export const DAINAM_GENERAL_THRESHOLD_30 = 15;

export interface DainamExactEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkDainamExactThreshold(rawTotalScore30: number): DainamExactEligibilityResult {
  return {
    pass: rawTotalScore30 >= DAINAM_GENERAL_THRESHOLD_30,
    requiredText: `Ngưỡng đảm bảo chất lượng đầu vào = tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển (KHÔNG cộng điểm ưu tiên khu vực/đối tượng, không tính điểm cộng) >= ${DAINAM_GENERAL_THRESHOLD_30} (thang 30) — áp dụng ngành ngoài lĩnh vực Sức khoẻ và Pháp luật.`,
  };
}
