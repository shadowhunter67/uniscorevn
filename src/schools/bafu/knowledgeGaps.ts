import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bafuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bafu-other-methods-not-modeled',
    label: 'BAFU còn 2 phương thức khác (ĐGTD PT3 ≥11/30 quy đổi, học bạ PT4 ≥18/30) chưa chuẩn hoá — chỉ PT2 (thi TN THPT) có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'bafu-admission-info-2026',
    scoreAffecting: true,
    knownData: ['ĐGTD (PT3): ≥11/30 quy đổi', 'Học bạ (PT4): trung bình 6 học kỳ ≥18/30'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho Phương thức 2 (thi TN THPT).',
  },
  {
    id: 'bafu-combination-scope-not-full',
    label:
      'Không có bảng tổ hợp đầy đủ theo TỪNG ngành (chỉ thấy ví dụ ngành Kế toán) — model theo tập tổ hợp CHUNG nằm trong taxonomy hiện có (A00/A01/A02/B00/A07/B03/C01/C02/C03/C04/D01/X01/X02), không ràng buộc theo ngành cụ thể vì ngưỡng đầu vào đồng nhất toàn trường. Tổ hợp dùng ngoại ngữ Trung/Nhật/Hàn hoặc D04/D30/X04/X70/X74 chưa model.',
    status: 'official-but-unparsed',
    sourceId: 'bafu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
