import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uttKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'utt-program-threshold-table-not-imported',
    label: 'Bảng điểm sàn UTT 2026 theo từng ngành/nhóm ngành (dao động 15-20/30) chưa được nhập đầy đủ theo từng mã ngành.',
    status: 'official-but-unparsed',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: true,
    knownData: [
      'Đa số ngành (xây dựng, công nghệ ô tô, logistics, quản trị kinh doanh, du lịch, phần lớn CNTT): 15/30',
      'Đường sắt tốc độ cao, đường sắt đô thị (4 ngành), vi mạch bán dẫn: 18/30',
      'Nhóm ưu tiên cao (kỹ thuật ô tô, CNTT, an toàn thông tin, thương mại điện tử, ngôn ngữ Anh, luật, logistics hải quan, fintech): 20/30',
    ],
    impact: 'Compare chỉ loại chắc chắn hồ sơ dưới 15/30; hồ sơ từ 15/30 trở lên chưa kết luận được vì chưa rõ ngưỡng của ngành cụ thể.',
  },
  {
    id: 'utt-other-methods-not-modeled',
    label: 'UTT còn các phương thức khác (xét tuyển thẳng, học bạ, ĐGNL/ĐGTD) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'utt-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
