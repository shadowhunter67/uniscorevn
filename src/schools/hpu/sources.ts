import type { AdmissionSource } from '../../core/sourceRegistry';

export const hpuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hpu-cutoff-notice-2026',
    publisher: 'Trường Đại học Quản lý và Công nghệ Hải Phòng (HPU)',
    title: 'Điểm trúng tuyển đại học chính quy Đợt 1 năm 2026',
    url: 'https://hpu.edu.vn/blogs/thong-tin-tuyen-sinh/diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026-dai-hoc-hpu',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-13',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt. Bảng "1. Điểm trúng tuyển theo kết quả thi tốt nghiệp THPT" đầy đủ mã ngành, 7 nhóm ngành: 7480201 CNTT=16,0; 7510301 CNKT Điện-Điện tử=18,0; 7520320 Kỹ thuật môi trường=15,0; 7340101 QTKD=18,5; 7310630 Việt Nam học=16,0; 7220201 Ngôn ngữ Anh=15,0; 7220204 Ngôn ngữ Trung Quốc=16,0. Đây là điểm chuẩn TRÚNG TUYỂN thật (đã công bố 13/8/2026, ký TS. Nguyễn Tiến Thanh). Không nói rõ đã gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU/DNTU khi im lặng). Không có bảng tổ hợp môn theo từng ngành trên trang — model theo tổ hợp CHUNG trong taxonomy hiện có.',
  },
];
