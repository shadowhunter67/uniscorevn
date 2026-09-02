import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hdiuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hdiu-foreign-language-combos-not-modeled',
    label:
      '3 ngành Ngôn ngữ (Trung Quốc, Nhật, Hàn Quốc) mỗi ngành công bố thêm 1 tổ hợp riêng dùng môn ngoại ngữ thứ 2 (D04 Toán/Văn/Tiếng Trung, D06 Toán/Văn/Tiếng Nhật, DD2 Toán/Văn/Tiếng Hàn) — 3 tổ hợp này KHÔNG mô hình hoá được (Tiếng Trung/Nhật/Hàn không có trong `SubjectId`). Cả 3 ngành vẫn tính được qua các tổ hợp còn lại (A01/C00/C19/D01/D14).',
    status: 'official-but-unparsed',
    sourceId: 'hdiu-admission-info-2025',
    scoreAffecting: true,
    impact: 'UniscoreVN không tính được tổ hợp dùng Tiếng Trung/Nhật/Hàn của 3 ngành Ngôn ngữ HDIU (các tổ hợp còn lại của 3 ngành này vẫn tính được).',
  },
  {
    id: 'hdiu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm ưu tiên khu vực/đối tượng ĐƯỢC CỘNG vào tổng trước khi so ngưỡng, nhưng KHÔNG công bố mức điểm ưu tiên cụ thể — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'hdiu-admission-info-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HDIU tự công bố.',
  },
  {
    id: 'hdiu-subject-combination-not-validated',
    label:
      'Mỗi ngành công bố 5-6 tổ hợp xét tuyển hợp lệ khác nhau (bảng mã xét tuyển, trang 5-9 Quyết định 129/QĐ-ĐHĐD) — UniscoreVN KHÔNG validate tổ hợp người dùng chọn có thuộc danh sách tổ hợp thật của ngành đã chọn hay không (cùng tiền lệ `schools/hou`, `schools/phenikaa`).',
    status: 'official-but-unparsed',
    sourceId: 'hdiu-admission-info-2025',
    scoreAffecting: false,
    impact: 'Người dùng có thể chọn tổ hợp không thực sự áp dụng cho ngành HDIU đã chọn mà UniscoreVN không cảnh báo.',
  },
  {
    id: 'hdiu-threshold-not-final-cutoff',
    label:
      'Bảng công bố là NGƯỠNG ĐẢM BẢO CHẤT LƯỢNG ĐẦU VÀO / ĐIỂM SÀN (điều kiện tối thiểu để nộp hồ sơ xét tuyển), KHÔNG phải điểm chuẩn trúng tuyển cuối cùng theo từng đợt xét tuyển.',
    status: 'official-but-unparsed',
    sourceId: 'hdiu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh đạt ngưỡng chỉ đủ điều kiện nộp hồ sơ, chưa chắc trúng tuyển.',
  },
];
