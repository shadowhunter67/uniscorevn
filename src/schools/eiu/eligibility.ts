/**
 * Ngưỡng đầu vào EIU 2026 (Trường Đại học Quốc tế Miền Đông) — đọc trực tiếp trang đề án tuyển
 * sinh chính thức `eiu.edu.vn` (xem `sources.ts`). Ngưỡng CHUNG áp dụng mọi ngành TRỪ Điều dưỡng
 * (theo ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm — KHÔNG model, xem
 * `eiu-nursing-moet-threshold-not-modeled`).
 */
export type EiuProgram = 'standard' | 'nursing';

export const EIU_THPT_EXAM_THRESHOLD_30 = 15;
export const EIU_TRANSCRIPT_THRESHOLD_30 = 18;
export const EIU_VACT_THRESHOLD_1200 = 600;

export interface EiuEligibilityResult {
  pass: boolean | 'unknown';
  requiredText: string;
}

/** Phương thức 1 — thi TN THPT 2026, điểm thô thang 30, không cần quy đổi. */
export function checkEiuThptExamThreshold(totalScore30: number, program: EiuProgram): EiuEligibilityResult {
  if (program === 'nursing') {
    return {
      pass: 'unknown',
      requiredText: 'Ngành Điều dưỡng áp dụng ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm (chưa model), không dùng ngưỡng chung 15/30.',
    };
  }
  return {
    pass: totalScore30 >= EIU_THPT_EXAM_THRESHOLD_30,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển ≥ ${EIU_THPT_EXAM_THRESHOLD_30} (thang 30).`,
  };
}

/** Phương thức 2 — học bạ, điểm trung bình chung 6 học kỳ (lớp 10, 11, 12) của 3 môn tổ hợp, thang 30. */
export function checkEiuTranscriptThreshold(totalScore30: number, program: EiuProgram): EiuEligibilityResult {
  if (program === 'nursing') {
    return {
      pass: 'unknown',
      requiredText: 'Ngành Điều dưỡng áp dụng ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm (chưa model), không dùng ngưỡng chung 18/30.',
    };
  }
  return {
    pass: totalScore30 >= EIU_TRANSCRIPT_THRESHOLD_30,
    requiredText: `Tổng điểm trung bình chung học bạ 6 học kỳ (lớp 10, 11, 12) của 3 môn tổ hợp xét tuyển ≥ ${EIU_TRANSCRIPT_THRESHOLD_30} (thang 30).`,
  };
}

/** Phương thức 3 — ĐGNL ĐHQG-HCM 2026, điểm thô thang 1200, khớp trực tiếp `ApplicantProfile.exams.vact.total`. */
export function checkEiuVactThreshold(vactTotal1200: number, program: EiuProgram): EiuEligibilityResult {
  if (program === 'nursing') {
    return {
      pass: 'unknown',
      requiredText: 'Ngành Điều dưỡng áp dụng ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm (chưa model), không dùng ngưỡng chung 600/1200.',
    };
  }
  return {
    pass: vactTotal1200 >= EIU_VACT_THRESHOLD_1200,
    requiredText: `Điểm thi ĐGNL ĐHQG-HCM 2026 ≥ ${EIU_VACT_THRESHOLD_1200} (thang 1200).`,
  };
}
