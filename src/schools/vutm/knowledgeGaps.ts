import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vutmKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vutm-bonus-points-not-modeled',
    label:
      'Công thức chính chủ có thành phần "điểm cộng" ("Điểm xét tuyển ... cộng với điểm cộng, điểm ưu tiên đối tượng, khu vực theo quy định hiện hành") nhưng Thông báo 3036/TB-HVYDCT KHÔNG in bảng giá trị điểm cộng, và bảng này cũng không tìm thấy ở nguồn chính chủ nào khác trong batch research. Đây là thiếu NGUỒN (chưa đọc được bảng), không phải thiếu implement — runtime hiện chỉ cộng điểm ưu tiên KV/ĐT.',
    status: 'incomplete',
    sourceId: 'vutm-diemchuan-3036-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện được cộng điểm (thành tích/chứng chỉ, theo quy định riêng của Học viện) sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'vutm-d35-combination-not-modeled',
    label:
      'Ngành Y học cổ truyền (7720115) công bố 6 tổ hợp: B00, B03, A02, D08, D35, X14. Mã tổ hợp D35 chưa có trong `core/subjects.ts` và Thông báo 3036/TB-HVYDCT không chú giải thành phần 3 môn của mã này — không suy đoán, nên `thresholds.ts` chỉ liệt kê 5 tổ hợp còn lại cho ngành này.',
    status: 'incomplete',
    sourceId: 'vutm-diemchuan-3036-2026',
    scoreAffecting: false,
    impact: 'Thí sinh muốn xét ngành Y học cổ truyền bằng tổ hợp D35 chưa tính được qua UniscoreVN — 5 tổ hợp còn lại của ngành vẫn tính được bình thường.',
  },
  {
    id: 'vutm-entry-floor-and-other-method-not-modeled',
    label:
      'Ngoài phương thức xét kết quả thi TN THPT, VUTM 2026 còn phương thức xét tuyển thẳng (không có công thức tính điểm) — không mô hình hoá. Ngưỡng đảm bảo chất lượng đầu vào theo quy định của Bộ Y tế cho khối ngành sức khỏe (công bố riêng trước 17h00 ngày 10/7/2026) KHÔNG mô hình hoá tách bạch: điểm chuẩn cuối cùng của cả 3 ngành đều CAO HƠN ngưỡng nên phép so với điểm chuẩn đã bao hàm, nhưng runtime không giải thích được trường hợp bị loại riêng vì ngưỡng.',
    status: 'incomplete',
    sourceId: 'vutm-diemchuan-3036-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả đạt/không đạt so với điểm chuẩn đã công bố; chỉ thiếu bước giải thích ngưỡng đầu vào khối ngành sức khỏe.',
  },
];
