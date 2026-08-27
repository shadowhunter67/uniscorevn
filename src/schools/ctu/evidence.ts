import type { SourcedRule } from '../../core/evidence';

/** Điều kiện 1 (mục 2.1) — áp dụng chung mọi ngành, mọi phương thức, thí sinh tốt nghiệp THPT
 * 2026 (trừ các đối tượng miễn trừ ở footnote [1]): tổng điểm 3 môn thi TN THPT theo tổ hợp xét
 * tuyển ≥ 15,0/30, không môn nào ≤ 1,0. Đây là điều kiện CẦN, chưa phải điều kiện ĐỦ — điều kiện 2
 * (điểm sàn theo mã xét tuyển cụ thể) nằm trong phụ lục PDF ảnh chưa đọc được. */
export const ctuBaselineConditionEvidence = {
  value: { totalThreshold30: 15, subjectMinScore10: 1 },
  evidence: [
    {
      sourceId: 'ctu-quality-threshold-2026',
      location:
        'Mục 2.1 — "Thí sinh tốt nghiệp THPT (hoặc tương đương) từ năm 2026 trở về trước và có tổng điểm 3 môn trong Kỳ thi tốt nghiệp THPT năm 2026 theo tổ hợp xét tuyển... đạt từ 15,0 điểm"; mục 2.2.1 — "không có môn nào từ 1,0 điểm trở xuống".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
      note: 'Điều kiện cần, KHÔNG phải điều kiện đủ — điểm sàn cụ thể theo mã xét tuyển (điều kiện 2, mục 2.2.1) nằm trong phụ lục PDF ảnh chưa đọc được (`ctu-per-major-threshold-pdf-unparsed`).',
    },
  ],
} satisfies SourcedRule<{ totalThreshold30: number; subjectMinScore10: number }>;

/** Điều kiện thay thế (2.2.3(2) pháp luật / 2.2.4(2) sư phạm trừ GDTC), phương thức học bạ/V-SAT,
 * thí sinh tốt nghiệp THPT 2026: học lực lớp 12 loại tốt VÀ (tổng 3 môn thi TN THPT ≥18/30 HOẶC
 * điểm xét tốt nghiệp THPT ≥8,5/10). Riêng nhóm pháp luật còn thêm điều kiện tổ hợp môn dùng điểm
 * V-SAT/học bạ quy đổi (chưa có bảng — `ctu-law-combo-conversion-unparsed`), nên nhóm pháp luật
 * chỉ có thể kết luận `ineligible`/`unknown`, KHÔNG kết luận `eligible` từ evidence này một mình. */
export const ctuAltPathEvidence = {
  value: { totalScoreAltPath30: 18, graduationScoreAltPath10: 8.5 },
  evidence: [
    {
      sourceId: 'ctu-quality-threshold-2026',
      location:
        'Mục 2.2.3(2) — pháp luật: "Học lực cả năm lớp 12 loại tốt và tổng điểm 3 môn trong Kỳ thi tốt nghiệp THPT năm 2026... từ 18,0 điểm trở lên hoặc điểm xét tốt nghiệp THPT từ 8,5 điểm trở lên". Mục 2.2.4(2) — sư phạm (trừ GDTC): cùng ngưỡng 18,0/8,5, thêm điều kiện năng khiếu riêng ngành Giáo dục Mầm non (không model — GDMN bị loại khỏi phạm vi batch này).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-21',
      note: 'Nhóm pháp luật (2.2.3) còn điều kiện tổ hợp môn dùng điểm V-SAT/học bạ quy đổi — chưa có bảng quy đổi, không tự suy bằng điểm thi TN THPT thô.',
    },
  ],
} satisfies SourcedRule<{ totalScoreAltPath30: number; graduationScoreAltPath10: number }>;

/** Phương thức 2 (thi TN THPT) — công thức Điểm xét tuyển. Footnote [2] thông báo ngưỡng: điểm ưu
 * tiên gồm Khu vực + Đối tượng (thang 30 theo quy chế hiện hành), phương thức thi THPT không có
 * điểm cộng thành tích ⇒ ĐXT = tổng thô 3 môn tổ hợp (không hệ số) + điểm ưu tiên. Bảng mức KV/ĐT
 * và công thức giảm ≥ 22,5 áp Điều 7 Thông tư 08/2022/TT-BGDĐT (còn hiệu lực 2026). */
export const ctuThptExamFormulaEvidence = {
  ruleId: 'ctu-thpt-exam-formula-2026',
  evidence: [
    {
      sourceId: 'ctu-quality-threshold-2026',
      location:
        'Footnote [2] — "Điểm ưu tiên bao gồm: Khu vực tuyển sinh và Đối tượng ưu tiên"; mục 2.2.1 quy đổi thang 30 theo tổ hợp không nhân hệ số. Phương thức xét điểm thi TN THPT không có điểm cộng thành tích ⇒ Điểm xét tuyển = tổng 3 môn thi (thô) + điểm ưu tiên. Mức KV/ĐT + công thức giảm ≥ 22,5 theo Điều 7 Thông tư 08/2022/TT-BGDĐT.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};

/** Điều kiện 2 (mục 2.2.1) — điểm sàn ĐKXT theo TỪNG MÃ XÉT TUYỂN (thang 30, so với tổng 3 môn
 * thô theo tổ hợp). Đọc từ phụ lục PDF 9 trang (`ctu-appendix-threshold-2026`) bằng OCR
 * 2026-08-27. */
export const ctuPerMajorThresholdEvidence = {
  ruleId: 'ctu-per-major-threshold-2026',
  evidence: [
    {
      sourceId: 'ctu-appendix-threshold-2026',
      location:
        'Phụ lục "ĐIỂM SÀN ĐĂNG KÝ XÉT TUYỂN VÀO ĐẠI HỌC CHÍNH QUY NĂM 2026" — bảng theo từng mã xét tuyển (9 trang): nhóm đào tạo giáo viên 20 (Giáo dục Thể chất 19); nhóm pháp luật 20 + điều kiện tổ hợp; các ngành còn lại 15-16 (mã 7480106 VMBD: 22,75 + Toán ≥ 7,5).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};

/** Nhóm pháp luật — điều kiện tổ hợp môn (mọi phương thức). Với phương thức thi TN THPT dùng
 * điểm thi thô, đọc trực tiếp, KHÔNG cần bảng quy đổi V-SAT/học bạ. */
export const ctuLawComboThptEvidence = {
  ruleId: 'ctu-law-combo-thpt-2026',
  evidence: [
    {
      sourceId: 'ctu-appendix-threshold-2026',
      location:
        'Nhóm ngành lĩnh vực pháp luật — điểm sàn "20 và: đối với tổ hợp C00: Ngữ văn ≥ 6,0 điểm; đối với các tổ hợp còn lại: Toán + Ngữ văn ≥ 12,0 điểm".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-27',
    },
  ],
};
