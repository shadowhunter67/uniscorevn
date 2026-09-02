import type { AdmissionSource } from '../../core/sourceRegistry';

export const hunreSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hunre-threshold-2025',
    publisher: 'Viettelstore.vn (tường thuật thông báo chính thức Trường Đại học Tài nguyên và Môi trường Hà Nội)',
    title: 'Điểm chuẩn Đại học Tài nguyên và Môi trường Hà Nội (DMT) 2025 mới nhất – Chi tiết theo từng ngành',
    url: 'https://viettelstore.vn/tin-tuc/diem-chuan-dai-hoc-tai-nguyen-va-moi-truong-ha-noi-dmt-2025-moi-nhat-chi-tiet-theo-tung-nganh',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn phương thức xét kết quả thi TN THPT, trích nguyên văn ghi chú của trang: "Mức điểm chuẩn dưới đây đã bao gồm điểm ưu tiên (nếu có)" — xác nhận TRỰC TIẾP đã cộng ưu tiên, khớp câu tương đương trên Cellphones/Sforum ("Điểm chuẩn... là tổng điểm tổ hợp xét tuyển cộng điểm ưu tiên (nếu có)"). Bảng điểm chuẩn (thang 30, 22 ngành): Marketing 26,65; Logistics và Quản lý chuỗi cung ứng 26,50; Ngôn ngữ Anh 26,40; Quản trị kinh doanh 26,00; Quản trị dịch vụ du lịch và lữ hành 25,60; Quản trị khách sạn 25,60; Luật 25,50; Kế toán 25,25; Công nghệ thông tin 24,35; Bất động sản 23,85; Quản lý đất đai 23,50; Quản lý tài nguyên và môi trường 21,25; Công nghệ kỹ thuật môi trường 15,50; Khí tượng và khí hậu học, Thủy văn học, Biến đổi khí hậu và phát triển bền vững, Kỹ thuật địa chất, Kỹ thuật trắc địa – bản đồ, Đảm bảo chất lượng và an toàn thực phẩm, Kinh tế tài nguyên thiên nhiên, Quản lý tài nguyên nước, Quản lý biển đều 15,00 (mức sàn). Nguồn KHÔNG hiển thị cột tổ hợp riêng cho từng dòng — chỉ 1 mức/ngành. Mã ngành đối chiếu qua tuyensinh247 (đăng lại danh mục ngành + mã ngành chuẩn quốc gia của trường).',
  },
  {
    id: 'hunre-threshold-secondary-2025',
    publisher: 'Giaoduc.net.vn (tường thuật thông báo chính thức Trường Đại học Tài nguyên và Môi trường Hà Nội, thông báo số 2468/TB-TĐHHN 23/07/2025)',
    title: 'Điểm chuẩn Trường Đại học Tài nguyên và Môi trường Hà Nội năm 2025: Ngành Marketing cao nhất',
    url: 'https://giaoduc.net.vn/diem-chuan-truong-dai-hoc-tai-nguyen-va-moi-truong-ha-noi-nam-2025-nganh-marketing-cao-nhat-post253935.gd',
    accessedAt: '2026-09-02',
    publishedAt: '2025-08-22',
    sourceType: 'secondary',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Cross-check độc lập với `hunre-threshold-2025` (Viettelstore) — trích nguyên văn "mức điểm trúng tuyển... năm 2025 dao động từ 15 đến 26,65 điểm (tùy ngành)" và xác nhận Marketing là ngành cao nhất — khớp TUYỆT ĐỐI dải điểm và ngành cao nhất với bảng chính. Một tìm kiếm riêng xác nhận thêm: "ngưỡng điểm chuẩn cho tổ hợp D01... dao động từ 15 đến 26,65 điểm tùy ngành" — cơ sở để modeled AN TOÀN chỉ với tổ hợp D01 (không suy đoán các tổ hợp khác của trường cho đúng năm 2025). Nguồn gốc chính thức (hunre.edu.vn, chinhphu.vn) có đăng thông báo (số 2468/TB-TĐHHN) nhưng bảng chi tiết là ẢNH.',
  },
];
