import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dumtpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dumtp-priority-value-silent',
    label:
      'Mục 5.2 "Điểm cộng" của "Thông tin tuyển sinh đại học năm 2025" chỉ nêu công thức GIẢM điểm ưu tiên cho thí sinh đạt từ 22,5/30 trở lên ("theo Quy chế tuyển sinh hiện hành của Nhà trường"), KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ TNUT/HTU/TUEBA/PVU/HUST/DNU/TUMP.',
    status: 'incomplete',
    sourceId: 'dumtp-dean-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số DUMTP tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'dumtp-tiebreak-not-modeled',
    label:
      'Điều 2, Quyết định 625/QĐ-ĐHKTYDĐN quy định: với phương thức 100 (thi TN THPT), thí sinh có điểm xét tuyển BẰNG điểm trúng tuyển phải đạt tiêu chí phụ (ưu tiên điểm môn Toán, sau đó thứ tự nguyện vọng) mới trúng tuyển. Module KHÔNG mô hình hoá tiêu chí phụ này (không có input "thứ tự nguyện vọng" trong hệ thống).',
    status: 'incomplete',
    sourceId: 'dumtp-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển ĐÚNG BẰNG điểm trúng tuyển đã công bố có thể được module báo "eligible" dù thực tế phải cạnh tranh thêm bằng tiêu chí phụ (Toán/thứ tự nguyện vọng) — chỉ ảnh hưởng các trường hợp biên đúng ngưỡng.',
  },
  {
    id: 'dumtp-pt1-formula-implicit',
    label:
      '"Thông tin tuyển sinh đại học năm 2025" không phát biểu lại một câu tường minh dạng "Điểm xét tuyển PT1 = tổng 3 môn thi + điểm ưu tiên" — công thức được suy ra từ mục 3.2 ("điểm trúng tuyển ... theo thang điểm 30 cho tất cả các tổ hợp xét tuyển", không đề cập hệ số/trọng số riêng cho PT1, khác PT3 học bạ có hệ số quy đổi riêng nêu rõ ở mục 5).',
    status: 'incomplete',
    sourceId: 'dumtp-dean-2025',
    scoreAffecting: true,
    impact: 'Nếu trường thực tế áp dụng hệ số/trọng số riêng cho PT1 mà tài liệu không nêu, Điểm xét tuyển hiển thị có thể sai — rủi ro thấp vì thang 30 + "áp dụng cho tất cả tổ hợp" là cách diễn đạt chuẩn cho công thức tổng thô không hệ số ở các trường khác đã research.',
  },
  {
    id: 'dumtp-other-methods-not-modeled',
    label: 'DUMTP 2025 còn 3 phương thức khác: thi TN THPT kết hợp IELTS (mã 409, chỉ áp dụng tổ hợp B08/D07), xét học bạ THPT (mã 200, chỉ áp dụng 5/9 mã ngành không cấp chứng chỉ hành nghề trực tiếp), và tuyển thẳng/ưu tiên xét tuyển/dự bị đại học (mã 301) — module CHỈ mô hình hoá phương thức 1 (thi TN THPT thuần).',
    status: 'incomplete',
    sourceId: 'dumtp-dean-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho DUMTP.',
  },
];
