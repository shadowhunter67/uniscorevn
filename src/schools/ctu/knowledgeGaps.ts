import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-21 (thông báo chính thức CTU đọc trực tiếp qua browser thật, xem
 * `sources.ts:ctu-quality-threshold-2026`). Điều kiện 1 (tổng 3 môn ≥15/30, không môn nào ≤1,0)
 * đã verified và áp dụng chung mọi ngành/phương thức. Các mục dưới đây là gap CỤ THỂ đọc được từ
 * chính văn bản, không phải "trường chưa công bố" chung chung.
 */
export const ctuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ctu-per-major-threshold-pdf-unparsed',
    label:
      'Điểm sàn (điều kiện 2, mục 2.2.1) theo TỪNG MÃ XÉT TUYỂN — batch 2026-08-27: đã đọc trực tiếp phụ lục PDF 9 trang bằng OCR (poppler render + vision, xem `sources.ts:ctu-appendix-threshold-2026`) và nhập đủ 127 mã vào `thresholds.ts`, mở nhánh exact `ctu-thpt-exam-exact-2026` (Phương thức 2). Còn ngoài phạm vi nhánh exact: nhóm ngành năng khiếu (Giáo dục Mầm non/Thể chất/Kiến trúc, mã 7480106 Thiết kế vi mạch bán dẫn) và tổ hợp chứa môn không có trong taxonomy (Tiếng Pháp, các môn năng khiếu); Phương thức 3 (học bạ)/4 (V-SAT) vẫn cần bảng quy đổi.',
    status: 'official-but-unparsed',
    sourceId: 'ctu-appendix-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'ctu-hocba-vsat-conversion-table-unparsed',
    label:
      'Bảng quy đổi điểm học bạ THPT và điểm V-SAT sang điểm thi tốt nghiệp THPT năm 2026 tương đương — nguồn xác nhận 2 phương thức này dùng điểm ĐÃ QUY ĐỔI để so với điểm sàn (không phải điểm thô/điểm trung bình học bạ trực tiếp), nhưng bảng quy đổi nằm ở 2 trang riêng ("Bảng quy đổi điểm Học bạ năm 2026", "Bảng quy đổi điểm V-SAT năm 2026") chưa đọc/parse trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'ctu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    attemptedSources: [
      'https://tuyensinh.ctu.edu.vn/chuong-trinh-dai-tra/177-thong-tin/1161-thong-bao-bang-quy-doi-diem-hoc-ba-nam-2026.html',
      'https://tuyensinh.ctu.edu.vn/chuong-trinh-dai-tra/177-thong-tin/1159-thong-bao-bang-quy-doi-diem-v-sat-nam-2026.html',
    ],
    whyNotInferred: 'Không dùng điểm trung bình học bạ thô làm proxy cho điểm đã quy đổi — 2 khái niệm khác nhau, nguồn không xác nhận tương đương.',
    impact: 'exact-final-score-blocking',
  },
  {
    id: 'ctu-law-combo-conversion-unparsed',
    label:
      'Điều kiện tổ hợp môn riêng nhóm pháp luật (mục 2.2.3): tổ hợp C00 cần Ngữ văn ≥6,0; các tổ hợp khác cần Toán+Ngữ văn ≥12,0 — nguồn ghi rõ "(sử dụng điểm V-SAT/Học bạ quy đổi)", tức là điểm ĐÃ QUY ĐỔI, không phải điểm thi TN THPT thô. Phụ thuộc cùng bảng quy đổi chưa đọc được ở `ctu-hocba-vsat-conversion-table-unparsed`.',
    status: 'official-but-unparsed',
    sourceId: 'ctu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Không dùng điểm Toán/Văn thi TN THPT thô thay cho điểm quy đổi V-SAT/học bạ — nguồn phân biệt rõ 2 khái niệm này, đánh tráo sẽ vi phạm evidence-first.',
    impact: 'eligibility-partial-scope',
  },
  {
    id: 'ctu-priority-bonus-table-not-found',
    label:
      'Điểm ưu tiên KV/ĐT: footnote [2] chỉ nêu "Điểm ưu tiên bao gồm: Khu vực tuyển sinh và Đối tượng ưu tiên" (thang 30 theo quy chế hiện hành) ⇒ áp Điều 7 Thông tư 08/2022/TT-BGDĐT + công thức giảm ≥ 22,5 (judgment call, `priority.ts`), đã dùng cho nhánh exact Phương thức 2 (`ctu-thpt-exam-exact-2026`). Phương thức thi TN THPT không có điểm cộng thành tích nên nhánh exact không bị chặn; bảng điểm cộng cho Phương thức khác (nếu có) vẫn chưa tìm được nguồn CTU tự công bố.',
    status: 'incomplete',
    sourceId: 'ctu-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'exact-final-score-blocking',
  },
  {
    id: 'ctu-program-catalog-not-imported',
    label:
      'Danh mục 127 ngành/chương trình đầy đủ (2 chương trình tiên tiến, 17 chất lượng cao, 108 đại trà), mã xét tuyển, tổ hợp môn từng ngành, và bảng ánh xạ ngành → nhóm ngưỡng (standard/law/teacher) chưa import — evaluator nhận `CtuProgramGroup` trực tiếp từ caller (cùng pattern HUB/VLU/UFM), không tự suy từ tên ngành.',
    status: 'incomplete',
    sourceId: 'ctu-quality-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'program-catalog-only',
  },
  {
    id: 'ctu-gdmn-gdtc-special-formula-not-modeled',
    label:
      'Ngành Giáo dục Mầm non (công thức riêng: (tổng điểm 2 môn văn hóa + điểm ưu tiên×2/3) ≥13,33, kèm Năng khiếu GDMN ≥5,0) và ngành Giáo dục Thể chất (công thức riêng ≥12,67 kèm Năng khiếu TDTT ≥5,0, và miễn trừ cho vận động viên cấp 1/kiện tướng/huy chương) — nguồn công bố đầy đủ NHƯNG đây là 2 ngành đơn lẻ có công thức hoàn toàn khác biệt (điểm năng khiếu, điểm ưu tiên×2/3), ngoài phạm vi batch threshold-only này. Không model để giữ scope gọn — không phải do thiếu nguồn.',
    status: 'incomplete',
    sourceId: 'ctu-quality-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'program-catalog-only',
  },
];
