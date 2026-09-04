/**
 * VHS (Trường Đại học Văn hóa Thành phố Hồ Chí Minh, mã trường VHS) 2026 — điểm trúng tuyển đợt 1
 * (mã phương thức 100, xét kết quả thi TN THPT 2026, thang 30, KHÔNG hệ số, ĐÃ bao gồm điểm ưu tiên
 * đối tượng/khu vực) cho 14/16 ngành/chuyên ngành đại học chính quy dùng tổ hợp thi TN THPT thông
 * thường. Nguồn CHÍNH CHỦ: Thông báo 207/TB-ĐHVHHCM (10/8/2026, ký tên + đóng dấu Hiệu trưởng Lâm
 * Nhân, `sources.ts:vhs-threshold-2026`). Tổ hợp môn/mã ngành lấy từ Thông báo 34/TB-ĐHVHHCM
 * (04/02/2026, `sources.ts:vhs-admission-scheme-2026`).
 *
 * Loại trừ 2/16 dòng mã phương thức 100 trong Thông báo 207:
 * - 7229042C (Quản lý văn hóa — Tổ chức, dàn dựng chương trình văn hóa nghệ thuật) chỉ có mã phương
 *   thức 405/406 (kết hợp thi năng khiếu), KHÔNG có dòng mã 100 thuần — không mô hình hoá vì thiếu
 *   điểm năng khiếu trong ApplicantProfile.
 *
 * Mỗi ngành còn lại loại trừ tổ hợp D04 (Toán, Ngữ văn, Tiếng Trung — không có SubjectId Tiếng
 * Trung) và R01/R02/R03 (tổ hợp năng khiếu, chỉ áp dụng nhánh 405/406) khỏi danh sách tổ hợp hỗ trợ;
 * các tổ hợp còn lại của mỗi ngành vẫn tính được đầy đủ.
 */
export interface VhsFieldThreshold {
  /** Mã ngành xét tuyển đúng nguyên văn Thông báo 207/TB-ĐHVHHCM (một số ngành có hậu tố A/B/C/D
   * phân biệt chuyên ngành). */
  code: string;
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

/** 14 tổ hợp phổ biến (không có A06) — dùng cho Thông tin-Thư viện, Kinh doanh xuất bản phẩm, và cả
 * 3 chuyên ngành Văn hóa học. */
const COMMON_COMBOS_NO_A06 = ['A07', 'C00', 'C03', 'C04', 'D01', 'D10', 'D14', 'D15', 'X01', 'X17', 'X21', 'X22', 'X25', 'X78'] as const;
/** 15 tổ hợp (thêm A06) — dùng cho Di sản học (CN Di sản và phát triển du lịch) và Văn hóa các dân
 * tộc thiểu số Việt Nam (cả 2 chuyên ngành). */
const COMMON_COMBOS_WITH_A06 = ['A06', ...COMMON_COMBOS_NO_A06] as const;
/** 13 tổ hợp (không A06/A07) — dùng cho Du lịch và cả 2 chuyên ngành Quản trị dịch vụ du lịch và lữ
 * hành. */
const TOURISM_COMBOS = ['C00', 'C03', 'C04', 'D01', 'D10', 'D14', 'D15', 'X01', 'X17', 'X21', 'X22', 'X25', 'X78'] as const;
/** 14 tổ hợp riêng (có A08/A09/D09, không có X17/X21/X22) — dùng cho 2 chuyên ngành Quản lý văn hóa
 * còn mô hình hoá được (mã 100). */
const CULTURE_MGMT_COMBOS = ['A07', 'A08', 'A09', 'C00', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X01', 'X25', 'X78'] as const;
/** 9 tổ hợp hẹp — dùng riêng cho Di sản học (CN Di sản và bảo tàng). */
const HERITAGE_MUSEUM_COMBOS = ['D10', 'D14', 'D15', 'X01', 'X17', 'X21', 'X22', 'X25', 'X78'] as const;

export const VHS_FIELD_THRESHOLDS_2026: readonly VhsFieldThreshold[] = [
  { code: '7320201', name: 'Thông tin - Thư viện', threshold30: 21.6, combinationIds: COMMON_COMBOS_NO_A06 },
  { code: '7229047A', name: 'Di sản học (Chuyên ngành Di sản và phát triển du lịch)', threshold30: 22.1, combinationIds: COMMON_COMBOS_WITH_A06 },
  { code: '7229047B', name: 'Di sản học (Chuyên ngành Di sản và bảo tàng)', threshold30: 21.0, combinationIds: HERITAGE_MUSEUM_COMBOS },
  { code: '7810101', name: 'Du lịch', threshold30: 23.5, combinationIds: TOURISM_COMBOS },
  { code: '7810103A', name: 'Quản trị dịch vụ du lịch và lữ hành (Chuyên ngành Quản trị lữ hành)', threshold30: 23.5, combinationIds: TOURISM_COMBOS },
  { code: '7810103B', name: 'Quản trị dịch vụ du lịch và lữ hành (Chuyên ngành Hướng dẫn Du lịch)', threshold30: 23.5, combinationIds: TOURISM_COMBOS },
  { code: '7320402', name: 'Kinh doanh xuất bản phẩm', threshold30: 21.4, combinationIds: COMMON_COMBOS_NO_A06 },
  { code: '7229042A', name: 'Quản lý văn hóa (Chuyên ngành Quản lý hoạt động văn hóa xã hội)', threshold30: 23.3, combinationIds: CULTURE_MGMT_COMBOS },
  { code: '7229042D', name: 'Quản lý văn hóa (Chuyên ngành Tổ chức sự kiện văn hóa, thể thao, du lịch)', threshold30: 24.4, combinationIds: CULTURE_MGMT_COMBOS },
  { code: '7229040A', name: 'Văn hóa học (Chuyên ngành Văn hóa Việt Nam)', threshold30: 22.5, combinationIds: COMMON_COMBOS_NO_A06 },
  { code: '7229040B', name: 'Văn hóa học (Chuyên ngành Công nghiệp Văn hóa)', threshold30: 23.0, combinationIds: COMMON_COMBOS_NO_A06 },
  { code: '7229040C', name: 'Văn hóa học (Chuyên ngành Truyền thông Văn hóa)', threshold30: 23.6, combinationIds: COMMON_COMBOS_NO_A06 },
  { code: '7220112A', name: 'Văn hóa các dân tộc thiểu số Việt Nam (Chuyên ngành Tổ chức và quản lý văn hóa dân tộc)', threshold30: 21.3, combinationIds: COMMON_COMBOS_WITH_A06 },
  { code: '7220112B', name: 'Văn hóa các dân tộc thiểu số Việt Nam (Chuyên ngành Phát triển du lịch vùng dân tộc)', threshold30: 20.3, combinationIds: COMMON_COMBOS_WITH_A06 },
] as const;

export type VhsFieldCode = (typeof VHS_FIELD_THRESHOLDS_2026)[number]['code'];

export const VHS_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VhsFieldThreshold> = new Map(
  VHS_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
