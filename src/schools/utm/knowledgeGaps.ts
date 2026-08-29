import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const utmKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'utm-law-threshold-not-modeled',
    label: 'Ngành Luật và Luật kinh tế tại UTM áp ngưỡng riêng theo quy định của Bộ GD&ĐT (không phải 15/30) - chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh chọn ngành Luật/Luật kinh tế sẽ nhận kết quả không xác định thay vì áp nhầm ngưỡng 15/30.',
  },
  {
    id: 'utm-other-methods-not-modeled',
    label: 'UTM còn phương thức xét học bạ (từ 18/30) và xét điểm thi đánh giá năng lực (từ 60 điểm) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
  {
    id: 'utm-priority-table-silent',
    label:
      'Thông báo ngưỡng UTM 2026 im lặng hoàn toàn về điểm ưu tiên khu vực/đối tượng (không có bảng, không loại trừ trực tiếp như Đại Nam) — nhánh exact áp judgment call chuẩn quốc gia (Điều 7 Thông tư 08/2022/TT-BGDĐT), cùng tiền lệ CTU/UTC/PTIT/HUB/TGU.',
    status: 'incomplete',
    sourceId: 'utm-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên dùng judgment call, không phải số UTM tự công bố — nếu UTM sau này công bố bảng riêng thì phải cập nhật lại.',
  },
];
