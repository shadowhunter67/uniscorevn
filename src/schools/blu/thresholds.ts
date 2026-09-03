/**
 * BLU (Trường Đại học Bạc Liêu) 2026 — điểm chuẩn trúng tuyển 13/15 ngành đại học chính quy đợt 1
 * (loại trừ Giáo dục Mầm non — trình độ cao đẳng khác cấp + tổ hợp năng khiếu M00 không có SubjectId
 * tương ứng), nhánh xét kết quả thi TN THPT (mã phương thức 100/405), công bố 10/8/2026 theo Quyết
 * định số 426/QĐ-ĐHBL. Nguồn chính là ảnh chụp nguyên văn thông báo điểm chuẩn chính thức
 * (`sources.ts:blu-cutoff-2026`, đọc bằng vision), tổ hợp môn theo ngành lấy từ trang HTML chính
 * thức của trường (`sources.ts:blu-combination-2026`, đọc qua accessibility snapshot).
 */
export interface BluFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const BLU_FIELD_THRESHOLDS_2026: readonly BluFieldThreshold[] = [
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 23.13, combinationIds: ['B03', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 24.66, combinationIds: ['A00', 'A01', 'A02', 'B00', 'C01', 'C02', 'D01'] },
  { code: '7140212', name: 'Sư phạm Hóa học', threshold30: 23.6, combinationIds: ['A00', 'B00', 'C02', 'C08', 'D07'] },
  { code: '7140213', name: 'Sư phạm Sinh học', threshold30: 22.6, combinationIds: ['A02', 'B00', 'B03', 'B08', 'C08'] },
  { code: '7220101', name: 'Tiếng Việt và Văn hóa Việt Nam', threshold30: 15, combinationIds: ['B03', 'C00', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: ['D01', 'D11', 'D12', 'D13', 'D14', 'D15', 'X78', 'X79'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7340201', name: 'Tài chính – Ngân hàng', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X01'] },
  // Tổ hợp X04 (Toán, Ngữ văn, Công nghệ nông nghiệp) không có SubjectId tương ứng — loại khỏi
  // danh sách 4 ngành dùng chung nhóm tổ hợp này (còn 8/9 tổ hợp mỗi ngành), xem knowledgeGaps.ts.
  { code: '7440301', name: 'Khoa học môi trường', threshold30: 15, combinationIds: ['B00', 'B03', 'B08', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: ['A00', 'A01', 'B03', 'C01', 'C02', 'C03', 'C04', 'D01', 'X02'] },
  { code: '7620105', name: 'Chăn nuôi', threshold30: 15, combinationIds: ['B00', 'B03', 'B08', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7620112', name: 'Bảo vệ thực vật', threshold30: 15, combinationIds: ['B00', 'B03', 'B08', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7620301', name: 'Nuôi trồng thủy sản', threshold30: 15, combinationIds: ['B00', 'B03', 'B08', 'C01', 'C02', 'C03', 'C04', 'D01'] },
] as const;

export type BluFieldCode = (typeof BLU_FIELD_THRESHOLDS_2026)[number]['code'];

export const BLU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, BluFieldThreshold> = new Map(
  BLU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
