import type { AdmissionSource } from '../../core/sourceRegistry';

export const fptuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'fptu-admission-portal-2026',
    publisher: 'Trường Đại học FPT - Cổng thông tin tuyển sinh',
    title: 'Thông tin tuyển sinh 2026 Trường Đại học FPT',
    url: 'https://daihoc.fpt.edu.vn/tuyen-sinh/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'fptu-admission-methods-2026',
    publisher: 'Trường Đại học FPT',
    title: 'Phương thức tuyển sinh 2026',
    url: 'https://daihoc.fpt.edu.vn/phuong-thuc-tuyen-sinh/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Công bố công thức Điểm kết hợp ĐKH = (Điểm thi TN THPT + Điểm trung bình lớp 12 x 3)/2, tổ hợp Axx/Cxx, ngưỡng tổ hợp thô tối thiểu 15,0/30, và tối đa 30 điểm ĐXT sau khuyến khích/ưu tiên. Không định nghĩa rõ phạm vi "điểm trung bình lớp 12".',
  },
  {
    id: 'fptu-quality-threshold-2026',
    publisher: 'Trường Đại học FPT',
    title: 'Trường Đại học FPT công bố điểm sàn xét tuyển hệ đại học chính quy năm 2026',
    url: 'https://daihoc.fpt.edu.vn/tin-tuc/truong-dai-hoc-fpt-cong-bo-diem-san-xet-tuyen-he-dai-hoc-chinh-quy-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ngưỡng ĐXT công bố 18,0/30 (đa số ngành, mọi cơ sở), 21,0/30 (Cử nhân tài năng Khoa học máy tính). Runtime chỉ kiểm ngưỡng tổ hợp thô 15,0/30 do công thức ĐXT còn mơ hồ (xem knowledgeGaps).',
  },
];
