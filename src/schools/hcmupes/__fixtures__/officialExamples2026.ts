import type { GoldenAdmissionCase } from '../../../core/goldenAdmissionCase';
import type { ApplicantProfile } from '../../../core/applicantProfile';
import type { HcmupesEvaluationContext } from '../evaluate';

/**
 * Tier B — Thông báo 05/TB-HĐTS (13/07/2026, đọc trực tiếp qua vision từ PDF Google Drive chính
 * thức) mục 1 (Phương thức 405) công bố ĐẦY ĐỦ bảng ngưỡng theo khu vực ưu tiên: KV3 >= 19,00;
 * KV2 >= 18,75; KV2-NT >= 18,50; KV1 >= 18,25 (thang 30, điểm tổ hợp 2 môn văn hóa + Năng khiếu
 * TDTT không nhân hệ số 2). Đây là số liệu bảng nguồn trực tiếp, không phải formula suy diễn.
 */
export const hcmupesGdtcExactGoldenCases: GoldenAdmissionCase<
  { profile: ApplicantProfile; context: HcmupesEvaluationContext },
  { eligible: boolean; total30: number }
>[] = [
  {
    id: 'hcmupes-2026-gdtc-kv3-exact-threshold-pass',
    schoolId: 'hcmupes',
    methodId: 'hcmupes-thpt-plus-talent-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    sourceNote: 'Bảng ngưỡng mục 1: KV3 >= 19,00/30 (điểm tổ hợp 2 môn văn hóa + năng khiếu TDTT, không nhân hệ số).',
    input: {
      profile: { thpt: { scores: { math: 6, biology: 6 } }, priority: { region: 'KV3' } },
      context: { pairId: 'T00', talentScore10: 7 },
    },
    expected: { eligible: true, total30: 19 },
  },
  {
    id: 'hcmupes-2026-gdtc-kv3-exact-threshold-fail',
    schoolId: 'hcmupes',
    methodId: 'hcmupes-thpt-plus-talent-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    sourceNote: 'Ngay dưới ngưỡng KV3 19,00/30 — tổng 18,99 chưa đạt.',
    input: {
      profile: { thpt: { scores: { math: 6, biology: 5.99 } }, priority: { region: 'KV3' } },
      context: { pairId: 'T00', talentScore10: 7 },
    },
    expected: { eligible: false, total30: 18.99 },
  },
  {
    id: 'hcmupes-2026-gdtc-kv1-lower-threshold-pass',
    schoolId: 'hcmupes',
    methodId: 'hcmupes-thpt-plus-talent-2026',
    year: 2026,
    tier: 'B',
    sourceId: 'hcmupes-gdtc-threshold-2026',
    sourceNote: 'Bảng ngưỡng mục 1: KV1 >= 18,25/30 — thấp hơn KV3 đúng 0,75, khớp mức chênh khu vực công bố.',
    input: {
      profile: { thpt: { scores: { math: 5.75, biology: 5.5 } }, priority: { region: 'KV1' } },
      context: { pairId: 'T00', talentScore10: 7 },
    },
    expected: { eligible: true, total30: 18.25 },
  },
];
