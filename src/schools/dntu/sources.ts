import type { AdmissionSource } from '../../core/sourceRegistry';

export const dntuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dntu-cutoff-notice-2026',
    publisher: 'Trường Đại học Công nghệ Đồng Nai (DNTU)',
    title: 'Điểm chuẩn trúng tuyển Đại học chính quy năm 2026',
    url: 'https://dntu.edu.vn/thong-tin-tuyen-sinh-dai-hoc/truong-dai-hoc-cong-nghe-dong-nai-dntu-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt (URL đúng nằm ở prefix "/thong-tin-tuyen-sinh-dai-hoc/", KHÔNG phải "/thong-tin-tuyen-sinh/" — search engine snippet dẫn sai path, phải dò lại từ trang danh mục). Điểm chuẩn PT1 (thi TN THPT), 22 ngành, 3 phương thức: "Tất cả các ngành: từ 15 điểm. Ngành Điều dưỡng và Xét nghiệm y học: từ 18 điểm." Đây là điểm chuẩn TRÚNG TUYỂN thật (đã công bố, không phải ngưỡng nhận hồ sơ). Trang không nêu công thức ĐXT hay việc đã gồm ưu tiên hay chưa — theo tổng hợp thứ cấp cross-check (nhiều báo đăng lại cùng thông báo): "Điểm trúng tuyển = Môn 1 + Môn 2 + Môn 3 + Điểm cộng nếu có", "không áp dụng chênh lệch điểm giữa các tổ hợp xét tuyển" — không tìm lại được nguyên văn trên trang chính (có thể nằm ở trang đề án/thông báo phương thức riêng, chưa dò ra URL đúng). Nguồn im lặng về việc gồm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU).',
  },
];
