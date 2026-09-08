import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-20 (đọc qua chrome-devtools do WebFetch thô lỗi TLS chain trên domain
 * `hcmulaw.edu.vn`). Batch đầu (2026-08-19/20): bảng quy đổi tương đương Phương thức 2/3/4 CHƯA
 * TỒN TẠI (chờ kết quả thi TN THPT 2026). Batch tiếp theo, CÙNG NGÀY 2026-08-20 (kết quả thi đã
 * công bố trong lúc đó): bảng đã xuất hiện (`hcmulaw-equivalence-notice-2026`) — đóng gap cho
 * Phương thức 4 (V-SAT, `conversionTable.ts`), Phương thức 2/3 (học bạ) vẫn blocked nhưng vì lý do
 * KHÁC (granularity dữ liệu), không còn là "bảng chưa tồn tại".
 *
 * **Batch "6 học kỳ" (2026-09-07) — ĐÃ ĐÓNG `hcmulaw-hocba-semester-granularity-gap`** (xoá khỏi
 * mảng dưới đây, đúng quy ước UFM khi đóng `ufm-hocba-semester-granularity-gap`). Hai việc cùng lúc:
 * (1) `ApplicantProfile.transcript.bySemester` nay lưu đủ 6 học kỳ (`core/transcriptSemesters.ts`)
 * nên tính được x = "điểm tổ hợp của học bạ cấp THPT (trung bình cộng của 6 học kỳ)"; (2) bảng "độ
 * lệch k" (ảnh `LỆCH K.png`, 16 ô) ĐÃ transcribe vào `conversionTable.ts` — đọc qua chrome-devtools,
 * cross-check khớp ví dụ minh họa dạng TEXT của chính trang nguồn (D01: k = 3,80).
 *
 * Kết quả: Phương thức 3 (200) lên `exactCalculator: true`. Phương thức 2 (410) VẪN `partial` nhưng
 * vì một gap MỚI, khác hẳn: `hcmulaw-method2-bonus-certificate-model-gap` (điểm khuyến khích chứng
 * chỉ ngoại ngữ/SAT), xem entry đầu tiên dưới đây.
 */
export const hcmulawKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hcmulaw-method2-bonus-certificate-model-gap',
    label:
      'Phương thức 2 (410) tính ĐXT = điểm tổ hợp học bạ đã quy đổi + ĐIỂM KHUYẾN KHÍCH từ chứng chỉ ngoại ngữ/SAT (tối đa 1,50) + điểm ưu tiên. Bảng điểm khuyến khích ĐÃ đọc được đầy đủ dạng text (mục 2(c)(ii)), nhưng `ApplicantProfile.certificates` chưa mô hình hoá đủ để chọn đúng mức: (1) không có chứng chỉ tiếng Pháp (DELF/TCF)/Nhật (JLPT)/Trung (HSK) — nguồn tính cả 3 loại này và quy định "chỉ công nhận 1 loại cao nhất", nên thí sinh có chứng chỉ tiếng Pháp/Nhật/Trung cao hơn chứng chỉ tiếng Anh sẽ bị cộng THIẾU; (2) `toeflIbt` không kèm ngày dự thi, trong khi nguồn dùng 2 THANG TOEFL iBT khác nhau theo mốc 21/01/2026 (65-96+ so với 3.0-5.0) — cùng một con số có thể rơi vào 2 mức khuyến khích khác nhau.',
    status: 'incomplete',
    sourceId: 'hcmulaw-method-notice-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred:
      'Cộng thiếu điểm khuyến khích cho ra ĐXT THẤP HƠN thực tế — sai theo hướng nguy hiểm cho thí sinh (tưởng trượt trong khi đủ điểm). Mở rộng `ApplicantProfile.certificates` sang chứng chỉ Pháp/Nhật/Trung + ngày dự thi TOEFL là thay đổi core dùng chung, để làm follow-up riêng thay vì đoán trong batch này. Phần ĐÃ tính được (điểm tổ hợp học bạ quy đổi y=x-k) vẫn hiển thị trong `explanation`.',
    impact: 'exact-blocking-for-method-2-only',
  },
  {
    id: 'hcmulaw-foreign-language-combinations-not-modeled',
    label:
      'Nhiều tổ hợp môn chính thức của ngành Luật/Luật thương mại quốc tế/Ngôn ngữ Trung Quốc dùng ngoại ngữ Pháp/Nhật/Trung thay cho Tiếng Anh (cùng 1 vị trí "Ngoại ngữ" trong tổ hợp, khác mã tổ hợp) — module này CHỈ model nhánh Tiếng Anh (`programs.ts`), vì core `SubjectId` hiện chưa có taxonomy cho tiếng Pháp/Nhật/Trung như môn thi độc lập.',
    status: 'incomplete',
    sourceId: 'hcmulaw-method-notice-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred: 'Mở rộng `core/subjects.ts` để thêm 3 môn ngoại ngữ mới là thay đổi core dùng chung — ngoài phạm vi 1 batch research trường mới, để lại làm follow-up nếu có nhu cầu thật.',
    impact: 'eligibility-only-gap',
  },
  {
    id: 'hcmulaw-quang-tri-campus-not-modeled',
    label:
      'Phân hiệu tại tỉnh Quảng Trị (mã tuyển sinh LPQ) chỉ tuyển ngành Luật, cùng tổ hợp/ngưỡng đầu vào (20,00/30) với ngành Luật tại trụ sở chính (LPS) — module này KHÔNG phân biệt campus (mặc định phục vụ LPS), vì công thức/ngưỡng giống hệt nhau nên không ảnh hưởng kết quả tính, chỉ ảnh hưởng lựa chọn mã trường lúc đăng ký (nằm ngoài phạm vi tính điểm).',
    status: 'incomplete',
    sourceId: 'hcmulaw-quality-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'informational-only',
  },
  {
    id: 'hcmulaw-priority-table-not-school-specific',
    label: 'Bảng điểm ưu tiên khu vực/đối tượng dùng bảng chuẩn quốc gia — không tìm được trang HCMULAW tự công bố bảng số riêng.',
    status: 'official-but-unparsed',
    sourceId: 'hcmulaw-quality-threshold-2026',
    scoreAffecting: true,
    implemented: true,
    whyNotInferred: 'Bảng số dùng cross-check nội bộ với các trường khác trong repo đã verified/cross-checked cùng công thức tỉ lệ quốc gia.',
    impact: 'evidence-verification-level-only',
  },
  {
    id: 'hcmulaw-method1-not-scored',
    label:
      'Phương thức 1 (mã 301, tuyển thẳng/xét tuyển thẳng/ưu tiên xét tuyển) không có công thức điểm — quyết định theo diện đặc thù (giải HSG quốc gia/quốc tế, người nước ngoài, dân tộc thiểu số rất ít người, người khuyết tật nặng...), không đưa vào `methods.ts` (cùng quy ước UFM/HUFLIT/HUTECH với các phương thức xét thẳng không công thức điểm).',
    status: 'verified',
    sourceId: 'hcmulaw-method-notice-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'out-of-scope',
  },
];
