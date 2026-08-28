import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ouKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ou-program-threshold-table-not-imported',
    label:
      'Bảng điểm sàn theo từng mã xét tuyển OU 2026 ĐÃ nhập (`thresholds.ts`, 37 mã chương trình chuẩn) và dùng cho nhánh exact (ou-thpt-exam-exact-2026). Nhóm Luật/Luật kinh tế (điều kiện Toán/Văn≥60%), Ngôn ngữ Anh (điều kiện Tiếng Anh≥60%), Chương trình Tiên tiến, Phân hiệu Đồng Nai, và CTLK quốc tế vẫn ngoài phạm vi (điều kiện phụ hoặc biến thể riêng).',
    status: 'official-but-unparsed',
    sourceId: 'ou-quality-threshold-2026',
    scoreAffecting: false,
    missingData: ['nhóm pháp luật và các chương trình đặc thù'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'ou-conversion-table-not-imported',
    label: 'Bảng quy đổi V-SAT/ĐGNL/Học bạ/SAT 2026 của OU chưa được nhập vào calculator.',
    status: 'official-but-unparsed',
    sourceId: 'ou-equivalent-conversion-2026',
    scoreAffecting: true,
    impact: 'Chưa bật scoreConversion/exactCalculator cho các phương thức ngoài thi TN THPT.',
  },
  {
    id: 'ou-bonus-priority-rules-not-modeled',
    label: 'Điểm cộng/ưu tiên và quy tắc giảm ưu tiên OU 2026 chưa được model hóa.',
    status: 'incomplete',
    scoreAffecting: true,
  },
];
