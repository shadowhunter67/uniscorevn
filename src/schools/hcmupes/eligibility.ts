import type { SubjectId } from '../../core/subjects';

/**
 * Ngưỡng đầu vào HCMUPES 2026 (Trường ĐH Sư phạm TDTT TP.HCM), ngành Giáo dục thể chất (7140206),
 * Thông báo 05/TB-HĐTS (13/07/2026, đọc trực tiếp từ PDF đính kèm Google Drive), Phương thức 405
 * (thi TN THPT). Điểm tổ hợp = 2 môn văn hóa + Năng khiếu TDTT (KHÔNG nhân hệ số 2), ngưỡng theo
 * khu vực ưu tiên.
 */
export type HcmupesPriorityRegion = 'KV1' | 'KV2-NT' | 'KV2' | 'KV3';

export const HCMUPES_ZONE_THRESHOLD_30: Record<HcmupesPriorityRegion, number> = {
  KV3: 19.0,
  KV2: 18.75,
  'KV2-NT': 18.5,
  KV1: 18.25,
};

export interface HcmupesSubjectPair {
  id: string;
  label: string;
  subjects: readonly [SubjectId, SubjectId];
}

export const HCMUPES_SUBJECT_PAIRS: readonly HcmupesSubjectPair[] = [
  { id: 'T00', label: 'T00 (Toán, Sinh học, Năng khiếu TDTT)', subjects: ['math', 'biology'] },
  { id: 'T01', label: 'T01 (Toán, Ngữ văn, Năng khiếu TDTT)', subjects: ['math', 'literature'] },
  { id: 'T04', label: 'T04 (Toán, Vật lí, Năng khiếu TDTT)', subjects: ['math', 'physics'] },
  { id: 'T06', label: 'T06 (Toán, Địa lí, Năng khiếu TDTT)', subjects: ['math', 'geography'] },
];

export const HCMUPES_TALENT_MAX_10 = 10;

export interface HcmupesEligibilityResult {
  pass: boolean;
  requiredText: string;
}

export function checkHcmupesThreshold(culturalTotal: number, talentScore10: number, region: HcmupesPriorityRegion): HcmupesEligibilityResult {
  const total30 = culturalTotal + talentScore10;
  const threshold = HCMUPES_ZONE_THRESHOLD_30[region];
  return {
    pass: total30 >= threshold,
    requiredText: `Tổng điểm 2 môn văn hóa + điểm năng khiếu TDTT (không nhân hệ số) ≥ ${threshold} (thang 30, khu vực ${region}) — ngành Giáo dục thể chất, phương thức thi TN THPT.`,
  };
}
