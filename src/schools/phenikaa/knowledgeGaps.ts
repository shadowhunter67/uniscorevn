import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const phenikaaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'phenikaa-other-methods-not-modeled',
    label:
      'Phenikaa còn 4 phương thức khác (điểm học bạ THPT, kết quả ĐGTD/TSA, kết quả ĐGNL/HSA, kỳ thi SPT, kỳ thi V-SAT — bảng công bố đủ 5 cột ngưỡng) — nguồn công bố ngưỡng cho từng phương thức nhưng CHƯA chuẩn hoá vào runtime trong batch này, chỉ dùng cột thi TN THPT.',
    status: 'official-but-unparsed',
    sourceId: 'phenikaa-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ tính được phương thức xét kết quả thi TN THPT 2026.',
  },
  {
    id: 'phenikaa-priority-silent-for-non-talent-fields',
    label:
      'Nguồn công bố RÕ ràng 2 CTĐT tài năng loại trừ tuyệt đối điểm ưu tiên khu vực/đối tượng, nhưng IM LẶNG về điểm ưu tiên cho các lĩnh vực/ngành còn lại — dùng khung quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng khi hiển thị Điểm xét (`priority.ts`), ngưỡng vẫn so với TỔNG THÔ.',
    status: 'incomplete',
    sourceId: 'phenikaa-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số Phenikaa tự công bố cho các ngành ngoài 2 CTĐT tài năng.',
  },
  {
    id: 'phenikaa-subject-combination-not-validated',
    label:
      'Ngưỡng không nhân hệ số nên KHÔNG cần biết tổ hợp cụ thể của từng ngành để tính tổng thô — nhưng UniscoreVN cũng KHÔNG validate tổ hợp người dùng chọn có thuộc danh sách tổ hợp thật của ngành/CTĐT hay không (đề án tuyển sinh chi tiết theo mã ngành/tổ hợp chưa được đọc trong batch này).',
    status: 'official-but-unparsed',
    sourceId: 'phenikaa-threshold-2026',
    scoreAffecting: false,
    impact: 'Người dùng có thể vô tình chọn tổ hợp không thực sự áp dụng cho ngành Phenikaa đã chọn mà UniscoreVN không cảnh báo.',
  },
];
