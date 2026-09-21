import type { HuitThresholdGroup } from './eligibility';

export interface HuitProgram {
  code: string;
  name: string;
  group: HuitThresholdGroup;
  /** 4 tổ hợp xét tuyển theo bảng "Ngành tuyển sinh đại học chính quy" (mục 1.3 Thông tin tuyển sinh 2026). */
  combinations: readonly string[];
}

const BUSINESS = ['D01', 'A01', 'C01', 'A00'] as const; // Kế toán, TC-NH, Marketing, Cơ khí, Điện...
const FOOD_SCIENCE = ['B00', 'B08', 'A00', 'D07'] as const;
const IT = ['D01', 'A00', 'C01', 'X26'] as const;
const HOSPITALITY = ['D01', 'C03', 'D15', 'C00'] as const;
const LAW = ['D01', 'C03', 'X01', 'C00'] as const;
const LANGUAGE = ['D01', 'A01', 'D09', 'D14'] as const;

const p = (code: string, name: string, combinations: readonly string[], group: HuitThresholdGroup = 'standard'): HuitProgram => ({ code, name, group, combinations });

// 39 ngành đại học chính quy. 5 chương trình liên kết quốc tế (LK7220204, LK7340101, BL7220204, CU7220204, CU7340120)
// có ngưỡng và điều kiện riêng nên không nằm trong phạm vi exact.
export const HUIT_PROGRAMS_2026: readonly HuitProgram[] = [
  p('7810103', 'Quản trị dịch vụ du lịch và lữ hành', HOSPITALITY),
  p('7810201', 'Quản trị khách sạn', HOSPITALITY),
  p('7810202', 'Quản trị nhà hàng và dịch vụ ăn uống', HOSPITALITY),
  p('7819009', 'Khoa học dinh dưỡng và ẩm thực', ['B00', 'A01', 'C02', 'D07']),
  p('7819010', 'Khoa học chế biến món ăn', ['B00', 'A01', 'C02', 'D07']),
  p('7810101', 'Du lịch', HOSPITALITY),
  p('7380101', 'Luật', LAW, 'law'),
  p('7380107', 'Luật kinh tế', LAW, 'law'),
  p('7220201', 'Ngôn ngữ Anh', LANGUAGE),
  p('7220204', 'Ngôn ngữ Trung Quốc', LANGUAGE),
  p('7480201', 'Công nghệ thông tin', IT),
  p('7480202', 'An toàn thông tin', IT),
  p('7460108', 'Khoa học dữ liệu', IT),
  p('7340301', 'Kế toán', BUSINESS),
  p('7340201', 'Tài chính ngân hàng', BUSINESS),
  p('7340205', 'Công nghệ tài chính', BUSINESS),
  p('7340115', 'Marketing', BUSINESS),
  p('7340122', 'Thương mại điện tử', BUSINESS),
  p('7510605', 'Logistics và quản lý chuỗi cung ứng', BUSINESS),
  p('7340101', 'Quản trị kinh doanh', BUSINESS),
  p('7340120', 'Kinh doanh quốc tế', BUSINESS),
  p('7540204', 'Công nghệ dệt, may', BUSINESS),
  p('7340123', 'Kinh doanh thời trang và dệt may', BUSINESS),
  p('7540101', 'Công nghệ thực phẩm', FOOD_SCIENCE),
  p('7540106', 'Đảm bảo chất lượng và an toàn thực phẩm', FOOD_SCIENCE),
  p('7340129', 'Quản trị kinh doanh thực phẩm', ['D01', 'B00', 'C02', 'D07']),
  p('7540105', 'Công nghệ chế biến thủy sản', FOOD_SCIENCE),
  p('7510202', 'Công nghệ chế tạo máy', BUSINESS),
  p('7510203', 'Công nghệ kỹ thuật cơ điện tử', BUSINESS),
  p('7520115', 'Kỹ thuật nhiệt', BUSINESS),
  p('7510301', 'Công nghệ kỹ thuật điện - điện tử', BUSINESS),
  p('7510303', 'Công nghệ kỹ thuật điều khiển và tự động hóa', BUSINESS),
  p('7510401', 'Công nghệ kỹ thuật hóa học', FOOD_SCIENCE),
  p('7510402', 'Công nghệ vật liệu', FOOD_SCIENCE),
  p('7420201', 'Công nghệ sinh học', FOOD_SCIENCE),
  p('7850101', 'Quản lý tài nguyên và môi trường', ['B00', 'A01', 'A00', 'D07']),
  p('7510406', 'Công nghệ kỹ thuật môi trường', ['B00', 'A01', 'A00', 'D07']),
  p('7480107', 'Trí tuệ nhân tạo', IT),
  p('7510601', 'Quản lý Công nghiệp', BUSINESS),
];

export function getHuitProgram(code: string | undefined): HuitProgram | undefined {
  return HUIT_PROGRAMS_2026.find((program) => program.code === code);
}

/** Điểm ưu tiên khu vực/đối tượng MỨC CHUẨN (chưa giảm) theo Điều 7 TT 06/2026 — CẬN TRÊN để loại chắc chắn.
 * Nguồn HUIT chỉ nói "mức điểm ưu tiên theo quy định của Bộ" và không nói rõ ưu tiên tính trước hay sau khi so
 * ngưỡng, nên vùng giữa (thô < sàn ≤ thô + ưu tiên) trả `unknown`, không đoán. */
export function lookupHuitMaxPriority30(region: string | undefined, category: string | undefined): number {
  const regionPoints: Record<string, number> = { KV1: 0.75, 'KV2-NT': 0.5, KV2: 0.25, KV3: 0 };
  const categoryPoints: Record<string, number> = { UT1: 2, UT2: 1 };
  return (region ? regionPoints[region] ?? 0 : 0) + (category ? categoryPoints[category] ?? 0 : 0);
}
