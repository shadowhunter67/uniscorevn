import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const qtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'qtu-other-methods-not-modeled',
    label: 'QTU còn 3 phương thức khác (học bạ ≥18/30, kết hợp học bạ+điểm TN THPT, ĐGNL ĐHQG-HCM ≥450) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'qtu-admission-scheme-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: ≥18/30 (Điều dưỡng cũng 18)', 'Kết hợp học bạ+TN THPT: ≥16/30', 'ĐGNL ĐHQG-HCM: ≥450/1200'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'qtu-combination-scope-not-full',
    label:
      'Bảng 2 (đề án tuyển sinh) liệt kê tổ hợp riêng theo TỪNG ngành (15-25 tổ hợp/ngành, nhiều tổ hợp không có trong SubjectId taxonomy như X18/X19/X21/X55/Y07/Y09/Y10). Chưa đối chiếu từng ngành xem tổ hợp CHUNG (A00/A01/D01/C00-C04) có hợp lệ cho TẤT CẢ 11 ngành hay chỉ một số — model theo tập tổ hợp chung này, cùng mức rủi ro đã chấp nhận ở BAFU (ngưỡng đồng nhất theo nhóm, không phải theo tổ hợp).',
    status: 'official-but-unparsed',
    sourceId: 'qtu-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
