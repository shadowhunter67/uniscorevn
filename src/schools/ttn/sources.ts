import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TtnSource {
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

export const ttnSources: TtnSource[] = [
  {
    id: 'ttn-admission-notice-2026',
    publisher: 'Tay Nguyen University',
    title: 'Official 2026 regular undergraduate admission information notice',
    url: 'https://tuyensinh.ttn.edu.vn/2026/04/10/tttsdhcqnam2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTN 2026 admission page links a full information PDF (methods, programs, subject combinations); the PDF itself is a scanned/binary layout that could not be text-extracted, so program-level detail beyond the threshold notice below remains unparsed.',
  },
  {
    id: 'ttn-threshold-notice-2026',
    publisher: 'Tay Nguyen University',
    title: 'Official 2026 application receipt threshold notice (muc diem nhan ho so xet tuyen)',
    url: 'https://tuyensinh.ttn.edu.vn/2026/07/10/tbmdnhsxtdh2026/',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official TTN 2026 threshold notice — trang HTML đọc trực tiếp 2026-08-27, mục 1.2 có bảng đủ 37 mã xét tuyển với mức điểm nhận hồ sơ phương thức 100. Mục 3.1: ngưỡng KV3 theo nhóm — Giáo viên 20, Y khoa 22, Điều dưỡng / Kỹ thuật xét nghiệm y học 18, còn lại 15 (tổng thô 3 môn, không điểm cộng); thí sinh khu vực khác cộng điểm ưu tiên vào trước khi so ngưỡng. Không in công thức Điểm xét tuyển tường minh. Giáo dục Mầm non (7140201) / Giáo dục Thể chất (7140206) chỉ tuyển qua phương thức 405 (năng khiếu). Transcript (PT200), VNU aptitude (PT402), combined-aptitude (PT405) chưa model.',
  },
];
