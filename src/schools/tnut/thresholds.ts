/**
 * TNUT (Trường Đại học Kỹ thuật Công nghiệp - Đại học Thái Nguyên, mã trường DTK) 2025 — điểm
 * trúng tuyển đại học chính quy (đợt 1). Nguồn `sources.ts:tnut-threshold-2025` (Thông báo
 * 818/TB-ĐHKTCN, 22/8/2025) công bố "Điểm trúng tuyển (đã quy đổi)" MỘT mức áp dụng chung cho mỗi
 * mã xét tuyển (đã bao gồm điểm ưu tiên, và quy đổi tương đương giữa mọi tổ hợp/phương thức — xem
 * `sources.ts:tnut-huongdan-2025`). `code` dùng MÃ XÉT TUYỂN (không phải mã ngành 7 chữ số) vì đây
 * là khoá phân biệt chuyên ngành/chương trình mà trường tự dùng trong thông báo điểm chuẩn.
 */
export interface TnutFieldThreshold {
  code: string;
  /** Tên ngành/chuyên ngành đúng nguyên văn thông báo điểm chuẩn. */
  name: string;
  /** Điểm trúng tuyển 2025 (thang 30, đã quy đổi), nguồn `sources.ts:tnut-threshold-2025`. */
  threshold30: number;
  /** Tổ hợp xét tuyển công bố cho ngành này (mọi phương thức — điểm trúng tuyển tương đương giữa các tổ hợp/phương thức). */
  combinationIds: readonly string[];
}

const GROUP_DEFAULT = ['A00', 'A01', 'C01', 'C02', 'D01', 'D07'] as const;
const GROUP_CBM = ['A00', 'A01', 'C01'] as const;
const GROUP_INDUSTRIAL_ECON = ['A00', 'A01', 'D01', 'D07', 'X05', 'X25'] as const;
const GROUP_ENVIRONMENT = ['A00', 'B03', 'C01', 'C02', 'D01', 'D07'] as const;
const GROUP_ENGLISH = ['A01', 'D01', 'D07', 'D10', 'D14', 'D15'] as const;

export const TNUT_FIELD_THRESHOLDS_2025: readonly TnutFieldThreshold[] = [
  { code: 'CBM', name: 'Kỹ thuật điện tử - viễn thông (Chuyên ngành: Công nghệ điện tử, bán dẫn và vi mạch)', threshold30: 24.5, combinationIds: GROUP_CBM },
  { code: 'CDK', name: 'Công nghệ Kỹ thuật điều khiển và tự động hóa', threshold30: 22.75, combinationIds: GROUP_DEFAULT },
  { code: 'CDT', name: 'Công nghệ Kỹ thuật điện, điện tử', threshold30: 20.5, combinationIds: GROUP_DEFAULT },
  { code: 'CTC', name: 'Công nghệ Kỹ thuật cơ khí', threshold30: 20, combinationIds: GROUP_DEFAULT },
  { code: 'CTM', name: 'Công nghệ Chế tạo máy', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'CTO', name: 'Công nghệ Kỹ thuật ô tô', threshold30: 19.5, combinationIds: GROUP_DEFAULT },
  { code: 'CTO1', name: 'Công nghệ Kỹ thuật ô tô (Chuyên ngành: Công nghệ ô tô điện và ô tô lai)', threshold30: 18, combinationIds: GROUP_DEFAULT },
  { code: 'CTT', name: 'Kỹ thuật cơ khí - Chương trình tiên tiến (Chuyên ngành: Tự động hóa cơ khí)', threshold30: 18, combinationIds: GROUP_DEFAULT },
  { code: 'DTT', name: 'Kỹ thuật điện - Chương trình tiên tiến', threshold30: 17, combinationIds: GROUP_DEFAULT },
  { code: 'KCN', name: 'Kinh tế công nghiệp', threshold30: 16, combinationIds: GROUP_INDUSTRIAL_ECON },
  { code: 'KCT', name: 'Kỹ thuật cơ điện tử', threshold30: 22, combinationIds: GROUP_DEFAULT },
  { code: 'KDO1', name: 'Kỹ thuật cơ khí động lực (Chuyên ngành: Kỹ thuật ô tô điện và điều khiển thông minh)', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'KDO2', name: 'Kỹ thuật cơ khí động lực (Chuyên ngành: Kỹ thuật ô tô và giao thông thông minh)', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'KMT', name: 'Kỹ thuật máy tính', threshold30: 19.5, combinationIds: GROUP_DEFAULT },
  { code: 'KRB', name: 'Kỹ thuật robot (Chuyên ngành: Robot và trí tuệ nhân tạo)', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'KTC', name: 'Kỹ thuật cơ khí', threshold30: 20.25, combinationIds: GROUP_DEFAULT },
  { code: 'KTC1', name: 'Kỹ thuật cơ khí (Chuyên ngành: Tự động hóa thiết kế và chế tạo)', threshold30: 19, combinationIds: GROUP_DEFAULT },
  { code: 'KTD', name: 'Kỹ thuật điện', threshold30: 20.25, combinationIds: GROUP_DEFAULT },
  { code: 'KTM', name: 'Kỹ thuật môi trường', threshold30: 15, combinationIds: GROUP_ENVIRONMENT },
  { code: 'KVL', name: 'Kỹ thuật vật liệu', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'KVT', name: 'Kỹ thuật điện tử - viễn thông', threshold30: 19.25, combinationIds: GROUP_DEFAULT },
  { code: 'KXD', name: 'Kỹ thuật xây dựng', threshold30: 16, combinationIds: GROUP_DEFAULT },
  { code: 'NNA', name: 'Ngôn ngữ Anh', threshold30: 16, combinationIds: GROUP_ENGLISH },
  { code: 'QLC', name: 'Quản lý công nghiệp', threshold30: 19, combinationIds: GROUP_INDUSTRIAL_ECON },
  { code: 'QLC1', name: 'Quản lý công nghiệp (Chuyên ngành: Logistics)', threshold30: 17, combinationIds: GROUP_INDUSTRIAL_ECON },
  { code: 'TDH', name: 'Kỹ thuật điều khiển và tự động hoá', threshold30: 22.75, combinationIds: GROUP_DEFAULT },
] as const;

export type TnutFieldCode = (typeof TNUT_FIELD_THRESHOLDS_2025)[number]['code'];

export const TNUT_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, TnutFieldThreshold> = new Map(
  TNUT_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
