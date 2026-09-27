import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hcmunreKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hcmunre-priority-table-not-published',
    label:
      'Trang chính thức xác nhận Điểm xét tuyển Phương thức 1 = tổng thô + điểm ưu tiên (nếu có), nhưng không công bố bảng mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành (Thông tư 06/2025/TT-BGDĐT) làm judgment call, cùng tiền lệ nhiều trường khác.',
    status: 'incomplete',
    sourceId: 'hcmunre-floor-formula-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải bảng riêng của trường (trường không tự công bố bảng riêng để đối chiếu).',
  },
  {
    id: 'hcmunre-x03-x04-combination-not-modeled',
    label:
      'Tổ hợp X03 (Logictics và quản lý chuỗi cung ứng) và X04 (nhiều ngành) trong bảng PT1.pdf không có SubjectId tương ứng trong hệ thống UniscoreVN — các ngành liên quan vẫn tính được với các tổ hợp còn lại (B03/C01-C04/D01/X01/X02), chỉ riêng thí sinh chọn thi tổ hợp X03/X04 là chưa tính được.',
    status: 'incomplete',
    sourceId: 'hcmunre-cutoff-pt1-2026',
    scoreAffecting: false,
    impact: 'Thí sinh thi tổ hợp X03/X04 chưa tính được qua UniscoreVN cho các ngành liên quan — các tổ hợp còn lại tính bình thường.',
  },
  {
    id: 'hcmunre-other-methods-not-modeled',
    label:
      'HCMUNRE 2026 còn 2 phương thức khác đã công bố điểm chuẩn đầy đủ theo ngành: Phương thức 2 (xét học bạ THPT, thang 30, file PT2.pdf) và Phương thức 3 (kết quả thi ĐGNL ĐHQG-HCM, thang 1200, file PT3.pdf) — module này CHỈ mô hình hoá Phương thức 1 (thi TN THPT).',
    status: 'incomplete',
    sourceId: 'hcmunre-cutoff-decision-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc kết quả thi ĐGNL chưa tính được qua UniscoreVN cho HCMUNRE (dù điểm chuẩn đã công bố).',
  },
];
