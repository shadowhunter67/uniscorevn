/**
 * Ngưỡng đảm bảo chất lượng đầu vào (mức điểm xét tuyển, không nhân hệ số) của Trường Đại học
 * Khoa học, Đại học Huế — mã trường DHT. Nguồn: Phụ lục 1 kèm Thông báo số 42/TB-HĐTSĐH ngày
 * 10/7/2026 của Chủ tịch Hội đồng tuyển sinh Đại học Huế (`husc-hueu-threshold-appendix-2026`),
 * mục VII. Ghi chú 1 của Phụ lục: ngưỡng áp dụng cho phương thức xét điểm thi TN THPT, thí sinh
 * khu vực 3, tính trên tổng điểm 3 môn của tổ hợp (thang 30), không tính điểm cộng.
 *
 * Toàn bộ 26 mã ngành xét bằng điểm thi TN THPT của DHT đều có ngưỡng 15,00/30. Nhánh exact chỉ
 * phục vụ các mã ngành này. 3 mã còn lại có điều kiện phụ nằm ngoài hồ sơ dùng chung nên loại
 * khỏi phạm vi exact (xem `HUSC_OUT_OF_SCOPE_PROGRAMS`).
 */
export const HUSC_EXACT_THRESHOLD_30 = 15;

/** Mã ngành DHT có điều kiện phụ, ngoài phạm vi tính exact. */
export const HUSC_OUT_OF_SCOPE_PROGRAMS: Record<string, string> = {
  '7440102SC':
    'Vật lý học (Chương trình Công nghệ bán dẫn) — ngưỡng 22,75/30 kèm điều kiện thuộc nhóm 20% thí sinh có điểm môn Toán cao nhất toàn quốc (không có dữ liệu bách phân vị trong hồ sơ).',
  '7510302IC':
    'Công nghệ kỹ thuật điện tử - viễn thông (Chương trình thiết kế vi mạch) — ngưỡng 22,75/30 kèm điều kiện thuộc nhóm 20% thí sinh có điểm môn Toán cao nhất toàn quốc.',
  '7580101':
    'Kiến trúc — ngưỡng 15,00/30 nhưng phải dự thi môn năng khiếu Vẽ mỹ thuật đạt từ 5,0 (phương thức kết hợp, ngoài phạm vi phương thức thi TN THPT thuần).',
};

export interface HuscExactThresholdResult {
  thresholdMin30: number;
  inScope: boolean;
  outOfScopeReason?: string;
}

/**
 * `programId` là tùy chọn: nếu không truyền, coi như một mã ngành DHT ngưỡng 15,00/30 điển hình
 * (nhánh exact tài liệu hoá rõ chỉ dùng cho nhóm này). Nếu truyền một mã nằm trong
 * `HUSC_OUT_OF_SCOPE_PROGRAMS` ⇒ trả `inScope: false` để evaluator hạ về partial.
 */
export function getHuscExactThreshold(programId?: string): HuscExactThresholdResult {
  if (programId && HUSC_OUT_OF_SCOPE_PROGRAMS[programId]) {
    return { thresholdMin30: HUSC_EXACT_THRESHOLD_30, inScope: false, outOfScopeReason: HUSC_OUT_OF_SCOPE_PROGRAMS[programId] };
  }
  return { thresholdMin30: HUSC_EXACT_THRESHOLD_30, inScope: true };
}
