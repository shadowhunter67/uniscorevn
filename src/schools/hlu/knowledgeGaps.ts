import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hlu-program-mapping-not-imported',
    label:
      'HLU 2026 chỉ công bố MỘT ngưỡng chung 20,0/30 áp dụng cho toàn bộ chương trình đào tạo thuộc lĩnh vực pháp luật (thí sinh khu vực 3); danh sách mã ngành/tổ hợp xét tuyển cụ thể chưa được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hlu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng chung: 20,0/30 điểm (khu vực 3, không nhân hệ số, không cộng điểm khuyến khích/ưu tiên)'],
    impact: 'Runtime chỉ kiểm tra được ngưỡng chung theo tổng điểm 3 môn; chưa phân biệt được ngành/tổ hợp xét tuyển cụ thể của HLU.',
  },
  {
    id: 'hlu-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GDĐT chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'hlu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc khu vực/đối tượng ưu tiên khác khu vực 3 cần tự cộng điểm ưu tiên của mình trước khi so sánh với ngưỡng 20,0/30 đã công bố cho khu vực 3.',
  },
];
