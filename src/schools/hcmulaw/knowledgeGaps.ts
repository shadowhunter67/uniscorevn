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
 * chỉ ngoại ngữ/SAT).
 *
 * **Batch "chứng chỉ PT2" (2026-09-08) — ĐÃ ĐÓNG `hcmulaw-method2-bonus-certificate-model-gap`**
 * (xoá khỏi mảng dưới đây, đúng quy ước UFM/VLU/HUTECH khi đóng gap). Gap này là gap MÔ HÌNH DỮ LIỆU
 * chứ không phải thiếu nguồn — bảng điểm khuyến khích vốn đã đọc được đầy đủ. Cách đóng, đúng 2 lý do
 * mà gap đã nêu:
 * (1) `ApplicantProfile.certificates` nay có `delf`/`tcf`/`jlpt`/`hsk` (string union theo BẬC, không
 *     phải số — JLPT N5 thấp nhất/N1 cao nhất là chỗ dễ sai nếu lưu bằng số), thêm additive đúng cách
 *     `transcript.bySemester` đã làm: hồ sơ cũ không cần migration, chỉ cần bổ sung whitelist trong
 *     `core/applicantProfileStorage.ts:sanitizeCertificates` (nếu quên, sanitizer sẽ âm thầm xoá dữ
 *     liệu mỗi lần load — đúng cái bẫy batch "6 học kỳ" đã gặp).
 * (2) `certificates.toeflIbtExamDate` (ngày dự thi, `YYYY-MM-DD`) chọn 1 trong 2 thang TOEFL iBT theo
 *     mốc 21/01/2026. Lưu NGÀY chứ không phải enum thang điểm vì mốc là quy định của từng trường,
 *     không phải thuộc tính hồ sơ thí sinh.
 * Thiếu ngày dự thi TOEFL vẫn KHÔNG đoán: `bonus.ts` tính cả 2 thang, chỉ chốt khi 2 thang không làm
 * đổi đáp án cuối, còn lại trả `partial` + `missingRequirement`.
 *
 * Kết quả: Phương thức 2 (410) lên `exactCalculator: true`, cùng semantics conditional-exact với
 * Phương thức 3 (exact trong phạm vi thí sinh không có "điểm xét thưởng" thành tích).
 */
export const hcmulawKnowledgeGaps: KnowledgeGap[] = [
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
