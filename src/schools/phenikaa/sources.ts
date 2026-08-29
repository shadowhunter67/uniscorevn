import type { AdmissionSource } from '../../core/sourceRegistry';

export const phenikaaSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'phenikaa-threshold-2026',
    publisher: 'Trường Đại học Phenikaa',
    title: 'Đại học Phenikaa công bố ngưỡng điểm nhận hồ sơ xét tuyển đại học hệ chính quy đợt 1 năm 2026',
    url: 'https://phenikaa-uni.edu.vn/vi/post/tuyen-sinh/tin-tuyen-sinh/dai-hoc-phenikaa-cong-bo-nguong-diem-nhan-ho-so-xet-tuyen-dai-hoc-he-chinh-quy-dot-1-nam-2026',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang CMS Next.js — nội dung JSON nhúng trong __NEXT_DATA__ (đã tải trực tiếp qua curl, HTTP 200) trỏ tới bảng ngưỡng dạng ẢNH JPG (diem-san-dot-1.jpg, đọc bằng vision, chữ rõ không cần OCR). Bảng liệt kê ngưỡng theo LĨNH VỰC/NGÀNH cụ thể (nêu đích danh từng ngành) cho 5 cột phương thức (thi TN THPT thang 30, học bạ THPT, ĐGTD/TSA, ĐGNL/HSA, kỳ thi SPT, kỳ thi V-SAT) — chỉ dùng cột "Điểm thi tốt nghiệp THPT 2026" trong batch này. Văn bản: "Đối với 02 chương trình đào tạo (CTĐT) tài năng theo Đề án của Chính phủ [Khoa học máy tính, Khoa học và công nghệ bán dẫn]: Không nhân hệ số, không tính điểm cộng, điểm ưu tiên khu vực và đối tượng, không tính điểm quy đổi từ chứng chỉ ngoại ngữ quốc tế" (ngưỡng 24/30, priority = 0 tuyệt đối, không phải judgment call). "Đối với thí sinh ở khu vực 3 đăng ký xét tuyển vào các ngành/CTĐT khác: Đạt ngưỡng đầu vào... không nhân hệ số, không tính điểm cộng, không phân biệt kết quả thi của thí sinh học chương trình 2006 và 2018" — nguồn im lặng về điểm ưu tiên khu vực/đối tượng cho các ngành còn lại (judgment call chuẩn quốc gia áp cho hiển thị, ngưỡng so với tổng thô). Bảng: 2 CTĐT tài năng = 24; Pháp luật (Luật kinh tế/Luật kinh doanh/Luật/Luật quốc tế/Luật thương mại quốc tế/Luật hình sự và tố tụng hình sự) = 20; Sức khỏe Y khoa/Răng Hàm Mặt = 22; Sức khỏe Y học cổ truyền/Dược = 20; Sức khỏe Điều dưỡng/Hộ sinh/Kỹ thuật xét nghiệm y học/Kỹ thuật hình ảnh y học/Kỹ thuật phục hồi chức năng = 18; các ngành/CTĐT khác = 15.',
  },
];
