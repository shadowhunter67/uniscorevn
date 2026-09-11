import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hmtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hmtu-bonus-kk-not-modeled',
    label:
      'Công thức chính chủ có thành phần "KK: Điểm cộng khuyến khích (nếu có)" cộng thẳng vào Điểm xét tuyển, nhưng Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026 KHÔNG in bảng giá trị điểm khuyến khích. Đây là thiếu NGUỒN (bảng chưa đọc được ở nguồn chính chủ nào), không phải thiếu implement — runtime hiện chỉ cộng điểm ưu tiên KV/ĐT.',
    status: 'incomplete',
    sourceId: 'hmtu-thongtin-tuyensinh-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện được cộng điểm khuyến khích sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'hmtu-entry-floor-not-modeled',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào cho nhánh xét kết quả thi TN THPT (mục 5.1.2) được trường công bố riêng sau khi Bộ GD&ĐT xác định ngưỡng khối ngành sức khỏe — Thông báo số 594/TB-ĐHKTYTHD ngày 10/7/2026, CHƯA đọc nội dung trong batch này. Điểm trúng tuyển cuối cùng của cả 5 ngành (22,50-25,00/30) đều nằm trên ngưỡng nên phép so với điểm trúng tuyển đã bao hàm, nhưng runtime không giải thích được trường hợp bị loại riêng vì ngưỡng.',
    status: 'incomplete',
    sourceId: 'hmtu-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả đạt/không đạt so với điểm trúng tuyển đã công bố; chỉ thiếu bước giải thích ngưỡng đầu vào khối ngành sức khỏe.',
  },
  {
    id: 'hmtu-other-methods-not-modeled',
    label:
      'HMTU 2026 có 4 phương thức (Thông tin tuyển sinh mục II.2): PT1 xét tuyển thẳng (gồm thí sinh từ trường Dự bị Đại học dân tộc); PT2 xét kết quả thi TN THPT 2026; PT3 xét học bạ THPT (cùng dạng công thức "(2×Điểm A + Điểm B + Điểm C)×3/4 + ƯT + KK" nhưng Điểm A/B/C là điểm trung bình chung 06 học kỳ lớp 10/11/12 của môn tương ứng — có ĐỦ công thức và ĐỦ điểm chuẩn ở cột "200" của Thông báo 706, nhưng chưa implement ở batch này vì còn rào học lực xếp loại khá/giỏi theo mục 5.1.3 mà `ApplicantProfile` không có trường tương ứng); PT4 xét ĐGNL ĐHQG Hà Nội / ĐHQG TP.HCM / ĐGTD ĐH Bách khoa Hà Nội (cũng có rào học lực theo mục 5.1.4). Module này CHỈ mô hình hoá PT2 — nhánh duy nhất KHÔNG có rào học lực (mục 5.1.2).',
    status: 'incomplete',
    sourceId: 'hmtu-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / ĐGNL / ĐGTD / tuyển thẳng chưa tính được qua UniscoreVN cho HMTU.',
  },
];
