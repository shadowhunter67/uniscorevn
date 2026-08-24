import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huscKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'husc-program-threshold-table-not-imported',
    label: 'Bảng điểm sàn HUSC 2026 theo từng ngành (15,00-22,75/30) chưa được nhập đầy đủ theo từng mã ngành.',
    status: 'official-but-unparsed',
    sourceId: 'husc-threshold-2026',
    scoreAffecting: true,
    knownData: ['Phần lớn ngành: 15,00/30', 'Vật lý (CN Bán dẫn), Kỹ thuật điện tử (Thiết kế vi mạch): 22,75/30 + Toán top 20% cả nước'],
    impact: 'Compare chỉ loại chắc chắn hồ sơ dưới 15/30 và công nhận đạt chắc chắn từ 22,75/30 trở lên; hồ sơ trong khoảng 15-22,75/30 chưa kết luận được vì chưa rõ ngưỡng của ngành cụ thể.',
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
