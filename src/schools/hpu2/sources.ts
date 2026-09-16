import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface Hpu2Source {
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

export const hpu2Sources: Hpu2Source[] = [
  {
    id: 'hpu2-admission-info-2026',
    publisher: 'Hanoi Pedagogical University 2 (Truong Dai hoc Su pham Ha Noi 2)',
    title: 'Official 2026 undergraduate admission information',
    url: 'https://tuyensinh.hpu2.edu.vn/chi-tiet/tuyen-sinh-dai-hoc-chinh-quy-nam-2026.html',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'hpu2-cutoff-2026' },
    note:
      'Official HPU2 admissions-portal page: 25 programs, 6 method categories (direct/priority, THPT exam, transcript, SP2E, H-SCA, combined aptitude test), numeric thresholds by program group (teacher-training >=18/30 or >=8,5/10; other programs >=15/30; PE >=11/30 2-subject; Early Childhood >=12/30 2-subject), and bonus-point cap rules. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức theo NGÀNH `hpu2-cutoff-2026` (mức nhận hồ sơ này chỉ là ngưỡng sàn, thấp hơn nhiều điểm chuẩn thực tế) — giữ lại làm nguồn lịch sử phương thức/điều kiện phụ, không còn dùng cho tính điểm chuẩn.',
  },
  {
    id: 'hpu2-cutoff-2026',
    publisher: 'Cổng Thông tin điện tử Chính phủ (đăng lại thông báo điểm chuẩn chính thức của Trường Đại học Sư phạm Hà Nội 2)',
    title: 'Điểm chuẩn Trường Đại học Sư phạm Hà Nội 2 năm 2026',
    url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-su-pham-ha-noi-2-nam-2026-119260810183816519.htm',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Cổng Thông tin điện tử Chính phủ đăng lại nguyên văn bảng điểm chuẩn chính thức của trường — bảng đầy đủ 25 ngành/chương trình (15 sư phạm + 10 ngoài sư phạm), mã ngành, phương thức xét kết quả thi TN THPT, thang 30 không hệ số. Đối chiếu chéo với VnExpress (bài "Điểm chuẩn Đại học Sư phạm Hà Nội 2 năm 2026 chi tiết tất cả ngành") — khớp giá trị mẫu đã kiểm (Sư phạm Toán học 27,51/30). Trường KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng ngành trong nguồn này — người dùng tự chọn tổ hợp, xem `knowledgeGaps.ts`.',
  },
];
