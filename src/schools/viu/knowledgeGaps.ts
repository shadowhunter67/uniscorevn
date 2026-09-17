import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const viuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'viu-other-methods-not-modeled',
    label: 'VIU còn 3 phương thức khác (học bạ Mã 200 ≥18/30, ĐGNL/ĐGTD Mã 402 ≥70 hoặc ≥50, kết hợp Mã 407) chưa chuẩn hoá — chỉ Mã 100 (thi TN THPT) có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'viu-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ (Mã 200): ≥18/30', 'ĐGNL ĐHQGHN (Mã 402): ≥70/150', 'ĐGTD ĐHBK HN (Mã 402): ≥50/100'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho Mã 100 (thi TN THPT).',
  },
  {
    id: 'viu-real-cutoff-may-be-higher',
    label: 'Đây là điểm SÀN (ngưỡng nhận hồ sơ), không phải điểm chuẩn trúng tuyển cuối cùng — chưa tìm được thông báo điểm chuẩn thật theo từng ngành để đối chiếu.',
    status: 'incomplete',
    sourceId: 'viu-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
