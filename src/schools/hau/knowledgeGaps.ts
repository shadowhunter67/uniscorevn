import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hauKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hau-talent-test-majors-not-modeled',
    label:
      'HAU 2026 có 13/22 ngành (Kiến trúc, Kiến trúc cảnh quan, Quy hoạch vùng và đô thị, Thiết kế đô thị, Điêu khắc, Mỹ thuật đô thị, Thiết kế đồ họa, Nghệ thuật số, Thiết kế thời trang, Thiết kế nội thất...) dùng tổ hợp có môn năng khiếu (Vẽ mỹ thuật/Hình họa mỹ thuật/Bố cục tạo hình màu, hệ số nhân riêng — vd Vẽ mỹ thuật x2,0, Toán x1,4). ApplicantProfile chưa có field điểm thi năng khiếu nên KHÔNG model các ngành này.',
    status: 'incomplete',
    sourceId: 'hau-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Nhóm ngành Kiến trúc/Kiến trúc cảnh quan/Quy hoạch: 22,0/30', 'Nhóm ngành Điêu khắc/Mỹ thuật đô thị/Thiết kế: 18,0/30'],
    impact: 'Runtime chỉ kiểm tra được eligibility cho 9/22 ngành dùng tổ hợp văn hóa chuẩn (A00/A01/C01/C02/D01); các ngành năng khiếu chưa kiểm tra được ở HAU trên UniScoreVN.',
  },
  {
    id: 'hau-program-mapping-not-imported',
    label: 'Bảng ánh xạ mã ngành cụ thể -> nhóm ngưỡng (15,0/18,0) đã có đầy đủ trong Phụ lục QĐ 406 nhưng chưa import từng mã ngành riêng lẻ vào runtime — thí sinh phải tự chọn nhóm.',
    status: 'incomplete',
    sourceId: 'hau-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm ngành do người dùng tự chọn, chưa tự suy ra nhóm từ tên/mã ngành cụ thể.',
  },
  {
    id: 'hau-priority-bonus-not-modeled',
    label:
      'Theo Điều 1 QĐ 406/QĐ-ĐHKT-ĐT, mức điểm nhận hồ sơ đã công bố là TỔNG điểm 3 môn tổ hợp CỘNG điểm ưu tiên khu vực/đối tượng và điểm cộng (nếu có), không phải điểm thô đơn thuần. Runtime hiện chỉ cộng điểm thô 3 môn, chưa cộng điểm ưu tiên/điểm cộng.',
    status: 'incomplete',
    sourceId: 'hau-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm ưu tiên/điểm cộng cần tự cộng thêm vào tổng điểm trước khi so với ngưỡng — kết quả "ineligible" sát ngưỡng của runtime có thể không chính xác nếu thí sinh thuộc diện ưu tiên.',
  },
];
