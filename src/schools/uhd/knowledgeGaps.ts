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
    id: 'uhd-other-region-not-modeled',
    label: 'Ngưỡng 15/30 chỉ áp dụng cho thí sinh khu vực 3 (không cộng điểm ưu tiên khu vực/đối tượng); UniscoreVN chưa tự động trừ lại điểm ưu tiên khi so ngưỡng.',
    status: 'official-but-unparsed',
    sourceId: 'uhd-threshold-2026-crosscheck-1',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc khu vực ưu tiên có thể được đánh giá thận trọng hơn thực tế.',
  },
];
