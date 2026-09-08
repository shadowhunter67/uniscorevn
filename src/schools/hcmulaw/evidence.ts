import type { SourcedRule } from '../../core/evidence';

/** Công thức ĐXT Phương thức 5 (mã 100, xét KQ thi TN THPT 2026) — thang 30, không hệ số môn,
 * không điểm cộng (chỉ Phương thức 1/2 có điểm cộng theo văn bản gốc, Phương thức 5 không đề cập
 * bất kỳ khoản điểm cộng nào). */
export const hcmulawFormulaEvidence = {
  value: {
    subjectGroupDescription:
      'tổng thô 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển (thang 30, không nhân hệ số môn nào — mỗi môn trọng số 1/3)',
    bonusApplicability: 'Phương thức 5 không có điểm cộng (điểm xét thưởng chỉ áp dụng Phương thức 1; điểm khuyến khích chỉ áp dụng Phương thức 2)',
  },
  evidence: [
    {
      sourceId: 'hcmulaw-method-notice-2026',
      location:
        'Mục II: "Thang điểm xét tuyển: điểm xét tuyển theo thang điểm 30" · "ĐXT = điểm tổ hợp môn + điểm cộng (nếu có) + điểm ưu tiên (nếu có)" · "trong đó phải có môn Toán hoặc Ngữ văn với trọng số tính điểm xét (không nhân hệ số) trong tổ hợp xét tuyển là 1/3". Mục I.5 (Phương thức 5) không nêu bất kỳ điều kiện/khoản điểm cộng nào — chỉ nêu điều kiện tốt nghiệp THPT + tổ hợp môn phù hợp + đăng ký/nộp lệ phí đúng hạn + ngưỡng tối thiểu.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-04-28',
      verifiedAt: '2026-08-20',
    },
  ],
} satisfies SourcedRule<{ subjectGroupDescription: string; bonusApplicability: string }>;

/** Phương thức 4 (V-SAT) — bảng quy đổi bách phân vị RIÊNG TỪNG MÔN THI (mục 2.2, `conversionTable.ts`),
 * verified khớp ví dụ minh họa chính thức (Toán x=125 → y≈8,68). */
export const hcmulawVsatConversionEvidence = {
  value: {
    formula: 'y = c + (x-a)(d-c)/(b-a), làm tròn 2 chữ số thập phân, mỗi môn quy đổi độc lập (thang 150→thang 10)',
    subjectsCovered: ['math', 'literature', 'english', 'physics', 'chemistry', 'history', 'geography'],
  },
  evidence: [
    {
      sourceId: 'hcmulaw-equivalence-notice-2026',
      location:
        'Mục 2.2 "Quy đổi điểm thi V-SAT tương đương với điểm thi tốt nghiệp THPT năm 2026 theo từng môn thi" + 7 ảnh "Khung quy đổi điểm thi V-SAT..." (mỗi môn Toán/Ngữ văn/Tiếng Anh/Vật lý/Hoá học/Lịch sử/Địa lý, 14 khoảng phân vị/môn) + ví dụ minh họa (Toán x=125, khoảng 10%, a=122,5 b=129,5 c=8,5 d=9,0 → y≈8,68).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-07-09',
      verifiedAt: '2026-08-20',
      note: 'Đọc trực tiếp 7 ảnh PNG gốc qua chrome-devtools screenshot (không OCR/mirror) — mỗi dòng đối chiếu 2 lần với ảnh gốc; công thức nội suy verify bằng cách tái tạo đúng ví dụ minh họa của văn bản.',
    },
  ],
} satisfies SourcedRule<{ formula: string; subjectsCovered: string[] }>;

/**
 * Quy đổi ĐIỂM HỌC BẠ (Phương thức 2/3) — công thức y = x - k + bảng "độ lệch k" 16 ô, transcribe
 * 2026-09-07 từ ảnh `LỆCH K.png` qua chrome-devtools (xem `conversionTable.ts`). Điều kiện sàn học
 * bạ khác nhau giữa 2 phương thức (PT2: x ≥ 22,50; PT3: x ≥ 24,50) — trích nguyên văn từ
 * `hcmulaw-method-notice-2026`.
 */
export const hcmulawTranscriptConversionEvidence = {
  value: {
    formula: 'y = x - k (x = tổng TB 6 học kỳ của 3 môn tổ hợp, k = độ lệch theo tổ hợp), làm tròn 2 chữ số thập phân',
    minTranscriptCombined30: { method2: 22.5, method3: 24.5 },
    combinationGroupCount: 16,
  },
  evidence: [
    {
      sourceId: 'hcmulaw-equivalence-notice-2026',
      location:
        'Mục 2.1 "Quy đổi điểm học bạ cấp THPT tương đương với điểm thi tốt nghiệp THPT năm 2026 theo từng tổ hợp môn (đối với Phương thức 2 và Phương thức 3)" + ảnh "LỆCH K.png" (bảng độ lệch k, 5 tổ hợp đứng riêng + 11 nhóm tổ hợp = 16 ô) + ví dụ minh họa verbatim trong phần text: "tổ hợp môn D01 (x = 28,0 điểm); ... k = 3,80 điểm ... y = x - k = 28,00 - 3,80 = 24,20".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-07-09',
      verifiedAt: '2026-09-07',
      note: 'Bảng đọc bằng chrome-devtools (phóng to 2,4–3x, screenshot từng nửa bảng, đối chiếu 2 lượt), KHÔNG qua OCR/mirror. Cross-check độc lập: ô D01 transcribe = 3,8 khớp đúng con số k trong ví dụ minh họa dạng TEXT của chính trang đó.',
    },
    {
      sourceId: 'hcmulaw-method-notice-2026',
      location:
        'Mục 2(b) (Phương thức 2): "có tổng điểm trung bình cộng của 6 học kỳ THPT (gồm năm Lớp 10, Lớp 11 và Lớp 12) của 03 môn thuộc Tổ hợp của ngành xét tuyển đạt từ 22,50 điểm trở lên (... làm tròn đến 02 (hai) chữ số thập phân)". Mục 3(c) (Phương thức 3): cùng câu, mức "đạt từ 24,50 điểm trở lên". Mục 3(b): "phải học đủ 3 năm tại một trong các trường có tên trong Danh sách ... của Đại học Quốc gia Thành phố Hồ Chí Minh; và có kết quả học tập của từng năm Lớp 10, Lớp 11 và Lớp 12 đạt mức Tốt".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-04-28',
      verifiedAt: '2026-09-07',
      note: 'Đọc lại trực tiếp (innerText, ~22.700 ký tự) qua chrome-devtools 2026-09-07 — Phương thức 3 KHÔNG có thành phần "điểm khuyến khích"; chỉ Phương thức 2 có (bảng chứng chỉ ngoại ngữ/SAT, mục 2(c)(ii)).',
    },
  ],
} satisfies SourcedRule<{ formula: string; minTranscriptCombined30: { method2: number; method3: number }; combinationGroupCount: number }>;

/**
 * ĐIỂM KHUYẾN KHÍCH Phương thức 2 (mã 410) — 2 bảng quy đổi chứng chỉ, xem `bonus.ts` cho bảng số
 * đầy đủ và 3 quyết định mô hình hoá. Đọc lại verbatim 2026-09-08 bằng cách tải HTML gốc của trang
 * (`ts.hcmulaw.edu.vn/...733.html`) và strip tag — 2 bảng nằm dạng TEXT thật trong DOM, KHÔNG phải
 * ảnh, nên không có rủi ro đọc nhầm chữ số như các bảng ảnh khác của trường này.
 */
export const hcmulawMethod2BonusEvidence = {
  value: { maxBonus30: 1.5, toeflScaleCutoffDate: '2026-01-21', highestOnly: true },
  evidence: [
    {
      sourceId: 'hcmulaw-method-notice-2026',
      location:
        'Mục 2(c)(ii): "Điểm của tiêu chí, điều kiện nêu trên được quy đổi thành điểm khuyến khích (tối đa 1,50 điểm) để xét tuyển, cụ thể như sau:" — bảng (*) "Quy đổi điểm chứng chỉ tiếng Anh, hoặc kết quả Kỳ thi SAT của Mỹ (thí sinh chỉ được Trường công nhận điểm quy đổi tương ứng với duy nhất một loại chứng chỉ (hoặc kết quả Kỳ thi SAT) cao nhất)": IELTS 5.5/6.0/6.5/7.0/7.5-trở-lên, TOEFL iBT "Dự thi trước ngày 21/01/2026" 65-72/73-80/81-88/89-95/96-trở-lên, TOEFL iBT "Dự thi từ ngày 21/01/2026" 3.0/3.5/4.0/4.5/5.0-trở-lên, SAT 1150-1200/1210-1260/1270-1320/1330-1380/1390-trở-lên → 0,50/0,75/1,00/1,25/1,50. Bảng (**) "Quy đổi điểm chứng chỉ tiếng Pháp, hoặc tiếng Nhật, hoặc tiếng Trung (... duy nhất một loại chứng chỉ cao nhất)": DELF B1/B2/C1-trở-lên, TCF "Tương đương B1"/"Tương đương B2"/"Tương đương C1 trở lên", JLPT N3/N2/N1, HSK HSK3/HSK4/HSK5-trở-lên → 1,00/1,25/1,50. Mục 2(c)(i) ràng buộc ngành: tiếng Pháp "(chỉ xét tuyển đối với ngành Luật)", tiếng Nhật "(chỉ xét tuyển đối với ngành Luật)", tiếng Trung "(chỉ xét tuyển đối với ngành Luật và ngành Ngôn ngữ Trung Quốc)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-04-28',
      verifiedAt: '2026-09-08',
      note:
        'Đọc bằng cách tải HTML gốc + strip tag (không dùng tool tóm tắt): lần đọc qua tool tóm tắt trước đó trả về bảng (**) với ô "B1 equiv." — nghi ngờ là chữ mô hình tự chèn, đọc lại raw mới xác nhận nguyên văn nguồn đúng là "Tương đương B1". Bài học: bảng số không nhận từ tóm tắt.',
    },
  ],
} satisfies SourcedRule<{ maxBonus30: number; toeflScaleCutoffDate: string; highestOnly: boolean }>;

/** Ngưỡng đầu vào theo ngành (thang 30) — bảng ảnh gốc, transcribe đủ 11 ngành, xem
 * `programs.ts`/`sources.ts:hcmulaw-quality-threshold-2026`. */
export const hcmulawThresholdEvidence = {
  value: {
    thresholds30: {
      '7220201': 17,
      '7220204': 16,
      '7380101': 20,
      '7380109': 20,
      '7340102': 20,
      '7340101': 17,
      '7340120': 17,
      '7340201': 17,
      '7340205': 16,
      '7310109': 16,
      '7340122': 16,
    },
  },
  evidence: [
    {
      sourceId: 'hcmulaw-quality-threshold-2026',
      location:
        'Bảng "Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) năm 2026" (ảnh `diemsan.png`, mục 3 của thông báo) — đọc trực tiếp qua chrome-devtools screenshot, transcribe đủ 11 dòng ngành × 15 cột tổ hợp. Trong phạm vi mỗi ngành, mọi tổ hợp có cùng 1 ngưỡng duy nhất.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      publishedAt: '2026-07-09',
      verifiedAt: '2026-08-20',
      note:
        'Ghi chú gốc dưới bảng: ngưỡng đã bao gồm điểm ưu tiên + điểm cộng (trừ Luật/Luật thương mại quốc tế/Quản trị - Luật không tính điểm cộng). Trong phạm vi module này (Phương thức 5 và 4, cả 2 đều KHÔNG có điểm cộng) sự khác biệt này không ảnh hưởng kết quả so ngưỡng — ngưỡng dùng chung `checkHcmulawThreshold` cho cả 2 phương thức (method-agnostic, xem `eligibility.ts`).',
    },
  ],
} satisfies SourcedRule<{ thresholds30: Record<string, number> }>;

/** Điểm ưu tiên khu vực/đối tượng chuẩn quốc gia — HCMULAW không tự công bố bảng số riêng. */
export const hcmulawPriorityEvidence = {
  value: {
    regionPoints30: { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 },
    categoryPoints30: { UT1: 2, UT2: 1 },
    reductionThreshold30: 22.5,
    reductionDivisor30: 7.5,
  },
  evidence: [
    {
      sourceId: 'hcmulaw-quality-threshold-2026',
      location:
        '"Điểm ưu tiên (theo khu vực và/hoặc theo đối tượng chính sách): được xác định theo Quy chế tuyển sinh của Bộ Giáo dục và Đào tạo" — HCMULAW không tự công bố bảng số riêng, dùng bảng chuẩn quốc gia cross-checked với các trường khác trong repo (HCMUT/UFM/...).',
      verification: 'cross-checked' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-20',
      note: 'Xem knowledgeGaps.ts:hcmulaw-priority-table-not-school-specific — cross-checked, KHÔNG verified trực tiếp bằng bảng số riêng của trường.',
    },
  ],
} satisfies SourcedRule<{ regionPoints30: Record<string, number>; categoryPoints30: Record<string, number>; reductionThreshold30: number; reductionDivisor30: number }>;
