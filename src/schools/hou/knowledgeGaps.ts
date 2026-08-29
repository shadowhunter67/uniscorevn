import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const houKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hou-art-and-chinese-fields-not-modeled',
    label:
      'HOU công bố ngưỡng cho 22 ngành, batch này chỉ mô hình hoá 16 ngành dùng tổ hợp THPT chuẩn. 5 ngành LOẠI TRỪ: Thiết kế đồ hoạ, Thiết kế thời trang, Kiến trúc, Thiết kế nội thất (tổ hợp có môn năng khiếu vẽ do trường tự tổ chức thi — HÌNH HỌA/VẼ MỸ THUẬT/Bố cục màu — không phải môn thi TN THPT, không có trong danh mục môn dùng chung); Ngôn ngữ Trung Quốc (tổ hợp bắt buộc môn Tiếng Trung, không có trong danh mục môn).',
    status: 'official-but-unparsed',
    sourceId: 'hou-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN không tính được 5/22 ngành của HOU.',
  },
  {
    id: 'hou-english-weighted-combo-not-modeled',
    label:
      'Ngành Ngôn ngữ Anh (TT21) dùng tổ hợp "TIẾNG ANH (hệ số 2), NGỮ VĂN, Toán" — nguồn chỉ nêu rõ cách quy đổi thang 50→30 cho trường hợp HAI môn hệ số 2 ("tổ hợp xét tuyển có hai môn nhân hệ số 2 được tính theo thang điểm 50 đã được quy đổi về thang điểm 30"), KHÔNG nêu rõ cách quy đổi cho trường hợp một môn hệ số 2 như Ngôn ngữ Anh — suy diễn thang tối đa 40 quy đổi về 30 là NGOẠI SUY, không phải trích nguyên văn, nên loại khỏi bảng ngưỡng runtime (không tính ngành này).',
    status: 'official-but-unparsed',
    sourceId: 'hou-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN không tính được ngành Ngôn ngữ Anh của HOU.',
  },
  {
    id: 'hou-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm ưu tiên khu vực/đối tượng ĐƯỢC CỘNG vào tổng trước khi so ngưỡng, nhưng KHÔNG công bố mức điểm ưu tiên cụ thể — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'hou-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HOU tự công bố.',
  },
  {
    id: 'hou-subject-combination-not-validated',
    label:
      'Mỗi ngành công bố 2-4 tổ hợp xét tuyển hợp lệ khác nhau — UniscoreVN KHÔNG validate tổ hợp người dùng chọn có thuộc danh sách tổ hợp thật của ngành đã chọn hay không (giống tiền lệ `schools/phenikaa`).',
    status: 'official-but-unparsed',
    sourceId: 'hou-threshold-2026',
    scoreAffecting: false,
    impact: 'Người dùng có thể chọn tổ hợp không thực sự áp dụng cho ngành HOU đã chọn mà UniscoreVN không cảnh báo.',
  },
  {
    id: 'hou-threshold-not-final-cutoff',
    label:
      'Bảng công bố là NGƯỠNG BẢO ĐẢM CHẤT LƯỢNG ĐẦU VÀO (điều kiện đăng ký xét tuyển tối thiểu), KHÔNG phải điểm chuẩn trúng tuyển cuối cùng — điểm chuẩn thực tế theo từng ngành/đợt thường cao hơn ngưỡng này và công bố sau khi có kết quả xét tuyển.',
    status: 'official-but-unparsed',
    sourceId: 'hou-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh đạt ngưỡng chỉ đủ điều kiện ĐĂNG KÝ, chưa chắc trúng tuyển.',
  },
];
