import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuumpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuump-hsa-method-not-modeled',
    label:
      'VNU-UMP con xet tuyen bang ket qua thi Danh gia nang luc (HSA) cua DHQGHN voi dieu kien rieng: Y khoa/Rang Ham Mat can diem trung binh 3 nam mon Hoa/Sinh >=8,0 va tong diem thi TN THPT >=20,00/30; cac nganh HSA khac can diem trung binh mon lien quan >=7,0 va tong THPT >=16,50/30. Runtime chua mo hinh hoa phuong thuc nay.',
    status: 'official-but-unparsed',
    sourceId: 'vnuump-admission-notice-2026',
  },
  {
    id: 'vnuump-straight-admission-not-modeled',
    label:
      'VNU-UMP danh 2% chi tieu cho xet tuyen thang/uu tien theo quy che Bo GDDT va 2% cho he du bi dan toc; runtime chi mo hinh hoa phuong thuc thi TN THPT (96% chi tieu).',
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
