import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ulsaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ulsa-english-certificate-conversion-unpublished',
    label:
      'Thông tin tuyển sinh 2026 mục 4.1.2 "Quy đổi điểm chứng chỉ tiếng Anh quốc tế" ghi rõ "(Điểm quy đổi cụ thể sẽ được thông báo sau)" — tại thời điểm research trường CHƯA công bố bảng quy đổi. Đây là thiếu NGUỒN (trường chưa công bố), không phải thiếu implement: không có số để mô hình hoá.',
    status: 'incomplete',
    sourceId: 'ulsa-thongtin-tuyensinh-2026',
    scoreAffecting: true,
    impact: 'Thí sinh dùng chứng chỉ tiếng Anh quốc tế trong phương thức 100 có thể có Điểm xét tuyển thực tế khác kết quả UniscoreVN tính hiện tại (chỉ dùng điểm thi TN THPT).',
  },
  {
    id: 'ulsa-other-methods-not-modeled',
    label:
      'ULSA 2026 có 5 phương thức (Thông tin tuyển sinh 2026, mục 4): PT100 (thi TN THPT 2026); PT200 (học bạ — tổng TB 3 môn theo tổ hợp của cả 3 năm lớp 10/11/12 >= 18,0/30 gồm điểm ưu tiên, riêng Ngôn ngữ Anh cần điểm tổng kết tiếng Anh từng năm >= 7,0); PT402 (ĐGNL/ĐGTD — HSA, TSA, V-ACT); PT301 (tuyển thẳng/ưu tiên xét tuyển); PT500 (kết quả năm dự bị đại học dân tộc, >= 18,0/30). Module này CHỈ mô hình hoá PT100 — Thông báo 2752 gọi PT100 là "PT gốc" và công bố điểm chuẩn PT200/PT402 dưới dạng ĐIỂM QUY ĐỔI TƯƠNG ĐƯƠNG từ PT gốc, nhưng công thức quy đổi ngược (từ điểm học bạ/ĐGNL của thí sinh sang thang gốc) không được công bố trong 2 nguồn đã đọc.',
    status: 'incomplete',
    sourceId: 'ulsa-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / ĐGNL-ĐGTD / dự bị đại học chưa tính được qua UniscoreVN cho ULSA.',
  },
  {
    id: 'ulsa-quality-floor-per-combination-not-published',
    label:
      'Mục 4.1.1 nêu điều kiện dự tuyển PT100 là "đạt mức điểm đảm bảo chất lượng theo quy định của Trường theo từng tổ hợp môn thi/bài thi xét tuyển và theo từng cơ sở đào tạo" nhưng KHÔNG in bảng mức cụ thể trong trang này, và Thông báo 2752 chỉ công bố điểm trúng tuyển cuối cùng. Ngưỡng đảm bảo chất lượng đầu vào riêng theo tổ hợp/cơ sở KHÔNG mô hình hoá — runtime chỉ so với điểm trúng tuyển chính thức (luôn >= ngưỡng nên không làm sai kết quả "đạt", chỉ không giải thích được trường hợp bị loại vì ngưỡng).',
    status: 'incomplete',
    sourceId: 'ulsa-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả đạt/không đạt so với điểm trúng tuyển đã công bố; chỉ thiếu bước giải thích ngưỡng nhận hồ sơ.',
  },
];
