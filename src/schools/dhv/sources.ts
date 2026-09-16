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
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'dhv-cutoff-2026' },
    note:
      'Trường Đại học Hùng Vương TP.HCM (DHV) công bố ngưỡng đảm bảo chất lượng đầu vào 2026 trên cổng chính thức tuyensinh.dhv.edu.vn, nhưng WebFetch chỉ đọc được nội dung mô tả phương thức, không lấy được con số ngưỡng. Số liệu đối chiếu trực tiếp qua bài báo Tuổi Trẻ (cơ quan báo chí nhà nước), trích nguyên văn: "THPT Exit Exam: từ 15 điểm; High School Transcript: 18 điểm; National University Assessment (ĐGNL ĐHQG-HCM): 600 điểm". Riêng nhóm ngành Luật và Tâm lý học: "sẽ cập nhật ngưỡng đầu vào ngay sau khi Bộ GD&ĐT ban hành quy định" — KHÔNG áp dụng ngưỡng 15/30 chung, loại khỏi phạm vi mô hình hoá. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức `dhv-cutoff-2026` (đã công bố ngưỡng Luật/Tâm lý học) — giữ lại làm nguồn lịch sử điểm sàn (trước kỳ thi), không còn dùng cho tính điểm.',
  },
  {
    id: 'dhv-cutoff-2026',
    publisher: 'Trường Đại học Hùng Vương TP. Hồ Chí Minh (Hội đồng tuyển sinh)',
    title: 'Trường Đại học Hùng Vương TP. Hồ Chí Minh công bố điểm chuẩn trúng tuyển Đại học chính quy 2026',
    url: 'https://dhv.edu.vn/truong-dai-hoc-hung-vuong-tp-ho-chi-minh-cong-bo-diem-trung-tuyen-dai-hoc-he-chinh-quy-dot-1-nam-2026/',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng CHÍNH CHỦ trên dhv.edu.vn (không phải báo trung gian), nhúng ảnh gốc "POST-TONG-CONG-BO-DIEM-CHUAN-DHV-2026-1024x1024.png" (đọc bằng vision qua chrome-devtools screenshot, truy cập ảnh trực tiếp) — bảng đầy đủ 23 mã xét tuyển và 3 cột điểm chuẩn theo phương thức (Thi TN THPT / Học tập THPT / ĐGNL ĐHQG HCM). Module này CHỈ dùng cột "Thi TN THPT" (thang 30, không hệ số). 20/23 mã có điểm chuẩn FLAT 15,0/30; Tâm lý học (7310401)/Luật (7380101)/Luật kinh tế (7380107) FLAT 20,0/30. Đối chiếu chéo với 2 bài báo nhà nước độc lập (Dân Trí, Giáo dục & Thời đại, cùng ngày 09/08/2026) — khớp 100% về nhóm ngành và mức điểm. Trường KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng mã trong nguồn này — người dùng tự chọn tổ hợp 3 môn, xem `knowledgeGaps.ts`.',
  },
];
