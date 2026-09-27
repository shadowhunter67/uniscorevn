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
  { code: '7720201', name: 'Duoc hoc', threshold30: 19, combinationIds: ['A00', 'A01', 'B00', 'C08', 'D01', 'D07', 'D08'], outOfScopeReason: 'Khoi suc khoe co nguong bao dam chat luong dau vao rieng; chua mo hinh hoa trong MDU exact.' },
  { code: '7380107', name: 'Luat kinh te', threshold30: 18, combinationIds: BUSINESS_SOCIAL, outOfScopeReason: 'Khoi phap luat co nguong/ dieu kien phoi hop Bo GD&DT - Bo Tu phap; chua mo hinh hoa trong MDU exact.' },
  { code: '7340301', name: 'Ke toan', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: 'ngon-ngu-trung', name: 'Ngon ngu Trung', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7310608', name: 'Dong phuong hoc (chuyen nganh Tieng Han)', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7320104', name: 'Truyen thong da phuong tien', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7340101', name: 'Quan tri kinh doanh', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: 'digital-marketing', name: 'Digital Marketing', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7340120', name: 'Kinh doanh quoc te', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7340122', name: 'Thuong mai dien tu', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7340201', name: 'Tai chinh - Ngan hang', threshold30: 15, combinationIds: FINANCE },
  { code: '7340205', name: 'Cong nghe tai chinh', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7220201', name: 'Ngon ngu Anh', threshold30: 15, combinationIds: BUSINESS_SOCIAL },
  { code: '7480201', name: 'Cong nghe thong tin', threshold30: 15, combinationIds: TECH },
  { code: '7510205', name: 'Cong nghe ky thuat o to', threshold30: 15, combinationIds: TECH },
  { code: '7510601', name: 'Quan ly cong nghiep', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7510605', name: 'Logistics va quan ly chuoi cung ung', threshold30: 15, combinationIds: BUSINESS_SOCIAL_NO_C19 },
  { code: '7640101', name: 'Thu y', threshold30: 15, combinationIds: HEALTH_VET },
  { code: '7210403', name: 'Thiet ke do hoa', threshold30: 15, combinationIds: TECH },
];

export const MDU_SUPPORTED_PROGRAM_THRESHOLDS_2026 = MDU_PROGRAM_THRESHOLDS_2026.filter(
  (program) => program.outOfScopeReason === undefined
);

export const MDU_PROGRAM_BY_CODE: Readonly<Record<string, MduProgramThreshold>> = Object.fromEntries(
  MDU_PROGRAM_THRESHOLDS_2026.map((program) => [program.code, program])
);
