import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface DhvSource {
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

export const dhvSources: DhvSource[] = [
  {
    id: 'dhv-admission-score-2026',
    publisher: 'Báo Tuổi Trẻ (cơ quan báo chí nhà nước)',
    title: 'Điểm sàn xét tuyển Trường đại học Văn Hiến và Hùng Vương TP.HCM',
    url: 'https://tuoitre.vn/diem-san-xet-tuyen-truong-dai-hoc-van-hien-va-hung-vuong-tphcm-100260704104342801.htm',
    accessedAt: '2026-08-26',
    publishedAt: '2026-07-04',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trường Đại học Hùng Vương TP.HCM (DHV) công bố ngưỡng đảm bảo chất lượng đầu vào 2026 trên cổng chính thức tuyensinh.dhv.edu.vn, nhưng WebFetch chỉ đọc được nội dung mô tả phương thức, không lấy được con số ngưỡng. Số liệu đối chiếu trực tiếp qua bài báo Tuổi Trẻ (cơ quan báo chí nhà nước), trích nguyên văn: "THPT Exit Exam: từ 15 điểm; High School Transcript: 18 điểm; National University Assessment (ĐGNL ĐHQG-HCM): 600 điểm". Riêng nhóm ngành Luật và Tâm lý học: "sẽ cập nhật ngưỡng đầu vào ngay sau khi Bộ GD&ĐT ban hành quy định" — KHÔNG áp dụng ngưỡng 15/30 chung, loại khỏi phạm vi mô hình hoá.',
  },
];
