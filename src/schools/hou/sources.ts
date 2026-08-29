import type { AdmissionSource } from '../../core/sourceRegistry';

export const houSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hou-threshold-2026',
    publisher: 'Trường Đại học Mở Hà Nội',
    title: 'Ngưỡng bảo đảm chất lượng đầu vào Đại học chính quy năm 2026 và bảng quy đổi tương đương giữa các phương thức xét tuyển',
    url: 'https://hou.edu.vn/tin-tuyen-sinh/truong-dai-hoc-mo-ha-noi-thong-bao-nguong-bao-dam-chat-luong-dau-vao-va-bang-quy-doi-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-2/',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tin tuyển sinh chính thức hou.edu.vn (đã tải trực tiếp qua curl, HTTP 200) — bảng ngưỡng dạng ẢNH PNG gốc (Anh-1-1.png, Anh-2-9.7.png, đọc bằng vision, chữ rõ không cần OCR; cùng ảnh cũng được báo chí đăng lại qua CDN dạng .avif — đã đối chiếu khớp). Bảng liệt kê "Ngưỡng bảo đảm chất lượng đầu vào" cho 22 ngành đào tạo, 4 cột phương thức (Điểm thi TN THPT/Kết hợp năng khiếu vẽ thang 30; Điểm học tập cấp THPT/Kết hợp năng khiếu thang 30; Bài thi đánh giá tư duy TSA thang 100; Bài thi đánh giá năng lực HSA thang 150) — chỉ dùng cột "Điểm thi tốt nghiệp THPT" trong batch này. Ghi chú gốc: "Nhà trường lưu ý, những tổ hợp xét tuyển có môn viết chữ HOA, in ĐẬM được tính hệ số 2. Đối với tổ hợp xét tuyển có hai môn nhân hệ số 2 được tính theo thang điểm 50 đã được quy đổi về thang điểm 30; Thí sinh có tổng điểm các môn thi/bài thi trong tổ hợp xét tuyển cộng điểm ưu tiên khu vực, ưu tiên đối tượng từ mức ngưỡng bảo đảm chất lượng đầu vào trở lên và đáp ứng nguồn tuyển... đủ điều kiện đăng ký xét tuyển." — xác nhận TRỰC TIẾP điểm ưu tiên được cộng vào tổng trước khi so ngưỡng (không im lặng như Phenikaa), nhưng KHÔNG công bố mức điểm ưu tiên cụ thể. Riêng ngành Pháp luật (Luật, Luật quốc tế, Luật kinh tế) có thêm điều kiện phụ: điểm Toán+Văn (tổ hợp có cả 2 môn) >=12/20 hoặc điểm Văn (tổ hợp chỉ có Văn) >=6/10 — CHƯA đưa điều kiện phụ này vào runtime (knowledge gap). Ngưỡng theo ngành (thi TN THPT, thang 30): Thiết kế đồ hoạ/Thiết kế thời trang = 17,00 (tổ hợp năng khiếu vẽ, loại trừ); Kế toán/Tài chính-Ngân hàng/Bảo hiểm/Quản trị kinh doanh = 18,50; Thương mại điện tử/Luật/Luật quốc tế/Luật kinh tế = 20,00; Công nghệ sinh học/Công nghệ thực phẩm = 17,00; Kỹ thuật máy tính = 18,00; Công nghệ thông tin = 19,00; Công nghệ kỹ thuật điện tử-viễn thông/Công nghệ kỹ thuật điều khiển và tự động hóa = 18,00; Kiến trúc/Thiết kế nội thất = 17,00 (năng khiếu vẽ, loại trừ); Quản trị dịch vụ du lịch và lữ hành/Quản trị khách sạn = 18,00; Ngôn ngữ Anh = 19,00 (tổ hợp Tiếng Anh hệ số 2, loại trừ — xem knowledgeGaps.ts); Ngôn ngữ Trung Quốc = 20,00 (tổ hợp Tiếng Trung hệ số 2, loại trừ).',
  },
];
