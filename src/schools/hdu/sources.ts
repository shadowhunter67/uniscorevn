import type { AdmissionSource } from '../../core/sourceRegistry';

export const hduSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hdu-admission-2026',
    publisher: 'Trường Đại học Hồng Đức',
    title: 'Thông tin tuyển sinh đào tạo trình độ đại học năm 2026',
    url: 'https://tuyensinh.hdu.edu.vn/thong-tin-tuyen-sinh-dao-tao-trinh-do-dai-hoc-nam-2026',
    accessedAt: '2026-08-24',
    publishedAt: '2026-01-17',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];

/**
 * Trang chính thức nêu 4 phương thức xét tuyển (PT1 THPT, PT2 học bạ - không áp dụng ngành sư
 * phạm, PT3 tuyển thẳng theo quy định Bộ GDĐT, PT4 điểm thi đánh giá năng lực/tư duy). Chỉ ngành
 * Luật/Luật Kinh tế đã công bố ngưỡng cụ thể (18,0/30, Văn >= 6,0); các ngành khác ghi "xác định và
 * công bố sau khi có kết quả thi", ngành sư phạm theo ngưỡng Bộ GDĐT chưa công bố.
 */
