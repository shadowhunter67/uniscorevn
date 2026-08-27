/**
 * Ngưỡng đảm bảo chất lượng đầu vào (mức điểm xét tuyển, không nhân hệ số) của Trường Đại học
 * Nông Lâm, Đại học Huế — mã trường DHL. Nguồn: Phụ lục 1 kèm Thông báo số 42/TB-HĐTSĐH ngày
 * 10/7/2026 của Đại học Huế (`huaf-hueu-threshold-appendix-2026`), mục IV. Ghi chú 1: áp dụng cho
 * phương thức xét điểm thi TN THPT, khu vực 3, tổng điểm 3 môn của tổ hợp (thang 30), không tính
 * điểm cộng. 19 mã ngành, không mã nào có điều kiện phụ.
 */
export interface HuafProgramThreshold {
  programId: string;
  programName: string;
  thptMin30: number;
}

export const HUAF_PROGRAM_THRESHOLDS_2026: readonly HuafProgramThreshold[] = [
  { programId: '7340116', programName: 'Bất động sản', thptMin30: 15 },
  { programId: '7510201', programName: 'Công nghệ kỹ thuật cơ khí', thptMin30: 16 },
  { programId: '7520114', programName: 'Kỹ thuật cơ điện tử', thptMin30: 17 },
  { programId: '7540101', programName: 'Công nghệ thực phẩm', thptMin30: 16 },
  { programId: '7540106', programName: 'Đảm bảo chất lượng và an toàn thực phẩm', thptMin30: 15 },
  { programId: '7620102', programName: 'Khuyến nông', thptMin30: 15 },
  { programId: '7620105', programName: 'Chăn nuôi', thptMin30: 16 },
  { programId: '7620110', programName: 'Khoa học cây trồng', thptMin30: 15 },
  { programId: '7620112', programName: 'Bảo vệ thực vật', thptMin30: 15 },
  { programId: '7620116', programName: 'Phát triển nông thôn', thptMin30: 15 },
  { programId: '7620118', programName: 'Nông nghiệp công nghệ cao', thptMin30: 15 },
  { programId: '7620210', programName: 'Lâm nghiệp', thptMin30: 15 },
  { programId: '7620211', programName: 'Quản lý tài nguyên rừng', thptMin30: 15 },
  { programId: '7620301', programName: 'Nuôi trồng thủy sản', thptMin30: 15 },
  { programId: '7620302', programName: 'Bệnh học thủy sản', thptMin30: 15 },
  { programId: '7620305', programName: 'Quản lý thủy sản', thptMin30: 15 },
  { programId: '7640101', programName: 'Thú y', thptMin30: 17 },
  { programId: '7850103', programName: 'Quản lý đất đai', thptMin30: 15 },
  { programId: '7580210', programName: 'Kỹ thuật cơ sở hạ tầng', thptMin30: 15 },
];

/** Ngưỡng thấp nhất trong bảng — dùng khi caller không truyền `programId`. */
export const HUAF_MIN_THRESHOLD_30 = 15;

export function getHuafProgramThreshold(programId?: string): HuafProgramThreshold | undefined {
  return HUAF_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
