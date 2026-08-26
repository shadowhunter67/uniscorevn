import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ushKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ush-gdtc-not-modeled',
    label: 'Ngành Giáo dục thể chất có ngưỡng riêng "theo quy định của Bộ GDĐT" — thông báo trường không nêu số cụ thể, chưa mô hình hoá để tránh suy đoán.',
    status: 'official-but-unparsed',
    sourceId: 'ush-admission-notice-2026',
    scoreAffecting: false,
  },
  {
    id: 'ush-transcript-method-not-modeled',
    label: 'Phương thức 2 (xét học bạ, mã 406) và diện xét tuyển thẳng/ưu tiên xét tuyển (vận động viên cấp 1, kiện tướng...) chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'ush-admission-notice-2026',
    scoreAffecting: false,
  },
  {
    id: 'ush-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Điều 7 Quy chế tuyển sinh của trường chưa được cộng vào tổng điểm trước khi so sánh với ngưỡng.',
    status: 'incomplete',
    sourceId: 'ush-admission-notice-2026',
    scoreAffecting: true,
  },
];
