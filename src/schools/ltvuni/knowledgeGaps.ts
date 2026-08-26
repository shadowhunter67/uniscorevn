import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ltvuniKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ltvuni-subject-combination-not-imported',
    label: 'Thông báo 269/TB-ĐHLTV không kèm bảng tổ hợp môn xét tuyển cụ thể cho từng ngành (chỉ có mã ngành + ngưỡng) — thí sinh phải tự chọn tổ hợp môn.',
    status: 'incomplete',
    sourceId: 'ltvuni-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['11/11 ngành đã có ngưỡng: Y học cổ truyền 20,0; Kỹ thuật phục hồi chức năng 18,0; 9 ngành còn lại 15,0 (thang 30)'],
    impact: 'Runtime kiểm tra được ngưỡng theo ngành nhưng không xác thực tổ hợp môn có hợp lệ với ngành đó hay không.',
  },
  {
    id: 'ltvuni-priority-not-modeled',
    label: 'Điểm xét tuyển công bố = tổng điểm 3 môn (thang 30) + điểm ưu tiên khu vực/đối tượng (nếu có). Runtime hiện chỉ cộng điểm thô 3 môn.',
    status: 'incomplete',
    sourceId: 'ltvuni-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên vào tổng điểm trước khi so với ngưỡng.',
  },
];
