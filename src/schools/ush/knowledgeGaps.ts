import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ushKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ush-gdtc-not-modeled',
    label: 'Ngành Giáo dục thể chất có ngưỡng riêng "theo quy định của Bộ GDĐT" — thông báo trường không nêu số cụ thể, chưa mô hình hoá để tránh suy đoán.',
    status: 'official-but-unparsed',
    sourceId: 'ush-admission-notice-2026',
    scoreAffecting: false,
  },
  {
    id: 'ush-transcript-method-not-modeled',
    label: 'Phương thức 2 (xét học bạ, mã 406) và diện xét tuyển thẳng/ưu tiên xét tuyển (vận động viên cấp 1, kiện tướng...) chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'ush-admission-notice-2026',
    scoreAffecting: false,
  },
  {
    id: 'ush-bonus-not-modeled',
    label:
      'Quyết định 58/QĐ-TDTTHCM mục 8.b xác nhận có "Điểm cộng (nếu có)" do Trường tự quy định và công bố riêng trên cổng thông tin trước thời điểm xét tuyển — chưa tìm được bảng cụ thể, chưa mô hình hoá (mặc định = 0 trong ĐXT tham khảo).',
    status: 'incomplete',
    sourceId: 'ush-quyetdinh-58-2026',
    scoreAffecting: true,
    impact: 'ĐXT (điểm xét tuyển tham khảo) hiện thiếu điểm cộng nếu thí sinh có thành tích được cộng điểm — không ảnh hưởng tới kết quả đạt/chưa đạt ngưỡng đầu vào (ngưỡng đầu vào không cộng điểm cộng/ưu tiên).',
  },
];
