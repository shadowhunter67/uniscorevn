import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuumpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuump-hsa-method-not-modeled',
    label:
      'VNU-UMP con xét tuyển bằng kết quả thi Danh gia năng lực (HSA) của DHQGHN voi điều kiện riêng: Y khoa/Răng Hàm Mặt cần điểm trung bình 3 năm môn Hóa/Sinh >=8,0 va tổng điểm thi TN THPT >=20,00/30; các ngành HSA khác cần điểm trung bình môn liên quan >=7,0 va tổng THPT >=16,50/30. Runtime chưa mô hình hóa phương thức nay.',
    status: 'official-but-unparsed',
    sourceId: 'vnuump-admission-notice-2026',
  },
  {
    id: 'vnuump-straight-admission-not-modeled',
    label:
      'VNU-UMP danh 2% chỉ tiêu cho xét tuyển thẳng/ưu tiên theo quy chế Bộ GDĐT va 2% cho he du bi dan toc; runtime chi mô hình hóa phương thức thi TN THPT (96% chỉ tiêu).',
    status: 'incomplete',
    sourceId: 'vnuump-admission-notice-2026',
  },
  {
    id: 'vnuump-achievement-bonus-not-modeled',
    label:
      'Trang tuyển sinh 2026 mô tả điểm cộng cho thí sinh có thành tích xuất sắc (giải HSG quốc gia/quốc tế/cấp ĐHQGHN/cấp tỉnh, giải khoa học kỹ thuật) tối đa 10% thang điểm xét tuyển (3,0/30) — KHÔNG có input field tương ứng trong ApplicantProfile cho các loại thành tích này, mặc định = 0. Thông báo 2468/TB-ĐHYD mục 1 xác nhận ngưỡng đầu vào theo ngành KHÔNG tính điểm cộng (chỉ điểm ưu tiên KV/ĐT mới cộng vào ngưỡng) nên gap này KHÔNG ảnh hưởng kết quả đạt/chưa đạt ngưỡng, chỉ ảnh hưởng điểm xét tuyển cạnh tranh cuối cùng.',
    status: 'incomplete',
    sourceId: 'vnuump-admission-notice-2026',
    scoreAffecting: false,
  },
];
