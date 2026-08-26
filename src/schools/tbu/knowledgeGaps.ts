import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tbuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tbu-admitted-score-formula-not-modeled',
    label: 'TBU 2026 công bố điểm trúng tuyển cuối cùng theo công thức "A + B + C" nhưng không giải thích rõ A/B/C là gì (có thể gồm điểm ưu tiên/điểm cộng) trong bài đăng đã đọc — chỉ ngưỡng nhận hồ sơ (15/18) là rõ ràng.',
    status: 'incomplete',
    sourceId: 'tbu-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng nhận hồ sơ: Luật 18,0/30, các ngành khác 15,0/30'],
    impact: 'Runtime chỉ kiểm tra được điều kiện tối thiểu để nộp hồ sơ (ngưỡng đảm bảo chất lượng đầu vào), không tính được điểm trúng tuyển thực tế.',
  },
  {
    id: 'tbu-program-mapping-not-imported',
    label: 'Danh mục ngành cụ thể (ngoài Luật) và tổ hợp môn tương ứng chưa import vào runtime — thí sinh phải tự chọn nhóm ngành (Luật/khác) và tổ hợp môn.',
    status: 'incomplete',
    sourceId: 'tbu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm ngành do người dùng tự chọn.',
  },
  {
    id: 'tbu-conversion-methods-not-modeled',
    label: 'Bài đăng đề cập kết quả thi HSA/TSA/SPT được quy đổi về thang 30 để xét tuyển, nhưng bảng quy đổi chi tiết chưa đọc được trong lượt research này.',
    status: 'incomplete',
    sourceId: 'tbu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng điểm HSA/TSA/SPT chưa kiểm tra được ở TBU trên UniScoreVN.',
  },
];
