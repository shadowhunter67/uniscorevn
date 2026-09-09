import type { SubjectId } from '../../core/subjects';

/**
 * UNETI (Trường Đại học Kinh tế - Kỹ thuật Công nghiệp, mã trường DKK, Hà Nội + cơ sở Ninh Bình —
 * trực thuộc Bộ Công Thương) 2026, Phương thức 2 (xét kết quả kỳ thi tốt nghiệp THPT năm 2026).
 *
 * ĐẶC THÙ: UNETI KHÔNG dùng tổng thô 3 môn. Công thức có HỆ SỐ THEO VỊ TRÍ MÔN trong tổ hợp
 * (`sources.ts:uneti-thongtin-tuyensinh-2026`, mục II.2.2.2):
 *
 *     ĐPT2 = (M1 × 4,5 + M2 × 3,5 + M3 × 2) × 3/10        (thang 30, tối đa 10×10 = 30)
 *     ĐXT  = (ĐPT2 + KK) + UT, trần 30
 *
 * Vì hệ số gắn với VỊ TRÍ, thứ tự 3 môn trong mỗi mã tổ hợp là DỮ LIỆU BẮT BUỘC và KHÁC NHAU giữa
 * các nhóm (vd. D01 = Tiếng Anh/Toán/Ngữ văn ở nhóm 1, Toán/Tiếng Anh/Ngữ văn ở nhóm 2, Ngữ
 * văn/Tiếng Anh/Toán ở nhóm 4). Danh mục tổ hợp dùng chung `core/subjects.ts` KHÔNG mang được
 * thông tin này, nên module tự khai bảng tổ hợp CÓ THỨ TỰ dưới đây, lấy nguyên văn từ
 * `window.groups` trong mã nguồn công cụ tính điểm chính chủ dkxt.uneti.edu.vn/tinh-diem
 * (`sources.ts:uneti-tohop-dkxt-2026`).
 *
 * Điểm trúng tuyển: `sources.ts:uneti-diemtrungtuyen-826-2026` (Thông báo 826/TB-ĐHKTKTCN,
 * 09/8/2026), cột "KQ thi TN THPT", riêng theo từng mã xét tuyển và từng cơ sở.
 */
export type UnetiGroupId = 'group1' | 'group2' | 'group3' | 'group4';

export interface UnetiCombination {
  /** Mã tổ hợp do trường công bố. Có thể trùng mã giữa 2 nhóm nhưng KHÁC thứ tự môn. */
  id: string;
  /** [Môn 1 (hệ số 4,5), Môn 2 (hệ số 3,5), Môn 3 (hệ số 2)] — thứ tự nguyên văn nguồn. */
  subjects: readonly [SubjectId, SubjectId, SubjectId];
}

export const UNETI_COMBINATION_GROUPS: Record<UnetiGroupId, readonly UnetiCombination[]> = {
  // Nhóm 1 — ngành Ngôn ngữ Anh (Môn 1 luôn là Tiếng Anh).
  group1: [
    { id: 'A01', subjects: ['english', 'math', 'physics'] },
    { id: 'D01', subjects: ['english', 'math', 'literature'] },
    { id: 'D07', subjects: ['english', 'math', 'chemistry'] },
    { id: 'D09', subjects: ['english', 'math', 'history'] },
    { id: 'D10', subjects: ['english', 'math', 'geography'] },
    { id: 'D11', subjects: ['english', 'literature', 'physics'] },
    { id: 'D14', subjects: ['english', 'literature', 'history'] },
    { id: 'D15', subjects: ['english', 'literature', 'geography'] },
    { id: 'X78', subjects: ['english', 'literature', 'civic-economic-law'] },
    { id: 'X25', subjects: ['english', 'math', 'civic-economic-law'] },
    { id: 'X27', subjects: ['english', 'math', 'technology'] },
    { id: 'X26', subjects: ['english', 'math', 'informatics'] },
  ],
  // Nhóm 2 — khối kinh tế/quản trị (Môn 1 luôn là Toán).
  group2: [
    { id: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    { id: 'A01', subjects: ['math', 'physics', 'english'] },
    { id: 'A03', subjects: ['math', 'physics', 'history'] },
    { id: 'A04', subjects: ['math', 'physics', 'geography'] },
    { id: 'X07', subjects: ['math', 'physics', 'technology'] },
    { id: 'X06', subjects: ['math', 'physics', 'informatics'] },
    { id: 'X05', subjects: ['math', 'physics', 'civic-economic-law'] },
    { id: 'C01', subjects: ['math', 'physics', 'literature'] },
    { id: 'C04', subjects: ['math', 'literature', 'geography'] },
    { id: 'C03', subjects: ['math', 'literature', 'history'] },
    { id: 'X01', subjects: ['math', 'literature', 'civic-economic-law'] },
    { id: 'X02', subjects: ['math', 'literature', 'informatics'] },
    { id: 'X03', subjects: ['math', 'literature', 'technology'] },
    { id: 'D01', subjects: ['math', 'english', 'literature'] },
    { id: 'D07', subjects: ['math', 'english', 'chemistry'] },
    { id: 'D10', subjects: ['math', 'english', 'geography'] },
    { id: 'D09', subjects: ['math', 'english', 'history'] },
    { id: 'X25', subjects: ['math', 'english', 'civic-economic-law'] },
    { id: 'X27', subjects: ['math', 'english', 'technology'] },
    { id: 'X26', subjects: ['math', 'english', 'informatics'] },
  ],
  // Nhóm 3 — khối kỹ thuật/công nghệ/thực phẩm/dệt may/sư phạm công nghệ (Môn 1 luôn là Toán).
  group3: [
    { id: 'A00', subjects: ['math', 'physics', 'chemistry'] },
    { id: 'A01', subjects: ['math', 'physics', 'english'] },
    { id: 'A03', subjects: ['math', 'physics', 'history'] },
    { id: 'X07', subjects: ['math', 'physics', 'technology'] },
    { id: 'X06', subjects: ['math', 'physics', 'informatics'] },
    { id: 'X05', subjects: ['math', 'physics', 'civic-economic-law'] },
    { id: 'C01', subjects: ['math', 'physics', 'literature'] },
    { id: 'A02', subjects: ['math', 'physics', 'biology'] },
    { id: 'B00', subjects: ['math', 'chemistry', 'biology'] },
    { id: 'X11', subjects: ['math', 'chemistry', 'technology'] },
    { id: 'X10', subjects: ['math', 'chemistry', 'informatics'] },
    { id: 'D07', subjects: ['math', 'chemistry', 'english'] },
    { id: 'C02', subjects: ['math', 'chemistry', 'literature'] },
    { id: 'D01', subjects: ['math', 'english', 'literature'] },
    { id: 'X27', subjects: ['math', 'technology', 'english'] },
    { id: 'X15', subjects: ['math', 'technology', 'biology'] },
    { id: 'X03', subjects: ['math', 'technology', 'literature'] },
    { id: 'X26', subjects: ['math', 'informatics', 'english'] },
    { id: 'X56', subjects: ['math', 'informatics', 'technology'] },
    { id: 'X14', subjects: ['math', 'informatics', 'biology'] },
    { id: 'X02', subjects: ['math', 'informatics', 'literature'] },
  ],
  // Nhóm 4 — du lịch/khách sạn (Môn 1 luôn là Ngữ văn).
  group4: [
    { id: 'C00', subjects: ['literature', 'history', 'geography'] },
    { id: 'X70', subjects: ['literature', 'history', 'civic-economic-law'] },
    { id: 'D14', subjects: ['literature', 'history', 'english'] },
    { id: 'C03', subjects: ['literature', 'history', 'math'] },
    { id: 'C07', subjects: ['literature', 'history', 'physics'] },
    { id: 'C04', subjects: ['literature', 'geography', 'math'] },
    { id: 'X74', subjects: ['literature', 'geography', 'civic-economic-law'] },
    { id: 'D15', subjects: ['literature', 'geography', 'english'] },
    { id: 'C09', subjects: ['literature', 'geography', 'physics'] },
    { id: 'C01', subjects: ['literature', 'math', 'physics'] },
    { id: 'X01', subjects: ['literature', 'math', 'civic-economic-law'] },
    { id: 'D01', subjects: ['literature', 'english', 'math'] },
    { id: 'D11', subjects: ['literature', 'english', 'physics'] },
    { id: 'X78', subjects: ['literature', 'english', 'civic-economic-law'] },
    { id: 'X79', subjects: ['literature', 'english', 'informatics'] },
    { id: 'X80', subjects: ['literature', 'english', 'technology'] },
  ],
};

export type UnetiCampus = 'hanoi' | 'ninhbinh';

export interface UnetiProgram {
  /** Mã xét tuyển nguyên văn Thông báo 826/TB-ĐHKTKTCN (hậu tố DKK = Hà Nội, DKD = Ninh Bình). */
  code: string;
  name: string;
  campus: UnetiCampus;
  group: UnetiGroupId;
  /** Điểm trúng tuyển 2026 cột "KQ thi TN THPT", thang 30. */
  threshold30: number;
}

export const UNETI_PROGRAMS: readonly UnetiProgram[] = [
  // ----- Cơ sở Hà Nội (27 mã xét tuyển) -----
  { code: '140246DKK', name: 'Sư phạm Công nghệ', campus: 'hanoi', group: 'group3', threshold30: 20.5 },
  { code: '220201DKK', name: 'Ngôn ngữ Anh', campus: 'hanoi', group: 'group1', threshold30: 21.5 },
  { code: '310110DKK', name: 'Quản lý kinh tế', campus: 'hanoi', group: 'group2', threshold30: 22.0 },
  { code: '340101DKK', name: 'Quản trị kinh doanh', campus: 'hanoi', group: 'group2', threshold30: 22.5 },
  { code: '340115DKK', name: 'Marketing', campus: 'hanoi', group: 'group2', threshold30: 23.0 },
  { code: '340121DKK', name: 'Kinh doanh thương mại', campus: 'hanoi', group: 'group2', threshold30: 22.5 },
  { code: '340201DKK', name: 'Tài chính - Ngân hàng', campus: 'hanoi', group: 'group2', threshold30: 22.5 },
  { code: '340204DKK', name: 'Bảo hiểm', campus: 'hanoi', group: 'group2', threshold30: 21.0 },
  { code: '340301DKK', name: 'Kế toán', campus: 'hanoi', group: 'group2', threshold30: 22.8 },
  { code: '340302DKK', name: 'Kiểm toán', campus: 'hanoi', group: 'group2', threshold30: 22.5 },
  { code: '460108DKK', name: 'Khoa học dữ liệu', campus: 'hanoi', group: 'group3', threshold30: 21.0 },
  { code: '480102DKK', name: 'Mạng máy tính và truyền thông dữ liệu', campus: 'hanoi', group: 'group3', threshold30: 21.0 },
  { code: '480108DKK', name: 'Công nghệ kỹ thuật máy tính', campus: 'hanoi', group: 'group3', threshold30: 21.2 },
  { code: '480201DKK', name: 'Công nghệ thông tin', campus: 'hanoi', group: 'group3', threshold30: 22.0 },
  { code: '510201DKK', name: 'Công nghệ kỹ thuật cơ khí', campus: 'hanoi', group: 'group3', threshold30: 23.0 },
  { code: '510203DKK', name: 'Công nghệ kỹ thuật cơ điện tử', campus: 'hanoi', group: 'group3', threshold30: 23.8 },
  { code: '510205DKK', name: 'Công nghệ kỹ thuật ô tô', campus: 'hanoi', group: 'group3', threshold30: 22.5 },
  { code: '510301DKK', name: 'Công nghệ kỹ thuật điện, điện tử', campus: 'hanoi', group: 'group3', threshold30: 23.5 },
  { code: '510302DKK', name: 'Công nghệ kỹ thuật điện tử - viễn thông', campus: 'hanoi', group: 'group3', threshold30: 22.5 },
  { code: '510303DKK', name: 'Công nghệ kỹ thuật điều khiển và tự động hóa', campus: 'hanoi', group: 'group3', threshold30: 24.5 },
  { code: '510605DKK', name: 'Logistics và Quản lý chuỗi cung ứng', campus: 'hanoi', group: 'group2', threshold30: 24.5 },
  { code: '540101DKK', name: 'Công nghệ thực phẩm', campus: 'hanoi', group: 'group3', threshold30: 21.0 },
  { code: '540106DKK', name: 'Đảm bảo chất lượng và an toàn thực phẩm', campus: 'hanoi', group: 'group3', threshold30: 20.0 },
  { code: '540203DKK', name: 'Công nghệ vật liệu dệt, may', campus: 'hanoi', group: 'group3', threshold30: 20.0 },
  { code: '540204DKK', name: 'Công nghệ dệt, may', campus: 'hanoi', group: 'group3', threshold30: 21.0 },
  { code: '810103DKK', name: 'Quản trị dịch vụ du lịch và lữ hành', campus: 'hanoi', group: 'group4', threshold30: 22.8 },
  { code: '810201DKK', name: 'Quản trị khách sạn', campus: 'hanoi', group: 'group4', threshold30: 22.2 },

  // ----- Cơ sở Ninh Bình (22 mã xét tuyển) -----
  { code: '220201DKD', name: 'Ngôn ngữ Anh', campus: 'ninhbinh', group: 'group1', threshold30: 19.5 },
  { code: '340101DKD', name: 'Quản trị kinh doanh', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '340115DKD', name: 'Marketing', campus: 'ninhbinh', group: 'group2', threshold30: 19.5 },
  { code: '340121DKD', name: 'Kinh doanh thương mại', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '340201DKD', name: 'Tài chính - Ngân hàng', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '340204DKD', name: 'Bảo hiểm', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '340301DKD', name: 'Kế toán', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '340302DKD', name: 'Kiểm toán', campus: 'ninhbinh', group: 'group2', threshold30: 19.0 },
  { code: '480102DKD', name: 'Mạng máy tính và truyền thông dữ liệu', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '480108DKD', name: 'Công nghệ kỹ thuật máy tính', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '480201DKD', name: 'Công nghệ thông tin', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '510201DKD', name: 'Công nghệ kỹ thuật cơ khí', campus: 'ninhbinh', group: 'group3', threshold30: 20.2 },
  { code: '510203DKD', name: 'Công nghệ kỹ thuật cơ điện tử', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '510205DKD', name: 'Công nghệ kỹ thuật ô tô', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '510301DKD', name: 'Công nghệ kỹ thuật điện, điện tử', campus: 'ninhbinh', group: 'group3', threshold30: 20.2 },
  { code: '510302DKD', name: 'Công nghệ kỹ thuật điện tử - viễn thông', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '510303DKD', name: 'Công nghệ kỹ thuật điều khiển và tự động hóa', campus: 'ninhbinh', group: 'group3', threshold30: 21.0 },
  { code: '510605DKD', name: 'Logistics và Quản lý chuỗi cung ứng', campus: 'ninhbinh', group: 'group2', threshold30: 21.0 },
  { code: '540101DKD', name: 'Công nghệ thực phẩm', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '540204DKD', name: 'Công nghệ dệt, may', campus: 'ninhbinh', group: 'group3', threshold30: 19.0 },
  { code: '810103DKD', name: 'Quản trị dịch vụ du lịch và lữ hành', campus: 'ninhbinh', group: 'group4', threshold30: 19.5 },
  { code: '810201DKD', name: 'Quản trị khách sạn', campus: 'ninhbinh', group: 'group4', threshold30: 19.0 },
] as const;

export const UNETI_PROGRAM_BY_CODE: ReadonlyMap<string, UnetiProgram> = new Map(UNETI_PROGRAMS.map((program) => [program.code, program]));

/**
 * Điều kiện riêng ngành Ngôn ngữ Anh (Thông tin tuyển sinh 2026, mục II.2.2.1): "Đối với ngành
 * Ngôn ngữ Anh, điểm môn tiếng Anh trong tổ hợp xét tuyển tối thiểu đạt từ 6,00 điểm trở lên".
 */
export const UNETI_ENGLISH_MAJOR_CODES: readonly string[] = ['220201DKK', '220201DKD'];
export const UNETI_ENGLISH_MAJOR_MIN_ENGLISH = 6;

/** Nguồn tuyển (Thông tin tuyển sinh 2026, mục II.1.c): tổng 3 môn theo tổ hợp >= 15,00/30. */
export const UNETI_MINIMUM_RAW_TOTAL_30 = 15;
