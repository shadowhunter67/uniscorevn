import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tmu-private-combination-not-modeled',
    label:
      'TMU công bố 10 tổ hợp xét tuyển (A00/A01/D01/D03/D04/D07/D09/D10/D84 + tổ hợp riêng "TMU"). D03 (Toán, Văn, Tiếng Pháp) và D04 (Toán, Văn, Tiếng Trung) chọn được từ 2026-10-04 nhờ SubjectId `french`/`chinese`; tổ hợp riêng "TMU" (Toán, Tin học/Công nghệ, Anh) vẫn KHÔNG mô hình hoá vì không xác định chắc chắn môn thứ 2 áp dụng cho ngành nào.',
    status: 'official-but-unparsed',
    sourceId: 'tmu-admission-methods-2025',
    scoreAffecting: true,
    impact: 'UniscoreVN không tính được tổ hợp riêng "TMU" (9/10 tổ hợp còn lại tính được).',
  },
  {
    id: 'tmu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm ưu tiên khu vực/đối tượng ĐÃ ĐƯỢC TÍNH GỘP trong ngưỡng 20/30 công bố, nhưng KHÔNG công bố mức điểm ưu tiên cụ thể — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'tmu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TMU tự công bố.',
  },
  {
    id: 'tmu-certificate-conversion-not-modeled',
    label:
      'Thí sinh có chứng chỉ ngoại ngữ/chứng chỉ khảo thí quốc tế (IELTS, SAT, ...) được dùng điểm quy đổi để xét ngưỡng đầu vào — bảng quy đổi này chưa mô hình hoá trong runtime.',
    status: 'official-but-unparsed',
    sourceId: 'tmu-threshold-2025',
    scoreAffecting: false,
    impact: 'UniscoreVN chỉ tính được đường điểm thi TN THPT thuần, chưa hỗ trợ quy đổi chứng chỉ ngoại ngữ/khảo thí quốc tế cho TMU.',
  },
  {
    id: 'tmu-threshold-not-final-cutoff',
    label:
      'Ngưỡng 20/30 là NGƯỠNG ĐẢM BẢO CHẤT LƯỢNG ĐẦU VÀO (điều kiện tối thiểu để nộp hồ sơ), KHÔNG phải điểm chuẩn trúng tuyển cuối cùng theo từng ngành (điểm chuẩn thực tế công bố sau, thường cao hơn nhiều so với ngưỡng sàn).',
    status: 'official-but-unparsed',
    sourceId: 'tmu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh đạt ngưỡng chỉ đủ điều kiện nộp hồ sơ, chưa chắc trúng tuyển.',
  },
];
