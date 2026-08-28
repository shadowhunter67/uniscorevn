import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const udaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uda-health-law-thresholds-not-modeled',
    label:
      'UDA có ngưỡng riêng cao hơn cho nhóm ngành sức khỏe và luật (Y khoa >=22/30, Dược học >=20/30, Điều dưỡng/Hộ sinh/Kỹ thuật phục hồi chức năng >=18/30, Luật và Luật kinh tế >=20/30, đều kèm điều kiện học lực/điểm xét tốt nghiệp thay thế) — ngoài phạm vi nhánh exact (uda-thpt-exam-exact-2026, chỉ nhóm ngành thường).',
    status: 'official-but-unparsed',
    sourceId: 'uda-threshold-2026',
    scoreAffecting: false,
    knownData: ['Y khoa >=22/30', 'Dược học >=20/30', 'Điều dưỡng/Hộ sinh/Kỹ thuật phục hồi chức năng >=18/30', 'Luật và Luật kinh tế >=20/30'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'uda-other-methods-not-modeled',
    label: 'UDA còn các phương thức khác (học bạ, ĐGNL/ĐGTD) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'uda-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
