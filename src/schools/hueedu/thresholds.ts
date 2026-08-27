/**
 * Ngưỡng đảm bảo chất lượng đầu vào (mức điểm xét tuyển, không nhân hệ số) của Trường Đại học Sư
 * phạm, Đại học Huế — mã trường DHS. Nguồn: Phụ lục 1 kèm Thông báo số 42/TB-HĐTSĐH ngày
 * 10/7/2026 (`hueedu-hueu-threshold-appendix-2026`), mục VI.
 *
 * Nhánh exact CHỈ phủ 2 ngành ngoài đào tạo giáo viên và không có điều kiện phụ:
 *   - Tâm lý học giáo dục (7310403) — 16,00/30
 *   - Hệ thống thông tin (7480104) — 16,00/30
 * Các ngành đào tạo giáo viên (ngưỡng 20,00/30) bị chặn bởi Ghi chú 2 Phụ lục 1: phải đạt đồng
 * thời ngưỡng khối đào tạo giáo viên theo Điều 9 Thông tư 06/2026/TT-BGDĐT của Bộ GDĐT (chưa đối
 * chiếu). Vật lý kỹ thuật dùng chung mã 7520401 cho 2 chương trình với 2 ngưỡng khác nhau
 * (18,00 và 22,75 + nhóm 20% Toán) nên cũng ngoài phạm vi. Sư phạm Âm nhạc / Giáo dục Mầm non có
 * điều kiện điểm năng khiếu ≥ 5. INSA CVL yêu cầu Toán ≥ 7,5.
 */
export interface HueeduProgramThreshold {
  programId: string;
  programName: string;
  thptMin30: number;
}

export const HUEEDU_EXACT_PROGRAM_THRESHOLDS_2026: readonly HueeduProgramThreshold[] = [
  { programId: '7310403', programName: 'Tâm lý học giáo dục', thptMin30: 16 },
  { programId: '7480104', programName: 'Hệ thống thông tin', thptMin30: 16 },
];

export function getHueeduExactProgramThreshold(programId?: string): HueeduProgramThreshold | undefined {
  return HUEEDU_EXACT_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
