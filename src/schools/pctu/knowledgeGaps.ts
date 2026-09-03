import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pctuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pctu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp công thức "Điểm xét tuyển = ĐM1 + ĐM2 + ĐM3 + Điểm ƯT", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành (Điều 7 Thông tư 06/2025/TT-BGDĐT) làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'pctu-admission-info-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số PCTU tự công bố riêng.',
  },
  {
    id: 'pctu-biology-prerequisite-not-modeled',
    label:
      'Ngành Y khoa và Răng-Hàm-Mặt yêu cầu tiêu chí phụ "có học môn Sinh học ở phổ thông" khi xét bằng PT2/PT3/PT4 (theo trang điểm sàn 2025) — điều kiện này KHÔNG có field tương ứng trong ApplicantProfile hiện tại nên chưa mô hình hoá thành điều kiện chặn riêng.',
    status: 'official-but-unparsed',
    sourceId: 'pctu-admission-info-2025',
    scoreAffecting: false,
    impact: 'Kết quả "đạt điểm chuẩn" cho 2 ngành Y khoa/RHM chưa kiểm tra điều kiện đã học môn Sinh — thí sinh không đủ điều kiện này vẫn có thể hiển thị "eligible" sai.',
  },
  {
    id: 'pctu-other-methods-not-modeled',
    label:
      'PCTU 2025 có 7 phương thức xét tuyển (PT1 tuyển thẳng, PT2 điểm thi THPT, PT3 học bạ, PT4 điểm thi kết hợp IELTS, PT5 điểm thi kết hợp học bạ, PT6 đánh giá năng lực ĐHQG HCM/HN, PT7 kết quả tốt nghiệp đại học) — module này CHỈ mô hình hoá PT2 (điểm thi THPT thuần).',
    status: 'incomplete',
    sourceId: 'pctu-admission-info-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng PT1/PT3/PT4/PT5/PT6/PT7 chưa tính được qua UniscoreVN cho PCTU.',
  },
];
