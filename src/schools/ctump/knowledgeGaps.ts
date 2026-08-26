import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ctumpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ctump-program-mapping-not-imported',
    label: 'Bảng ánh xạ mã ngành cụ thể (14 ngành) -> nhóm ngưỡng (15/18/20/22) đã có đầy đủ trong Thông báo 197/TB-ĐHYDCT nhưng chưa import từng mã ngành riêng lẻ vào runtime — thí sinh phải tự chọn nhóm.',
    status: 'incomplete',
    sourceId: 'ctump-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Y khoa/Răng hàm mặt: 22,0/30', 'Y học cổ truyền/Dược học: 20,0/30', 'Điều dưỡng/Hộ sinh/Xét nghiệm/Hình ảnh y học/PHCN/Y học dự phòng: 18,0/30', 'Dinh dưỡng/Y tế công cộng/Kỹ thuật Y sinh/Tâm lý học: 15,0/30'],
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm ngành do người dùng tự chọn, chưa tự suy ra nhóm từ tên/mã ngành cụ thể.',
  },
  {
    id: 'ctump-priority-not-modeled',
    label:
      'Theo mục II.1 TB 197/TB-ĐHYDCT, mức điểm tối thiểu xét tuyển đợt 1 đã BAO GỒM điểm ưu tiên khu vực và đối tượng (công thức giảm dần công bố sẵn: Điểm ưu tiên = [(30 – Tổng điểm)/7,50] × Mức điểm ưu tiên quy định, áp dụng khi tổng điểm ≥ 22,5/30). Runtime hiện chỉ cộng điểm thô 3 môn, chưa cộng điểm ưu tiên.',
    status: 'incomplete',
    sourceId: 'ctump-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên vào tổng điểm trước khi so với ngưỡng — kết quả "ineligible" sát ngưỡng của runtime có thể không chính xác.',
  },
  {
    id: 'ctump-vsat-method-not-modeled',
    label: 'Phương thức xét kết quả thi V-SAT (mục II.2, có bảng quy đổi tương đương điểm V-SAT <-> điểm thi THPT theo từng môn) đã công bố đầy đủ nhưng chưa model do ApplicantProfile chưa có field điểm thi V-SAT.',
    status: 'incomplete',
    sourceId: 'ctump-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng điểm V-SAT chưa kiểm tra được ở CTUMP trên UniScoreVN.',
  },
];
