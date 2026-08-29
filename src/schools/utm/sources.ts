import type { AdmissionSource } from '../../core/sourceRegistry';

export const utmSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'utm-threshold-2026',
    publisher: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị',
    title: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026',
    url: 'https://utm.edu.vn/truong-dai-hoc-cong-nghe-va-quan-ly-huu-nghi-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026-1132.html',
    accessedAt: '2026-08-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức (curl 2026-08-29, HTTP 200, khắc phục lần trước bị 403 bằng User-Agent trình duyệt thật). Đăng 06-07-2026. Nội dung xác nhận NGUYÊN VĂN: "1. Đối với phương thức sử dụng kết quả thi tốt nghiệp THPT năm 2026 - Các ngành đào tạo: từ 15 điểm. - Ngành Luật và Luật kinh tế: theo quy định của Bộ Giáo dục và Đào tạo" ; "2. Đối với phương thức sử dụng kết quả học tập cấp THPT (học bạ) - Các ngành đào tạo: từ 18 điểm. - Ngành Luật và Luật kinh tế: theo quy định của Bộ Giáo dục và Đào tạo" ; "3. Đối với phương thức sử dụng kết quả thi đánh giá năng lực - Các ngành Đào tạo: từ 60 điểm trở lên. - Ngành Luật và Luật kinh tế: theo quy định của Bộ Giáo dục và Đào tạo". Trang KHÔNG nhắc tới điểm ưu tiên khu vực/đối tượng theo hướng nào (không loại trừ trực tiếp như Đại Nam) — áp judgment call chuẩn quốc gia cho nhánh exact (xem `priority.ts`). Không có bảng ngành/tổ hợp hay điểm cộng thành tích.',
  },
];
