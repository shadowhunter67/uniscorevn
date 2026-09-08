import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { HcmulawThreeSubjectInput } from '../calculator';

/**
 * HCMULAW 2026 golden fixtures. Tier C (formula-derived, `hcmulaw-method-notice-2026`) cho Phương
 * thức 5; Tier A (official worked example, `hcmulaw-equivalence-notice-2026` trang V-SAT.png) cho
 * Phương thức 4 — ví dụ minh họa DUY NHẤT lấy nguyên văn từ văn bản gốc, không tự thiết kế case nội
 * suy khác (tránh rủi ro sai số hand-verify).
 */
export const hcmulawThpt5GoldenCases: GoldenAdmissionCase<
  HcmulawThreeSubjectInput & { priorityRegion?: string; priorityCategory?: string },
  { subjectGroupScore30: number; finalScore: number }
>[] = [
  {
    id: 'hcmulaw-2026-thpt5-standard-normal',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-thpt5-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmulaw-method-notice-2026',
    sourceNote: 'ĐXT (PT5) = tổng thô 3 môn (không hệ số) + điểm ưu tiên, PT5 không có điểm cộng.',
    derivation: `
      subjectGroupScore30 = 7+7+7 = 21.00
      standardPriority30 = KV2 = 0.25 (không category)
      cappedTotal=21.00 < 22.5 -> KHÔNG giảm -> effectivePriority30 = 0.25
      finalScore = round(min(30, 21.00+0.25)) = 21.25
    `,
    input: { subject1Score: 7, subject2Score: 7, subject3Score: 7, priorityRegion: 'KV2' },
    expected: { subjectGroupScore30: 21, finalScore: 21.25 },
  },
];

/**
 * Tier A — ví dụ minh họa CHÍNH THỨC của văn bản gốc (mục 2.2, trang V-SAT.png, "MÔN TOÁN"): thí
 * sinh V-SAT môn Toán x=125 thuộc khoảng 10% (a=122,5 b=129,5 c=8,5 d=9,0) -> y≈8,68.
 */
export const hcmulawVsat4GoldenCases: GoldenAdmissionCase<{ subjectId: 'math'; x: number }, { y: number }>[] = [
  {
    id: 'hcmulaw-2026-vsat4-official-worked-example-math',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-vsat4-2026',
    year: 2026,
    tier: 'A',
    sourceId: 'hcmulaw-equivalence-notice-2026',
    sourceNote: 'Ví dụ minh họa CHÍNH THỨC của văn bản (mục 2.2, ảnh V-SAT.png): "Thí sinh có điểm thi V-SAT môn Toán x = 125... thuộc thứ hạng 10%... y ≈ 8.68".',
    derivation: `
      x=125, khoảng 10% môn Toán: a=122.5 b=129.5 c=8.5 d=9.0
      y = c + (x-a)(d-c)/(b-a) = 8.5 + (125-122.5)(9.0-8.5)/(129.5-122.5) = 8.5 + (2.5*0.5)/7 = 8.5 + 0.1786 = 8.6786 -> làm tròn 2 chữ số = 8.68
    `,
    input: { subjectId: 'math', x: 125 },
    expected: { y: 8.68 },
  },
];

/**
 * Phương thức 3 (mã 200, học bạ trường ưu tiên ĐHQG-HCM) — quy đổi học bạ y = x - k (mục 2.1).
 *
 * Case 1 là Tier A: ví dụ minh họa CHÍNH THỨC dạng text của văn bản gốc (D01, x=28,00 → y=24,20),
 * đồng thời là cross-check độc lập cho giá trị k(D01)=3,8 transcribe từ ảnh `LỆCH K.png`.
 * Case 2 là Tier C: ghép thêm bước điểm ưu tiên (bảng chuẩn quốc gia) để phủ ĐXT cuối cùng.
 */
export const hcmulawTranscript3GoldenCases: GoldenAdmissionCase<
  { combinationCode: string; x30: number; priorityRegion?: string; priorityCategory?: string },
  { converted30: number; finalScore: number }
>[] = [
  {
    id: 'hcmulaw-2026-transcript3-official-worked-example-d01',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-priority-highschool3-2026',
    year: 2026,
    tier: 'A',
    sourceId: 'hcmulaw-equivalence-notice-2026',
    sourceNote:
      'Ví dụ minh họa CHÍNH THỨC dạng text (mục 2.1): "học sinh có điểm học bạ cấp THPT tổ hợp môn D01 (x = 28,0 điểm); độ lệch ... theo tổ hợp môn D01 là 3,80 điểm (k = 3,80 điểm) ... y = x - k = 28,00 - 3,80 = 24,20".',
    derivation: `
      x = 28.00, k(D01) = 3.80 (tra bảng "độ lệch k", ảnh LỆCH K.png)
      y = x - k = 28.00 - 3.80 = 24.20  <-- ĐÚNG con số văn bản tự công bố
      không khai KV/ĐT -> effectivePriority30 = 0 -> finalScore = round(min(30, 24.20+0)) = 24.20
    `,
    boundaryNote: 'Anchor xác thực bảng k transcribe từ ảnh: nếu k(D01) bị đọc sai, case này fail ngay.',
    input: { combinationCode: 'D01', x30: 28 },
    expected: { converted30: 24.2, finalScore: 24.2 },
  },
  {
    id: 'hcmulaw-2026-transcript3-priority-reduction-boundary',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-priority-highschool3-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmulaw-method-notice-2026',
    sourceNote: 'ĐXT (PT3) = điểm tổ hợp học bạ đã quy đổi + điểm ưu tiên (PT3 không có điểm khuyến khích). Giảm ưu tiên khi điểm tổ hợp >= 22,5/30 (bảng chuẩn quốc gia).',
    derivation: `
      x = 27.00, k(D01) = 3.80 -> y = 27.00 - 3.80 = 23.20
      standardPriority30 = KV1 = 0.75
      y = 23.20 >= 22.5 -> GIẢM: effectivePriority30 = round(((30-23.20)/7.5)x0.75) = round((6.8/7.5)x0.75) = round(0.68) = 0.68
      finalScore = round(min(30, 23.20+0.68)) = 23.88
    `,
    boundaryNote: 'Priority reduction threshold (22,5/30) áp lên điểm ĐÃ quy đổi (y), không phải điểm học bạ thô (x).',
    input: { combinationCode: 'D01', x30: 27, priorityRegion: 'KV1' },
    expected: { converted30: 23.2, finalScore: 23.88 },
  },
];

/**
 * Phương thức 2 (mã 410) — ĐXT = y + điểm khuyến khích + điểm ưu tiên, kẹp 30. Khác Phương thức 3
 * ĐÚNG một thành phần: điểm khuyến khích quy đổi từ chứng chỉ (bảng mục 2(c)(ii), xem `bonus.ts`).
 *
 * Tier C — nguồn công bố BẢNG quy đổi nhưng KHÔNG có ví dụ minh họa bằng số cho Phương thức 2 (khác
 * mục 2.1 vốn có ví dụ D01 x=28,00). Mọi con số dưới đây suy ra từ chính bảng + công thức ĐXT chung,
 * tính tay trong `derivation`.
 */
export const hcmulawCombined2GoldenCases: GoldenAdmissionCase<
  {
    programId: string;
    combinationCode: string;
    x30: number;
    certificates: { ielts?: number; sat?: number; hsk?: 'HSK1' | 'HSK2' | 'HSK3' | 'HSK4' | 'HSK5' | 'HSK6' };
    priorityRegion?: string;
    priorityCategory?: string;
  },
  { converted30: number; bonus30: number; finalScore: number }
>[] = [
  {
    id: 'hcmulaw-2026-combined2-ielts-6-5-no-priority',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-combined2-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmulaw-method-notice-2026',
    sourceNote:
      'Bảng (*) mục 2(c)(ii): IELTS 6.5 -> điểm khuyến khích 1,00. Công thức ĐXT chung: "ĐXT = điểm tổ hợp môn + điểm cộng (nếu có) + điểm ưu tiên (nếu có)"; điểm tổ hợp môn của PT2 quy đổi theo mục 2.1 (y = x - k).',
    derivation: `
      x = 28.00, k(D01) = 3.80 -> y = 28.00 - 3.80 = 24.20 (dùng lại đúng ví dụ chính thức của mục 2.1)
      IELTS 6.5 -> tra bảng (*) dòng 3 -> điểm khuyến khích = 1.00
      không khai KV/ĐT -> effectivePriority30 = 0
      finalScore = round(min(30, 24.20 + 1.00 + 0)) = 25.20
    `,
    boundaryNote: 'Anchor: nếu điểm khuyến khích bị bỏ qua (bug hồi quy về hành vi partial cũ), finalScore sẽ ra 24.20 và case fail ngay.',
    input: { programId: '7380101', combinationCode: 'D01', x30: 28, certificates: { ielts: 6.5 } },
    expected: { converted30: 24.2, bonus30: 1, finalScore: 25.2 },
  },
  {
    id: 'hcmulaw-2026-combined2-highest-only-plus-priority-reduction',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-combined2-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmulaw-method-notice-2026',
    sourceNote:
      'Bảng (*) kèm câu "thí sinh chỉ được Trường công nhận điểm quy đổi tương ứng với duy nhất một loại chứng chỉ (hoặc kết quả Kỳ thi SAT) cao nhất" — IELTS 7.5 (1,50) và SAT 1150 (0,50) KHÔNG cộng dồn.',
    derivation: `
      x = 27.00, k(D01) = 3.80 -> y = 27.00 - 3.80 = 23.20
      IELTS 7.5 -> 1.50 ; SAT 1150 -> 0.50 ; chỉ lấy loại CAO NHẤT -> điểm khuyến khích = 1.50 (không phải 2.00)
      standardPriority30 = KV1 = 0.75 ; y = 23.20 >= 22.5 -> GIẢM:
        effectivePriority30 = round(((30 - 23.20)/7.5) x 0.75) = round((6.8/7.5) x 0.75) = round(0.68) = 0.68
      finalScore = round(min(30, 23.20 + 1.50 + 0.68)) = 25.38
    `,
    boundaryNote:
      'Kiểm 2 việc cùng lúc: (1) không cộng dồn 2 chứng chỉ; (2) mốc giảm ưu tiên áp lên điểm tổ hợp môn y (23,20), KHÔNG áp lên y + điểm khuyến khích.',
    input: { programId: '7380101', combinationCode: 'D01', x30: 27, certificates: { ielts: 7.5, sat: 1150 }, priorityRegion: 'KV1' },
    expected: { converted30: 23.2, bonus30: 1.5, finalScore: 25.38 },
  },
  {
    id: 'hcmulaw-2026-combined2-hsk4-chinese-language-program',
    schoolId: 'hcmulaw',
    methodId: 'hcmulaw-combined2-2026',
    year: 2026,
    tier: 'C',
    sourceId: 'hcmulaw-method-notice-2026',
    sourceNote:
      'Bảng (**) mục 2(c)(ii): HSK4 -> 1,25. Mục 2(c)(i): chứng chỉ tiếng Trung "chỉ xét tuyển đối với ngành Luật và ngành Ngôn ngữ Trung Quốc" — ngành 7220204 nằm trong diện được dùng.',
    derivation: `
      x = 29.00, k(D01) = 3.80 -> y = 29.00 - 3.80 = 25.20
      HSK4 -> tra bảng (**) dòng 2 -> điểm khuyến khích = 1.25
      không khai KV/ĐT -> effectivePriority30 = 0
      finalScore = round(min(30, 25.20 + 1.25 + 0)) = 26.45
    `,
    boundaryNote: 'Phủ nhánh bảng (**) (chứng chỉ theo BẬC) và ràng buộc ngành — nếu ràng buộc ngành bị áp sai, bonus về 0 và case fail.',
    input: { programId: '7220204', combinationCode: 'D01', x30: 29, certificates: { hsk: 'HSK4' } },
    expected: { converted30: 25.2, bonus30: 1.25, finalScore: 26.45 },
  },
];
