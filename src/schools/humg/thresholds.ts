export interface HumgProgramThreshold {
  programId: string;
  programName: string;
  thptMin30: number;
}

/**
 * Bảng 1 — "Ngưỡng đảm bảo chất lượng đầu vào theo phương thức xét tuyển theo kết quả thi THPT
 * năm 2026" (Thông báo ngưỡng điểm xét tuyển đợt 1 hệ đại học năm 2026, 04/07/2026,
 * `humg-admission-2026`, mục 7106). Đọc trực tiếp toàn bộ 53 mã xét tuyển từ trang thông báo
 * chính thức (thang điểm 30, "Điểm nhận hồ sơ"). Không mã ngành nào có điều kiện phụ.
 */
export const HUMG_PROGRAM_THRESHOLDS_2026: readonly HumgProgramThreshold[] = [
  { programId: '7220201', programName: 'Ngôn ngữ Anh', thptMin30: 17 },
  { programId: '7220204', programName: 'Ngôn ngữ Trung Quốc', thptMin30: 17 },
  { programId: '7340101', programName: 'Quản trị kinh doanh', thptMin30: 17 },
  { programId: '7340201', programName: 'Tài chính - Ngân hàng', thptMin30: 17 },
  { programId: '7340301', programName: 'Kế toán', thptMin30: 17 },
  { programId: '7440201', programName: 'Địa chất học', thptMin30: 16 },
  { programId: '7440229', programName: 'Quản lý và phân tích dữ liệu khoa học trái đất', thptMin30: 15 },
  { programId: '7460108', programName: 'Khoa học dữ liệu', thptMin30: 18 },
  { programId: '7480201', programName: 'Công nghệ thông tin', thptMin30: 19 },
  { programId: '7480206', programName: 'Địa tin học', thptMin30: 15 },
  { programId: '7510301', programName: 'Công nghệ kỹ thuật điện, điện tử', thptMin30: 19.5 },
  { programId: '7510401', programName: 'Công nghệ kỹ thuật hóa học', thptMin30: 16 },
  { programId: '7510402', programName: 'Công nghệ vật liệu', thptMin30: 16 },
  { programId: '7510601', programName: 'Quản lý công nghiệp', thptMin30: 17 },
  { programId: '7520103', programName: 'Kỹ thuật cơ khí', thptMin30: 18 },
  { programId: '7520114', programName: 'Kỹ thuật cơ điện tử', thptMin30: 19 },
  { programId: '7520116', programName: 'Kỹ thuật cơ khí động lực', thptMin30: 15.5 },
  { programId: '7520121', programName: 'Kỹ thuật không gian', thptMin30: 15 },
  { programId: '7520130', programName: 'Kỹ thuật ô tô', thptMin30: 19 },
  { programId: '7520201', programName: 'Kỹ thuật điện', thptMin30: 18 },
  { programId: '7520216', programName: 'Kỹ thuật điều khiển và tự động hoá', thptMin30: 20 },
  { programId: '7520107', programName: 'Kỹ thuật Robot (Kỹ thuật Robot và Trí tuệ nhân tạo)', thptMin30: 20 },
  { programId: '7520309', programName: 'Kỹ thuật vật liệu', thptMin30: 15 },
  { programId: '7520320', programName: 'Kỹ thuật môi trường', thptMin30: 15 },
  { programId: '7520501', programName: 'Kỹ thuật địa chất', thptMin30: 15 },
  { programId: '7520502', programName: 'Kỹ thuật địa vật lý', thptMin30: 15 },
  { programId: '7520503', programName: 'Kỹ thuật trắc địa - bản đồ', thptMin30: 16 },
  { programId: '7520505', programName: 'Đá quý Đá mỹ nghệ', thptMin30: 16 },
  { programId: '7520601', programName: 'Kỹ thuật mỏ', thptMin30: 16 },
  { programId: '7520604', programName: 'Kỹ thuật dầu khí', thptMin30: 15 },
  { programId: '7520605', programName: 'Kỹ thuật khí thiên nhiên', thptMin30: 15 },
  { programId: '7520606', programName: 'Công nghệ số trong thăm dò và khai thác tài nguyên thiên nhiên', thptMin30: 15 },
  { programId: '7520607', programName: 'Kỹ thuật tuyển khoáng', thptMin30: 16 },
  { programId: '7580106', programName: 'Quản lý đô thị và công trình', thptMin30: 15 },
  { programId: '7580109', programName: 'Quản lý phát triển đô thị và bất động sản', thptMin30: 16 },
  { programId: '7580201', programName: 'Kỹ thuật xây dựng', thptMin30: 17 },
  { programId: '7580204', programName: 'Xây dựng công trình ngầm thành phố và Hệ thống tàu điện ngầm', thptMin30: 15 },
  { programId: '7580205', programName: 'Kỹ thuật xây dựng công trình giao thông', thptMin30: 16 },
  { programId: '7580211', programName: 'Địa kỹ thuật xây dựng', thptMin30: 15 },
  { programId: '7580212', programName: 'Kỹ thuật tài nguyên nước', thptMin30: 16 },
  { programId: '7580302', programName: 'Quản lý xây dựng', thptMin30: 16.5 },
  { programId: '7720203', programName: 'Hoá dược', thptMin30: 16 },
  { programId: '7810105', programName: 'Du lịch địa chất', thptMin30: 18 },
  { programId: '7850101', programName: 'Quản lý tài nguyên và môi trường', thptMin30: 16 },
  { programId: '7850103', programName: 'Quản lý đất đai', thptMin30: 16 },
  { programId: '7850196', programName: 'Quản lý tài nguyên khoáng sản', thptMin30: 15 },
  { programId: '7850202', programName: 'An toàn, Vệ sinh lao động', thptMin30: 16 },
  { programId: '7520601TL', programName: 'Kỹ thuật mỏ thông minh (chương trình tài năng)', thptMin30: 21 },
  { programId: '7480201TL', programName: 'Trí tuệ nhân tạo ứng dụng và bản sao số trái đất (chương trình tài năng)', thptMin30: 21 },
  { programId: '7520216TL', programName: 'Kỹ thuật điều khiển và tự động hóa phục vụ công nghiệp khai khoáng và năng lượng (chương trình tài năng)', thptMin30: 21 },
  { programId: '7580201TL', programName: 'Kỹ thuật xây dựng công trình ngầm (chương trình tài năng)', thptMin30: 21 },
  { programId: '7520501TL', programName: 'Kỹ thuật địa chất phục vụ công nghiệp đất hiếm và khoáng sản chiến lược (chương trình tài năng)', thptMin30: 21 },
  { programId: '7520301', programName: 'Kỹ thuật hoá học (chương trình tiên tiến)', thptMin30: 16 },
];

export function getHumgProgramThreshold(programId?: string): HumgProgramThreshold | undefined {
  return HUMG_PROGRAM_THRESHOLDS_2026.find((threshold) => threshold.programId === programId);
}
