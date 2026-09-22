/** TUU 2026 — điểm chuẩn trúng tuyển thật theo MÃ NGÀNH, phương thức 100 (thi TN THPT, đợt 1),
 * ảnh thông báo chính chủ có chữ ký + con dấu (`sources.ts:tuu-cutoff-2026`). Thang điểm 30.
 * Loại trừ Ngôn ngữ Anh (7220201)/QTKD-IPOP (7340101P) (điều kiện phụ Tiếng Anh ≥7,0) và Luật
 * (7380101)/Luật kinh tế (7380107) (điều kiện phụ Toán+Văn ≥6 mỗi môn, tổng ≥18, theo quy định
 * riêng Bộ GDĐT+Bộ Tư pháp) — KHÔNG mô hình hoá trong batch này để giữ nhánh exact đơn giản. */
export const TUU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7310101': 16.28, // Kinh tế
  '7310109': 15.49, // Kinh tế số
  '7310301': 15.5, // Xã hội học
  '7310401': 22.78, // Tâm lý học
  '7310630': 15.84, // Việt Nam học
  '7320105': 21.08, // Truyền thông đại chúng
  '7340101': 15.5, // Quản trị kinh doanh (đại trà)
  '7340120': 17.08, // Kinh doanh quốc tế
  '7340201': 15.6, // Tài chính - Ngân hàng
  '7340205': 16.55, // Công nghệ tài chính
  '7340301': 15.5, // Kế toán
  '7340302': 15.22, // Kiểm toán
  '7340404': 15.5, // Quản trị nhân lực
  '7340408': 15.13, // Quan hệ lao động
  '7340409': 15.12, // Quản lý dự án
  '7460108': 15.38, // Khoa học dữ liệu
  '7480107': 15.09, // Trí tuệ nhân tạo
  '7480201': 19.63, // Công nghệ thông tin
  '7760101': 20.25, // Công tác xã hội
  '7810101': 19.8, // Du lịch
  '7850201': 15.06, // Bảo hộ lao động
};

export const TUU_PROGRAM_LABELS: Record<string, string> = {
  '7310101': 'Kinh tế',
  '7310109': 'Kinh tế số',
  '7310301': 'Xã hội học',
  '7310401': 'Tâm lý học',
  '7310630': 'Việt Nam học',
  '7320105': 'Truyền thông đại chúng',
  '7340101': 'Quản trị kinh doanh',
  '7340120': 'Kinh doanh quốc tế',
  '7340201': 'Tài chính - Ngân hàng',
  '7340205': 'Công nghệ tài chính',
  '7340301': 'Kế toán',
  '7340302': 'Kiểm toán',
  '7340404': 'Quản trị nhân lực',
  '7340408': 'Quan hệ lao động',
  '7340409': 'Quản lý dự án',
  '7460108': 'Khoa học dữ liệu',
  '7480107': 'Trí tuệ nhân tạo',
  '7480201': 'Công nghệ thông tin',
  '7760101': 'Công tác xã hội',
  '7810101': 'Du lịch',
  '7850201': 'Bảo hộ lao động',
};

export type TuuProgramCode = keyof typeof TUU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;

/**
 * Tổ hợp môn KHẢ DỤNG mô hình hoá được cho từng NHÓM ngành (nguồn `sources.ts:tuu-admission-info-2026`,
 * đối chiếu độc lập ảnh VnExpress). Mỗi nhóm ngành thật ra có 6-7 tổ hợp chính thức; danh sách dưới
 * đây loại các tổ hợp còn thiếu trong `SubjectId` (A03, C07, X71 — chưa có trong `core/subjects.ts`),
 * CHỈ liệt kê tổ hợp dùng toàn môn đã hỗ trợ.
 */
export const TUU_MODELED_COMBINATIONS_BY_PROGRAM_CODE: Record<string, readonly string[]> = {
  '7310630': ['A01', 'D01', 'D11', 'D12', 'D14', 'D15', 'X79'], // Việt Nam học
  '7320105': ['A01', 'D01', 'D11', 'D12', 'D14', 'D15', 'X79'], // Truyền thông đại chúng
  '7810101': ['A01', 'D01', 'D11', 'D12', 'D14', 'D15', 'X79'], // Du lịch
  '7310101': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Kinh tế
  '7310109': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Kinh tế số
  '7340101': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Quản trị kinh doanh
  '7340120': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Kinh doanh quốc tế
  '7340201': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Tài chính - Ngân hàng
  '7340205': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Công nghệ tài chính
  '7340301': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Kế toán
  '7340302': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Kiểm toán
  '7340404': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Quản trị nhân lực
  '7340408': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Quan hệ lao động
  '7340409': ['A01', 'D01', 'D07', 'D09', 'D10', 'X25', 'X26'], // Quản lý dự án
  '7310301': ['C00', 'C03', 'D01', 'D14', 'X70'], // Xã hội học
  '7310401': ['C00', 'C03', 'D01', 'D14', 'X70'], // Tâm lý học
  '7760101': ['C00', 'C03', 'D01', 'D14', 'X70'], // Công tác xã hội
  '7460108': ['A00', 'A01', 'C01', 'D01', 'X05', 'X06'], // Khoa học dữ liệu
  '7480107': ['A00', 'A01', 'C01', 'D01', 'X05', 'X06'], // Trí tuệ nhân tạo
  '7480201': ['A00', 'A01', 'C01', 'D01', 'X05', 'X06'], // Công nghệ thông tin
  '7850201': ['A00', 'A01', 'C01', 'D01', 'X05', 'X06'], // Bảo hộ lao động
};
