/**
 * Ngưỡng đầu vào HAU 2026 (Trường Đại học Kiến trúc Hà Nội), Quyết định 406/QĐ-ĐHKT-ĐT
 * (03/07/2026), phương thức thi TN THPT / thi tuyển kết hợp xét tuyển. Chỉ model 2 nhóm ngành
 * dùng tổ hợp môn văn hóa chuẩn (A00/A01/C01/C02/D01), KHÔNG cần điểm thi năng khiếu — 13 ngành
 * còn lại (Kiến trúc, Kiến trúc cảnh quan, Quy hoạch, Điêu khắc, Thiết kế đồ họa/thời trang/nội
 * thất...) đều dùng tổ hợp có môn năng khiếu (Vẽ mỹ thuật/HHMT/BCTT màu) mà `ApplicantProfile`
 * chưa có field tương ứng — KHÔNG model (xem knowledgeGaps.ts, cùng gap pattern UAD/UPES1/USH).
 *
 * - `infrastructureEngineering`: Kỹ thuật hạ tầng đô thị (7580210 + 2 chuyên ngành), Giao thông
 *   đô thị (7580205 + chuyên ngành đường sắt), Kỹ thuật cấp thoát nước (7580213) — 15,0/30.
 * - `constructionEconomicsIt`: Xây dựng dân dụng và công nghiệp (7580201 + chuyên ngành), Công
 *   nghệ vật liệu xây dựng (7510105), Kinh tế Xây dựng (7580301), Quản lý xây dựng (7580302 +
 *   chuyên ngành), Kinh tế đầu tư/phát triển (7310104/7310105), Công nghệ thông tin (7480201 +
 *   chuyên ngành) — 18,0/30.
 */
export type HauProgramGroup = 'infrastructureEngineering' | 'constructionEconomicsIt';

const GROUP_LABELS: Record<HauProgramGroup, string> = {
  infrastructureEngineering: 'Kỹ thuật hạ tầng/môi trường đô thị, Công nghệ cơ điện công trình, Giao thông đô thị, Đường sắt tốc độ cao, Kỹ thuật cấp thoát nước',
  constructionEconomicsIt:
    'Xây dựng dân dụng và công nghiệp, Xây dựng công trình ngầm đô thị, Quản lý dự án xây dựng, Công nghệ vật liệu xây dựng, Kinh tế Xây dựng, Quản lý xây dựng, Quản lý bất động sản, Quản lý vận tải và Logistics, Kinh tế đầu tư, Kinh tế phát triển, Công nghệ thông tin, Công nghệ đa phương tiện, Công nghệ game',
};

export const HAU_THPT_EXAM_THRESHOLD_30: Record<HauProgramGroup, number> = {
  infrastructureEngineering: 15,
  constructionEconomicsIt: 18,
};

export interface HauEligibilityResult {
  pass: boolean;
  requiredText: string;
}

/** Mức điểm nhận hồ sơ 2026 — CHÚ Ý: theo Điều 1 QĐ 406, mức điểm này đã BAO GỒM điểm ưu tiên +
 * điểm cộng (nếu có), không phải điểm thô 3 môn đơn thuần. Runtime hiện chỉ cộng điểm thô 3 môn
 * trong tổ hợp (chưa cộng ưu tiên/điểm cộng — xem `hau-priority-bonus-not-modeled`), nên kết quả
 * 'ineligible' sát ngưỡng có thể đổi thành 'eligible' nếu thí sinh có điểm ưu tiên/cộng. */
export function checkHauThptExamThreshold(totalScore30: number, group: HauProgramGroup): HauEligibilityResult {
  const threshold = HAU_THPT_EXAM_THRESHOLD_30[group];
  return {
    pass: totalScore30 >= threshold,
    requiredText: `Tổng điểm 3 môn trong tổ hợp xét tuyển (thi TN THPT 2026), CHƯA cộng điểm ưu tiên/điểm cộng, ≥ ${threshold} (thang 30) — áp dụng nhóm ngành: ${GROUP_LABELS[group]}.`,
  };
}

export { GROUP_LABELS as HAU_PROGRAM_GROUP_LABELS };
