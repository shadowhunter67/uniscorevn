/**
 * UTC 2026 — bảng ngưỡng đảm bảo chất lượng đầu vào theo ngành, phương thức xét kết quả thi TN
 * THPT. Nguồn: "NGƯỠNG ĐẢM BẢO CHẤT LƯỢNG ĐẦU VÀO XÉT TUYỂN ĐẠI HỌC CHÍNH QUY NĂM 2026"
 * (`sources.ts:utc-quality-threshold-2026`, thông báo ngày 07/7/2026), trích nguyên văn theo nhóm
 * điểm sàn. Hai cơ sở có ngưỡng khác nhau: Hà Nội (mã GHA) và Phân hiệu TP.HCM (mã GSA).
 *
 * `formulaGroup`: 'standard' = công thức Toán hệ số 2 `(Toán×2 + 2 môn còn lại)×3/4`; 'english' =
 * ngành Ngôn ngữ Anh, KHÔNG nhân hệ số `(Toán + 2 môn còn lại)` (tổng thô 3 môn). Xem
 * `calculator.ts`.
 */
export type UtcCampus = 'hanoi' | 'hcm';
export type UtcFormulaGroup = 'standard' | 'english';

export interface UtcProgramThreshold {
  programId: string;
  name: string;
  campus: UtcCampus;
  threshold30: number;
  formulaGroup: UtcFormulaGroup;
}

export const UTC_PROGRAM_THRESHOLDS: UtcProgramThreshold[] = [
  // --- Cơ sở Hà Nội (GHA) ---
  { programId: 'gha-ngon-ngu-anh', name: 'Ngôn ngữ Anh', campus: 'hanoi', threshold30: 18, formulaGroup: 'english' },
  { programId: 'gha-toan-ung-dung', name: 'Toán ứng dụng', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-kinh-te', name: 'Kinh tế', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-tai-chinh-ngan-hang', name: 'Tài chính - Ngân hàng', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ke-toan', name: 'Kế toán', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-quan-tri-dich-vu-du-lich', name: 'Quản trị dịch vụ du lịch', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-khai-thac-van-tai', name: 'Khai thác vận tải', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-kinh-te-van-tai', name: 'Kinh tế vận tải', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-kinh-te-xay-dung', name: 'Kinh tế xây dựng', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-co-khi', name: 'Kỹ thuật cơ khí', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-nhiet', name: 'Kỹ thuật nhiệt', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-co-khi-dong-luc', name: 'Kỹ thuật cơ khí động lực', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-dien', name: 'Kỹ thuật điện', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-dien-tu-vien-thong', name: 'Kỹ thuật điện tử - viễn thông', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-may-tinh-vi-mach', name: 'Kỹ thuật máy tính (vi mạch)', campus: 'hanoi', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gha-quan-ly-xay-dung', name: 'Quản lý xây dựng', campus: 'hanoi', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gha-kien-truc', name: 'Kiến trúc', campus: 'hanoi', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-xay-dung', name: 'Kỹ thuật xây dựng', campus: 'hanoi', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-moi-truong', name: 'Kỹ thuật môi trường', campus: 'hanoi', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gha-an-toan-giao-thong', name: 'An toàn giao thông', campus: 'hanoi', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gha-khoa-hoc-may-tinh', name: 'Khoa học máy tính', campus: 'hanoi', threshold30: 20, formulaGroup: 'standard' },
  { programId: 'gha-cntt', name: 'Công nghệ thông tin', campus: 'hanoi', threshold30: 20, formulaGroup: 'standard' },
  { programId: 'gha-tri-tue-nhan-tao', name: 'Trí tuệ nhân tạo', campus: 'hanoi', threshold30: 20, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-o-to', name: 'Kỹ thuật ô tô', campus: 'hanoi', threshold30: 20, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-robot', name: 'Kỹ thuật robot', campus: 'hanoi', threshold30: 20, formulaGroup: 'standard' },
  { programId: 'gha-logistics', name: 'Logistics và quản lý chuỗi cung ứng', campus: 'hanoi', threshold30: 21, formulaGroup: 'standard' },
  { programId: 'gha-ky-thuat-co-dien-tu', name: 'Kỹ thuật cơ điện tử', campus: 'hanoi', threshold30: 21, formulaGroup: 'standard' },
  // --- Phân hiệu TP.HCM (GSA) ---
  { programId: 'gsa-ngon-ngu-anh', name: 'Ngôn ngữ Anh', campus: 'hcm', threshold30: 17, formulaGroup: 'english' },
  { programId: 'gsa-quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', campus: 'hcm', threshold30: 17, formulaGroup: 'standard' },
  { programId: 'gsa-tai-chinh-ngan-hang', name: 'Tài chính - Ngân hàng', campus: 'hcm', threshold30: 17, formulaGroup: 'standard' },
  { programId: 'gsa-ke-toan', name: 'Kế toán', campus: 'hcm', threshold30: 17, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-dien', name: 'Kỹ thuật điện', campus: 'hcm', threshold30: 17, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-dien-tu-vien-thong', name: 'Kỹ thuật điện tử - viễn thông', campus: 'hcm', threshold30: 17, formulaGroup: 'standard' },
  { programId: 'gsa-kien-truc', name: 'Kiến trúc', campus: 'hcm', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gsa-quan-ly-do-thi', name: 'Quản lý đô thị', campus: 'hcm', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-xay-dung', name: 'Kỹ thuật xây dựng', campus: 'hcm', threshold30: 16, formulaGroup: 'standard' },
  { programId: 'gsa-kinh-doanh-quoc-te', name: 'Kinh doanh quốc tế', campus: 'hcm', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gsa-khai-thac-van-tai', name: 'Khai thác vận tải', campus: 'hcm', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gsa-kinh-te-van-tai', name: 'Kinh tế vận tải', campus: 'hcm', threshold30: 18, formulaGroup: 'standard' },
  { programId: 'gsa-cntt', name: 'Công nghệ thông tin', campus: 'hcm', threshold30: 19, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-co-dien-tu', name: 'Kỹ thuật cơ điện tử', campus: 'hcm', threshold30: 19, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-o-to', name: 'Kỹ thuật ô tô', campus: 'hcm', threshold30: 19, formulaGroup: 'standard' },
  { programId: 'gsa-ky-thuat-dieu-khien', name: 'Kỹ thuật điều khiển', campus: 'hcm', threshold30: 19, formulaGroup: 'standard' },
  { programId: 'gsa-logistics', name: 'Logistics và quản lý chuỗi cung ứng', campus: 'hcm', threshold30: 20, formulaGroup: 'standard' },
];

const BY_ID = new Map(UTC_PROGRAM_THRESHOLDS.map((p) => [p.programId, p]));

export function getUtcProgramThreshold(programId: string | undefined): UtcProgramThreshold | undefined {
  return programId ? BY_ID.get(programId) : undefined;
}
