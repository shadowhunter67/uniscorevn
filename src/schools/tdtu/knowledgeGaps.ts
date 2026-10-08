import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-18 — trang "Phương thức tuyển sinh năm 2026" (`sources.ts:tdtu-admission-plan-2026`)
 * là HTML text đọc trực tiếp được (không phải PDF quét), công bố ĐẦY ĐỦ công thức Điểm xét tuyển
 * PT1/PT2 dạng số cụ thể — không còn ẩn số kiểu "PL6 max 10, PL7 max 5, chưa rõ cộng hay chọn cao
 * nhất" như research sơ bộ batch trước nghi ngờ: trang tự nói rõ "Điểm cộng = Điểm thưởng + Điểm
 * xét thưởng" (CỘNG, không chọn cao nhất), tổng "Điểm cộng" trần 10 (không phải 10+5=15). Phụ lục
 * 5/6/7 (PDF, text layer đọc được) xác nhận đủ bảng số. Các khoảng trống dưới đây là phần CHƯA
 * import/wire trong batch expansion này — không phải ẩn số công thức.
 */
export const tdtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tdtu-program-catalog-not-imported',
    label:
      'Danh mục tên và mã ngành của TDTU đã có đủ 119/119 ngành. Phần còn thiếu là tổ hợp xét tuyển theo từng ngành, "môn điều kiện" riêng từng ngành (ví dụ Tiếng Anh ≥ 6.0) và ngưỡng đầu vào riêng; hiện mới có ngưỡng chung 15/30 theo Bộ GDĐT. Vì bảng gốc bị ngắt dòng ở nhiều cụm ngành như STT 15-19 và 47-52, UniscoreVN chưa tự gán tổ hợp cho từng ngành để tránh sai lệch.',
    status: 'official-but-unparsed',
    sourceId: 'tdtu-pl2-programs-pt1-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred: 'Tổ hợp/ngưỡng riêng ngành cần đối chiếu lại trực tiếp PDF gốc theo từng trang (thủ công, không dùng text-extraction tự động do đã xác nhận bị xáo trộn ở 2 cụm trên) — không làm trong batch này để tránh gán sai tổ hợp cho ngành.',
    impact: 'eligibility-only-gap',
  },
  {
    id: 'tdtu-pt1-other-applicant-types',
    label:
      'Chưa hỗ trợ tính Điểm năng lực cho Đối tượng 1.2 (tốt nghiệp trước 2026), 1.3 (SAT/ACT), 1.4 (bằng THPT nước ngoài) và 1.5 (chương trình LKQT). Hiện UniscoreVN chỉ hỗ trợ Đối tượng 1.1: học sinh lớp 12, tốt nghiệp THPT 2026.',
    status: 'official-but-unparsed',
    sourceId: 'tdtu-admission-plan-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred: 'Đối tượng 1.1 là phổ biến nhất (học sinh lớp 12 chuẩn) — ưu tiên implement đúng 1 đối tượng chính xác thay vì dàn trải nông cả 5.',
    impact: 'scope-boundary-not-a-gap',
  },
  {
    id: 'tdtu-law-pharmacy-alt-threshold',
    label:
      'Các ngành Luật, Dược học và Kế toán (Kiểm toán) có ngưỡng đầu vào riêng: đạt ngưỡng Bộ GDĐT ≥20/30, hoặc học lực Tốt và tổng ≥18/30, hoặc điểm xét TN THPT ≥8.5. UniscoreVN hiện mới áp dụng ngưỡng chung 15/30, chưa phân biệt theo ngành.',
    status: 'official-but-unparsed',
    sourceId: 'tdtu-pl2-programs-pt1-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'eligibility-only-gap',
  },
];
