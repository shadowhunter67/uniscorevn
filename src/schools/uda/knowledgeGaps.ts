import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const udaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uda-health-law-thresholds-not-modeled',
    label:
      'UDA có ngưỡng riêng cao hơn cho nhóm ngành sức khỏe và luật (Y khoa >=22/30, Dược học >=20/30, Điều dưỡng/Hộ sinh/Kỹ thuật phục hồi chức năng >=18/30, Luật và Luật kinh tế >=20/30) chưa được mô hình hoá; runtime chỉ áp dụng ngưỡng 15/30 cho các ngành còn lại.',
    status: 'official-but-unparsed',
    sourceId: 'uda-threshold-2026',
    scoreAffecting: true,
    knownData: ['Y khoa >=22/30', 'Dược học >=20/30', 'Điều dưỡng/Hộ sinh/Kỹ thuật phục hồi chức năng >=18/30', 'Luật và Luật kinh tế >=20/30'],
    impact: 'Thí sinh chọn ngành sức khỏe hoặc luật sẽ nhận kết quả không xác định thay vì áp nhầm ngưỡng 15/30.',
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
