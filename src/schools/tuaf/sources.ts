import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TuafSource {
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

export const tuafSources: TuafSource[] = [
  {
    id: 'tuaf-thpt-threshold-2026',
    publisher: 'Trường Đại học Nông Lâm - Đại học Thái Nguyên',
    title: 'Thông báo số 727/TB-ĐHNL — Ngưỡng điểm xét tuyển đối với từng ngành đào tạo đại học chính quy đợt 1 năm 2026',
    url: 'https://tuaf.edu.vn/gallery/files/Admin/%5BTUAF%5D%20Th%C3%B4ng%20b%C3%A1o%20ng%C6%B0%E1%BB%A1ng%20%C4%91i%E1%BB%83m%20x%C3%A9t%20tuy%E1%BB%83n%20%C4%91%E1%BB%A3t%201%20n%C4%83m%202026.pdf',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF 7 trang (có text layer). Mục I: bảng ngưỡng điểm xét tuyển 23 ngành, tất cả 16/30 (thang 30). Ghi chú: "Ngưỡng điểm xét tuyển ... là tổng điểm 3 môn thi trong tổ hợp đăng ký xét tuyển + điểm ưu tiên khu vực, đối tượng (nếu có)". Mục II.2.1: "Điểm xét tuyển = Điểm môn 1 + Điểm môn 2 + Điểm môn 3 + điểm ƯT (nếu có)", điểm ƯT tính theo quy chế (Điều 7 TT 06/2026). Mục II.2.2: quy đổi học bạ ↔ THPT piecewise (ngoài phạm vi).',
  },
  {
    id: 'tuaf-admission-info-2026',
    publisher: 'Thai Nguyen University of Agriculture and Forestry (Truong Dai hoc Nong Lam - Dai hoc Thai Nguyen)',
    title: 'Official 2026 undergraduate admission floor-score notice (727/TB-DHNL)',
    url: 'https://tuaf.edu.vn/bai-viet/truong-dai-hoc-nong-lam-thai-nguyen-cong-bo-nguong-dam-bao-chat-luong-dau-vao-diem-san-dai-hoc-he-chinh-quy-dot-1-nam-2026-43603.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official Notice 727/TB-DHNL (07/07/2026): floor score (nguong dam bao chat luong dau vao / diem san) for Round 1, 2026 regular undergraduate admission is 16/30 (already including priority points), applied uniformly across all majors ("Muc diem san ap dung dong nhat cho tat ca cac nganh la 16 diem").',
  },
];
