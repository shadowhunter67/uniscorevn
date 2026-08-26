import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface PyuSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

export const pyuSources: PyuSource[] = [
  {
    id: 'pyu-admission-score-2026',
    publisher: 'Báo Tuổi Trẻ (cơ quan báo chí nhà nước)',
    title: 'Các ngành sư phạm ở Trường Đại học Phú Yên có điểm sàn 20 điểm',
    url: 'https://tuoitre.vn/cac-nganh-su-pham-o-truong-dai-hoc-phu-yen-co-diem-san-20-diem-100260710185427395.htm',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trường Đại học Phú Yên (PYU) công bố điểm sàn 2026 trên cổng chính thức tuyensinh.pyu.edu.vn/pyu.edu.vn, nhưng WebFetch chỉ đọc được tiêu đề thông báo, không lấy được bảng số. Số liệu đối chiếu trực tiếp qua bài báo Tuổi Trẻ (cơ quan báo chí nhà nước), trích nguyên văn: khối ngành sư phạm (6 ngành: Giáo dục mầm non, Giáo dục tiểu học, Sư phạm toán học, Sư phạm ngữ văn, Sư phạm tiếng Anh, Sư phạm khoa học tự nhiên) điểm sàn 20/30 (CHỈ phương thức thi TN THPT, không xét học bạ/ĐGNL cho khối này); 5 ngành còn lại (Ngôn ngữ Anh, Quản trị kinh doanh, Công nghệ thông tin, Nông nghiệp, Du lịch) điểm sàn 15/30 (thi TN THPT), 18/30 (học bạ), 500 điểm (ĐGNL ĐHQG-HCM).',
  },
];
