import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vmuvinhKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vmuvinh-bonus-points-not-modeled',
    label:
      'Quy định về điểm xét tuyển (mục IV.4.1.a) có thành phần "điểm cộng (nếu có)" cộng cùng điểm ưu tiên, nhưng Thông tin tuyển sinh đại học năm 2026 KHÔNG in bảng giá trị điểm cộng trong phần đã đọc. Thiếu NGUỒN, không phải thiếu implement — runtime hiện chỉ cộng điểm ưu tiên KV/ĐT.',
    status: 'incomplete',
    sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện được cộng điểm sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'vmuvinh-entry-floor-not-modeled',
    label:
      'Điều kiện nhánh thi TN THPT (mục II.2.2.5) yêu cầu điểm các môn thuộc tổ hợp "(đã bao gồm điểm cộng, điểm ưu tiên) đạt ngưỡng đảm bảo chất lượng đầu vào của Bộ GD&ĐT và Bộ Y tế quy định". Trường công bố ngưỡng cụ thể trong một thông báo riêng ngày 10/7/2026 (chưa đọc nội dung trong batch này). Điểm trúng tuyển cuối cùng của cả 5 ngành (18,00-23,50/30) đều nằm trên ngưỡng nên phép so với điểm trúng tuyển đã bao hàm, nhưng runtime không giải thích được trường hợp bị loại riêng vì ngưỡng.',
    status: 'incomplete',
    sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả đạt/không đạt so với điểm trúng tuyển đã công bố; chỉ thiếu bước giải thích ngưỡng đầu vào khối ngành sức khỏe.',
  },
  {
    id: 'vmuvinh-other-methods-not-modeled',
    label:
      'VMU-Vinh 2026 có 4 phương thức (Thông tin tuyển sinh mục III.3.3): 100 xét kết quả kỳ thi TN THPT; 301 xét tuyển thẳng theo Điều 8 Quy chế; 200 xét kết quả học tập cấp THPT (học bạ — Điểm xét tuyển là điểm trung bình chung cả năm lớp 10/11/12 của các môn trong tổ hợp cộng điểm ưu tiên/điểm cộng; có ĐỦ công thức và ĐỦ điểm trúng tuyển ở cột thứ hai của Thông báo 809, nhưng nhánh này bị chặn bởi rào HỌC LỰC xếp loại giỏi/khá theo mục II.2.2.6 mà `ApplicantProfile` không có trường tương ứng, và KHÔNG áp dụng cho ngành Y khoa); 500 phương thức khác (dự bị đại học, lưu học sinh Lào). Ngoài ra chương trình "Điều dưỡng liên thông" (LT7720301) chỉ tuyển bằng phương thức 200. Module này CHỈ mô hình hoá phương thức 100.',
    status: 'incomplete',
    sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / tuyển thẳng / dự bị đại học và thí sinh xét liên thông ngành Điều dưỡng chưa tính được qua UniscoreVN cho VMU-Vinh.',
  },
  {
    id: 'vmuvinh-tiebreak-not-modeled',
    label:
      'Tiêu chí phụ khi bằng điểm ở cuối danh sách (mục IV.4.1.b): "Ưu tiên 1: Thí sinh có điểm cộng thấp hơn". Hồ sơ dùng chung không có điểm cộng nên KHÔNG mô hình hoá.',
    status: 'incomplete',
    sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có Điểm xét tuyển ĐÚNG BẰNG điểm trúng tuyển vẫn có thể trượt do tiêu chí phụ — UniscoreVN báo "đạt" ở trường hợp biên này.',
  },
];
