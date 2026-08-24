export type PntuProgramId = '7720101' | '7720501' | '7310401';

export interface PntuProgramThreshold {
  programId: PntuProgramId;
  programName: string;
  thptMin30: number;
}

/**
 * Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026 của Trường Đại học Y khoa Phạm Ngọc Thạch
 * (công bố 10/07/2026, khu vực 3, tổng điểm 3 môn không nhân hệ số) công bố dải điểm sàn 15,5-22,5
 * cho toàn bộ chương trình, nhưng bảng đầy đủ chỉ có qua báo chí đối chiếu; chỉ 3 ngành dưới đây có
 * tên + mã ngành + số điểm xác nhận chắc chắn. KHÔNG nhập số liệu cho các ngành còn lại để tránh suy
 * diễn sai — xem `pntuKnowledgeGaps`.
 */
export const PNTU_PROGRAM_THRESHOLDS_2026: readonly PntuProgramThreshold[] = [
  { programId: '7720101', programName: 'Y khoa', thptMin30: 22.5 },
  { programId: '7720501', programName: 'Răng - Hàm - Mặt', thptMin30: 22.5 },
  { programId: '7310401', programName: 'Tâm lý học', thptMin30: 15.5 },
];

export function getPntuProgramThreshold(programId?: string): PntuProgramThreshold | undefined {
  return PNTU_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
