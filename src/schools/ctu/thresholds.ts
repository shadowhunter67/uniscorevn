import type { SubjectId } from '../../core/subjects';

/**
 * CTU 2026 — điểm sàn đăng ký xét tuyển theo TỪNG MÃ XÉT TUYỂN (điều kiện 2, mục 2.2.1 — phương
 * thức xét điểm thi tốt nghiệp THPT). Nguồn: Phụ lục "ĐIỂM SÀN ĐĂNG KÝ XÉT TUYỂN VÀO ĐẠI HỌC
 * CHÍNH QUY NĂM 2026" (`sources.ts:ctu-appendix-threshold-2026`), căn cứ Thông báo số 2178/TB-ĐHCT
 * (08/7/2026) và Thông báo số 2232/TB-ĐHCT (13/7/2026) của Giám đốc Đại học Cần Thơ — 9 trang, đọc
 * bằng OCR (poppler render + vision) 2026-08-27.
 *
 * `threshold30` so với TỔNG 3 MÔN THÔ theo tổ hợp (thang 30, KHÔNG nhân hệ số, KHÔNG cộng điểm ưu
 * tiên). Đây là ngưỡng ĐKXT (điều kiện CẦN để nộp hồ sơ), KHÔNG phải điểm chuẩn trúng tuyển.
 *
 * `modellable: false` = tổ hợp chứa môn năng khiếu / Tiếng Pháp không có trong `SubjectId`, hoặc
 * ngành có điều kiện năng khiếu riêng (GDMN/GDTC/Kiến trúc) / điều kiện đặc biệt (mã 7480106 VMBD:
 * ngưỡng 22,75 + Toán ≥ 7,5 xác định theo phổ điểm môn Toán). Nhánh exact bỏ qua các mã này.
 */
export type CtuThresholdGroup = 'standard' | 'law' | 'teacher';

export interface CtuProgramThreshold {
  code: string;
  programId: string;
  name: string;
  group: CtuThresholdGroup;
  threshold30: number;
  thptCombos: readonly string[];
  modellable: boolean;
  specialCondition?: string;
}

/** Tổ hợp -> 3 môn (chỉ các tổ hợp CTU dùng mà mọi môn đều có trong `SubjectId`). */
export const CTU_COMBOS: Readonly<Record<string, readonly [SubjectId, SubjectId, SubjectId]>> = {
  A00: ['math', 'physics', 'chemistry'],
  A01: ['math', 'physics', 'english'],
  A02: ['math', 'physics', 'biology'],
  A07: ['math', 'history', 'geography'],
  B00: ['math', 'chemistry', 'biology'],
  B03: ['math', 'biology', 'literature'],
  B08: ['math', 'biology', 'english'],
  C00: ['literature', 'history', 'geography'],
  C01: ['literature', 'math', 'physics'],
  C02: ['literature', 'math', 'chemistry'],
  C03: ['literature', 'math', 'history'],
  C04: ['literature', 'math', 'geography'],
  C14: ['literature', 'math', 'civic-economic-law'],
  C19: ['literature', 'history', 'civic-economic-law'],
  C20: ['literature', 'geography', 'civic-economic-law'],
  D01: ['literature', 'math', 'english'],
  D07: ['math', 'chemistry', 'english'],
  D09: ['math', 'history', 'english'],
  D14: ['literature', 'history', 'english'],
  D15: ['literature', 'geography', 'english'],
  D66: ['literature', 'civic-economic-law', 'english'],
  X01: ['literature', 'math', 'civic-economic-law'],
  X02: ['math', 'literature', 'informatics'],
  X06: ['math', 'physics', 'informatics'],
  X07: ['math', 'physics', 'technology'],
  X10: ['math', 'chemistry', 'informatics'],
  X11: ['math', 'chemistry', 'technology'],
  X12: ['math', 'chemistry', 'technology'],
  X16: ['math', 'biology', 'technology'],
  X25: ['math', 'civic-economic-law', 'english'],
  X26: ['math', 'english', 'informatics'],
  X27: ['math', 'english', 'technology'],
  X28: ['math', 'english', 'technology'],
  X70: ['literature', 'history', 'civic-economic-law'],
  X74: ['literature', 'geography', 'civic-economic-law'],
  X78: ['literature', 'civic-economic-law', 'english'],
};

/**
 * Tổ hợp CTU dùng nhưng có môn KHÔNG nằm trong `SubjectId` (Tiếng Pháp, các môn năng khiếu) —
 * không model điểm cho nhánh exact.
 */
export const CTU_UNMODELLED_COMBOS: readonly string[] = [
  'D03', // Ngữ văn, Toán, Tiếng Pháp
  'D64', // Ngữ văn, Lịch sử, Tiếng Pháp
  'M01', 'M05', 'M06', 'M11', // năng khiếu GDMN
  'T00', 'T01', 'T06', 'T10', // năng khiếu TDTT
  'V00', 'V01', 'V02', 'V03', // vẽ mỹ thuật
];

const NK_GDMN = 'Năng khiếu GDMN ≥ 5,0';
const NK_TDTT = 'Năng khiếu TDTT ≥ 5,0';
const NK_VMT = 'Vẽ mỹ thuật ≥ 5,0';
const VMBD_COND = 'Toán ≥ 7,5 (ngưỡng 22,75 xác định theo phổ điểm môn Toán kỳ thi TN THPT 2026)';

export const CTU_PROGRAM_THRESHOLDS: readonly CtuProgramThreshold[] = [
  // ===== Nhóm ngành đào tạo giáo viên =====
  { code: '7140201', programId: 'teacher-giao-duc-mam-non', name: 'Giáo dục Mầm non', group: 'teacher', threshold30: 20, thptCombos: ['M01', 'M05', 'M06', 'M11'], modellable: false, specialCondition: NK_GDMN },
  { code: '7140202', programId: 'teacher-giao-duc-tieu-hoc', name: 'Giáo dục Tiểu học', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'C01', 'C04', 'D01'], modellable: true },
  { code: '7140204', programId: 'teacher-giao-duc-cong-dan', name: 'Giáo dục Công dân', group: 'teacher', threshold30: 20, thptCombos: ['C00', 'C19', 'D14', 'D15', 'X70'], modellable: true },
  { code: '7140206', programId: 'teacher-giao-duc-the-chat', name: 'Giáo dục Thể chất', group: 'teacher', threshold30: 19, thptCombos: ['T00', 'T01', 'T06', 'T10'], modellable: false, specialCondition: NK_TDTT },
  { code: '7140209', programId: 'teacher-su-pham-toan-hoc', name: 'Sư phạm Toán học', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'A01', 'B08', 'D07'], modellable: true },
  { code: '7140210', programId: 'teacher-su-pham-tin-hoc', name: 'Sư phạm Tin học', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'A01', 'D01', 'X26'], modellable: true },
  { code: '7140211', programId: 'teacher-su-pham-vat-ly', name: 'Sư phạm Vật lý', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'A01', 'A02', 'X06'], modellable: true },
  { code: '7140212', programId: 'teacher-su-pham-hoa-hoc', name: 'Sư phạm Hóa học', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'B00', 'D07', 'X10'], modellable: true },
  { code: '7140213', programId: 'teacher-su-pham-sinh-hoc', name: 'Sư phạm Sinh học', group: 'teacher', threshold30: 20, thptCombos: ['A02', 'B00', 'B03', 'B08'], modellable: true },
  { code: '7140217', programId: 'teacher-su-pham-ngu-van', name: 'Sư phạm Ngữ văn', group: 'teacher', threshold30: 20, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7140218', programId: 'teacher-su-pham-lich-su', name: 'Sư phạm Lịch sử', group: 'teacher', threshold30: 20, thptCombos: ['C00', 'C03', 'C19', 'D14', 'X70'], modellable: true },
  { code: '7140219', programId: 'teacher-su-pham-dia-ly', name: 'Sư phạm Địa lý', group: 'teacher', threshold30: 20, thptCombos: ['A07', 'C00', 'C04', 'D15'], modellable: true },
  { code: '7140231', programId: 'teacher-su-pham-tieng-anh', name: 'Sư phạm Tiếng Anh', group: 'teacher', threshold30: 20, thptCombos: ['D01', 'D14', 'D15', 'D66', 'X78'], modellable: true },
  { code: '7140233', programId: 'teacher-su-pham-tieng-phap', name: 'Sư phạm Tiếng Pháp', group: 'teacher', threshold30: 20, thptCombos: ['D01', 'D03', 'D14', 'D64'], modellable: false, specialCondition: 'Tổ hợp Tiếng Pháp (D03/D64) chưa model được môn Tiếng Pháp' },
  { code: '7140247', programId: 'teacher-su-pham-khtn', name: 'Sư phạm Khoa học tự nhiên', group: 'teacher', threshold30: 20, thptCombos: ['A00', 'A01', 'A02', 'B00'], modellable: true },
  { code: '7140249', programId: 'teacher-su-pham-lich-su-dia-ly', name: 'Sư phạm Lịch sử - Địa lý', group: 'teacher', threshold30: 20, thptCombos: ['C00', 'C19', 'C20', 'D14', 'X70', 'X74'], modellable: true },

  // ===== Nhóm ngành lĩnh vực pháp luật (sàn 20 + điều kiện tổ hợp) =====
  { code: '7380101', programId: 'law-luat', name: 'Luật', group: 'law', threshold30: 20, thptCombos: ['C00', 'C01', 'D01', 'X01'], modellable: true },
  { code: '7380101H', programId: 'law-luat-hau-giang', name: 'Luật - học tại Cơ sở Hậu Giang', group: 'law', threshold30: 20, thptCombos: ['C00', 'C01', 'D01', 'X01'], modellable: true },
  { code: '7380101S', programId: 'law-luat-soc-trang', name: 'Luật - học tại Khu Sóc Trăng', group: 'law', threshold30: 20, thptCombos: ['C00', 'C01', 'D01', 'X01'], modellable: true },
  { code: '7380103', programId: 'law-luat-dan-su', name: 'Luật dân sự và tố tụng dân sự', group: 'law', threshold30: 20, thptCombos: ['C00', 'C01', 'D01', 'X01'], modellable: true },
  { code: '7380107', programId: 'law-luat-kinh-te', name: 'Luật kinh tế', group: 'law', threshold30: 20, thptCombos: ['C00', 'C01', 'D01', 'X01'], modellable: true },

  // ===== Nhóm ngành khác (không GV, không pháp luật) =====
  { code: '7220201', programId: 'std-ngon-ngu-anh', name: 'Ngôn ngữ Anh', group: 'standard', threshold30: 16, thptCombos: ['D01', 'D09', 'D14', 'D15'], modellable: true },
  { code: '7220201C', programId: 'std-ngon-ngu-anh-ctclc', name: 'Ngôn ngữ Anh (CTCLC)', group: 'standard', threshold30: 16, thptCombos: ['D01', 'D09', 'D14', 'D15'], modellable: true },
  { code: '7220201H', programId: 'std-ngon-ngu-anh-hau-giang', name: 'Ngôn ngữ Anh - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['D01', 'D09', 'D14', 'D15'], modellable: true },
  { code: '7220203', programId: 'std-ngon-ngu-phap', name: 'Ngôn ngữ Pháp', group: 'standard', threshold30: 15, thptCombos: ['D01', 'D03', 'D14', 'D64'], modellable: false, specialCondition: 'Tổ hợp Tiếng Pháp (D03/D64) chưa model được môn Tiếng Pháp' },
  { code: '7229001', programId: 'std-triet-hoc', name: 'Triết học', group: 'standard', threshold30: 15, thptCombos: ['C00', 'C19', 'D14', 'D15', 'X70'], modellable: true },
  { code: '7229030', programId: 'std-van-hoc', name: 'Văn học', group: 'standard', threshold30: 15, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7310101', programId: 'std-kinh-te', name: 'Kinh tế', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7310201', programId: 'std-chinh-tri-hoc', name: 'Chính trị học', group: 'standard', threshold30: 15, thptCombos: ['C00', 'C19', 'D14', 'D15', 'X70'], modellable: true },
  { code: '7310301', programId: 'std-xa-hoi-hoc', name: 'Xã hội học', group: 'standard', threshold30: 15, thptCombos: ['C00', 'C19', 'D01', 'X70', 'X74'], modellable: true },
  { code: '7310403', programId: 'std-tam-ly-hoc-giao-duc', name: 'Tâm lý học giáo dục', group: 'standard', threshold30: 15, thptCombos: ['C00', 'C14', 'C20', 'D14', 'X01', 'X74'], modellable: true },
  { code: '7320101', programId: 'std-bao-chi', name: 'Báo chí', group: 'standard', threshold30: 15, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7320104', programId: 'std-truyen-thong-da-phuong-tien', name: 'Truyền thông đa phương tiện', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D01', 'X02'], modellable: true },
  { code: '7320201', programId: 'std-thong-tin-thu-vien', name: 'Thông tin - Thư viện', group: 'standard', threshold30: 15, thptCombos: ['A01', 'C01', 'D01', 'X26'], modellable: true },
  { code: '7340101', programId: 'std-quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340101C', programId: 'std-quan-tri-kinh-doanh-ctclc', name: 'Quản trị kinh doanh (CTCLC)', group: 'standard', threshold30: 16, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7340101H', programId: 'std-quan-tri-kinh-doanh-hau-giang', name: 'Quản trị kinh doanh - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340115', programId: 'std-marketing', name: 'Marketing', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340120', programId: 'std-kinh-doanh-quoc-te', name: 'Kinh doanh quốc tế', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340120C', programId: 'std-kinh-doanh-quoc-te-ctclc', name: 'Kinh doanh quốc tế (CTCLC)', group: 'standard', threshold30: 16, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7340121', programId: 'std-kinh-doanh-thuong-mai', name: 'Kinh doanh thương mại', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340122', programId: 'std-thuong-mai-dien-tu', name: 'Thương mại điện tử', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340201', programId: 'std-tai-chinh-ngan-hang', name: 'Tài chính - Ngân hàng', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340201C', programId: 'std-tai-chinh-ngan-hang-ctclc', name: 'Tài chính - Ngân hàng (CTCLC)', group: 'standard', threshold30: 16, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7340205', programId: 'std-cong-nghe-tai-chinh', name: 'Công nghệ tài chính', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340301', programId: 'std-ke-toan', name: 'Kế toán', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340301S', programId: 'std-ke-toan-soc-trang', name: 'Kế toán - học tại Khu Sóc Trăng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7340302', programId: 'std-kiem-toan', name: 'Kiểm toán', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7420101', programId: 'std-sinh-hoc', name: 'Sinh học', group: 'standard', threshold30: 15, thptCombos: ['A02', 'B00', 'B03', 'B08'], modellable: true },
  { code: '7420201', programId: 'std-cong-nghe-sinh-hoc', name: 'Công nghệ sinh học', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'D07'], modellable: true },
  { code: '7420201T', programId: 'std-cong-nghe-sinh-hoc-cttt', name: 'Công nghệ sinh học (CTTT)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'B08', 'D07', 'X28'], modellable: true },
  { code: '7420203', programId: 'std-sinh-hoc-ung-dung', name: 'Sinh học ứng dụng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'B08'], modellable: true },
  { code: '7440112', programId: 'std-hoa-hoc', name: 'Hóa học', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'C02', 'D07'], modellable: true },
  { code: '7440301', programId: 'std-khoa-hoc-moi-truong', name: 'Khoa học môi trường', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A02', 'B00', 'D07'], modellable: true },
  { code: '7460108', programId: 'std-khoa-hoc-du-lieu', name: 'Khoa học dữ liệu', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7460112', programId: 'std-toan-ung-dung', name: 'Toán ứng dụng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'A02', 'B00'], modellable: true },
  { code: '7460201', programId: 'std-thong-ke', name: 'Thống kê', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'A02', 'B00'], modellable: true },
  { code: '7480101', programId: 'std-khoa-hoc-may-tinh', name: 'Khoa học máy tính', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480102', programId: 'std-mang-may-tinh', name: 'Mạng máy tính và truyền thông dữ liệu', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480102C', programId: 'std-mang-may-tinh-ctclc', name: 'Mạng máy tính và truyền thông dữ liệu (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7480103', programId: 'std-ky-thuat-phan-mem', name: 'Kỹ thuật phần mềm', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480103C', programId: 'std-ky-thuat-phan-mem-ctclc', name: 'Kỹ thuật phần mềm (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7480104', programId: 'std-he-thong-thong-tin', name: 'Hệ thống thông tin', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480104C', programId: 'std-he-thong-thong-tin-ctclc', name: 'Hệ thống thông tin (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7480106', programId: 'std-ky-thuat-may-tinh-vmbd', name: 'Kỹ thuật máy tính (Thiết kế vi mạch bán dẫn)', group: 'standard', threshold30: 22.75, thptCombos: ['A00', 'A01', 'X06', 'X07'], modellable: false, specialCondition: VMBD_COND },
  { code: '7480107', programId: 'std-tri-tue-nhan-tao', name: 'Trí tuệ nhân tạo', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480201', programId: 'std-cong-nghe-thong-tin', name: 'Công nghệ thông tin', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480201C', programId: 'std-cong-nghe-thong-tin-ctclc', name: 'Công nghệ thông tin (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7480201H', programId: 'std-cong-nghe-thong-tin-hau-giang', name: 'Công nghệ thông tin - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7480202', programId: 'std-an-toan-thong-tin', name: 'An toàn thông tin', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X26'], modellable: true },
  { code: '7510401', programId: 'std-cnkt-hoa-hoc', name: 'Công nghệ kỹ thuật hóa học', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'D07', 'X11'], modellable: true },
  { code: '7510401C', programId: 'std-cnkt-hoa-hoc-ctclc', name: 'Công nghệ kỹ thuật hóa học (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X27'], modellable: true },
  { code: '7510601', programId: 'std-quan-ly-cong-nghiep', name: 'Quản lý công nghiệp', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D01', 'X27'], modellable: true },
  { code: '7510605', programId: 'std-logistics', name: 'Logistics và Quản lý chuỗi cung ứng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D01', 'X27'], modellable: true },
  { code: '7510605S', programId: 'std-logistics-soc-trang', name: 'Logistics và Quản lý chuỗi cung ứng - học tại Khu Sóc Trăng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D01', 'X27'], modellable: true },
  { code: '7520103', programId: 'std-ky-thuat-co-khi', name: 'Kỹ thuật cơ khí', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X07'], modellable: true },
  { code: '7520103C', programId: 'std-ky-thuat-co-khi-ctclc', name: 'Kỹ thuật cơ khí (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X26', 'X27'], modellable: true },
  { code: '7520114', programId: 'std-ky-thuat-co-dien-tu', name: 'Kỹ thuật cơ điện tử', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X06'], modellable: true },
  { code: '7520130', programId: 'std-ky-thuat-o-to', name: 'Kỹ thuật ô tô', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X07'], modellable: true },
  { code: '7520201', programId: 'std-ky-thuat-dien', name: 'Kỹ thuật điện', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X06'], modellable: true },
  { code: '7520201C', programId: 'std-ky-thuat-dien-ctclc', name: 'Kỹ thuật điện (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X27'], modellable: true },
  { code: '7520207', programId: 'std-ky-thuat-dien-tu-vien-thong', name: 'Kỹ thuật điện tử - viễn thông', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X06', 'X07'], modellable: true },
  { code: '7520212', programId: 'std-ky-thuat-y-sinh', name: 'Kỹ thuật y sinh', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'A02', 'B08'], modellable: true },
  { code: '7520216', programId: 'std-ky-thuat-dieu-khien-tu-dong-hoa', name: 'Kỹ thuật điều khiển và tự động hóa', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X06'], modellable: true },
  { code: '7520216C', programId: 'std-ky-thuat-dieu-khien-tu-dong-hoa-ctclc', name: 'Kỹ thuật điều khiển và tự động hóa (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X26', 'X27'], modellable: true },
  { code: '7520309', programId: 'std-ky-thuat-vat-lieu', name: 'Kỹ thuật vật liệu', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'D07', 'X11'], modellable: true },
  { code: '7520320', programId: 'std-ky-thuat-moi-truong', name: 'Kỹ thuật môi trường', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
  { code: '7520401', programId: 'std-vat-ly-ky-thuat', name: 'Vật lý kỹ thuật', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'A02', 'C01'], modellable: true },
  { code: '7540101', programId: 'std-cong-nghe-thuc-pham', name: 'Công nghệ thực phẩm', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
  { code: '7540101C', programId: 'std-cong-nghe-thuc-pham-ctclc', name: 'Công nghệ thực phẩm (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'B08', 'D07', 'X27'], modellable: true },
  { code: '7540104', programId: 'std-cong-nghe-sau-thu-hoach', name: 'Công nghệ sau thu hoạch', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
  { code: '7540105', programId: 'std-cong-nghe-che-bien-thuy-san', name: 'Công nghệ chế biến thủy sản', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'X12'], modellable: true },
  { code: '7540106', programId: 'std-dam-bao-chat-luong-attp', name: 'Đảm bảo chất lượng và an toàn thực phẩm', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'X12'], modellable: true },
  { code: '7580101', programId: 'std-kien-truc', name: 'Kiến trúc', group: 'standard', threshold30: 15, thptCombos: ['V00', 'V01', 'V02', 'V03'], modellable: false, specialCondition: NK_VMT },
  { code: '7580105', programId: 'std-quy-hoach-vung-do-thi', name: 'Quy hoạch vùng và đô thị', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
  { code: '7580201', programId: 'std-ky-thuat-xay-dung', name: 'Kỹ thuật xây dựng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'V00', 'X07'], modellable: true, specialCondition: 'Tổ hợp V00 chứa Vẽ mỹ thuật — chỉ model được A00/A01/X07' },
  { code: '7580201C', programId: 'std-ky-thuat-xay-dung-ctclc', name: 'Kỹ thuật xây dựng (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'D07', 'X27'], modellable: true },
  { code: '7580202', programId: 'std-ky-thuat-xay-dung-cong-trinh-thuy', name: 'Kỹ thuật xây dựng công trình thủy', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'V00', 'X07'], modellable: true, specialCondition: 'Tổ hợp V00 chứa Vẽ mỹ thuật — chỉ model được A00/A01/X07' },
  { code: '7580205', programId: 'std-ky-thuat-xay-dung-cong-trinh-giao-thong', name: 'Kỹ thuật xây dựng công trình giao thông', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'V00', 'X07'], modellable: true, specialCondition: 'Tổ hợp V00 chứa Vẽ mỹ thuật — chỉ model được A00/A01/X07' },
  { code: '7580213', programId: 'std-ky-thuat-cap-thoat-nuoc', name: 'Kỹ thuật cấp thoát nước', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B08', 'D07'], modellable: true },
  { code: '7580302', programId: 'std-quan-ly-xay-dung', name: 'Quản lý xây dựng', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'X26', 'X27'], modellable: true },
  { code: '7620103', programId: 'std-khoa-hoc-dat', name: 'Khoa học đất', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'X12', 'X16'], modellable: true },
  { code: '7620105', programId: 'std-chan-nuoi', name: 'Chăn nuôi', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A02', 'B00', 'B08'], modellable: true },
  { code: '7620109', programId: 'std-nong-hoc', name: 'Nông học', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620110', programId: 'std-khoa-hoc-cay-trong', name: 'Khoa học cây trồng', group: 'standard', threshold30: 15, thptCombos: ['A02', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620112', programId: 'std-bao-ve-thuc-vat', name: 'Bảo vệ thực vật', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620112C', programId: 'std-bao-ve-thuc-vat-ctclc', name: 'Bảo vệ thực vật (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'B08'], modellable: true },
  { code: '7620113', programId: 'std-cong-nghe-rau-hoa-qua-canh-quan', name: 'Công nghệ rau hoa quả và cảnh quan', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620114', programId: 'std-kinh-doanh-nong-nghiep', name: 'Kinh doanh nông nghiệp', group: 'standard', threshold30: 15, thptCombos: ['A00', 'C02', 'D01', 'X25'], modellable: true },
  { code: '7620114H', programId: 'std-kinh-doanh-nong-nghiep-hau-giang', name: 'Kinh doanh nông nghiệp - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['A00', 'C02', 'D01', 'X25'], modellable: true },
  { code: '7620115', programId: 'std-kinh-te-nong-nghiep', name: 'Kinh tế nông nghiệp', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7620115H', programId: 'std-kinh-te-nong-nghiep-hau-giang', name: 'Kinh tế nông nghiệp - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7620301', programId: 'std-nuoi-trong-thuy-san', name: 'Nuôi trồng thủy sản', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620301T', programId: 'std-nuoi-trong-thuy-san-cttt', name: 'Nuôi trồng thủy sản (CTTT)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'B08', 'D07', 'X28'], modellable: true },
  { code: '7620302', programId: 'std-benh-hoc-thuy-san', name: 'Bệnh học thủy sản', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7620305', programId: 'std-quan-ly-thuy-san', name: 'Quản lý thủy sản', group: 'standard', threshold30: 15, thptCombos: ['A00', 'B00', 'B08', 'X12'], modellable: true },
  { code: '7640101', programId: 'std-thu-y', name: 'Thú y', group: 'standard', threshold30: 15, thptCombos: ['A02', 'B00', 'D07', 'X12'], modellable: true },
  { code: '7640101C', programId: 'std-thu-y-ctclc', name: 'Thú y (CTCLC)', group: 'standard', threshold30: 15, thptCombos: ['A01', 'B08', 'D07', 'X27'], modellable: true },
  { code: '7720203', programId: 'std-hoa-duoc', name: 'Hóa dược', group: 'standard', threshold30: 16, thptCombos: ['A00', 'B00', 'C02', 'D07'], modellable: true },
  { code: '7810101', programId: 'std-du-lich', name: 'Du lịch', group: 'standard', threshold30: 16, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7810101H', programId: 'std-du-lich-hau-giang', name: 'Du lịch - học tại Cơ sở Hậu Giang', group: 'standard', threshold30: 15, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7810101S', programId: 'std-du-lich-soc-trang', name: 'Du lịch - học tại Khu Sóc Trăng', group: 'standard', threshold30: 15, thptCombos: ['C00', 'D01', 'D14', 'D15'], modellable: true },
  { code: '7810103', programId: 'std-quan-tri-dich-vu-du-lich-lu-hanh', name: 'Quản trị dịch vụ du lịch và lữ hành', group: 'standard', threshold30: 16, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7810103C', programId: 'std-quan-tri-dich-vu-du-lich-lu-hanh-ctclc', name: 'Quản trị dịch vụ du lịch và lữ hành (CTCLC)', group: 'standard', threshold30: 16, thptCombos: ['A01', 'D01', 'D07', 'X26'], modellable: true },
  { code: '7850101', programId: 'std-quan-ly-tai-nguyen-moi-truong', name: 'Quản lý tài nguyên và môi trường', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
  { code: '7850102', programId: 'std-kinh-te-tai-nguyen-thien-nhien', name: 'Kinh tế tài nguyên thiên nhiên', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'C02', 'D01'], modellable: true },
  { code: '7850103', programId: 'std-quan-ly-dat-dai', name: 'Quản lý đất đai', group: 'standard', threshold30: 15, thptCombos: ['A00', 'A01', 'B00', 'D07'], modellable: true },
];

export const CTU_THRESHOLD_BY_CODE: ReadonlyMap<string, CtuProgramThreshold> = new Map(
  CTU_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);

export const CTU_THRESHOLD_BY_PROGRAM_ID: ReadonlyMap<string, CtuProgramThreshold> = new Map(
  CTU_PROGRAM_THRESHOLDS.map((entry) => [entry.programId, entry])
);
