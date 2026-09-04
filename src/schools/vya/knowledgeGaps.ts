import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vyaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vya-hcm-campus-not-modeled',
    label:
      'VYA có Phân hiệu tại TP.HCM (261 Hoàng Hữu Nam, Tăng Nhơn Phú) với 3/9 ngành riêng (Xây dựng Đảng và Chính quyền nhà nước, Luật, Công tác Thanh thiếu niên) và điểm trúng tuyển THẤP HƠN cơ sở Hà Nội (Thông báo 162/TB-HVTTNVN, mục 1, bảng "Phân hiệu tại TP.HCM": 17/18, 20/21.5, 17/18). KHÔNG mô hình hoá — chỉ dùng bảng "Tại Hà Nội" (cơ sở chính).',
    status: 'incomplete',
    sourceId: 'vya-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào Phân hiệu TP.HCM của VYA chưa tính được qua UniscoreVN (chỉ tính được cho cơ sở chính Hà Nội).',
  },
  {
    id: 'vya-law-qhcc-transcript-not-offered',
    label:
      '2/9 ngành (Luật 7380101, Quan hệ công chúng 7320108) được Thông báo 162/TB-HVTTNVN ghi rõ "Không xét" ở phương thức 200 (học bạ) năm 2026 — CHỈ mô hình hoá phương thức 100 (thi TN THPT) cho 2 ngành này.',
    status: 'verified',
    sourceId: 'vya-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh muốn xét học bạ vào Luật/Quan hệ công chúng của VYA không tính được ở phương thức này (đúng thực tế trường không nhận hồ sơ, không phải thiếu dữ liệu).',
  },
  {
    id: 'vya-tuyen-thang-bonus-not-modeled',
    label:
      'Quyết định 218/QĐ-HVTTNVN mục 5.2.1 quy định điểm thưởng 3,00 điểm cố định (thang 30) cho thí sinh đủ điều kiện xét tuyển thẳng nhưng không dùng quyền xét tuyển thẳng — hồ sơ dùng chung KHÔNG có field xác định điều kiện xét tuyển thẳng nên KHÔNG mô hình hoá nhóm điểm cộng này (mục 5.2.2, bảng điểm khuyến khích IELTS, ĐÃ mô hình hoá qua `bonus.ts`, cùng tiền lệ PTIT).',
    status: 'incomplete',
    sourceId: 'vya-thong-tin-tuyen-sinh-2026',
    scoreAffecting: true,
    impact: 'Thí sinh đủ điều kiện xét tuyển thẳng theo Điều 8 nhưng không dùng quyền xét tuyển thẳng sẽ được tính điểm thấp hơn thực tế tối đa 3,00 điểm (đã bù bằng bảng IELTS nếu có, tổng điểm cộng vẫn kẹp trần 3,0/30 theo quy chế).',
  },
  {
    id: 'vya-law-subscore-condition-not-enforced',
    label:
      'Quyết định 218/QĐ-HVTTNVN quy định thêm cho ngành Luật: điểm môn Toán và Ngữ văn, hoặc Toán, hoặc Ngữ văn của tổ hợp ĐKXT phải >= 6,0 VÀ tổng 3 môn >= 18,0 (cả 2 phương thức). Điều kiện phụ này KHÔNG được enforce trong `evaluate.ts` — ngưỡng trúng tuyển thực tế 20/30 (phương thức 100) đã cao hơn floor 18,0 này nên không ảnh hưởng kết quả trong đa số trường hợp, nhưng một hồ sơ đạt >=20 tổng điểm mà có 1 môn dưới 6,0 vẫn sẽ bị model báo "đạt" sai.',
    status: 'incomplete',
    sourceId: 'vya-thong-tin-tuyen-sinh-2026',
    scoreAffecting: false,
    impact: 'Rủi ro false-positive hiếm gặp cho ngành Luật khi điểm 1 môn riêng lẻ dưới 6,0 dù tổng điểm đạt ngưỡng.',
  },
];
