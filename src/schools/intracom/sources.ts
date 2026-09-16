import type { AdmissionSource } from '../../core/sourceRegistry';

export const intracomSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'intracom-threshold-notice-2026',
    publisher: 'Trường Đại học Intracom (INU, tiền thân Trường Đại học Chu Văn An)',
    title: 'Trường Đại học Intracom công bố ngưỡng điểm xét tuyển năm 2026',
    url: 'https://intracomuni.edu.vn/tin-tuyen-sinh/truong-dai-hoc-intracom-cong-bo-nguong-diem-xet-tuyen-nam-2026/',
    accessedAt: '2026-09-16',
    publishedAt: '2026-07-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt, trang chính thức intracomuni.edu.vn. Nguyên văn: "các ngành có ngưỡng điểm xét tuyển 15 điểm gồm: Quản trị kinh doanh, Tài chính - Ngân hàng, Kế toán, Kỹ thuật điện, Kỹ thuật xây dựng, Công nghệ thông tin, Kỹ thuật cơ khí, Kiến trúc, Ngôn ngữ Anh, Ngôn ngữ Trung Quốc, Du lịch, Quản trị khách sạn và Quản lý dự án. Ngành Luật Kinh tế có ngưỡng điểm xét tuyển 20 điểm." Không nêu công thức ĐXT hay việc đã gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU khi im lặng). Xác nhận id catalog `intracom` (đã dedupe khỏi `cvauni` trùng lặp, xem UNIVERSITY_EXPANSION.md 2026-09-16) là đúng — trường hiện hoạt động dưới tên/domain Intracom University.',
  },
];
