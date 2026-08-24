export type HumgProgramId =
  | '7220201'
  | '7440201'
  | '7480201'
  | '7520103'
  | '7520216'
  | '7580201'
  | '7850101';

export interface HumgProgramThreshold {
  programId: HumgProgramId;
  programName: string;
  thptMin30: number;
}

/**
 * Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026 (04/07/2026, mục 7106) có bảng đầy đủ
 * ~53 chương trình (15-21/30), nhưng trích xuất tự động chỉ xác nhận được tên ngành tiếng Việt +
 * mã ngành chính xác cho 7 chương trình dưới đây. KHÔNG nhập số liệu cho các chương trình còn lại
 * để tránh suy diễn sai — xem `humgKnowledgeGaps`.
 */
export const HUMG_PROGRAM_THRESHOLDS_2026: readonly HumgProgramThreshold[] = [
  { programId: '7220201', programName: 'Ngôn ngữ Anh', thptMin30: 17 },
  { programId: '7440201', programName: 'Địa chất học', thptMin30: 16 },
  { programId: '7480201', programName: 'Công nghệ thông tin', thptMin30: 19 },
  { programId: '7520103', programName: 'Kỹ thuật cơ khí', thptMin30: 18 },
  { programId: '7520216', programName: 'Kỹ thuật điều khiển và tự động hoá', thptMin30: 20 },
  { programId: '7580201', programName: 'Kỹ thuật xây dựng', thptMin30: 17 },
  { programId: '7850101', programName: 'Quản lý tài nguyên và môi trường', thptMin30: 16 },
];

export function getHumgProgramThreshold(programId?: string): HumgProgramThreshold | undefined {
  return HUMG_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
