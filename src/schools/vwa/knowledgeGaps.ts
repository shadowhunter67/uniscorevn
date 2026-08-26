import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vwaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vwa-program-mapping-not-imported',
    label:
      'VWA 2026 công bố ngưỡng theo 3 nhóm ngành (Truyền thông đa phương tiện/Quản trị-Du lịch-Truyền thông xã hội-Tâm lý/nhóm còn lại) và 7 tổ hợp môn (A00/A01/C00/C03/D01/D14/D15), nhưng bảng ánh xạ chi tiết mã ngành -> tổ hợp môn cụ thể chưa được nhập vào runtime — thí sinh phải tự chọn nhóm ngành + tổ hợp môn.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng thi TN THPT: 19/18/16 theo 3 nhóm ngành', 'Ngưỡng học bạ: 23/21/19 theo 3 nhóm ngành'],
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm ngành do người dùng tự chọn; chưa tự suy ra nhóm từ tên ngành cụ thể.',
  },
  {
    id: 'vwa-law-not-modeled',
    label: 'Ngành Luật và Kinh tế Luật không có trong bảng ngưỡng 96/TB-HVPNVN — thông báo ghi "theo hướng dẫn của Bộ GDĐT", chưa xác định được số cụ thể.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Không kiểm tra được eligibility cho ngành Luật/Kinh tế Luật tại VWA.',
  },
  {
    id: 'vwa-vact-methods-not-modeled',
    label: 'Ngưỡng theo kỳ thi ĐGNL ĐHQG Hà Nội (HSA) và ĐGNL ĐH Sư phạm Hà Nội (SPT) đã công bố nhưng chưa model do khác thang điểm với ApplicantProfile hiện tại.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng điểm ĐGNL chưa kiểm tra được ở VWA trên UniScoreVN.',
  },
  {
    id: 'vwa-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GDĐT chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'vwa-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên của mình trước khi so sánh với ngưỡng đã công bố.',
  },
];
