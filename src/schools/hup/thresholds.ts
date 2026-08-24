export type HupProgramId = '7720201' | '7720203' | '7440112' | '7420201';

export interface HupProgramThreshold {
  programId: HupProgramId;
  programName: string;
  thptMin30: number;
}

/**
 * Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển
 * đại học chính quy năm 2026 (tuyensinh.hup.edu.vn, 10/07/2026) công bố ngưỡng riêng cho từng
 * phương thức (PT1-PT4); runtime chỉ nhập PT4 (xét điểm thi TN THPT), khu vực 3, không cộng điểm.
 */
export const HUP_PROGRAM_THRESHOLDS_2026: readonly HupProgramThreshold[] = [
  { programId: '7720201', programName: 'Dược học', thptMin30: 22.0 },
  { programId: '7720203', programName: 'Hoá dược', thptMin30: 20.0 },
  { programId: '7440112', programName: 'Hoá học', thptMin30: 19.0 },
  { programId: '7420201', programName: 'Công nghệ sinh học', thptMin30: 19.0 },
];

export function getHupProgramThreshold(programId?: string): HupProgramThreshold | undefined {
  return HUP_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
