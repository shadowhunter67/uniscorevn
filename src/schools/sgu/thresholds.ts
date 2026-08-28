/**
 * SGU 2026 — Bảng "Ngưỡng đầu vào các ngành, chương trình đào tạo" (mục 1), trích nguyên văn
 * Thông báo 1098/TB-HĐTS ngày 10/7/2026 (`sources.ts:sgu-quality-threshold-2026`). Đủ 47 mã xét
 * tuyển, thang 30. Nhóm ngành đào tạo giáo viên (mã 7140xxx và Sư phạm Tiếng Anh 7140231, xem mục
 * 2.1.b) và ngành Luật (7380101, điều kiện phụ mục 2.4 — chuẩn QĐ 678/QĐ-BGDĐT) có điều kiện phụ
 * NGOÀI ngưỡng chung này — KHÔNG đưa vào nhánh exact (`SGU_EXACT_EXCLUDED_PROGRAM_CODES`).
 */
export const SGU_PROGRAM_THRESHOLDS_30: Record<string, number> = {
  '7140114': 16, // Quản lý giáo dục
  '7140201': 20, // Giáo dục Mầm non
  '7140202': 20, // Giáo dục Tiểu học
  '7140205': 20, // Giáo dục chính trị
  '7140209': 23, // Sư phạm Toán học
  '7140211': 20, // Sư phạm Vật lý
  '7140212': 20, // Sư phạm Hoá học
  '7140213': 20, // Sư phạm Sinh học
  '7140217': 20, // Sư phạm Ngữ văn
  '7140218': 20, // Sư phạm Lịch sử
  '7140219': 20, // Sư phạm Địa lý
  '7140221': 19, // Sư phạm Âm nhạc
  '7140222': 19, // Sư phạm Mỹ thuật
  '7140231': 20, // Sư phạm Tiếng Anh
  '7140247': 20, // Sư phạm Khoa học tự nhiên
  '7140249': 20, // Sư phạm Lịch sử - Địa lý
  '7220201': 19, // Ngôn ngữ Anh
  '7220201C': 19, // Ngôn ngữ Anh (CLC)
  '7229010': 16, // Lịch sử
  '7310401': 17, // Tâm lý học
  '7310501': 16, // Địa lý học
  '7310601': 16, // Quốc tế học
  '7310630': 16, // Việt Nam học
  '7320201': 16, // Thông tin - Thư viện
  '7340101': 17, // Quản trị kinh doanh
  '7340101C': 17, // Quản trị kinh doanh (CLC)
  '7340120': 17, // Kinh doanh quốc tế
  '7340201': 17, // Tài chính - Ngân hàng
  '7340301': 17, // Kế toán
  '7340301C': 17, // Kế toán (CLC)
  '7340302': 17, // Kiểm toán
  '7340406': 16, // Quản trị văn phòng
  '7380101': 20, // Luật
  '7440301': 16, // Khoa học môi trường
  '7460108': 18, // Khoa học dữ liệu
  '7460112': 19, // Toán ứng dụng
  '7480103': 16, // Kỹ thuật phần mềm
  '7480107': 16, // Trí tuệ nhân tạo
  '7480201': 16, // Công nghệ thông tin
  '7480201C': 16, // Công nghệ thông tin (CLC)
  '7510301': 16, // Công nghệ kỹ thuật điện, điện tử
  '7510302': 16, // Công nghệ kỹ thuật điện tử - viễn thông
  '7510406': 16, // Công nghệ kỹ thuật môi trường
  '7520201': 16, // Kỹ thuật điện
  '7520207': 16, // Kỹ thuật điện tử - viễn thông (Thiết kế vi mạch)
  '7810101': 16, // Du lịch
  '7810202': 16, // Quản trị nhà hàng và dịch vụ ăn uống
};

/** Ngành đào tạo giáo viên (điều kiện phụ mục 2.1.b) + Luật (điều kiện phụ mục 2.4) — ngoài phạm
 * vi nhánh exact `sgu-thpt-exam-exact-2026`. */
export const SGU_EXACT_EXCLUDED_PROGRAM_CODES = new Set<string>([
  '7140114',
  '7140201',
  '7140202',
  '7140205',
  '7140209',
  '7140211',
  '7140212',
  '7140213',
  '7140217',
  '7140218',
  '7140219',
  '7140221',
  '7140222',
  '7140231',
  '7140247',
  '7140249',
  '7380101',
]);
