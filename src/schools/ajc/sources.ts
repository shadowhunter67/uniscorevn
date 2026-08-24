import type { AdmissionSource } from '../../core/sourceRegistry';

export const ajcSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'ajc-admission-2026',
    publisher: 'Học viện Báo chí và Tuyên truyền',
    title: 'Trang thông tin tuyển sinh 2026',
    url: 'https://ajc.hcma.vn/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng chính thức AJC. Báo chí đối chiếu (vnexpress.net, baolamdong.vn) xác nhận 3 phương thức (xét tuyển thẳng/ưu tiên; kết hợp học bạ + IELTS/SAT; điểm thi TN THPT), 2.150 chỉ tiêu, điều kiện học lực/hạnh kiểm, và công thức điểm xét tuyển đầy đủ (chưa nhập điểm cộng/ưu tiên vào runtime).',
  },
  {
    id: 'ajc-threshold-notice-2026',
    publisher: 'Học viện Báo chí và Tuyên truyền',
    title: 'Thông báo 293/TB-HVBCTT-ĐT: Ngưỡng đảm bảo chất lượng đầu vào và Bảng quy đổi tương đương mức điểm chuẩn giữa các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://ajc.hcma.vn/thong-bao-nguong-dam-bao-chat-luong-dau-vao-va-bang-quy-doi-tuong-duong-muc-diem-chuan-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-15139.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'official-source-available',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang thông báo chính thức xác nhận số hiệu, ngày ban hành (10/07/2026 09:12). File PDF đính kèm trỏ tới host nội bộ (ajc-app:1002) không truy cập công khai được, nên 2 mức ngưỡng được đối chiếu chéo qua 2 nguồn báo chí độc lập (thuvienphapluat.vn, huongnghiep.hocmai.vn), khớp nhau: nhóm Báo chí-Xuất bản 25/40 (Văn hệ số 2); các nhóm Lý luận, Lịch sử, Truyền thông-Quảng cáo-Quan hệ quốc tế 18/30. Giữ nguyên so với 2025.',
  },
];
