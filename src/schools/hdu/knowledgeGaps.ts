import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hdu-non-law-thresholds-not-published',
    label:
      'HDU 2026 chỉ công bố ngưỡng cụ thể cho ngành Luật/Luật Kinh tế; các ngành ngoài sư phạm khác được ghi "xác định và công bố sau khi có kết quả thi TN THPT", nên chưa có số liệu để nhập.',
    status: 'incomplete',
    sourceId: 'hdu-admission-2026',
    scoreAffecting: true,
    knownData: ['Luật, Luật Kinh tế: tổng 3 môn >= 18,0/30, Ngữ văn >= 6,0'],
    missingData: ['Ngưỡng các ngành ngoài Luật/Luật Kinh tế và ngoài sư phạm'],
    impact: 'Runtime chỉ kết luận được cho nhóm ngành Luật/Luật Kinh tế; mọi ngành khác vẫn ở trạng thái chưa xác định.',
  },
  {
    id: 'hdu-pedagogical-threshold-not-published',
    label: 'Ngưỡng nhóm ngành sư phạm tại HDU theo ngưỡng bảo đảm chất lượng đầu vào do Bộ GDĐT quy định, chưa được Bộ công bố tại thời điểm research.',
    status: 'incomplete',
    sourceId: 'hdu-admission-2026',
    scoreAffecting: true,
    impact: 'Không thể kết luận điều kiện cho nhóm ngành sư phạm cho đến khi Bộ GDĐT công bố ngưỡng riêng và HDU dẫn chiếu.',
  },
];
