import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'blu-priority-table-partial',
    label:
      'Trang "Chính sách ưu tiên trong tuyển sinh" công bố nguyên văn công thức và 2 ví dụ minh hoạ xác nhận mức KV1 = 0,75 và mức nhóm đối tượng ưu tiên 2 = 1,00 — bảng đầy đủ theo TỪNG khu vực/đối tượng nằm trong ảnh minh hoạ không đọc được toàn bộ số liệu riêng ngoài 2 mức đã xác nhận — dùng khung điểm ưu tiên quốc gia hiện hành cho phần còn lại của bảng (`priority.ts`), cùng tiền lệ `schools/hluv`, `schools/hat`.',
    status: 'incomplete',
    sourceId: 'blu-priority-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia cho các mức KV/ĐT không xuất hiện trực tiếp trong 2 ví dụ minh hoạ của trường.',
  },
  {
    id: 'blu-mamnon-not-modeled',
    label:
      'Ngành Giáo dục Mầm non (51140201, điểm chuẩn 18,61/30) là trình độ CAO ĐẲNG (khác cấp đào tạo với 13 ngành đại học còn lại) và xét theo tổ hợp năng khiếu M00 (Ngữ văn, Toán, Năng khiếu GDMN) — môn năng khiếu không có SubjectId tương ứng trong hệ thống UniscoreVN — KHÔNG mô hình hoá.',
    status: 'incomplete',
    sourceId: 'blu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Giáo dục Mầm non (cao đẳng) chưa tính được qua UniscoreVN cho BLU.',
  },
  {
    id: 'blu-x04-combination-not-modeled',
    label:
      'Tổ hợp X04 (Toán, Ngữ văn, Công nghệ nông nghiệp) áp dụng cho 4 ngành (Khoa học môi trường, Chăn nuôi, Bảo vệ thực vật, Nuôi trồng thủy sản) không có SubjectId "Công nghệ nông nghiệp" tương ứng trong hệ thống — 4 ngành này vẫn tính được với 8/9 tổ hợp môn còn lại (B00/B03/B08/C01/C02/C03/C04/D01), chỉ riêng thí sinh chọn thi tổ hợp có Công nghệ nông nghiệp là chưa tính được.',
    status: 'incomplete',
    sourceId: 'blu-combination-2026',
    scoreAffecting: false,
    impact: 'Thí sinh thi tổ hợp X04 chưa tính được qua UniscoreVN cho 4 ngành liên quan của BLU — các tổ hợp còn lại tính bình thường.',
  },
  {
    id: 'blu-hocba-dgnl-branch-not-modeled',
    label:
      'BLU 2026 còn 2 nhánh khác đã công bố điểm chuẩn đầy đủ theo ngành: xét kết quả học tập cấp THPT (học bạ, mã phương thức 200/406, thang 30) và sử dụng kết quả thi ĐGNL V-ACT (mã phương thức 402, thang 1200) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT (mã phương thức 100/405).',
    status: 'incomplete',
    sourceId: 'blu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc kết quả thi ĐGNL V-ACT chưa tính được qua UniscoreVN cho BLU (dù điểm chuẩn đã công bố).',
  },
  {
    id: 'blu-other-methods-not-modeled',
    label: 'BLU 2026 còn phương thức xét tuyển thẳng theo Điều 8 của Quy chế tuyển sinh hiện hành (mã phương thức 301) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'blu-combination-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển thẳng chưa tính được qua UniscoreVN cho BLU.',
  },
];
