import type { AdmissionSource } from '../../core/sourceRegistry';

export const tbuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'tbu-quality-threshold-2026',
    publisher: 'Trường Đại học Thái Bình',
    title: 'Trường Đại học Thái Bình thông báo ngưỡng đảm bảo chất lượng đầu vào, điểm trúng tuyển và quy đổi tương đương giữa các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://tbu.edu.vn/truong-dai-hoc-thai-binh-thong-bao-nguong-dam-bao-chat-luong-dau-vao-diem-trung-tuyen-va-quy-doi-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-ch.html',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-08',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
