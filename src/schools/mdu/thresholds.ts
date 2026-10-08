export interface MduProgramThreshold {
  code: string;
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
  outOfScopeReason?: string;
}

const BUSINESS_SOCIAL = ['A00', 'A01', 'C00', 'C01', 'C03', 'C14', 'C19', 'D01'] as const;
const BUSINESS_SOCIAL_NO_C19 = ['A00', 'A01', 'C00', 'C01', 'C03', 'C14', 'D01'] as const;
const TECH = ['A00', 'A01', 'C01', 'D01'] as const;
const HEALTH_VET = ['A00', 'B00', 'C08', 'D07'] as const;
const FINANCE = ['D01', 'D07', 'D08', 'A00', 'A01', 'C01', 'C03', 'C14', 'C19'] as const;

/** MDU/MIT 2026 - THPT exam admission thresholds from the 2026 cutoff table.
 * Exact scope excludes Pharmacy and Economic Law because those fields carry MOET / ministry
 * threshold or auxiliary-rule risk. */
export const MDU_PROGRAM_THRESHOLDS_2026: readonly MduProgramThreshold[] = [
  { code: '7720201', name: 'Dược học', threshold30: 19, combinationIds: ['A00', 'A01', 'B00', 'C08', 'D01', 'D07', 'D08'], outOfScopeReason: 'Khối sức khỏe có ngưỡng bảo đảm chất lượng đầu vào riêng; chưa mô hình hóa trong MDU exact.' },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 18, combinationIds: BUSINESS_SOCIAL, outOfScopeReason: 'Khối pháp luật có ngưỡng/điều kiện phối hợp Bộ GD&ĐT - Bộ Tư pháp; chưa mô hình hóa trong MDU exact.' },
  { code: '7340301', name: 'Kế toán', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: 'ngon-ngu-trung', name: 'Ngôn ngữ Trung', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7310608', name: 'Đông phương học (chuyên ngành Tiếng Hàn)', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: 'digital-marketing', name: 'Digital Marketing', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7340120', name: 'Kinh doanh quốc tế', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7340122', name: 'Thương mại điện tử', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15, combinationIds: FINANCE },
  { code: '7340205', name: 'Công nghệ tài chính', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: TECH },
  { code: '7510205', name: 'Công nghệ kỹ thuật ô tô', threshold30: 15, combinationIds: TECH },
  { code: '7510601', name: 'Quản lý công nghiệp', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7510605', name: 'Logistics và quản lý chuỗi cung ứng', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7640101', name: 'Thú y', threshold30: 15, combinationIds: HEALTH_VET },
  { code: '7210403', name: 'Thiết kế đồ họa', threshold30: 15, combinationIds: TECH },
];

export const MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026 = MDU_PROGRAM_THRESHOLDS_2026.filter(
  (program) => program.outOfScopeReason === undefined
);

export const MDU_PROGRAM_BY_CODE: Readonly<Record<string, MduProgramThreshold>> = Object.fromEntries(
  MDU_PROGRAM_THRESHOLDS_2026.map((program) => [program.code, program])
);
