/** VHU 2026 — điểm chuẩn trúng tuyển thật theo mã ngành, phương thức thi TN THPT
 * (`sources.ts:vhu-cutoff-2026`). Loại 4 mã năng khiếu (Thanh nhạc 7210205, Piano 7210208, Đạo
 * diễn điện ảnh - truyền hình 7210235, Công nghệ điện ảnh - truyền hình 7210302) — dùng tổ hợp
 * năng khiếu/kỳ thi riêng, không có SubjectId tương ứng. */
export const VHU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE: Record<string, number> = {
  '7220201': 15, // Ngôn ngữ Anh
  '7220203': 15, // Ngôn ngữ Pháp
  '7220204': 15, // Ngôn ngữ Trung Quốc
  '7220209': 15, // Ngôn ngữ Nhật
  '7229030': 15, // Văn học
  '7310101': 15, // Kinh tế
  '7310206': 15, // Quan hệ quốc tế
  '7310301': 15, // Xã hội học
  '7310401': 15, // Tâm lý học
  '7310608': 15, // Đông phương học
  '7310612': 15, // Trung Quốc học
  '7310630': 15, // Việt Nam học
  '7320104': 15, // Truyền thông đa phương tiện
  '7320108': 15, // Quan hệ công chúng
  '7340101': 15, // Quản trị kinh doanh
  '7340115': 15, // Marketing
  '7340121': 15, // Kinh doanh thương mại
  '7340122': 15, // Thương mại điện tử
  '7340201': 15, // Tài chính - Ngân hàng
  '7340205': 15, // Công nghệ tài chính
  '7340301': 15, // Kế toán
  '7340302': 15, // Kiểm toán
  '7340404': 15, // Quản trị nhân lực
  '7380101': 20, // Luật
  '7380107': 20, // Luật Kinh tế
  '7420201': 15, // Công nghệ sinh học
  '7480101': 15, // Khoa học máy tính
  '7480102': 15, // Mạng máy tính và Truyền thông
  '7480201': 15, // Công nghệ thông tin
  '7510605': 15, // Logistics và Quản lý chuỗi cung ứng
  '7520207': 15, // Kỹ thuật Điện tử - Viễn thông
  '7520320': 15, // Kỹ thuật môi trường
  '7540101': 15, // Công nghệ thực phẩm
  '7580201': 15, // Kỹ thuật xây dựng
  '7720301': 18, // Điều dưỡng
  '7810101': 15, // Du lịch
  '7810103': 15, // Quản trị dịch vụ du lịch và lữ hành
  '7810201': 15, // Quản trị khách sạn
  '7810202': 15, // Quản trị nhà hàng và dịch vụ ăn uống
};

export const VHU_PROGRAM_LABELS: Record<string, string> = {
  '7220201': 'Ngôn ngữ Anh',
  '7220203': 'Ngôn ngữ Pháp',
  '7220204': 'Ngôn ngữ Trung Quốc',
  '7220209': 'Ngôn ngữ Nhật',
  '7229030': 'Văn học',
  '7310101': 'Kinh tế',
  '7310206': 'Quan hệ quốc tế',
  '7310301': 'Xã hội học',
  '7310401': 'Tâm lý học',
  '7310608': 'Đông phương học',
  '7310612': 'Trung Quốc học',
  '7310630': 'Việt Nam học',
  '7320104': 'Truyền thông đa phương tiện',
  '7320108': 'Quan hệ công chúng',
  '7340101': 'Quản trị kinh doanh',
  '7340115': 'Marketing',
  '7340121': 'Kinh doanh thương mại',
  '7340122': 'Thương mại điện tử',
  '7340201': 'Tài chính - Ngân hàng',
  '7340205': 'Công nghệ tài chính',
  '7340301': 'Kế toán',
  '7340302': 'Kiểm toán',
  '7340404': 'Quản trị nhân lực',
  '7380101': 'Luật',
  '7380107': 'Luật Kinh tế',
  '7420201': 'Công nghệ sinh học',
  '7480101': 'Khoa học máy tính',
  '7480102': 'Mạng máy tính và Truyền thông',
  '7480201': 'Công nghệ thông tin',
  '7510605': 'Logistics và Quản lý chuỗi cung ứng',
  '7520207': 'Kỹ thuật Điện tử - Viễn thông',
  '7520320': 'Kỹ thuật môi trường',
  '7540101': 'Công nghệ thực phẩm',
  '7580201': 'Kỹ thuật xây dựng',
  '7720301': 'Điều dưỡng',
  '7810101': 'Du lịch',
  '7810103': 'Quản trị dịch vụ du lịch và lữ hành',
  '7810201': 'Quản trị khách sạn',
  '7810202': 'Quản trị nhà hàng và dịch vụ ăn uống',
};

export type VhuProgramCode = keyof typeof VHU_THPT_EXAM_THRESHOLD_30_BY_PROGRAM_CODE;
