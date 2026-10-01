/**
 * VAA (Học viện Hàng không Việt Nam, mã trường HHK) 2026 — điểm trúng tuyển 36 mã xét tuyển, nhánh
 * Phương thức 1 (xét điểm thi TN THPT 2026), thang 30. Nguồn điểm trúng tuyển: thông báo chính thức
 * "Điểm trúng tuyển đại học chính quy 2026" của VAA (`sources.ts:vaa-cutoff-2026`, đọc bằng vision từ
 * 2 ảnh bảng), chú thích nguyên văn: điểm "đã có điểm ưu tiên, điểm cộng, điểm quy đổi từ chứng chỉ
 * ngoại ngữ" và "đã nhân hệ số và quy về thang điểm tối đa của từng PTXT".
 *
 * Nhóm mã tổ hợp xét tuyển (THXT) lấy từ mục 4 của Thông tin tuyển sinh 2026 (`vaa-notice-2026`): mỗi
 * mã xét tuyển dùng 1 hoặc 2 nhóm trong TA01/TA02/DT01/DT02 (xem `evaluate.ts` để biết cách chọn môn).
 * Trường không quy định độ lệch giữa các tổ hợp. Cùng bảng có cột điểm trúng tuyển học bạ (thang 30) cho
 * Phương thức 2 — `transcriptThreshold30`.
 */
export type VaaComboGroup = 'TA01' | 'TA02' | 'DT01' | 'DT02';

export interface VaaFieldThreshold {
  /** Mã xét tuyển chính thức của VAA. */
  code: string;
  name: string;
  groups: readonly VaaComboGroup[];
  threshold30: number;
  /** Điểm trúng tuyển Phương thức 2 (học bạ), thang 30, cột "Học bạ" của cùng bảng điểm trúng tuyển. */
  transcriptThreshold30: number;
}

const TA: readonly VaaComboGroup[] = ['TA01', 'TA02'];
const DT: readonly VaaComboGroup[] = ['DT01', 'DT02'];
const DT02: readonly VaaComboGroup[] = ['DT02'];

export const VAA_FIELD_THRESHOLDS_2026: readonly VaaFieldThreshold[] = [
  { code: '7220201', name: 'Ngôn ngữ Anh', groups: TA, threshold30: 20, transcriptThreshold30: 22 },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', groups: TA, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', groups: TA, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7310109', name: 'Kinh tế số', groups: DT, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7340101', name: 'Quản trị kinh doanh', groups: DT, threshold30: 21, transcriptThreshold30: 23 },
  { code: '7340101D', name: 'Kinh doanh số', groups: DT, threshold30: 22, transcriptThreshold30: 24 },
  { code: '7340101E', name: 'Quản trị Hàng không (học bằng Tiếng Anh)', groups: TA, threshold30: 23, transcriptThreshold30: 24.75 },
  { code: '7340115', name: 'Marketing (Digital Marketing; Công nghệ Marketing)', groups: DT, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7340120', name: 'Thương mại quốc tế', groups: DT, threshold30: 24, transcriptThreshold30: 25.5 },
  { code: '7340205', name: 'Công nghệ tài chính', groups: DT, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7340404', name: 'Quản trị nhân lực', groups: DT, threshold30: 22, transcriptThreshold30: 24 },
  { code: '7480201B', name: 'Trí tuệ nhân tạo và Dữ liệu lớn', groups: DT02, threshold30: 19, transcriptThreshold30: 21 },
  { code: '7480201I', name: 'Trí tuệ nhân tạo và Internet vạn vật', groups: DT02, threshold30: 19, transcriptThreshold30: 21 },
  { code: '7480201S', name: 'Công nghệ phần mềm và Trí tuệ nhân tạo', groups: DT02, threshold30: 19, transcriptThreshold30: 21 },
  { code: '7510102Q', name: 'Quản lý và khai thác cảng hàng không', groups: DT02, threshold30: 24, transcriptThreshold30: 25.5 },
  { code: '7510102X', name: 'Xây dựng và phát triển cảng hàng không', groups: DT02, threshold30: 23, transcriptThreshold30: 24.75 },
  { code: '7510302A', name: 'Điện tử ứng dụng Trí tuệ nhân tạo (AI) và Internet vạn vật (IoT)', groups: DT02, threshold30: 22, transcriptThreshold30: 24 },
  { code: '7510302B', name: 'Công nghệ vi mạch và bán dẫn', groups: DT02, threshold30: 21, transcriptThreshold30: 23 },
  { code: '7510302V', name: 'Điện tử viễn thông và Trí tuệ nhân tạo (AI)', groups: DT02, threshold30: 23, transcriptThreshold30: 24.75 },
  { code: '7510303A', name: 'Điện tự động cảng hàng không', groups: DT02, threshold30: 24, transcriptThreshold30: 25.5 },
  { code: '7510303U', name: 'Thiết bị bay không người lái và Robotics', groups: DT02, threshold30: 23, transcriptThreshold30: 24.75 },
  { code: '7520120', name: 'Kỹ thuật hàng không', groups: DT02, threshold30: 26, transcriptThreshold30: 27 },
  { code: '7520120E', name: 'Kỹ thuật hàng không (học bằng Tiếng Anh)', groups: ['TA02'], threshold30: 25, transcriptThreshold30: 26.25 },
  { code: '7520120M', name: 'Kỹ thuật bảo dưỡng tàu bay', groups: DT02, threshold30: 25.5, transcriptThreshold30: 26.63 },
  { code: '7520120U', name: 'Kỹ thuật thiết bị bay không người lái', groups: DT02, threshold30: 22, transcriptThreshold30: 24 },
  { code: '7580102', name: 'Kiến trúc cảnh quan', groups: DT02, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7810103A', name: 'Quản trị dịch vụ thương mại hàng không', groups: DT, threshold30: 26, transcriptThreshold30: 27 },
  { code: '7810103F', name: 'Quản trị ẩm thực', groups: DT, threshold30: 18, transcriptThreshold30: 20 },
  { code: '7810103H', name: 'Quản trị nhà hàng khách sạn', groups: DT, threshold30: 23, transcriptThreshold30: 24.75 },
  { code: '7810103M', name: 'Quản trị du lịch MICE và tổ chức sự kiện', groups: DT, threshold30: 22, transcriptThreshold30: 24 },
  { code: '7810103T', name: 'Quản trị lữ hành', groups: DT, threshold30: 24, transcriptThreshold30: 25.5 },
  { code: '7840102', name: 'Quản lý hoạt động bay; Hệ thống kỹ thuật quản lý bay', groups: DT02, threshold30: 26.5, transcriptThreshold30: 27.38 },
  { code: '7840102E', name: 'Quản lý hoạt động bay (học bằng Tiếng Anh)', groups: ['TA02'], threshold30: 27.5, transcriptThreshold30: 28.13 },
  { code: '7840104', name: 'Logistics và quản lý chuỗi cung ứng; Logistics và vận tải đa phương thức', groups: DT, threshold30: 24, transcriptThreshold30: 25.5 },
  { code: '7840104E', name: 'Logistics và vận tải đa phương thức (học bằng Tiếng Anh)', groups: TA, threshold30: 21, transcriptThreshold30: 23 },
  { code: '7840104K', name: 'Kinh tế hàng không', groups: DT, threshold30: 22, transcriptThreshold30: 24 },
];

export const VAA_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VaaFieldThreshold> = new Map(
  VAA_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
