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
  { code: '7210402', name: 'Thiết kế công nghiệp', threshold30: 15, requirement: NON_TECH },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, requirement: NON_TECH },
  { code: '7340115', name: 'Marketing', threshold30: 15, requirement: NON_TECH },
  { code: '7340120', name: 'Kinh doanh quốc tế', threshold30: 15, requirement: NON_TECH },
  { code: '7340201', name: 'Tài chính - Ngân hàng', threshold30: 15, requirement: NON_TECH },
  { code: '7510605', name: 'Logistics và Quản lý chuỗi cung ứng', threshold30: 15, requirement: NON_TECH },
  { code: '7810101', name: 'Du lịch', threshold30: 15, requirement: NON_TECH },
  { code: '7380107', name: 'Luật kinh tế', threshold30: 20, requirement: NON_TECH },
  { code: '7480106', name: 'Kỹ thuật máy tính', threshold30: 15, requirement: TECH },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, requirement: TECH },
  { code: '7510201', name: 'Công nghệ kỹ thuật cơ khí', threshold30: 15, requirement: TECH },
  { code: '7510203', name: 'Công nghệ kỹ thuật cơ điện tử', threshold30: 15, requirement: TECH },
  { code: '7510301', name: 'Công nghệ kỹ thuật điện, điện tử', threshold30: 15, requirement: TECH },
  { code: '7510302', name: 'Công nghệ kỹ thuật điện tử - viễn thông', threshold30: 15, requirement: TECH },
  { code: '7540101', name: 'Công nghệ thực phẩm', threshold30: 15, requirement: TECH },
  { code: '7540106', name: 'Đảm bảo chất lượng và an toàn thực phẩm', threshold30: 15, requirement: TECH },
  { code: '7580201', name: 'Kỹ thuật xây dựng', threshold30: 15, requirement: TECH },
  { code: '7580302', name: 'Quản lý xây dựng', threshold30: 15, requirement: TECH },
  { code: '7580101', name: 'Kiến trúc', threshold30: 15, requirement: TECH },
  { code: '7580205', name: 'Kỹ thuật xây dựng công trình giao thông', threshold30: 15, requirement: TECH },
] as const;

export const STU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, StuFieldThreshold> = new Map(
  STU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);

export function subjectsMeetStuRequirement(subjects: readonly SubjectId[], requirement: StuSubjectRequirement): boolean {
  if (requirement === 'math') return subjects.includes('math');
  return subjects.includes('math') || subjects.includes('literature');
}
