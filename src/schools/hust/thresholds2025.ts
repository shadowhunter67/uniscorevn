import type { SubjectId } from '../../core/subjects';

/**
 * Đại học Bách khoa Hà Nội (HUST) 2025 — điểm chuẩn 65/65 chương trình đào tạo, nhánh xét kết quả
 * thi TN THPT, công bố 22/08/2025. Nguồn chính: tuyensinh247 (`sources.ts:hust-threshold-2025`,
 * bảng đầy đủ theo TỪNG chương trình x TỪNG nhóm tổ hợp), cross-check dải điểm/mức cao nhất với
 * chính trang chủ HUST + báo chí (vnexpress/nhandan/chinhphu.vn đều dẫn đúng 29,39 IT-E10 / 29,19
 * IT1 / 28,48 EE2 — khớp tuyệt đối với bảng tuyensinh247).
 *
 * KHÁC AOF/HUC: HUST dùng CÔNG THỨC ĐIỂM XÉT (ĐX) có TRỌNG SỐ "môn chính" — xác nhận TRỰC TIẾP qua
 * trang chính thức ts.hust.edu.vn (đọc trực tiếp qua curl, `sources.ts:hust-formula-official-2025`):
 *   a) Tổ hợp KHÔNG có môn chính: ĐX = (Môn 1 + Môn 2 + Môn 3) + Điểm ưu tiên.
 *   b) Tổ hợp CÓ môn chính:      ĐX = [(Môn 1 + Môn 2 + Môn 3 + Môn chính) x 3/4] + Điểm ưu tiên.
 * (Trang còn nêu công thức riêng cho tổ hợp K01 và 2 phương thức phi-THPT khác — không có chương
 * trình nào trong bảng điểm chuẩn 2025 thu thập được dùng K01 độc lập, không mô hình hoá.) Điểm
 * chuẩn công bố ĐÃ ở thang ĐX (thang 30) — so sánh trực tiếp, không cần tự áp offset giữa các nhóm
 * tổ hợp (mỗi nhóm tổ hợp trong 1 chương trình đã có điểm chuẩn RIÊNG do trường công bố, đã phản ánh
 * sẵn độ lệch 0,5 điểm giữa nhóm kỹ thuật và nhóm D01/D04 nếu chương trình đó bị ảnh hưởng).
 *
 * Môn chính trong bảng gốc ghi "Toán" cho hầu hết chương trình khối kỹ thuật/kinh tế, và "Ngoại ngữ"
 * cho 3 chương trình ngôn ngữ (Tiếng Anh KHKT, Tiếng Anh chuyên nghiệp quốc tế, Tiếng Trung KHKT) —
 * sau khi loại tổ hợp không mô hình hoá được (xem dưới), môn "Ngoại ngữ" chỉ còn ứng với tổ hợp D01
 * (Tiếng Anh), nên map trực tiếp thành `mainSubject: 'english'`.
 *
 * Bảng gốc dùng các tổ hợp A00/A01/A02/B00/B03/C01/C02/D01/D07 (đã có sẵn trong taxonomy môn dùng
 * chung) và X02 (Toán/Ngữ văn/Tin học — THÊM MỚI batch này vào `core/subjects.ts`, dùng chung cho
 * gần như MỌI chương trình HUST như 1 tổ hợp "khối văn" song song B03/C01/C02). Bảng gốc còn dùng
 * D04 (Toán/Văn/Trung), D26 (Toán/Lý/Đức), D28 (Toán/Lý/Nhật), D29 (Toán/Lý/Pháp), K01 (tổ hợp trọng
 * số 4 môn riêng) — CÁC TỔ HỢP NÀY DÙNG MÔN NGOẠI NGỮ KHÔNG CÓ TRONG TAXONOMY (`SubjectId` chỉ có
 * 'english') hoặc cấu trúc trọng số 4-môn không khớp mô hình combinationId cố định 3-môn hiện tại —
 * ĐÃ LOẠI khỏi danh sách combinationIds bên dưới (cùng tiền lệ HAUI/HDIU với D04/D06/D08/tiếng Trung-
 * Nhật-Hàn "chưa mô hình hoá"). KHÔNG ảnh hưởng độ chính xác của các tổ hợp còn lại — mỗi chương
 * trình vẫn giữ đủ nhóm tổ hợp chính (A00/A01/B00/D07 hoặc D01) + nhóm B03/C01/C02/X02 (luôn đầy đủ,
 * không chương trình nào trong bảng CHỈ có tổ hợp bị loại).
 *
 * Mã "ngành" (`code`) dùng slug tự sinh từ TÊN CHƯƠNG TRÌNH đúng nguyên văn bảng điểm chuẩn 2025
 * (tuyensinh247) — KHÔNG dùng mã ngành/mã chương trình ngắn (BF1, IT-E10, EE2...) trường tự công bố
 * vì bảng mã đó chỉ thu thập được cho catalog 2026 (68 chương trình, có vài mã mới/đổi tên so với
 * 2025 — vd không thấy mã "EM4" cho "Kế toán" — rủi ro khớp sai giữa 2 năm) — dùng slug tên chương
 * trình tránh hoàn toàn rủi ro ánh xạ chéo năm.
 */
export interface HustCombinationThreshold2025 {
  combinationId: string;
  /** Điểm chuẩn 2025 (thang 30, Điểm xét ĐX — đã gồm điểm ưu tiên). */
  threshold30: number;
  /** Môn chính (trọng số) nếu tổ hợp này áp dụng công thức (b); không có nghĩa là công thức (a). */
  mainSubject?: SubjectId;
}

export interface HustFieldThreshold2025 {
  code: string;
  /** Tên chương trình đúng nguyên văn bảng điểm chuẩn 2025. */
  name: string;
  combinations: readonly HustCombinationThreshold2025[];
}

export const HUST_FIELD_THRESHOLDS_2025 = [
  {
    code: 'ky-thuat-thuc-pham-ct-tien-tien',
    name: 'Kỹ thuật Thực phẩm (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 21, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 21, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 21, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 21 },
      { combinationId: 'C01', threshold30: 21 },
      { combinationId: 'C02', threshold30: 21 },
      { combinationId: 'X02', threshold30: 21 },
    ],
  },
  {
    code: 'ky-thuat-sinh-hoc-ct-tien-tien',
    name: 'Kỹ thuật sinh học (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 20, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 20, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 20, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 20 },
      { combinationId: 'C01', threshold30: 20 },
      { combinationId: 'C02', threshold30: 20 },
      { combinationId: 'X02', threshold30: 20 },
    ],
  },
  {
    code: 'ky-thuat-sinh-hoc',
    name: 'Kỹ thuật Sinh học',
    combinations: [
      { combinationId: 'A00', threshold30: 23.02, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 23.02, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 23.02, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 23.02 },
      { combinationId: 'C01', threshold30: 23.02 },
      { combinationId: 'C02', threshold30: 23.02 },
      { combinationId: 'X02', threshold30: 23.02 },
    ],
  },
  {
    code: 'ky-thuat-thuc-pham',
    name: 'Kỹ thuật Thực phẩm',
    combinations: [
      { combinationId: 'B03', threshold30: 23.38 },
      { combinationId: 'C01', threshold30: 23.38 },
      { combinationId: 'C02', threshold30: 23.38 },
      { combinationId: 'X02', threshold30: 23.38 },
      { combinationId: 'A00', threshold30: 23.38, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 23.38, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 23.38, mainSubject: 'math' },
    ],
  },
  {
    code: 'ky-thuat-hoa-duoc-ct-tien-tien',
    name: 'Kỹ thuật Hóa dược (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 21.38, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 21.38, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 21.38, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 21.38 },
      { combinationId: 'C01', threshold30: 21.38 },
      { combinationId: 'C02', threshold30: 21.38 },
      { combinationId: 'X02', threshold30: 21.38 },
    ],
  },
  {
    code: 'ky-thuat-hoa-hoc',
    name: 'Kỹ thuật Hoá học',
    combinations: [
      { combinationId: 'A00', threshold30: 24.05, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 24.05, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 24.05, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 24.05 },
      { combinationId: 'C01', threshold30: 24.05 },
      { combinationId: 'C02', threshold30: 24.05 },
      { combinationId: 'X02', threshold30: 24.05 },
    ],
  },
  {
    code: 'hoa-hoc',
    name: 'Hoá học',
    combinations: [
      { combinationId: 'A00', threshold30: 23.19, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 23.19, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 23.19, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 23.19 },
      { combinationId: 'C01', threshold30: 23.19 },
      { combinationId: 'C02', threshold30: 23.19 },
      { combinationId: 'X02', threshold30: 23.19 },
    ],
  },
  {
    code: 'cong-nghe-giao-duc',
    name: 'Công nghệ giáo dục',
    combinations: [
      { combinationId: 'D01', threshold30: 23.3 },
      { combinationId: 'A00', threshold30: 23.8 },
      { combinationId: 'A01', threshold30: 23.8 },
      { combinationId: 'B03', threshold30: 23.8 },
      { combinationId: 'C01', threshold30: 23.8 },
      { combinationId: 'C02', threshold30: 23.8 },
      { combinationId: 'X02', threshold30: 23.8 },
    ],
  },
  {
    code: 'quan-ly-giao-duc',
    name: 'Quản lý giáo dục',
    combinations: [
      { combinationId: 'D01', threshold30: 23.2 },
      { combinationId: 'A00', threshold30: 23.7 },
      { combinationId: 'A01', threshold30: 23.7 },
      { combinationId: 'B03', threshold30: 23.7 },
      { combinationId: 'C01', threshold30: 23.7 },
      { combinationId: 'C02', threshold30: 23.7 },
      { combinationId: 'X02', threshold30: 23.7 },
    ],
  },
  {
    code: 'he-thong-dien-va-nang-luong-tai-tao-ct-tien-tien',
    name: 'Hệ thống điện và năng lượng tái tạo (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 26.56, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.56, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.56 },
      { combinationId: 'C01', threshold30: 26.56 },
      { combinationId: 'C02', threshold30: 26.56 },
      { combinationId: 'X02', threshold30: 26.56 },
    ],
  },
  {
    code: 'ky-thuat-dieu-khien-tu-dong-hoa-ct-tien-tien',
    name: 'Kỹ thuật Điều khiển - Tự động hoá (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 28.12, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.12, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.12 },
      { combinationId: 'C01', threshold30: 28.12 },
      { combinationId: 'C02', threshold30: 28.12 },
      { combinationId: 'X02', threshold30: 28.12 },
    ],
  },
  {
    code: 'tin-hoc-cong-nghiep-va-tu-dong-hoa-chuong-trinh-viet-phap-pfiev',
    name: 'Tin học công nghiệp và Tự động hóa (Chương trình Việt - Pháp PFIEV)',
    combinations: [
      { combinationId: 'A00', threshold30: 27.27, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.27, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.27 },
      { combinationId: 'C01', threshold30: 27.27 },
      { combinationId: 'C02', threshold30: 27.27 },
      { combinationId: 'X02', threshold30: 27.27 },
    ],
  },
  {
    code: 'ky-thuat-dien',
    name: 'Kỹ thuật Điện',
    combinations: [
      { combinationId: 'A00', threshold30: 27.55, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.55, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.55 },
      { combinationId: 'C01', threshold30: 27.55 },
      { combinationId: 'C02', threshold30: 27.55 },
      { combinationId: 'X02', threshold30: 27.55 },
    ],
  },
  {
    code: 'ky-thuat-dieu-khien-tu-dong-hoa',
    name: 'Kỹ thuật Điều khiển - Tự động hoá',
    combinations: [
      { combinationId: 'A00', threshold30: 28.48, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.48, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.48 },
      { combinationId: 'C01', threshold30: 28.48 },
      { combinationId: 'C02', threshold30: 28.48 },
      { combinationId: 'X02', threshold30: 28.48 },
    ],
  },
  {
    code: 'phan-tich-kinh-doanh-ct-tien-tien',
    name: 'Phân tích kinh doanh (CT tiên tiến)',
    combinations: [
      { combinationId: 'D01', threshold30: 23.06, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 23.56 },
      { combinationId: 'B03', threshold30: 23.56 },
      { combinationId: 'C01', threshold30: 23.56 },
      { combinationId: 'C02', threshold30: 23.56 },
      { combinationId: 'D07', threshold30: 23.56 },
      { combinationId: 'X02', threshold30: 23.56 },
    ],
  },
  {
    code: 'logistics-va-quan-ly-chuoi-cung-ung-ct-tien-tien',
    name: 'Logistics và Quản lý chuỗi cung ứng (CT tiên tiến)',
    combinations: [
      { combinationId: 'D01', threshold30: 23.71, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 24.21, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 24.21, mainSubject: 'math' },
      { combinationId: 'C01', threshold30: 24.21, mainSubject: 'math' },
      { combinationId: 'C02', threshold30: 24.21, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 24.21, mainSubject: 'math' },
      { combinationId: 'X02', threshold30: 24.21, mainSubject: 'math' },
    ],
  },
  {
    code: 'quan-ly-nang-luong',
    name: 'Quản lý năng lượng',
    combinations: [
      { combinationId: 'A00', threshold30: 24.2 },
      { combinationId: 'A01', threshold30: 24.2 },
      { combinationId: 'B03', threshold30: 24.2 },
      { combinationId: 'C01', threshold30: 24.2 },
      { combinationId: 'C02', threshold30: 24.2 },
      { combinationId: 'X02', threshold30: 24.2 },
      { combinationId: 'D01', threshold30: 23.7, mainSubject: 'math' },
    ],
  },
  {
    code: 'quan-ly-cong-nghiep',
    name: 'Quản lý công nghiệp',
    combinations: [
      { combinationId: 'D01', threshold30: 23.9, mainSubject: 'math' },
      { combinationId: 'A00', threshold30: 24.4 },
      { combinationId: 'A01', threshold30: 24.4 },
      { combinationId: 'B03', threshold30: 24.4 },
      { combinationId: 'C01', threshold30: 24.4 },
      { combinationId: 'C02', threshold30: 24.4 },
      { combinationId: 'X02', threshold30: 24.4 },
    ],
  },
  {
    code: 'quan-tri-kinh-doanh',
    name: 'Quản trị kinh doanh',
    combinations: [
      { combinationId: 'D01', threshold30: 24.3, mainSubject: 'math' },
      { combinationId: 'A00', threshold30: 24.8 },
      { combinationId: 'A01', threshold30: 24.8 },
      { combinationId: 'B03', threshold30: 24.8 },
      { combinationId: 'C01', threshold30: 24.8 },
      { combinationId: 'C02', threshold30: 24.8 },
      { combinationId: 'X02', threshold30: 24.8 },
    ],
  },
  {
    code: 'ke-toan',
    name: 'Kế toán',
    combinations: [
      { combinationId: 'D01', threshold30: 24.13, mainSubject: 'math' },
      { combinationId: 'A00', threshold30: 24.63 },
      { combinationId: 'A01', threshold30: 24.63 },
      { combinationId: 'B03', threshold30: 24.63 },
      { combinationId: 'C01', threshold30: 24.63 },
      { combinationId: 'C02', threshold30: 24.63 },
      { combinationId: 'X02', threshold30: 24.63 },
    ],
  },
  {
    code: 'tai-chinh-ngan-hang',
    name: 'Tài chính - Ngân hàng',
    combinations: [
      { combinationId: 'D01', threshold30: 24.3, mainSubject: 'math' },
      { combinationId: 'A00', threshold30: 24.8 },
      { combinationId: 'A01', threshold30: 24.8 },
      { combinationId: 'B03', threshold30: 24.8 },
      { combinationId: 'C01', threshold30: 24.8 },
      { combinationId: 'C02', threshold30: 24.8 },
      { combinationId: 'X02', threshold30: 24.8 },
    ],
  },
  {
    code: 'truyen-thong-so-va-ky-thuat-da-phuong-tien-ct-tien-tien',
    name: 'Truyền thông số và Kỹ thuật đa phương tiện (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 26.62, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.62, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.62 },
      { combinationId: 'C01', threshold30: 26.62 },
      { combinationId: 'C02', threshold30: 26.62 },
      { combinationId: 'X02', threshold30: 26.62 },
    ],
  },
  {
    code: 'ky-thuat-dien-tu-vien-thong-ct-tien-tien',
    name: 'Kỹ thuật Điện tử - Viễn thông (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 27.55, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.55, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.55 },
      { combinationId: 'C01', threshold30: 27.55 },
      { combinationId: 'C02', threshold30: 27.55 },
      { combinationId: 'X02', threshold30: 27.55 },
    ],
  },
  {
    code: 'ky-thuat-y-sinh-ct-tien-tien',
    name: 'Kỹ thuật Y sinh (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 25.58, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.58, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.58 },
      { combinationId: 'C01', threshold30: 25.58 },
      { combinationId: 'C02', threshold30: 25.58 },
      { combinationId: 'X02', threshold30: 25.58 },
    ],
  },
  {
    code: 'he-thong-nhung-thong-minh-va-iot-ct-tien-tien',
    name: 'Hệ thống nhúng thông minh và IoT (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 27.85, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.85, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.85 },
      { combinationId: 'C01', threshold30: 27.85 },
      { combinationId: 'C02', threshold30: 27.85 },
      { combinationId: 'X02', threshold30: 27.85 },
    ],
  },
  {
    code: 'dien-tu-vien-thong-hop-tac-voi-dh-leibniz-hannover-duc',
    name: 'Điện tử - Viễn thông - hợp tác với ĐH Leibniz Hannover (Đức)',
    combinations: [
      { combinationId: 'A00', threshold30: 26.55, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.55, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.55 },
      { combinationId: 'C01', threshold30: 26.55 },
      { combinationId: 'C02', threshold30: 26.55 },
      { combinationId: 'X02', threshold30: 26.55 },
    ],
  },
  {
    code: 'ky-thuat-dien-tu-vien-thong',
    name: 'Kỹ thuật Điện tử - Viễn thông',
    combinations: [
      { combinationId: 'A00', threshold30: 28.07, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.07, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.07 },
      { combinationId: 'C01', threshold30: 28.07 },
      { combinationId: 'C02', threshold30: 28.07 },
      { combinationId: 'X02', threshold30: 28.07 },
    ],
  },
  {
    code: 'ky-thuat-y-sinh',
    name: 'Kỹ thuật Y sinh',
    combinations: [
      { combinationId: 'A00', threshold30: 26.32, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.32, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 26.32, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.32 },
      { combinationId: 'C01', threshold30: 26.32 },
      { combinationId: 'C02', threshold30: 26.32 },
      { combinationId: 'X02', threshold30: 26.32 },
    ],
  },
  {
    code: 'ky-thuat-moi-truong',
    name: 'Kỹ thuật Môi trường',
    combinations: [
      { combinationId: 'B03', threshold30: 22.22 },
      { combinationId: 'C01', threshold30: 22.22 },
      { combinationId: 'C02', threshold30: 22.22 },
      { combinationId: 'X02', threshold30: 22.22 },
      { combinationId: 'A00', threshold30: 22.22, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 22.22, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 22.22, mainSubject: 'math' },
    ],
  },
  {
    code: 'quan-ly-tai-nguyen-va-moi-truong',
    name: 'Quản lý Tài nguyên và Môi trường',
    combinations: [
      { combinationId: 'A00', threshold30: 21.53, mainSubject: 'math' },
      { combinationId: 'B00', threshold30: 21.53, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 21.53, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 21.53 },
      { combinationId: 'C01', threshold30: 21.53 },
      { combinationId: 'C02', threshold30: 21.53 },
      { combinationId: 'X02', threshold30: 21.53 },
    ],
  },
  {
    code: 'tieng-anh-khkt-va-cong-nghe',
    name: 'Tiếng Anh KHKT và Công nghệ',
    combinations: [
      { combinationId: 'D01', threshold30: 24.3, mainSubject: 'english' },
      { combinationId: 'B03', threshold30: 24.8 },
      { combinationId: 'C01', threshold30: 24.8 },
      { combinationId: 'C02', threshold30: 24.8 },
      { combinationId: 'X02', threshold30: 24.8 },
    ],
  },
  {
    code: 'tieng-anh-chuyen-nghiep-quoc-te',
    name: 'Tiếng Anh chuyên nghiệp quốc tế',
    combinations: [
      { combinationId: 'D01', threshold30: 24.3, mainSubject: 'english' },
      { combinationId: 'B03', threshold30: 24.8 },
      { combinationId: 'C01', threshold30: 24.8 },
      { combinationId: 'C02', threshold30: 24.8 },
      { combinationId: 'X02', threshold30: 24.8 },
    ],
  },
  {
    code: 'tieng-trung-khkt-va-cong-nghe',
    name: 'Tiếng Trung KHKT và Công nghệ',
    combinations: [
      { combinationId: 'D01', threshold30: 24.86, mainSubject: 'english' },
      { combinationId: 'B03', threshold30: 25.36 },
      { combinationId: 'C01', threshold30: 25.36 },
      { combinationId: 'C02', threshold30: 25.36 },
      { combinationId: 'X02', threshold30: 25.36 },
    ],
  },
  {
    code: 'ky-thuat-nhiet',
    name: 'Kỹ thuật Nhiệt',
    combinations: [
      { combinationId: 'A00', threshold30: 25.47, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.47, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.47 },
      { combinationId: 'C01', threshold30: 25.47 },
      { combinationId: 'C02', threshold30: 25.47 },
      { combinationId: 'X02', threshold30: 25.47 },
    ],
  },
  {
    code: 'khoa-hoc-du-lieu-va-tri-tue-nhan-tao-ct-tien-tien',
    name: 'Khoa học dữ liệu và Trí tuệ nhân tạo (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 29.39, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 29.39, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 29.39 },
      { combinationId: 'C01', threshold30: 29.39 },
      { combinationId: 'C02', threshold30: 29.39 },
      { combinationId: 'X02', threshold30: 29.39 },
    ],
  },
  {
    code: 'an-toan-khong-gian-so-cyber-security-ct-tien-tien',
    name: 'An toàn không gian số - Cyber Security (CT Tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 28.69, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.69, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.69 },
      { combinationId: 'C01', threshold30: 28.69 },
      { combinationId: 'C02', threshold30: 28.69 },
      { combinationId: 'X02', threshold30: 28.69 },
    ],
  },
  {
    code: 'cong-nghe-thong-tin-viet-nhat',
    name: 'Công nghệ thông tin (Việt - Nhật)',
    combinations: [
      { combinationId: 'A00', threshold30: 27.97, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.97, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.97 },
      { combinationId: 'C01', threshold30: 27.97 },
      { combinationId: 'C02', threshold30: 27.97 },
      { combinationId: 'X02', threshold30: 27.97 },
    ],
  },
  {
    code: 'cong-nghe-thong-tin-global-ict',
    name: 'Công nghệ thông tin (Global ICT)',
    combinations: [
      { combinationId: 'A00', threshold30: 28.66, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.66, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.66 },
      { combinationId: 'C01', threshold30: 28.66 },
      { combinationId: 'C02', threshold30: 28.66 },
      { combinationId: 'X02', threshold30: 28.66 },
    ],
  },
  {
    code: 'cong-nghe-thong-tin-viet-phap',
    name: 'Công nghệ thông tin (Việt - Pháp)',
    combinations: [
      { combinationId: 'A00', threshold30: 27.83, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.83, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.83 },
      { combinationId: 'C01', threshold30: 27.83 },
      { combinationId: 'C02', threshold30: 27.83 },
      { combinationId: 'X02', threshold30: 27.83 },
    ],
  },
  {
    code: 'cntt-khoa-hoc-may-tinh',
    name: 'CNTT: Khoa học Máy tính',
    combinations: [
      { combinationId: 'A00', threshold30: 29.19, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 29.19, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 29.19 },
      { combinationId: 'C01', threshold30: 29.19 },
      { combinationId: 'C02', threshold30: 29.19 },
      { combinationId: 'X02', threshold30: 29.19 },
    ],
  },
  {
    code: 'cntt-ky-thuat-may-tinh',
    name: 'CNTT: Kỹ thuật Máy tính',
    combinations: [
      { combinationId: 'A00', threshold30: 28.83, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.83, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.83 },
      { combinationId: 'C01', threshold30: 28.83 },
      { combinationId: 'C02', threshold30: 28.83 },
      { combinationId: 'X02', threshold30: 28.83 },
    ],
  },
  {
    code: 'ky-thuat-co-dien-tu-ct-tien-tien',
    name: 'Kỹ thuật Cơ điện tử (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 26.74, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.74, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.74 },
      { combinationId: 'C01', threshold30: 26.74 },
      { combinationId: 'C02', threshold30: 26.74 },
      { combinationId: 'X02', threshold30: 26.74 },
    ],
  },
  {
    code: 'co-khi-che-tao-may-hop-tac-voi-dh-griffith-uc',
    name: 'Cơ khí - Chế tạo máy - hợp tác với ĐH Griffith (Úc)',
    combinations: [
      { combinationId: 'A00', threshold30: 25, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25 },
      { combinationId: 'C01', threshold30: 25 },
      { combinationId: 'C02', threshold30: 25 },
      { combinationId: 'X02', threshold30: 25 },
    ],
  },
  {
    code: 'co-dien-tu-hop-tac-voi-dh-leibniz-hannover-duc',
    name: 'Cơ điện tử - hợp tác với ĐH Leibniz Hannover (Đức)',
    combinations: [
      { combinationId: 'A00', threshold30: 26.19, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.19, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.19 },
      { combinationId: 'C01', threshold30: 26.19 },
      { combinationId: 'C02', threshold30: 26.19 },
      { combinationId: 'X02', threshold30: 26.19 },
    ],
  },
  {
    code: 'co-dien-tu-hop-tac-voi-dh-cong-nghe-nagaoka-nhat-ban',
    name: 'Cơ điện tử - hợp tác với ĐH Công nghệ Nagaoka (Nhật Bản)',
    combinations: [
      { combinationId: 'A00', threshold30: 25.68, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.68, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.68 },
      { combinationId: 'C01', threshold30: 25.68 },
      { combinationId: 'C02', threshold30: 25.68 },
      { combinationId: 'X02', threshold30: 25.68 },
    ],
  },
  {
    code: 'ky-thuat-co-dien-tu',
    name: 'Kỹ thuật Cơ điện tử',
    combinations: [
      { combinationId: 'A00', threshold30: 27.9, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.9, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.9 },
      { combinationId: 'C01', threshold30: 27.9 },
      { combinationId: 'C02', threshold30: 27.9 },
      { combinationId: 'X02', threshold30: 27.9 },
    ],
  },
  {
    code: 'ky-thuat-co-khi',
    name: 'Kỹ thuật Cơ khí',
    combinations: [
      { combinationId: 'B03', threshold30: 26.62 },
      { combinationId: 'C01', threshold30: 26.62 },
      { combinationId: 'C02', threshold30: 26.62 },
      { combinationId: 'X02', threshold30: 26.62 },
      { combinationId: 'A00', threshold30: 26.62, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.62, mainSubject: 'math' },
    ],
  },
  {
    code: 'toan-tin',
    name: 'Toán - Tin',
    combinations: [
      { combinationId: 'A00', threshold30: 27.8, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.8, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.8 },
      { combinationId: 'C01', threshold30: 27.8 },
      { combinationId: 'C02', threshold30: 27.8 },
      { combinationId: 'X02', threshold30: 27.8 },
    ],
  },
  {
    code: 'he-thong-thong-tin-quan-ly',
    name: 'Hệ thống thông tin quản lý',
    combinations: [
      { combinationId: 'A00', threshold30: 27.72, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.72, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.72 },
      { combinationId: 'C01', threshold30: 27.72 },
      { combinationId: 'C02', threshold30: 27.72 },
      { combinationId: 'X02', threshold30: 27.72 },
    ],
  },
  {
    code: 'khoa-hoc-va-ky-thuat-vat-lieu-ct-tien-tien',
    name: 'Khoa học và kỹ thuật vật liệu (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 23.7, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 23.7, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 23.7, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 23.7 },
      { combinationId: 'C01', threshold30: 23.7 },
      { combinationId: 'C02', threshold30: 23.7 },
      { combinationId: 'X02', threshold30: 23.7 },
    ],
  },
  {
    code: 'ky-thuat-vat-lieu',
    name: 'Kỹ thuật Vật liệu',
    combinations: [
      { combinationId: 'A00', threshold30: 25.39, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.39, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 25.39, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.39 },
      { combinationId: 'C01', threshold30: 25.39 },
      { combinationId: 'C02', threshold30: 25.39 },
      { combinationId: 'X02', threshold30: 25.39 },
    ],
  },
  {
    code: 'ky-thuat-vi-dien-tu-va-cong-nghe-nano',
    name: 'Kỹ thuật Vi điện tử và Công nghệ nano',
    combinations: [
      { combinationId: 'A00', threshold30: 28.25, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 28.25, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 28.25, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 28.25 },
      { combinationId: 'C01', threshold30: 28.25 },
      { combinationId: 'C02', threshold30: 28.25 },
      { combinationId: 'X02', threshold30: 28.25 },
    ],
  },
  {
    code: 'cong-nghe-vat-lieu-polyme-va-compozit',
    name: 'Công nghệ vật liệu Polyme và Compozit',
    combinations: [
      { combinationId: 'A00', threshold30: 25.16, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.16, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 25.16, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.16 },
      { combinationId: 'C01', threshold30: 25.16 },
      { combinationId: 'C02', threshold30: 25.16 },
      { combinationId: 'X02', threshold30: 25.16 },
    ],
  },
  {
    code: 'ky-thuat-in',
    name: 'Kỹ thuật in',
    combinations: [
      { combinationId: 'A00', threshold30: 24.06, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 24.06, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 24.06, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 24.06 },
      { combinationId: 'C01', threshold30: 24.06 },
      { combinationId: 'C02', threshold30: 24.06 },
      { combinationId: 'X02', threshold30: 24.06 },
    ],
  },
  {
    code: 'vat-ly-ky-thuat',
    name: 'Vật lý kỹ thuật',
    combinations: [
      { combinationId: 'A00', threshold30: 26.41, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.41, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.41 },
      { combinationId: 'C01', threshold30: 26.41 },
      { combinationId: 'C02', threshold30: 26.41 },
      { combinationId: 'X02', threshold30: 26.41 },
    ],
  },
  {
    code: 'ky-thuat-hat-nhan',
    name: 'Kỹ thuật hạt nhân',
    combinations: [
      { combinationId: 'A00', threshold30: 25.07, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.07, mainSubject: 'math' },
      { combinationId: 'A02', threshold30: 25.07, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.07 },
      { combinationId: 'C01', threshold30: 25.07 },
      { combinationId: 'C02', threshold30: 25.07 },
      { combinationId: 'X02', threshold30: 25.07 },
    ],
  },
  {
    code: 'vat-ly-y-khoa',
    name: 'Vật lý Y khoa',
    combinations: [
      { combinationId: 'A00', threshold30: 25.2, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.2, mainSubject: 'math' },
      { combinationId: 'A02', threshold30: 25.2, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.2 },
      { combinationId: 'C01', threshold30: 25.2 },
      { combinationId: 'C02', threshold30: 25.2 },
      { combinationId: 'X02', threshold30: 25.2 },
    ],
  },
  {
    code: 'ky-thuat-o-to-ct-tien-tien',
    name: 'Kỹ thuật Ô tô (CT tiên tiến)',
    combinations: [
      { combinationId: 'A00', threshold30: 25.18, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.18, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.18 },
      { combinationId: 'C01', threshold30: 25.18 },
      { combinationId: 'C02', threshold30: 25.18 },
      { combinationId: 'X02', threshold30: 25.18 },
    ],
  },
  {
    code: 'co-khi-hang-khong-chuong-trinh-viet-phap-pfiev',
    name: 'Cơ khí hàng không (Chương trình Việt - Pháp PFIEV)',
    combinations: [
      { combinationId: 'A00', threshold30: 25.84, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 25.84, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 25.84 },
      { combinationId: 'C01', threshold30: 25.84 },
      { combinationId: 'C02', threshold30: 25.84 },
      { combinationId: 'X02', threshold30: 25.84 },
    ],
  },
  {
    code: 'ky-thuat-o-to',
    name: 'Kỹ thuật Ô tô',
    combinations: [
      { combinationId: 'A00', threshold30: 27.03, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 27.03, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 27.03 },
      { combinationId: 'C01', threshold30: 27.03 },
      { combinationId: 'C02', threshold30: 27.03 },
      { combinationId: 'X02', threshold30: 27.03 },
    ],
  },
  {
    code: 'ky-thuat-co-khi-dong-luc',
    name: 'Kỹ thuật Cơ khí động lực',
    combinations: [
      { combinationId: 'A00', threshold30: 26.25, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.25, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.25 },
      { combinationId: 'C01', threshold30: 26.25 },
      { combinationId: 'C02', threshold30: 26.25 },
      { combinationId: 'X02', threshold30: 26.25 },
    ],
  },
  {
    code: 'ky-thuat-hang-khong',
    name: 'Kỹ thuật Hàng không',
    combinations: [
      { combinationId: 'A00', threshold30: 26.6, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 26.6, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 26.6 },
      { combinationId: 'C01', threshold30: 26.6 },
      { combinationId: 'C02', threshold30: 26.6 },
      { combinationId: 'X02', threshold30: 26.6 },
    ],
  },
  {
    code: 'quan-tri-kinh-doanh-hop-tac-voi-dh-troy-hoa-ky',
    name: 'Quản trị kinh doanh - hợp tác với ĐH Troy (Hoa Kỳ)',
    combinations: [
      { combinationId: 'D01', threshold30: 19 },
      { combinationId: 'A00', threshold30: 19.5 },
      { combinationId: 'A01', threshold30: 19.5 },
      { combinationId: 'B03', threshold30: 19.5 },
      { combinationId: 'C01', threshold30: 19.5 },
      { combinationId: 'C02', threshold30: 19.5 },
      { combinationId: 'X02', threshold30: 19.5 },
    ],
  },
  {
    code: 'khoa-hoc-may-tinh-hop-tac-voi-dh-troy-hoa-ky',
    name: 'Khoa học máy tính - hợp tác với ĐH Troy (Hoa Kỳ)',
    combinations: [
      { combinationId: 'D01', threshold30: 21.3 },
      { combinationId: 'A00', threshold30: 21.8 },
      { combinationId: 'A01', threshold30: 21.8 },
      { combinationId: 'B03', threshold30: 21.8 },
      { combinationId: 'C01', threshold30: 21.8 },
      { combinationId: 'C02', threshold30: 21.8 },
      { combinationId: 'X02', threshold30: 21.8 },
    ],
  },
  {
    code: 'cong-nghe-det-may',
    name: 'Công nghệ Dệt - May',
    combinations: [
      { combinationId: 'A00', threshold30: 22.48, mainSubject: 'math' },
      { combinationId: 'A01', threshold30: 22.48, mainSubject: 'math' },
      { combinationId: 'D07', threshold30: 22.48, mainSubject: 'math' },
      { combinationId: 'B03', threshold30: 22.48 },
      { combinationId: 'C01', threshold30: 22.48 },
      { combinationId: 'C02', threshold30: 22.48 },
      { combinationId: 'X02', threshold30: 22.48 },
    ],
  },
] as const satisfies readonly HustFieldThreshold2025[];

export type HustFieldCode2025 = (typeof HUST_FIELD_THRESHOLDS_2025)[number]['code'];

export const HUST_FIELD_THRESHOLD_BY_CODE_2025: ReadonlyMap<string, HustFieldThreshold2025> = new Map(
  HUST_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
