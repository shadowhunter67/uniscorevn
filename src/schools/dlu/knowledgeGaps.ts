import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dlu-program-threshold-table-not-imported',
    label:
      'Batch 2026-08-28: đã đọc trực tiếp Thông báo 1145/TB-ĐHĐL qua chrome-devtools (dlu.edu.vn chặn curl bằng TLS/WAF) và nhập đủ 41 mã ngành vào `thresholds.ts` → mở nhánh exact `dlu-thpt-exam-exact-2026`. Phương thức eligibility rộng (`dlu-thpt-exam-2026`) vẫn chỉ dùng dải điểm chung (16-21/30).',
    status: 'official-but-unparsed',
    sourceId: 'dlu-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'dlu-alternative-methods-not-modeled',
    label: 'DLU 2026 còn phương thức xét học bạ THPT và kết quả kỳ thi đánh giá năng lực (ĐHQG-HCM/ĐHQG-HN) — chỉ phương thức thi TN THPT (PT1) được model.',
    status: 'official-but-unparsed',
    sourceId: 'dlu-threshold-notice-2026',
  },
];
