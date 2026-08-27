import type { AdmissionSource } from '../../core/sourceRegistry';

export const vinhuniSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vinhuni-quality-threshold-conversion-2026',
    publisher: 'Trường Đại học Vinh',
    title: 'Ngưỡng bảo đảm chất lượng đầu vào và quy tắc quy đổi tương đương để xét tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.vinhuni.edu.vn/cac-nganh-dai-hoc-chinh-quy/seo/nguong-bao-dam-chat-luong-dau-vao-va-quy-tac-quy-doi-tuong-duong-de-xet-tuyen-dai-hoc-chinh-quy-nam-2026-144967',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang thông báo + Phụ lục 1 PDF đính kèm (tuyensinh.vinhuni.edu.vn/DATA/71/upload/1/documents/2026/07/nguongdbcl2026.pdf, 5 trang, đọc trực tiếp qua browser). Công thức PT100 "Điểm xét tuyển = [Điểm thi + Điểm thưởng] + Điểm ưu tiên" (mục I.1); Phụ lục 1 có bảng ngưỡng theo từng mã ngành (nhóm GV 21-23, ngoài GV 15-20); Phụ lục 2 bảng tổ hợp.',
  },
  {
    id: 'vinhuni-admission-adjustment-2026',
    publisher: 'Trường Đại học Vinh',
    title: 'Điều chỉnh Thông tin tuyển sinh đại học chính quy năm 2026',
    url: 'https://tuyensinh.vinhuni.edu.vn/tin-tuc-tuyen-sinh/seo/dieu-chinh-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-144834',
    accessedAt: '2026-08-22',
    publishedAt: '2026-06-27',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
