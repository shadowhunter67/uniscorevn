import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tlu-secondary-criteria-not-modeled',
    label:
      'Bảng điểm chuẩn công bố kèm cột "Tiêu chí phụ" — hầu hết ngành giới hạn thứ tự nguyện vọng tối đa (TTNV ≤ N, ví dụ N=1 đến N=13 tuỳ ngành); riêng Luật và Luật kinh tế có thêm điều kiện phụ "Ngữ văn ≥ 6 hoặc Toán+Ngữ văn ≥ 12". UniscoreVN CHƯA mô hình hoá tiêu chí phụ này (không hỏi thứ tự nguyện vọng, không kiểm tra điều kiện môn phụ của Luật/Luật kinh tế).',
    status: 'official-but-unparsed',
    sourceId: 'tlu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh đạt điểm chuẩn nhưng đặt nguyện vọng ngoài giới hạn công bố (hoặc không đạt điều kiện môn phụ của Luật/Luật kinh tế) có thể không trúng tuyển dù UniscoreVN báo eligible.',
  },
  {
    id: 'tlu-priority-value-silent',
    label:
      'Nguồn không có tuyên bố riêng về việc điểm chuẩn PT1 đã cộng điểm ưu tiên khu vực/đối tượng hay chưa — áp dụng quy ước chuẩn quốc gia (điểm chuẩn xét điểm thi THPT luôn là điểm xét tuyển đã cộng ưu tiên) và dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'tlu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TLU tự công bố.',
  },
  {
    id: 'tlu-subject-combination-not-validated',
    label:
      'Mỗi ngành công bố 4-9 tổ hợp xét tuyển hợp lệ khác nhau (`sources.ts:tlu-scheme-2025`) — UniscoreVN KHÔNG validate tổ hợp người dùng chọn có thuộc danh sách tổ hợp thật của ngành đã chọn hay không (cùng tiền lệ `schools/hou`, `schools/hdiu`).',
    status: 'official-but-unparsed',
    sourceId: 'tlu-scheme-2025',
    scoreAffecting: false,
    impact: 'Người dùng có thể chọn tổ hợp không thực sự áp dụng cho ngành TLU đã chọn mà UniscoreVN không cảnh báo.',
  },
  {
    id: 'tlu-exotic-combinations-not-modeled',
    label:
      'Một số ngành công bố thêm tổ hợp dùng môn/mã riêng của trường (X02/X06/X10/X14/X26/X78/K00, A02, C05, D04/D08/D45/D55/D63 dùng Tiếng Trung, B01/B02/B03) không có trong danh mục `SubjectId` dùng chung hoặc không xác định chắc chắn thành phần môn — các tổ hợp này KHÔNG mô hình hoá (mỗi ngành vẫn còn ít nhất 1 tổ hợp chuẩn tính được).',
    status: 'official-but-unparsed',
    sourceId: 'tlu-scheme-2025',
    scoreAffecting: true,
    impact: 'Thí sinh dùng các tổ hợp riêng của trường (ví dụ khối năng khiếu, môn Tin học/Công nghệ, ngoại ngữ 2) không tính được bằng UniscoreVN cho TLU.',
  },
  {
    id: 'tlu-other-methods-not-modeled',
    label: 'PT2 (xét học bạ THPT kết hợp ưu tiên) và PT3 (xét kết quả thi đánh giá tư duy TSA) dùng thang điểm và công thức khác — chưa mô hình hoá trong runtime, chỉ PT1 (xét điểm thi TN THPT) được tính.',
    status: 'official-but-unparsed',
    sourceId: 'tlu-threshold-2025',
    scoreAffecting: false,
    impact: 'UniscoreVN chỉ tính được đường điểm thi TN THPT (PT1) cho TLU, chưa hỗ trợ PT2/PT3.',
  },
];
