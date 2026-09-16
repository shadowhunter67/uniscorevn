import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hpuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hpu-other-methods-not-modeled',
    label: 'HPU còn phương thức xét học bạ (18,0-23,83/30 theo ngành) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'hpu-cutoff-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: 18,0-23,83/30 tùy ngành'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'hpu-combination-scope-not-full',
    label: 'Không có bảng tổ hợp môn theo từng ngành trên nguồn — model theo tập tổ hợp CHUNG nằm trong taxonomy hiện có, không ràng buộc theo ngành cụ thể.',
    status: 'official-but-unparsed',
    sourceId: 'hpu-cutoff-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
