import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dthuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dthu-nk-majors-not-modeled',
    label:
      'DTHU 2026 có 6 ngành dùng tổ hợp có môn năng khiếu (Giáo dục Mầm non CĐ/ĐH, Giáo dục Thể chất, Sư phạm Âm nhạc, Sư phạm Mỹ thuật, Huấn luyện Thể thao) — công thức NĐV riêng (vd 2 môn + điểm ưu tiên × 2/3). ApplicantProfile chưa có field điểm năng khiếu nên KHÔNG model.',
    status: 'incomplete',
    sourceId: 'dthu-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Mầm non CĐ: 17,0/30 (2 môn + NK)', 'Mầm non ĐH/GDTC/SP Âm nhạc/SP Mỹ thuật: 19-20,0/30 (2 môn + NK)', 'Huấn luyện Thể thao: 15,0/30 (tổ hợp NK TDTT)'],
    impact: 'Runtime chỉ kiểm tra được eligibility cho 53/59 ngành dùng tổ hợp văn hóa chuẩn.',
  },
  {
    id: 'dthu-program-mapping-not-imported',
    label: 'Bảng đầy đủ 59 mã ngành/tổ hợp/NĐV đã có trong Phụ lục I (đọc trực tiếp từ PDF), nhưng chưa import từng mã ngành riêng lẻ vào runtime — thí sinh phải tự chọn nhóm (sư phạm/thường/Luật) và tổ hợp môn.',
    status: 'incomplete',
    sourceId: 'dthu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Runtime chỉ kiểm tra được ngưỡng theo nhóm do người dùng tự chọn, chưa tự suy ra ngành cụ thể.',
  },
  {
    id: 'dthu-law-extra-condition-not-modeled',
    label:
      'Ngành Luật (phương thức 100) ngoài ngưỡng NĐV=20 còn yêu cầu 1 trong 2 điều kiện phụ: (a) học lực lớp 12 mức Tốt/Giỏi (GDPT 2006) VÀ tổng điểm 3 môn ≥18,00, hoặc (b) điểm xét tốt nghiệp THPT ≥8,50. Không có field học lực/điểm xét tốt nghiệp trong ApplicantProfile nên KHÔNG model điều kiện phụ này.',
    status: 'incomplete',
    sourceId: 'dthu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Kết quả "eligible" cho ngành Luật ở mức NĐV=20 có thể chưa đủ điều kiện thực tế nếu thí sinh không đáp ứng điều kiện phụ về học lực/điểm xét tốt nghiệp.',
  },
  {
    id: 'dthu-priority-not-modeled',
    label: 'NĐV công bố = tổng điểm 3 môn (thang 30) + điểm ưu tiên khu vực/đối tượng (công thức giảm dần công bố sẵn khi tổng điểm ≥22,5/30). Runtime hiện chỉ cộng điểm thô 3 môn.',
    status: 'incomplete',
    sourceId: 'dthu-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên vào tổng điểm trước khi so với ngưỡng.',
  },
];
