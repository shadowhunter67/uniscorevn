import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hubtKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hubt-health-program-threshold-not-modeled',
    label:
      'HUBT công bố ngưỡng riêng cao hơn cho nhóm ngành sức khoẻ: Y khoa/Dược/Răng-Hàm-Mặt yêu cầu học lực Giỏi lớp 12 VÀ tổng điểm thi >= 20,0/30; Điều dưỡng yêu cầu học lực Khá trở lên VÀ tổng điểm thi >= 16,5/30. Runtime chưa có trường dữ liệu xếp loại học lực THPT nên chưa kiểm được điều kiện kép này.',
    status: 'incomplete',
    sourceId: 'hubt-admission-portal-2026',
    scoreAffecting: false,
    knownData: ['Y khoa/Dược/RHM: học lực Giỏi + tổng điểm >= 20,0/30.', 'Điều dưỡng: học lực Khá trở lên + tổng điểm >= 16,5/30.'],
    impact: 'Thí sinh đăng ký nhóm ngành sức khoẻ cần tự đối chiếu điều kiện học lực bên ngoài runtime.',
  },
  {
    id: 'hubt-program-mapping-not-imported',
    label: 'Bảng mã ngành/tổ hợp và các phương thức khác (xét học bạ, TSA/HSA, năng khiếu) của HUBT 2026 chưa được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hubt-admission-portal-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ hỗ trợ kiểm ngưỡng chung phương thức xét điểm thi TN THPT cho ngành đại trà.',
  },
  {
    id: 'hubt-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng và điểm cộng theo Quy chế tuyển sinh chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'hubt-admission-portal-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm ưu tiên/điểm cộng cần tự cộng thêm trước khi so với ngưỡng 15,0/30 đã công bố.',
  },
];
