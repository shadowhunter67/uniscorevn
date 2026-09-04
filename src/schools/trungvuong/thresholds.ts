/**
 * TVUni (Trường Đại học Trưng Vương, mã trường DVP) 2025 — điểm trúng tuyển đại học chính quy,
 * Phương thức 2 (xét kết quả thi TN THPT 2025). Mã ngành + tổ hợp xét tuyển lấy từ Thông báo
 * 387/TB-ĐHTV (`sources.ts:trungvuong-thongbao-387-2025`, mục 1.2 + "Bảng mã tổ hợp các môn xét
 * tuyển"). Điểm trúng tuyển CHÍNH THỨC đợt 1 (22/8/2025) lấy từ 3 nguồn tổng hợp ĐỘC LẬP khớp tuyệt
 * đối (`sources.ts:trungvuong-diemchuan-2025-crosscheck`).
 *
 * Một số tổ hợp trong thông báo gốc dùng ngoại ngữ không có SubjectId tương ứng trong hệ thống
 * (Tiếng Trung — D04; Tiếng Hàn — DD2) hoặc mã tổ hợp không xác định được thành phần môn rõ ràng
 * (B01, D02 của Quản trị dịch vụ du lịch và lữ hành) — các tổ hợp này bị LOẠI khỏi `combinationIds`
 * dưới đây (unsupported > guessed), các tổ hợp còn lại của mỗi ngành vẫn tính được bình thường.
 */
export interface TrungVuongFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn Thông báo 387/TB-ĐHTV. */
  name: string;
  /** Điểm trúng tuyển chính thức đợt 1 năm 2025 (thang 30, đã bao gồm điểm ưu tiên). */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho Phương thức 2 của ngành này (đã loại tổ hợp không có SubjectId). */
  combinationIds: readonly string[];
}

const GROUP_LUAT_KT = ['A00', 'A01', 'D01', 'C00'] as const;
const GROUP_DU_LICH = ['A07', 'C00', 'D01', 'D14', 'A05'] as const;
const GROUP_CNTT = ['A00', 'A01', 'D01', 'D10'] as const;
const GROUP_O_TO = ['A00', 'A01', 'D01', 'D10', 'A10', 'A05', 'A06', 'C01', 'C02', 'C14'] as const;
const GROUP_LOGISTICS = ['A00', 'A01', 'A07', 'D01'] as const;
const GROUP_NGON_NGU_ANH = ['D01', 'D09', 'D10', 'C00', 'C19', 'C20'] as const;
const GROUP_NGON_NGU_TRUNG = ['D01', 'D09', 'D10', 'C00', 'C19', 'C20'] as const;
const GROUP_NGON_NGU_HAN = ['C00', 'D01', 'D09', 'D66', 'A01', 'A00'] as const;
const GROUP_TRUYEN_THONG = ['A00', 'C00', 'D01', 'D14'] as const;
const GROUP_DIEU_DUONG = ['A00', 'B00', 'A02', 'A01', 'B03', 'B04', 'B08', 'C02', 'C08', 'D07'] as const;
const GROUP_QTKD = ['A00', 'A01', 'A07', 'D01', 'C01', 'C03', 'C14', 'C20'] as const;
const GROUP_TMDT = ['A00', 'A01', 'A07', 'D01', 'C00'] as const;
const GROUP_TAI_CHINH = ['A00', 'A01', 'A07', 'D01'] as const;
const GROUP_KE_TOAN = ['A00', 'A01', 'A07', 'D01', 'C01', 'C03', 'C14', 'C20'] as const;
const GROUP_KTQT = ['A01', 'D01', 'C04', 'C14'] as const;
const GROUP_DUOC = ['B00', 'A00', 'D07', 'A02', 'B08', 'B03', 'C02'] as const;

export const TRUNGVUONG_FIELD_THRESHOLDS_2025: readonly TrungVuongFieldThreshold[] = [
  { code: '7380107', name: 'Luật kinh tế', threshold30: 15, combinationIds: GROUP_LUAT_KT },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 15.5, combinationIds: GROUP_DU_LICH },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 16, combinationIds: GROUP_CNTT },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', threshold30: 15.5, combinationIds: GROUP_O_TO },
  { code: '7510605', name: 'Logistics và quản lý chuỗi cung ứng', threshold30: 15, combinationIds: GROUP_LOGISTICS },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: GROUP_NGON_NGU_ANH },
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 16.5, combinationIds: GROUP_NGON_NGU_TRUNG },
  { code: '7220210', name: 'Ngôn ngữ Hàn Quốc', threshold30: 15, combinationIds: GROUP_NGON_NGU_HAN },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 15, combinationIds: GROUP_TRUYEN_THONG },
  { code: '7720301', name: 'Điều dưỡng', threshold30: 17.5, combinationIds: GROUP_DIEU_DUONG },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 16, combinationIds: GROUP_QTKD },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 15.5, combinationIds: GROUP_TMDT },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15.5, combinationIds: GROUP_TAI_CHINH },
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: GROUP_KE_TOAN },
  { code: '7310106', name: 'Kinh tế quốc tế', threshold30: 15, combinationIds: GROUP_KTQT },
  { code: '7720201', name: 'Dược học', threshold30: 19, combinationIds: GROUP_DUOC },
] as const;

export type TrungVuongFieldCode = (typeof TRUNGVUONG_FIELD_THRESHOLDS_2025)[number]['code'];

export const TRUNGVUONG_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TrungVuongFieldThreshold> = new Map(
  TRUNGVUONG_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
