/**
 * Ngưỡng đảm bảo chất lượng đầu vào phương thức xét kết quả thi TN THPT 2026 của PTIT. Nguồn:
 * "Thông báo Ngưỡng đảm bảo chất lượng đầu vào trình độ đại học chính quy đợt 1 năm 2026"
 * (06/07/2026, `ptit-thpt-threshold-2026`), mục 1:
 *  - Cơ sở đào tạo phía Bắc (mã trường BVH): từ 20,00 điểm
 *  - Cơ sở đào tạo phía Nam (mã trường BVS): từ 16,50 điểm
 * Áp dụng cho 05 tổ hợp A00, A01, D01, X06, X26. "Ngưỡng ... đã bao gồm điểm ưu tiên đối tượng và
 * ưu tiên khu vực theo quy chế tuyển sinh của Bộ" ⇒ so sánh với ĐXT (đã cộng điểm ưu tiên).
 */
export type PtitCampusId = 'bvh' | 'bvs';

export interface PtitCampusThreshold {
  campusId: PtitCampusId;
  campusName: string;
  thptMin30: number;
}

export const PTIT_CAMPUS_THRESHOLDS_2026: readonly PtitCampusThreshold[] = [
  { campusId: 'bvh', campusName: 'Cơ sở đào tạo phía Bắc (BVH)', thptMin30: 20 },
  { campusId: 'bvs', campusName: 'Cơ sở đào tạo phía Nam (BVS)', thptMin30: 16.5 },
];

/** 05 tổ hợp xét tuyển áp dụng chung cho mọi ngành/chương trình PT5. */
export const PTIT_THPT_COMBINATIONS_2026 = ['A00', 'A01', 'D01', 'X06', 'X26'] as const;

export function getPtitCampusThreshold(campusId?: string): PtitCampusThreshold | undefined {
  return PTIT_CAMPUS_THRESHOLDS_2026.find((threshold) => threshold.campusId === campusId);
}
