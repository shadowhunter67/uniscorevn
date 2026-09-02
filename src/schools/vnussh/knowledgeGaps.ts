import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnusshKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnussh-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'vnussh-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số VNU-USSH tự công bố.',
  },
  {
    id: 'vnussh-foreign-language-combos-not-modeled',
    label:
      'Trường công bố thêm tổ hợp D66 (mọi ngành), D04 (tiếng Trung — Hán Nôm/Đông phương học), D06 (tiếng Nhật — Nhật Bản học), DD2 (tiếng Hàn — Hàn Quốc học) — taxonomy môn dùng chung của app chưa có SubjectId cho các ngoại ngữ này nên chưa mô hình hoá. Mỗi ngành vẫn còn ít nhất 1 tổ hợp hợp lệ (D01) để tính.',
    status: 'official-but-unparsed',
    sourceId: 'vnussh-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh CHỈ thi D66/D04/D06/DD2 (không có tổ hợp nào khác trong danh sách hỗ trợ) chưa chọn được tổ hợp trong UniscoreVN cho ngành đó.',
  },
  {
    id: 'vnussh-multimedia-not-modeled',
    label:
      'Ngành Truyền thông đa phương tiện (QHX29) KHÔNG có trong bảng điểm chuẩn nhánh xét kết quả thi TN THPT thu thập được từ tuyensinh247/VietnamNet — có thể trường chỉ tuyển ngành này bằng phương thức khác (xét học bạ/ĐGNL) năm 2025, chưa xác minh được.',
    status: 'incomplete',
    sourceId: 'vnussh-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dự tuyển Truyền thông đa phương tiện chưa tra được điểm chuẩn qua UniscoreVN.',
  },
  {
    id: 'vnussh-internal-code',
    label:
      'Mã ngành dùng mã xét tuyển chính thức của trường (QHX01-QHX28) — KHÔNG phải mã ngành đào tạo chuẩn quốc gia (Bộ GD&ĐT).',
    status: 'official-but-unparsed',
    sourceId: 'vnussh-threshold-2025',
    scoreAffecting: false,
    impact: 'Mã ngành hiển thị là mã của trường, không dùng để tra cứu chéo với mã ngành Bộ GD&ĐT.',
  },
];
