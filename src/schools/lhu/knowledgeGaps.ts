import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const lhuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'lhu-duoc-luat-threshold-not-modeled',
    label:
      'Ngành Dược, Luật, Luật kinh tế tại LHU: "điểm xét tuyển theo ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố vào ngày 08/07/2026" — không phải 15/30 cố định, chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'lhu-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh chọn ngành Dược/Luật/Luật kinh tế sẽ nhận kết quả không xác định thay vì áp nhầm ngưỡng 15/30.',
  },
  {
    id: 'lhu-other-methods-not-modeled',
    label:
      'LHU còn 4 phương thức khác (xét học bạ THPT — thang trung bình 3 môn ≥18 hoặc riêng ngành Dược/Luật ngưỡng cao hơn; đánh giá năng lực do LHU/ĐHQG-HCM tổ chức; V-SAT ≥250 điểm; xét tuyển thẳng) chưa được chuẩn hoá vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'lhu-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được điều kiện xét tuyển chung cho phương thức xét điểm thi TN THPT.',
  },
  {
    id: 'lhu-priority-table-silent',
    label:
      'Thông báo tuyển sinh LHU 2026 im lặng hoàn toàn về điểm ưu tiên khu vực/đối tượng (không có bảng, không loại trừ trực tiếp) — nhánh exact áp judgment call chuẩn quốc gia (Điều 7 Thông tư 06/2026/TT-BGDĐT), cùng tiền lệ schools/utm, schools/ctu, schools/utc, schools/ptit, schools/hub.',
    status: 'incomplete',
    sourceId: 'lhu-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên dùng judgment call, không phải số LHU tự công bố — nếu LHU sau này công bố bảng riêng thì phải cập nhật lại.',
  },
];
