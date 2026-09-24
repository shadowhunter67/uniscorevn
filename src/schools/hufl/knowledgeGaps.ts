import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huflKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hufl-foreign-language-combos-not-modeled',
    label:
      'Nhiều tổ hợp chính thức của HUFL dùng môn ngoại ngữ Pháp/Trung/Nhật/Nga/Hàn làm MỘT MÔN THI (vd D03/D04/D06/D02/D42/D44/D45/D43/D62/D64/DH1/DH5) — `SubjectId` dùng chung của app chưa có các môn này (chỉ có `english`). Chỉ các tổ hợp dùng toàn môn đã hỗ trợ (D01/D14/D15/C00/X78) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'hufl-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'hufl-bonus-points-not-modeled',
    label:
      'Công thức thật (mục III.3.1) là tổng 3 môn + điểm ưu tiên + "điểm cộng" (điểm thưởng/xét thưởng/khuyến khích, tối đa 3,0/30, Bảng 2-5). App chưa thu thập input thành tích/chứng chỉ ngoại ngữ dạng bậc để tính điểm cộng — batch này chỉ tính tổng 3 môn + điểm ưu tiên, coi điểm cộng = 0 (undercount cho thí sinh có thành tích).',
    status: 'official-but-unparsed',
    sourceId: 'hufl-admission-info-2026',
    scoreAffecting: true,
  },
  {
    id: 'hufl-other-methods-not-modeled',
    label:
      'HUFL 2026 còn Phương thức 2 (học bạ), 3 (xét tuyển thẳng), 4 (kết hợp thi THPT + chứng chỉ ngoại ngữ), 5 (kết hợp học bạ + chứng chỉ ngoại ngữ) — chỉ Phương thức 1 (thi TN THPT thuần) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'hufl-admission-info-2026',
  },
];
