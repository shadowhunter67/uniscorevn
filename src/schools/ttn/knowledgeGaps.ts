import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ttnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ttn-program-threshold-table-not-imported',
    label: 'Batch 2026-08-27: đã đọc trực tiếp bảng mục 1.2 (37 mã xét tuyển) + mục 3.1 Thông báo mức điểm nhận hồ sơ, nhập 4 nhóm ngưỡng (Y khoa 22 / Giáo viên 20 / Điều dưỡng-KTXN 18 / còn lại 15) vào `thresholds.ts` → mở nhánh exact `ttn-thpt-exam-exact-2026` (phương thức 100). Giáo dục Mầm non / Giáo dục Thể chất chỉ tuyển qua phương thức 405 (năng khiếu) — ngoài phạm vi.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'ttn-alternative-methods-not-modeled',
    label: 'TTN 2026 also allows transcript (PT200) and VNU aptitude-test (PT402) admission, plus a combined-aptitude route (PT405) with its own core-subject minimum; only the THPT exam route (PT100) is modeled.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-threshold-notice-2026',
  },
  {
    id: 'ttn-program-catalog-pdf-unparsed',
    label: 'The full TTN 2026 admission information PDF (programs, quotas, subject combinations) is a scanned/binary layout that could not be text-extracted.',
    status: 'official-but-unparsed',
    sourceId: 'ttn-admission-notice-2026',
  },
];
