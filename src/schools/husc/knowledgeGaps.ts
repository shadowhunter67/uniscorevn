import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huscKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'husc-program-threshold-table-not-imported',
    label:
      'Batch 2026-08-27 đã đọc trực tiếp Phụ lục 1 (Thông báo 42/TB-HĐTSĐH, `husc-hueu-threshold-appendix-2026`) và đóng gap này cho 26 mã ngành DHT xét điểm thi TN THPT (đều 15,00/30, cùng công thức Đại học Huế — xem `husc-thpt-exam-exact-2026`). Gap chỉ còn cho 3 mã có điều kiện phụ ngoài phạm vi: 7440102SC / 7510302IC (22,75/30 + nhóm 20% Toán toàn quốc) và 7580101 Kiến trúc (phải thi năng khiếu).',
    status: 'official-but-unparsed',
    sourceId: 'husc-hueu-threshold-appendix-2026',
    scoreAffecting: false,
    knownData: ['26 mã ngành xét điểm thi TN THPT: 15,00/30', 'Vật lý học CN bán dẫn (7440102SC), Điện tử - viễn thông thiết kế vi mạch (7510302IC): 22,75/30 + Toán top 20% cả nước', 'Kiến trúc (7580101): 15,00/30 + thi năng khiếu Vẽ mỹ thuật ≥ 5,0'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'husc-other-methods-not-modeled',
    label: 'HUSC còn các phương thức khác (xét tuyển thẳng/ưu tiên, học bạ, ĐGNL ĐHQGHN/ĐHQG-HCM, kết hợp, năng khiếu Kiến trúc) chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'husc-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
