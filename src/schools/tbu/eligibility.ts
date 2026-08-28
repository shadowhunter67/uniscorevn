/**
 * Ngưỡng đầu vào TBU 2026 (Trường Đại học Thái Bình), phương thức xét tuyển theo kết quả thi TN
 * THPT 2026 (PT1) — Thông báo 565/TB-ĐHTB (19/3/2026, `tbu-thongbao-565-2026`, PDF chính thức đọc
 * trực tiếp qua vision) mục 3.2 xác nhận ngưỡng nguồn tuyển PT1 chung 15,00/30 CHO MỌI NGÀNH.
 *
 * Ngành Luật KHÔNG có ngưỡng cố định riêng cho PT1 — Ghi chú (b) mục 5 xác nhận rõ: với PT1,
 * "Ngưỡng đầu vào được xác định áp dụng theo quy định hiện hành của Bộ GD&ĐT phối hợp với Bộ Tư
 * pháp" (số cụ thể do 2 Bộ quyết định hàng năm, KHÔNG PHẢI 18,0 — con số 18,0 + học lực giỏi chỉ
 * áp dụng cho PT2/PT3/PT5, không phải PT1). Model KHÔNG gán số 18,0 cho PT1-Luật (tránh
 * unsupported > guessed) — xem `checkTbuThptExamThreshold` trả `pass: undefined` cho group 'law'.
 *
 * - `standard`: mọi ngành (bao gồm cả Luật cho mục đích PT1, vì ngưỡng Luật-PT1 không cố định) — 15,0/30.
 * - `law`: giữ lại như 1 lựa chọn UI riêng (để không đánh đồng Luật vào ngưỡng chung khi người
 *   dùng biết mình chọn Luật) nhưng trả kết quả `unknown` thay vì áp nhầm 1 con số không có căn cứ.
 */
export type TbuProgramGroup = 'law' | 'standard';

const GROUP_LABELS: Record<TbuProgramGroup, string> = {
  law: 'ngành Luật',
  standard: 'các ngành khác (trừ Luật)',
};

/** `law` cố ý KHÔNG có trong bảng này — PT1-Luật không có ngưỡng cố định (xem comment ở trên). */
export const TBU_THPT_EXAM_THRESHOLD_30: Partial<Record<TbuProgramGroup, number>> = { standard: 15 };

export interface TbuEligibilityResult {
  pass: boolean | undefined;
  requiredText: string;
}

export function checkTbuThptExamThreshold(totalScore30: number, group: TbuProgramGroup): TbuEligibilityResult {
  const threshold = TBU_THPT_EXAM_THRESHOLD_30[group];
  if (threshold === undefined) {
    return {
      pass: undefined,
      requiredText:
        'Ngành Luật (PT1 - xét kết quả thi TN THPT): ngưỡng đầu vào do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm, KHÔNG PHẢI số cố định do TBU tự công bố — chưa xác định được ở đây.',
    };
  }
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn thi TN THPT 2026 theo tổ hợp xét tuyển ≥ ${threshold} (thang 30) — áp dụng ${GROUP_LABELS[group]}. Đây là ngưỡng nhận hồ sơ, KHÔNG PHẢI điểm trúng tuyển cuối cùng.`,
  };
}

export { GROUP_LABELS as TBU_PROGRAM_GROUP_LABELS };
