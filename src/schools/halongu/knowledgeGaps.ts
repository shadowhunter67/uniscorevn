import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const halonguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'halongu-pedagogy-scope-excluded',
    label:
      'Ngưỡng 15,00/30 (PT1, thi TN THPT) chỉ áp dụng cho nhóm ngành NGOÀI sư phạm. Nhóm sư phạm (kể cả Sư phạm Âm nhạc, PT3: 16,50/30 hoặc điểm đánh giá năng khiếu >= 6,50) theo quy định riêng của Bộ GD&ĐT, chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'halongu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'PT1 (thi TN THPT, ngoài sư phạm): 15,00/30',
      'PT2 (học bạ, ngoài sư phạm): trung bình 6 học kỳ >= 18,00/30, kèm điểm thi TN THPT >= 15,00/30',
      'PT3 (Sư phạm Âm nhạc): thi TN THPT >= 16,50/30 hoặc đánh giá năng khiếu >= 6,50, hạnh kiểm lớp 12 khá trở lên',
      'PT4 (chứng chỉ quốc tế, ngoài sư phạm): Văn + Toán + điểm chứng chỉ quy đổi >= 15,00; sư phạm: thi TN THPT >= 18,00 hoặc đánh giá >= 8,50',
      'PT5 (đánh giá năng lực Sư phạm Hà Nội, ngành sư phạm): >= 18,00/30 hoặc đánh giá >= 8,50, hạnh kiểm/học lực lớp 12 giỏi/tốt trở lên',
    ],
    impact: 'Runtime chỉ kiểm tra đúng ngưỡng PT1 cho nhóm ngành ngoài sư phạm; áp dụng cho ngành sư phạm sẽ SAI.',
  },
  {
    id: 'halongu-program-mapping-not-imported',
    label: 'Danh sách 26 ngành/chương trình đào tạo cụ thể và tổ hợp xét tuyển từng ngành chưa được nhập vào runtime.',
    status: 'incomplete',
    sourceId: 'halongu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Chưa kiểm tra được điều kiện theo từng ngành cụ thể, chỉ có ngưỡng chung PT1.',
  },
];
