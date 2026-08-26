import type { AdmissionSource } from '../../core/sourceRegistry';

export const ctumpSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'ctump-quality-threshold-2026',
    publisher: 'Trường Đại học Y Dược Cần Thơ',
    title: 'Thông báo 197/TB-ĐHYDCT: Ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm tương đương xét tuyển đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.ctump.edu.vn/thong-bao-nguong-dam-bao-chat-luong-dau-vao-va-quy-tac-quy-doi-diem-tuong-duong-xet-tuyen-dai-hoc-he-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-25',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];
