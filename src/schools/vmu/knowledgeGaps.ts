import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vmu-program-mapping-not-imported',
    label:
      'Batch 2026-08-27: công thức PT1 (ĐXT = tổng 3 môn + ưu tiên) đọc trực tiếp Thông báo 1329/TB-ĐHHHVN mục 2.2.1 và mở nhánh exact `vmu-thpt-exam-exact-2026`. Thông báo chỉ công bố nguyên văn ngưỡng sàn chung 15,00/30 (mục 2.1); mức 17/19/20 theo khối ngành đến từ nguồn nghiên cứu cũ, chưa đối chiếu lại nguồn 2026 nên nhánh exact trả eligibility "unknown" khi ≥ 15 (score vẫn chính xác).',
    status: 'official-but-unparsed',
    sourceId: 'vmu-admission-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng sàn chung PT1: 15,00/30 (đã xác minh)', 'Mức theo khối ngành (chưa đối chiếu 2026): Kỹ thuật/Công nghệ 17, Kinh tế/Ngôn ngữ 19, Luật 20'],
    impact: 'method-out-of-scope',
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
