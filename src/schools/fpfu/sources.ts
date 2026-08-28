import type { AdmissionSource } from '../../core/sourceRegistry';

export const fpfuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'fpfu-official-notice-2026',
    publisher: 'Trường Đại học Phòng cháy Chữa cháy',
    title: 'Thông tin tuyển sinh năm 2026 đại học ngoài ngành Công an (hệ dân sự)',
    url: 'https://daihocpccc.bocongan.gov.vn/?p=210262',
    accessedAt: '2026-08-28',
    sourceType: 'official-admission',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang gốc daihocpccc.bocongan.gov.vn không fetch trực tiếp được (DNS bị chặn trong môi trường research, xác nhận lại 2026-08-28). Nội dung công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu tiên (điểm ưu tiên khu vực/đối tượng theo Điều 7 Thông tư 06/2026/TT-BGDĐT, trường không cộng điểm ưu tiên cho phương thức xét học bạ) được xác nhận qua 2 lượt tra cứu độc lập cùng khớp chi tiết cụ thể (mốc thời gian nộp hồ sơ, cách diễn đạt).',
  },
  {
    id: 'fpfu-quality-threshold-2026',
    publisher: 'Báo Dân Trí / VietNamNet (báo nhà nước, đưa tin ngưỡng điểm hệ dân sự)',
    title: 'Một trường Công an lấy 15 điểm hệ dân sự, tuyển 250 chỉ tiêu',
    url: 'https://dantri.com.vn/giao-duc/mot-truong-cong-an-lay-15-diem-he-dan-su-tuyen-250-chi-tieu-20260811130931364.htm',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-11',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
