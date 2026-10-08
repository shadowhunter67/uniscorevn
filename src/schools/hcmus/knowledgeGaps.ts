import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Re-audit 2026-08-15: bonus table and priority reduction formula are verified
 * from official HCMUS pages. The remaining gap is a program-specific eligibility
 * lookup for national percentile conditions, not a final-score formula blocker.
 */
export const hcmusKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hcmus-semiconductor-percentile',
    label:
      'Ngành Thiết kế vi mạch/Công nghệ bán dẫn yêu cầu điểm Toán thuộc top 20% và điểm tổ hợp thuộc top 25% toàn quốc theo dữ liệu Bộ GD&ĐT. UniscoreVN chưa có bảng bách phân vị quốc gia để kiểm tra điều kiện này.',
    status: 'incomplete',
    scoreAffecting: false,
    impact: 'eligibility-warning',
  },
];
