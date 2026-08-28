import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uhdKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uhd-pedagogy-pe-thresholds-not-modeled',
    label:
      'Nhóm ngành Sư phạm (17-20/30 tuỳ ngành, riêng Giáo dục mầm non hệ cao đẳng 17/30) và ngành Giáo dục thể chất (19/30) tại UHD có ngưỡng riêng cao hơn nhóm ngành thường, chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'uhd-threshold-2026-crosscheck-1',
    scoreAffecting: true,
    knownData: ['Nhóm ngành Sư phạm: 17-20/30 tuỳ ngành', 'Giáo dục thể chất: 19/30', 'Giáo dục mầm non (cao đẳng): 17/30'],
    impact: 'Thí sinh chọn ngành Sư phạm hoặc Giáo dục thể chất sẽ nhận kết quả không xác định thay vì áp nhầm ngưỡng 15/30.',
  },
  {
    id: 'uhd-supham-moet-threshold-not-modeled',
    label:
      'Nhóm ngành Sư phạm dùng ngưỡng do Bộ GD&ĐT quyết định hàng năm (không phải số cố định UHD tự công bố, Quyết định 289/QĐ-ĐHHD mục 5.4) - chưa model trong batch này (chỉ nhánh exact nhóm ngành Kinh tế/Kỹ thuật/KHXH&NV).',
    status: 'incomplete',
    sourceId: 'uhd-quyet-dinh-289-2026',
    scoreAffecting: true,
    impact: 'Thí sinh chọn ngành Sư phạm/Giáo dục thể chất chưa có calculator exact ở UHD trên UniScoreVN.',
  },
];
