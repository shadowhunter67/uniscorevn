import type { AdmissionSource } from '../../core/sourceRegistry';

export const hauSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'hau-quality-threshold-2026',
    publisher: 'Trường Đại học Kiến trúc Hà Nội - Hội đồng tuyển sinh',
    title:
      'Quyết định 406/QĐ-ĐHKT-ĐT: Công bố mức điểm nhận hồ sơ xét tuyển đại học hình thức chính quy năm 2026 (phương thức thi TN THPT và phương thức thi tuyển kết hợp với xét tuyển)',
    url: 'https://hau.edu.vn/Quyet-dinh-ve-viec-cong-bo-muc-diem-nhan-ho-so-xet-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026-doi-voi-phuong-thuc-xet-tuyen-dua-vao-ket-qua-thi-tot-nghiep-THPT-nam-2026-va-phuong-thuc-thi-tuyen-ket-hop-voi-xet-tuyen_n4749.html',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
