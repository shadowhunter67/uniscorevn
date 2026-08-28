/**
 * VNU-UMP 2026 — Ngưỡng đảm bảo chất lượng (ĐBCL) đầu vào theo ngành, phương thức thi TN THPT
 * (96% chỉ tiêu). Thông báo 2468/TB-ĐHYD (08/07/2026, "Về ngưỡng đảm bảo chất lượng đầu vào và
 * quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026",
 * `vnuump-thongbao-2468-2026`, PDF chính thức đọc trực tiếp qua vision) mục 1 công bố bảng:
 *
 * | Ngành                          | Mức điểm | Mã tổ hợp |
 * |---------------------------------|----------|-----------|
 * | Y khoa                          | 22,0     | B00, D08  |
 * | Răng - Hàm - Mặt                | 22,0     | B00, D08  |
 * | Dược học                        | 20,0     | A00, D07  |
 * | Kỹ thuật xét nghiệm y học        | 19,0     | B00, D08  |
 * | Kỹ thuật hình ảnh y học          | 19,0     | B00, D08  |
 * | Điều dưỡng                       | 19,0     | B00, D08  |
 *
 * Nguyên văn mục 1: "Ngưỡng đảm bảo chất lượng đầu vào từ điểm thi tốt nghiệp trung học phổ thông
 * ... đối với thí sinh khu vực 3 có mức điểm tối thiểu (không nhân hệ số) của tất cả các tổ hợp
 * gồm 3 bài thi/môn, không tính điểm cộng, không phân biệt kết quả thi của thí sinh học chương
 * trình năm 2006 và 2018." — tức mức điểm nêu là mức SÀN THÔ cho thí sinh khu vực 3 (điểm ưu tiên
 * khu vực = 0); trang chủ tuyển sinh 2026 (`vnuump-admission-notice-2026`) xác nhận công thức chung
 * "điểm xét tuyển được xác định bằng tổng điểm các môn thi ... cộng điểm cộng và điểm ưu tiên đối
 * tượng/khu vực (nếu có)" theo Điều 7 Quy chế tuyển sinh của Bộ GD&ĐT — nghĩa là điểm ưu tiên CỘNG
 * vào tổng thô trước khi so với cùng 1 mức sàn tuyệt đối này (thí sinh KV3 có ưu tiên = 0 nên tổng
 * = thô, khớp cách nêu "đối với thí sinh khu vực 3"). Mục 2: "Không có chênh lệch điểm xét tuyển,
 * điểm trúng tuyển giữa các tổ hợp xét tuyển."
 */
export type VnuumpProgramId = 'y-khoa' | 'rang-ham-mat' | 'duoc-hoc' | 'ky-thuat-xet-nghiem' | 'ky-thuat-hinh-anh' | 'dieu-duong';

export interface VnuumpProgramThreshold {
  programId: VnuumpProgramId;
  programName: string;
  min30: number;
}

export const VNUUMP_PROGRAM_THRESHOLDS_2026: readonly VnuumpProgramThreshold[] = [
  { programId: 'y-khoa', programName: 'Y khoa', min30: 22 },
  { programId: 'rang-ham-mat', programName: 'Răng - Hàm - Mặt', min30: 22 },
  { programId: 'duoc-hoc', programName: 'Dược học', min30: 20 },
  { programId: 'ky-thuat-xet-nghiem', programName: 'Kỹ thuật xét nghiệm y học', min30: 19 },
  { programId: 'ky-thuat-hinh-anh', programName: 'Kỹ thuật hình ảnh y học', min30: 19 },
  { programId: 'dieu-duong', programName: 'Điều dưỡng', min30: 19 },
];

export function getVnuumpProgramThreshold(programId?: string): VnuumpProgramThreshold | undefined {
  return VNUUMP_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
