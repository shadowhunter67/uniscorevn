/**
 * DNU (Trường Đại học Đồng Nai, mã trường DNU) 2025 — điểm trúng tuyển đại học chính quy, phương
 * thức xét kết quả thi TN THPT (mã phương thức 100). Nguồn `sources.ts:dnu-threshold-2025` (Quyết
 * định 1408/QĐ-HĐTS, 22/8/2025) công bố "Điểm trúng tuyển ngành" — MỘT mức điểm áp dụng chung cho
 * cả ngành, không tách theo tổ hợp/phương thức: mục 3 của `sources.ts:dnu-thongtin-2025` ghi rõ
 * "Độ chênh lệch điểm xét tuyển giữa các tổ hợp: = 0. Độ lệch điểm giữa phương thức tuyển sinh: =
 * 0". Tổ hợp xét tuyển theo phương thức 100 của từng ngành lấy từ `sources.ts:dnu-thongtin-2025`
 * (mục 4 Chỉ tiêu tuyển sinh + bảng "Danh sách mã xét tuyển theo đợt tuyển"). 2 ngành Giáo dục Mầm
 * non (cao đẳng + đại học) KHÔNG có phương thức 100 (chỉ xét Năng khiếu/học bạ) nên không đưa vào
 * bảng này (xem `knowledgeGaps.ts`).
 */
export interface DnuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30), nguồn `sources.ts:dnu-threshold-2025`. */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho phương thức 100 (xét kết quả thi TN THPT) của ngành này. */
  combinationIds: readonly string[];
  /**
   * Điều kiện phụ về điểm môn cụ thể trong tổ hợp (mục 5.a "Các điều kiện phụ sử dụng trong xét
   * tuyển", `sources.ts:dnu-thongtin-2025`) — không liên quan hộ khẩu/thường trú.
   */
  minSubjectScore?: { subject: 'english' | 'math'; min: number };
  /**
   * Ngành Sư phạm chỉ tuyển thí sinh có hộ khẩu/thường trú tại tỉnh Đồng Nai trước ngày tổ chức kỳ
   * thi THPT (trừ thí sinh khuyết tật xét tuyển thẳng) — mục 1.c `sources.ts:dnu-thongtin-2025`.
   * KHÔNG có input hồ sơ tương ứng trong `ApplicantProfile`, module này không chặn theo điều kiện
   * này (xem `knowledgeGaps.ts`).
   */
  requiresDongNaiResidency?: boolean;
}

const GROUP_TEACHER_1 = ['A00', 'A01', 'C03', 'C04', 'D01'] as const;
const GROUP_MATH_TEACHER = ['A00', 'A01', 'C01', 'D01', 'D07'] as const;
const GROUP_LITERATURE_TEACHER = ['C00', 'D01', 'D14', 'D15'] as const;
const GROUP_ENGLISH = ['A01', 'D01', 'D14', 'D15'] as const;
const GROUP_BUSINESS = ['A00', 'A01', 'D01', 'X01', 'X05'] as const;
const GROUP_TECH = ['A00', 'A01', 'D01', 'X05', 'X07'] as const;

export const DNU_FIELD_THRESHOLDS_2025: readonly DnuFieldThreshold[] = [
  {
    code: '7140202',
    name: 'Giáo dục Tiểu học',
    threshold30: 23.1,
    combinationIds: GROUP_TEACHER_1,
    requiresDongNaiResidency: true,
  },
  {
    code: '7140209',
    name: 'Sư phạm Toán học',
    threshold30: 25.41,
    combinationIds: GROUP_MATH_TEACHER,
    minSubjectScore: { subject: 'math', min: 5 },
    requiresDongNaiResidency: true,
  },
  {
    code: '7140217',
    name: 'Sư phạm Ngữ văn',
    threshold30: 26.51,
    combinationIds: GROUP_LITERATURE_TEACHER,
    requiresDongNaiResidency: true,
  },
  {
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    threshold30: 24.49,
    combinationIds: GROUP_ENGLISH,
    minSubjectScore: { subject: 'english', min: 7 },
    requiresDongNaiResidency: true,
  },
  {
    code: '7220201',
    name: 'Ngôn ngữ Anh',
    threshold30: 18.6,
    combinationIds: GROUP_ENGLISH,
    minSubjectScore: { subject: 'english', min: 7 },
  },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 16, combinationIds: GROUP_BUSINESS },
  { code: '7340301', name: 'Kế toán', threshold30: 16, combinationIds: GROUP_BUSINESS },
  { code: '7520103', name: 'Kỹ thuật cơ khí', threshold30: 18, combinationIds: GROUP_TECH },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', threshold30: 22, combinationIds: GROUP_TECH },
] as const;

export type DnuFieldCode = (typeof DNU_FIELD_THRESHOLDS_2025)[number]['code'];

export const DNU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, DnuFieldThreshold> = new Map(
  DNU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
