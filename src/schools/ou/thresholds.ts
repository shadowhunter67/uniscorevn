/**
 * OU 2026 — Phụ lục "Ngưỡng đảm bảo chất lượng đầu vào đối với phương thức xét tuyển bằng điểm
 * thi tốt nghiệp THPT năm 2026", trích nguyên văn Thông báo chính thức
 * (`sources.ts:ou-quality-threshold-2026`). Ghi chú đầu phụ lục: "Tổng điểm 3 bài thi/môn thi theo
 * thang điểm 30, KHÔNG nhân hệ số, KHÔNG tính cộng điểm cộng, điểm ưu tiên." — chỉ đưa vào phạm vi
 * exact 39 mã "chương trình chuẩn" KHÔNG có hậu tố (loại Luật/Luật kinh tế — điều kiện phụ Toán/Văn
 * ≥60%; Ngôn ngữ Anh — điều kiện phụ Tiếng Anh ≥60%; "C" Chương trình Tiên tiến — có thể cần chứng
 * chỉ ngoại ngữ thay thế; "D" Phân hiệu Đồng Nai và CTLK quốc tế — biến thể riêng, ngoài phạm vi).
 */
export const OU_PROGRAM_THRESHOLDS_30: Record<string, number> = {
  '7340101': 16, // Quản trị kinh doanh
  '7340115': 17, // Marketing
  '7340120': 17, // Kinh doanh quốc tế
  '7810101': 17, // Du lịch
  '7340404': 17, // Quản trị nhân lực
  '7510605': 17, // Logistics và quản lý chuỗi cung ứng
  '7320104': 16, // Truyền thông đa phương tiện
  '7340201': 16, // Tài chính - Ngân hàng
  '7340204': 15, // Bảo hiểm
  '7340205': 16, // Công nghệ tài chính
  '7340301': 16, // Kế toán
  '7340302': 16, // Kiểm toán
  '7420201': 15, // Công nghệ sinh học
  '7420203': 15, // Sinh học ứng dụng
  '7540101': 16, // Công nghệ thực phẩm
  '7460108': 16, // Khoa học dữ liệu
  '7460112': 15, // Toán Ứng dụng
  '7480101': 17, // Khoa học máy tính
  '7480107': 17, // Trí tuệ nhân tạo
  '7480103': 17, // Kỹ thuật phần mềm
  '7480201': 17, // Công nghệ thông tin
  '7480202': 16, // An toàn thông tin
  '7340405': 16, // Hệ thống thông tin quản lý
  '7510102': 15, // Công nghệ kỹ thuật công trình xây dựng
  '7580302': 15, // Quản lý xây dựng
  '7580201': 15, // Kỹ thuật xây dựng
  '7220204': 17, // Ngôn ngữ Trung Quốc
  '7220209': 16, // Ngôn ngữ Nhật
  '7220210': 17, // Ngôn ngữ Hàn Quốc
  '7140103': 15, // Công nghệ giáo dục
  '7310101': 16, // Kinh tế
  '7310104': 15, // Kinh tế đầu tư
  '7340403': 15, // Quản lý công
  '7310301': 16, // Xã hội học
  '7310401': 17, // Tâm lý học
  '7310620': 16, // Đông Nam Á học
  '7760101': 16, // Công tác xã hội
};
