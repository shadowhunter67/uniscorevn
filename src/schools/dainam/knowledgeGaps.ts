import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dainamKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dainam-health-law-program-threshold-not-modeled',
    label:
      'Đại Nam công bố ngưỡng riêng cao hơn cho nhóm ngành Y khoa/Dược học/Luật/Luật kinh tế: yêu cầu học lực lớp 12 xếp loại Giỏi trở lên HOẶC điểm xét tốt nghiệp THPT từ 8,5 trở lên; ngành Điều dưỡng yêu cầu học lực Khá trở lên HOẶC điểm xét tốt nghiệp THPT từ 6,5 trở lên. Runtime chưa có trường dữ liệu xếp loại học lực/điểm xét tốt nghiệp THPT nên chưa kiểm được điều kiện riêng này.',
    status: 'incomplete',
    sourceId: 'dainam-admission-portal-2026',
    scoreAffecting: false,
    knownData: [
      'Y khoa/Dược học/Luật/Luật kinh tế: học lực lớp 12 Giỏi trở lên HOẶC điểm xét tốt nghiệp THPT >= 8,5.',
      'Điều dưỡng: học lực lớp 12 Khá trở lên HOẶC điểm xét tốt nghiệp THPT >= 6,5.',
      'Y khoa/Dược học (phương thức học bạ): tổng điểm 3 môn tổ hợp theo học bạ THPT >= 24,0/30 và kết quả trung bình chung học tập mức Tốt, cộng thêm điều kiện tổng điểm 3 môn thi TN THPT >= 20,0/30 hoặc điểm xét tốt nghiệp THPT >= 8,5.',
    ],
    impact: 'Thí sinh đăng ký nhóm ngành Y khoa/Dược học/Luật/Luật kinh tế/Điều dưỡng cần tự đối chiếu điều kiện học lực bên ngoài runtime.',
  },
  {
    id: 'dainam-program-mapping-not-imported',
    label: 'Bảng mã ngành/tổ hợp và các phương thức khác (xét học bạ, đánh giá năng lực HSA, xét tuyển thẳng) của Đại Nam 2026 chưa được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'dainam-admission-portal-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ hỗ trợ kiểm ngưỡng chung phương thức xét điểm thi TN THPT cho ngành đại trà (ngoài Y khoa/Dược học/Luật/Luật kinh tế/Điều dưỡng).',
  },
  {
    id: 'dainam-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'dainam-admission-portal-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm ưu tiên cần tự cộng thêm trước khi so với ngưỡng 15,0/30 đã công bố.',
  },
];
