/** USTH 2026 — điểm chuẩn trúng tuyển thật theo mã ngành, phương thức mã 100 (thi TN THPT)
 * (`sources.ts:usth-cutoff-2026`). Loại `7520120` (Kỹ thuật Hàng không) — không xét tuyển qua
 * phương thức này (chỉ ĐGNL/phỏng vấn/xét thẳng, thang 100). Các chương trình song bằng cũng
 * không xét PT4 (thang 100 riêng) — không đưa vào bảng này. */
export const USTH_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7420201': 20.25, // Công nghệ sinh học - Phát triển thuốc
  '7440112': 19.0, // Hóa học
  '7440122': 20.0, // Khoa học vật liệu tiên tiến và Công nghệ Nano
  '7440301': 19.35, // Khoa học Môi trường Ứng dụng
  '7460108': 20.0, // Khoa học dữ liệu
  '7460112': 20.5, // Toán ứng dụng
  '7480201': 20.0, // Công nghệ thông tin - Truyền thông
  '7480202': 20.25, // An toàn thông tin
  '7510203': 21.5, // Công nghệ Kỹ thuật Cơ điện tử
  '7520121': 19.75, // Khoa học Vũ trụ và Công nghệ Vệ tinh
  '7520130': 19.0, // Kỹ thuật ô tô
  '7520201': 20.5, // Kỹ thuật điện và Năng lượng tái tạo
  '7520401': 23.0, // Công nghệ vi mạch bán dẫn
  '7540101': 19.45, // Khoa học và Công nghệ thực phẩm
  '7720201': 21.28, // Dược học
  '7720601': 20.0, // Khoa học và Công nghệ y khoa
};

export const USTH_PROGRAM_LABELS: Record<string, string> = {
  '7420201': 'Công nghệ sinh học - Phát triển thuốc',
  '7440112': 'Hóa học',
  '7440122': 'Khoa học vật liệu tiên tiến và Công nghệ Nano',
  '7440301': 'Khoa học Môi trường Ứng dụng',
  '7460108': 'Khoa học dữ liệu',
  '7460112': 'Toán ứng dụng',
  '7480201': 'Công nghệ thông tin - Truyền thông',
  '7480202': 'An toàn thông tin',
  '7510203': 'Công nghệ Kỹ thuật Cơ điện tử',
  '7520121': 'Khoa học Vũ trụ và Công nghệ Vệ tinh',
  '7520130': 'Kỹ thuật ô tô',
  '7520201': 'Kỹ thuật điện và Năng lượng tái tạo',
  '7520401': 'Công nghệ vi mạch bán dẫn',
  '7540101': 'Khoa học và Công nghệ thực phẩm',
  '7720201': 'Dược học',
  '7720601': 'Khoa học và Công nghệ y khoa',
};

export type UsthProgramCode = keyof typeof USTH_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;
