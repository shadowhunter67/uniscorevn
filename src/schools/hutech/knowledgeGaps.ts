import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-18 — trang chính thức `hutech.edu.vn` (xem `sources.ts`) xác nhận đầy đủ 4
 * phương thức + ngưỡng đầu vào 4 nhóm ngành (công bố 04/7/2026, không còn "sẽ công bố sau"). Các
 * khoảng trống dưới đây là phần đã tìm kỹ nhưng KHÔNG định vị được nguồn chính thức đọc được, hoặc
 * là hạn chế thật của mô hình dữ liệu dùng chung hiện tại.
 *
 * **Batch "6 học kỳ" — ĐÃ ĐÓNG `hutech-hocba-semester-granularity-gap`** (xoá khỏi mảng dưới đây,
 * cùng quy ước UFM đã dùng khi đóng `ufm-hocba-semester-granularity-gap`): blocker vốn KHÔNG phải
 * thiếu nguồn mà là mô hình dữ liệu dùng chung chỉ lưu TB cả năm. `ApplicantProfile.transcript`
 * nay có nhánh `bySemester` lưu đủ 6 học kỳ (`core/transcriptSemesters.ts`), nên phương thức xét
 * học bạ tính được đúng công thức "TB 3 môn theo tổ hợp của 6 học kỳ" và lên `exactCalculator: true`
 * (xem `methods.ts`/`evaluate.ts`). Gap được đóng bằng DỮ LIỆU THẬT, không phải bằng xấp xỉ: thí
 * sinh chưa nhập đủ 6 học kỳ thì evaluator trả `partial` + liệt kê đúng học kỳ còn thiếu, tuyệt đối
 * không lấy TB cả năm làm proxy.
 */
export const hutechKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hutech-bonus-table-not-found',
    label:
      'Bảng điểm thưởng/điểm khuyến khích (thành tích HSG, chứng chỉ quốc tế SAT/ACT/A-level/IB dùng xét tuyển thẳng) — nguồn xác nhận HUTECH CÓ chính sách học bổng 25/50/100% và xét thẳng bằng chứng chỉ quốc tế, nhưng KHÔNG định vị được bảng quy đổi điểm cộng cụ thể cho phương thức thi THPT/học bạ/ĐGNL.',
    status: 'incomplete',
    sourceId: 'hutech-admission-plan-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Đã đọc trực tiếp hutech.edu.vn/tuyensinh/tin-tuyen-sinh (phương án tuyển sinh + ngưỡng đầu vào) — không tìm được bảng số điểm cộng/khuyến khích. Không suy đoán giá trị.',
    impact: 'exact-blocking-unless-no-achievement',
  },
  {
    id: 'hutech-priority-table-not-hutech-specific',
    label: 'Bảng điểm ưu tiên khu vực/đối tượng dùng bảng chuẩn quốc gia (Quy chế tuyển sinh Bộ GDĐT) — không tìm được trang HUTECH tự công bố bảng số riêng.',
    status: 'official-but-unparsed',
    sourceId: 'hutech-admission-plan-2026',
    scoreAffecting: true,
    implemented: true,
    whyNotInferred: 'Bảng số dùng cross-check nội bộ với 6 trường khác trong repo đã verified/cross-checked cùng công thức tỉ lệ quốc gia — verification level giữ `cross-checked`.',
    impact: 'evidence-verification-level-only',
  },
  {
    id: 'hutech-vsat-scale-conflicting',
    label:
      'Thang điểm tối đa của bài thi V-SAT 2026 và công thức quy đổi điểm xét tuyển từ V-SAT KHÔNG xác định được rõ ràng — 2 lần fetch trang chính thức cho số liệu ngưỡng khác nhau cho cùng 1 khái niệm (225/250 ở trang ngưỡng đảm bảo chất lượng 04/7/2026 so với 225/250/270/285 ở trang điểm chuẩn công bố sau, có thể lẫn giữa "ngưỡng" và "điểm chuẩn thật" của 2 mốc thời gian khác nhau). Ngưỡng dùng trong `eligibility.ts` lấy từ `hutech-quality-threshold-2026` (nguồn nhất quán hơn khi đọc verbatim) nhưng CHƯA xác nhận được thang điểm tối đa của bài thi V-SAT để làm scoreConversion.',
    status: 'conflicting-sources',
    sourceId: 'hutech-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Đã fetch lại 2 lần với yêu cầu trích verbatim — vẫn không tự giải thích được chênh lệch giữa 2 trang mà không có thêm nguồn PDF đề án gốc. Giữ phương thức V-SAT ở mức eligibility-only (chỉ so điểm thô với ngưỡng), không lắp ráp thành điểm xét tuyển cuối.',
    impact: 'exact-blocking',
  },
  {
    id: 'hutech-method-numbering-inconsistent',
    label: 'Số hiệu "Phương thức 3"/"Phương thức 4" cho V-SAT/ĐGNL không nhất quán giữa 2 trang chính thức đã đọc — module này dùng tên mô tả (thpt/hocba/vsat/dgnl) thay vì số hiệu để tránh gán nhầm.',
    status: 'conflicting-sources',
    sourceId: 'hutech-admission-plan-2026',
    scoreAffecting: false,
    implemented: true,
    impact: 'labeling-only',
  },
  {
    id: 'hutech-program-catalog-not-imported',
    label: 'Danh mục đầy đủ 63 ngành + tổ hợp môn xét tuyển từng ngành, và bảng ánh xạ ngành → nhóm ngưỡng (Y khoa/Dược/Điều dưỡng-KTXNYH/Luật/còn lại) chưa import — evaluator nhận `HutechThresholdGroup` trực tiếp từ caller thay vì tự suy từ tên ngành.',
    status: 'official-but-unparsed',
    sourceId: 'hutech-admission-plan-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'eligibility-only-gap',
  },
];
