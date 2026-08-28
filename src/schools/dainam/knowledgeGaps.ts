import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dainamKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dainam-health-law-program-threshold-not-modeled',
    label:
      'Đại Nam công bố ngưỡng riêng cao hơn cho nhóm ngành Luật/Luật kinh tế, Y khoa/Dược học, Điều dưỡng (cả điều kiện học lực lớp 12 VÀ tổng 3 môn thi TN THPT/điểm xét tốt nghiệp THPT). Luật/Luật kinh tế: học lực Giỏi trở lên và tổng 3 môn >= 18,00 HOẶC điểm xét tốt nghiệp THPT >= 8,50. Y khoa/Dược học: học lực Giỏi trở lên và tổng 3 môn >= 20,00 HOẶC điểm xét tốt nghiệp THPT >= 8,50. Điều dưỡng: học lực Khá trở lên và tổng 3 môn >= 16,50 HOẶC điểm xét tốt nghiệp THPT >= 6,50. Runtime chưa có trường dữ liệu xếp loại học lực lớp 12/điểm xét tốt nghiệp THPT nên chưa kiểm được điều kiện riêng này.',
    status: 'incomplete',
    sourceId: 'dainam-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'Luật, Luật kinh tế: học lực lớp 12 Giỏi trở lên và tổng 3 môn thi TN THPT theo tổ hợp xét tuyển (hoặc Toán, Ngữ văn và 1 môn khác) >= 18,00, hoặc điểm xét tốt nghiệp THPT >= 8,50.',
      'Y khoa, Dược học: học lực lớp 12 Giỏi trở lên và tổng 3 môn >= 20,00, hoặc điểm xét tốt nghiệp THPT >= 8,50.',
      'Điều dưỡng: học lực lớp 12 Khá trở lên và tổng 3 môn >= 16,50, hoặc điểm xét tốt nghiệp THPT >= 6,50.',
    ],
    impact: 'Thí sinh đăng ký nhóm ngành Luật/Luật kinh tế/Y khoa/Dược học/Điều dưỡng cần tự đối chiếu điều kiện học lực + ngưỡng riêng bên ngoài runtime; calculator exact chỉ phủ ngành ngoài 2 lĩnh vực này.',
  },
  {
    id: 'dainam-program-mapping-not-imported',
    label: 'Bảng mã ngành/tổ hợp và các phương thức khác (xét học bạ, đánh giá năng lực HSA, xét tuyển thẳng) của Đại Nam 2026 chưa được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'dainam-threshold-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ hỗ trợ kiểm ngưỡng phương thức xét điểm thi TN THPT cho ngành ngoài lĩnh vực Sức khoẻ và Pháp luật.',
  },
];
