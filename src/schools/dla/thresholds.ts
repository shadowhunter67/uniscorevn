/**
 * DLA (Trường Đại học Kinh tế Công nghiệp Long An, mã trường DLA) 2026 — điểm chuẩn trúng tuyển 9/9
 * ngành đại học chính quy, nhánh xét kết quả thi TN THPT 2026, công bố qua ảnh CHÍNH CHỦ "CÔNG BỐ
 * ĐIỂM CHUẨN TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY 2026" đính kèm bài "DLA chính thức công bố điểm chuẩn đại
 * học năm 2026" (`sources.ts:dla-cutoff-2026`, đọc bằng vision qua chrome-devtools). Tổ hợp môn theo
 * ngành lấy từ ảnh CHÍNH CHỦ "NGÀNH / MÃ NGÀNH / TỔ HỢP MÔN" đính kèm bài "công bố các phương thức
 * tuyển sinh năm 2026" (`sources.ts:dla-combination-2026`).
 */
export interface DlaFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

// Nhóm A (7 ngành): Ngữ văn/Toán/Tiếng Anh (D01), Ngữ văn/Toán/Lịch sử (C03), Ngữ văn/Toán/Địa lí
// (C04), Toán/Ngữ văn/Vật lí (C01), Toán/Ngữ văn/Tin học (X02), Toán/Ngữ văn/GDKT&PL (C14).
const GROUP_A_COMBINATIONS = ['D01', 'C03', 'C04', 'C01', 'X02', 'C14'] as const;
// Nhóm B (2 ngành, Ngôn ngữ Anh + Du lịch): Ngữ văn/Toán/Tiếng Anh (D01), Toán/Lịch sử/Tiếng Anh
// (D09), Toán/Ngữ văn/GDKT&PL (C14), Ngữ văn/Lịch sử/Tiếng Anh (D14), Ngữ văn/Địa lí/Tiếng Anh (D15),
// Ngữ văn/Lịch sử/Địa lí (C00).
const GROUP_B_COMBINATIONS = ['D01', 'D09', 'C14', 'D14', 'D15', 'C00'] as const;

export const DLA_FIELD_THRESHOLDS_2026: readonly DlaFieldThreshold[] = [
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7340115', name: 'Marketing', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  // Luật Kinh tế (*): thông báo có điều kiện phụ riêng CHỈ áp dụng cho nhánh xét học bạ/ĐGNL ("thí
  // sinh phải có KQHT lớp 12 đạt loại Tốt trở lên và điểm thi THPT (3 môn) tối thiểu 18 điểm HOẶC
  // điểm xét tốt nghiệp tối thiểu 8,5") — KHÔNG áp dụng cho nhánh thi TN THPT mà module này mô hình
  // hoá, threshold 20,0 là điểm chuẩn CHÍNH THỨC của cột "Điểm THPT".
  { code: '7380107', name: 'Luật Kinh tế', threshold30: 20, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7510103', name: 'Công nghệ Kỹ thuật Xây dựng', threshold30: 15, combinationIds: GROUP_A_COMBINATIONS },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: GROUP_B_COMBINATIONS },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 15, combinationIds: GROUP_B_COMBINATIONS },
] as const;

export type DlaFieldCode = (typeof DLA_FIELD_THRESHOLDS_2026)[number]['code'];

export const DLA_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DlaFieldThreshold> = new Map(
  DLA_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
