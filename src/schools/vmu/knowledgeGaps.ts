import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vmu-program-mapping-not-imported',
    label: 'VMU 2026 công bố ngưỡng theo 3 khối ngành (Kỹ thuật/Công nghệ, Kinh tế/Ngôn ngữ, Luật); danh sách 55 chương trình cụ thể chưa được ánh xạ vào từng khối.',
    status: 'official-but-unparsed',
    sourceId: 'vmu-admission-2026',
    scoreAffecting: false,
    knownData: ['Kỹ thuật/Công nghệ: 17/30', 'Kinh tế/Ngôn ngữ: 19/30', 'Luật: 20/30'],
    impact: 'Người dùng phải tự chọn đúng khối ngành; runtime chưa suy được khối ngành từ tên chương trình cụ thể.',
  },
  {
    id: 'vmu-conversion-table-not-imported',
    label: 'Bảng quy đổi tương đương giữa 6 phương thức xét tuyển của VMU 2026 chưa được trích xuất đầy đủ và không được nhập vào runtime để tránh suy diễn sai.',
    status: 'official-but-unparsed',
    sourceId: 'vmu-admission-2026',
    scoreAffecting: true,
    impact: 'Runtime chỉ kiểm tra được ngưỡng thô của PT1 (thi TN THPT quy đổi tổ hợp D01); các phương thức khác (học bạ, ĐGNL/ĐGTD, chứng chỉ tiếng Anh) chưa hỗ trợ.',
  },
];
