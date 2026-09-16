/**
 * PYU (Trường Đại học Phú Yên, mã trường DPY) 2026 — điểm chuẩn trúng tuyển 10/11 ngành đại học
 * chính quy, nhánh xét kết quả thi TN THPT 2026, đọc trực tiếp từ ảnh "Thông báo điểm trúng tuyển
 * Đại học hệ chính quy năm 2026 (đợt 1)" (`sources.ts:pyu-cutoff-2026`, Quyết định số 497/QĐ-ĐHPY,
 * 10/8/2026) — đọc bằng vision (chrome-devtools screenshot), cross-check với danh sách trúng tuyển
 * từng thí sinh (13 trang, cùng Quyết định) chỉ để đối chiếu XU HƯỚNG giảm dần của điểm trúng tuyển
 * thấp nhất mỗi ngành, KHÔNG trích xuất bất kỳ dữ liệu cá nhân thí sinh nào (tên/ngày sinh/nơi
 * thường trú) vào runtime.
 *
 * Bỏ qua Giáo dục Mầm non (7140201) — tổ hợp công bố M03/M09 (thi năng khiếu) không có SubjectId
 * tương ứng trong hệ thống, xem `knowledgeGaps.ts`.
 */
export interface PyuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm trúng tuyển. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const PYU_FIELD_THRESHOLDS_2026: readonly PyuFieldThreshold[] = [
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 21.25, combinationIds: ['C03', 'C04', 'D01', 'X02'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 24.49, combinationIds: ['A00', 'A01', 'A04', 'X06'] },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 23.85, combinationIds: ['C00', 'C03', 'D14', 'X70'] },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 24.4, combinationIds: ['D01', 'D14', 'D15', 'X78'] },
  // X10 công bố (Toán, Vật lý/Tin học?) loại — không khớp SubjectId đáng tin cậy, xem knowledgeGaps.ts.
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 23.33, combinationIds: ['A00', 'B00', 'D07'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15.85, combinationIds: ['D01', 'D14', 'D15', 'X78'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15.0, combinationIds: ['A00', 'A01', 'D09', 'X26'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15.0, combinationIds: ['A00', 'A01', 'X06', 'X26'] },
  // B02 công bố (Toán, Sinh, Địa lý?) loại — không có SubjectId combo tương ứng, xem knowledgeGaps.ts.
  { code: '7620101', name: 'Nông nghiệp', threshold30: 15.8, combinationIds: ['B00', 'B03', 'D08'] },
  { code: '7810101', name: 'Du lịch', threshold30: 16.35, combinationIds: ['C00', 'C03', 'D14', 'X70'] },
] as const;

export type PyuFieldCode = (typeof PYU_FIELD_THRESHOLDS_2026)[number]['code'];

export const PYU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, PyuFieldThreshold> = new Map(
  PYU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
