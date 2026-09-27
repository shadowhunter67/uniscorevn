import type { SubjectId } from '../../core/subjects';

export type StuSubjectRequirement = 'math' | 'math-or-literature';

export interface StuFieldThreshold {
  code: string;
  name: string;
  threshold30: number;
  requirement: StuSubjectRequirement;
}

const TECH = 'math' as const;
const NON_TECH = 'math-or-literature' as const;

export const STU_FIELD_THRESHOLDS_2026: readonly StuFieldThreshold[] = [
  { code: '7210402', name: 'Thiet ke cong nghiep', threshold30: 15, requirement: NON_TECH },
  { code: '7340101', name: 'Quan tri kinh doanh', threshold30: 15, requirement: NON_TECH },
  { code: '7340115', name: 'Marketing', threshold30: 15, requirement: NON_TECH },
  { code: '7340120', name: 'Kinh doanh quoc te', threshold30: 15, requirement: NON_TECH },
  { code: '7340201', name: 'Tai chinh - Ngan hang', threshold30: 15, requirement: NON_TECH },
  { code: '7510605', name: 'Logistics va Quan ly chuoi cung ung', threshold30: 15, requirement: NON_TECH },
  { code: '7810101', name: 'Du lich', threshold30: 15, requirement: NON_TECH },
  { code: '7380107', name: 'Luat kinh te', threshold30: 20, requirement: NON_TECH },
  { code: '7480106', name: 'Ky thuat may tinh', threshold30: 15, requirement: TECH },
  { code: '7480201', name: 'Cong nghe thong tin', threshold30: 15, requirement: TECH },
  { code: '7510201', name: 'Cong nghe ky thuat co khi', threshold30: 15, requirement: TECH },
  { code: '7510203', name: 'Cong nghe ky thuat co dien tu', threshold30: 15, requirement: TECH },
  { code: '7510301', name: 'Cong nghe ky thuat dien, dien tu', threshold30: 15, requirement: TECH },
  { code: '7510302', name: 'Cong nghe ky thuat dien tu - vien thong', threshold30: 15, requirement: TECH },
  { code: '7540101', name: 'Cong nghe thuc pham', threshold30: 15, requirement: TECH },
  { code: '7540106', name: 'Dam bao chat luong va an toan thuc pham', threshold30: 15, requirement: TECH },
  { code: '7580201', name: 'Ky thuat xay dung', threshold30: 15, requirement: TECH },
  { code: '7580302', name: 'Quan ly xay dung', threshold30: 15, requirement: TECH },
  { code: '7580101', name: 'Kien truc', threshold30: 15, requirement: TECH },
  { code: '7580205', name: 'Ky thuat xay dung cong trinh giao thong', threshold30: 15, requirement: TECH },
] as const;

export const STU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, StuFieldThreshold> = new Map(
  STU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);

export function subjectsMeetStuRequirement(subjects: readonly SubjectId[], requirement: StuSubjectRequirement): boolean {
  if (requirement === 'math') return subjects.includes('math');
  return subjects.includes('math') || subjects.includes('literature');
}
