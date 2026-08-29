/**
 * HMU 2026 (Trường Đại học Y Hà Nội) — ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) theo TỪNG
 * NGÀNH, phương thức xét kết quả thi TN THPT 2026. Nguồn: Thông báo số 3142/TB-ĐHYHN (10/07/2026)
 * — không tìm được bản PDF gốc tải trực tiếp (đã thử tuyensinh.hmu.edu.vn, không có link công khai
 * tới văn bản số hoá); số liệu lấy từ nhiều báo chí chính thống trích dẫn TRỰC TIẾP số hiệu văn bản
 * và khớp nhau tuyệt đối giữa các nguồn độc lập (`sources.ts:hmu-threshold-2026`).
 *
 * Điểm sàn công bố là TỔNG ĐIỂM THÔ 3 môn thi theo tổ hợp xét tuyển, "không nhân hệ số, không tính
 * điểm cộng" — nguồn xác nhận rõ ràng ngưỡng này KHÔNG cộng điểm ưu tiên khu vực/đối tượng và KHÔNG
 * cộng điểm khuyến khích (chứng chỉ ngoại ngữ quốc tế...). Vì vậy nhánh exact so sánh trực tiếp
 * TỔNG THÔ với ngưỡng theo ngành — không cần áp judgment call điểm ưu tiên (khác CTU/UTM/UTT).
 */
export interface HmuProgramThreshold {
  /** Mã ngành (mã xét tuyển) theo danh mục đào tạo. */
  code: string;
  programId: string;
  name: string;
  /** true nếu là chương trình đào tạo tại Phân hiệu Thanh Hoá (cùng mức sàn với ngành gốc Hà Nội). */
  thanhHoaBranch?: boolean;
  /** Tổ hợp xét tuyển hợp lệ cho ngành (chỉ để tham khảo/hiển thị — nhánh exact KHÔNG validate tổ
   * hợp có thuộc danh sách này hay không, xem knowledge gap). */
  combinationIds: readonly string[];
  /** Ngưỡng đảm bảo chất lượng đầu vào — tổng thô 3 môn, thang 30, KHÔNG gồm điểm ưu tiên/điểm cộng. */
  threshold30: number;
}

export const HMU_PROGRAM_THRESHOLDS: readonly HmuProgramThreshold[] = [
  { code: '7720101', programId: 'y-khoa', name: 'Y khoa', combinationIds: ['B00'], threshold30: 24 },
  { code: '7720501', programId: 'rang-ham-mat', name: 'Răng - Hàm - Mặt', combinationIds: ['B00'], threshold30: 24 },
  { code: '7720115', programId: 'y-hoc-co-truyen', name: 'Y học cổ truyền', combinationIds: ['A00', 'B00'], threshold30: 21 },
  { code: '7720110', programId: 'y-hoc-du-phong', name: 'Y học dự phòng', combinationIds: ['A00', 'B00', 'D07'], threshold30: 18 },
  { code: '7720301', programId: 'dieu-duong-tien-tien', name: 'Điều dưỡng (chương trình tiên tiến)', combinationIds: ['A00', 'B00', 'D07'], threshold30: 18 },
  { code: '7720302', programId: 'ho-sinh', name: 'Hộ sinh', combinationIds: ['A00', 'B00', 'D07'], threshold30: 18 },
  { code: '7720401', programId: 'dinh-duong', name: 'Dinh dưỡng', combinationIds: ['A00', 'B00', 'D07'], threshold30: 18 },
  { code: '7720502', programId: 'ky-thuat-phuc-hinh-rang', name: 'Kỹ thuật phục hình răng', combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720601', programId: 'ky-thuat-xet-nghiem-y-hoc', name: 'Kỹ thuật xét nghiệm y học', combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720602', programId: 'ky-thuat-hinh-anh-y-hoc', name: 'Kỹ thuật hình ảnh y học', combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720603', programId: 'ky-thuat-phuc-hoi-chuc-nang', name: 'Kỹ thuật phục hồi chức năng', combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720609', programId: 'khuc-xa-nhan-khoa', name: 'Khúc xạ nhãn khoa', combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720701', programId: 'y-te-cong-cong', name: 'Y tế công cộng', combinationIds: ['A01', 'D01', 'D07', 'D10'], threshold30: 18 },
  { code: '7760101', programId: 'cong-tac-xa-hoi', name: 'Công tác xã hội', combinationIds: ['A01', 'D01', 'D07', 'D10'], threshold30: 17 },
  { code: '7310401', programId: 'tam-ly-hoc', name: 'Tâm lý học', combinationIds: ['A01', 'D01', 'D07', 'D10'], threshold30: 18 },

  // Phân hiệu Thanh Hoá — cùng mức sàn với ngành gốc Hà Nội tương ứng.
  { code: '7720101TH', programId: 'y-khoa-thanh-hoa', name: 'Y khoa (Phân hiệu Thanh Hoá)', thanhHoaBranch: true, combinationIds: ['B00'], threshold30: 24 },
  { code: '7720601TH', programId: 'ky-thuat-xet-nghiem-y-hoc-thanh-hoa', name: 'Kỹ thuật xét nghiệm y học (Phân hiệu Thanh Hoá)', thanhHoaBranch: true, combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720602TH', programId: 'ky-thuat-hinh-anh-y-hoc-thanh-hoa', name: 'Kỹ thuật hình ảnh y học (Phân hiệu Thanh Hoá)', thanhHoaBranch: true, combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720603TH', programId: 'ky-thuat-phuc-hoi-chuc-nang-thanh-hoa', name: 'Kỹ thuật phục hồi chức năng (Phân hiệu Thanh Hoá)', thanhHoaBranch: true, combinationIds: ['A00', 'B00'], threshold30: 18 },
  { code: '7720301TH', programId: 'dieu-duong-thanh-hoa', name: 'Điều dưỡng (Phân hiệu Thanh Hoá)', thanhHoaBranch: true, combinationIds: ['A00', 'B00', 'D07'], threshold30: 18 },
];

export const HMU_THRESHOLD_BY_CODE: ReadonlyMap<string, HmuProgramThreshold> = new Map(
  HMU_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);

export const HMU_THRESHOLD_BY_PROGRAM_ID: ReadonlyMap<string, HmuProgramThreshold> = new Map(
  HMU_PROGRAM_THRESHOLDS.map((entry) => [entry.programId, entry])
);
