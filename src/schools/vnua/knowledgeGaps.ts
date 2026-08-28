import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnua-ministry-governed-group-thresholds',
    label:
      'VNUA HVN13 and HVN19 use Ministry of Education and Training threshold rules that are not modeled yet.',
    status: 'incomplete',
    impact:
      'The runtime can evaluate numeric VNUA groups, but it cannot conclude eligibility for the ministry-governed Law and Technology Pedagogy groups.',
    sourceId: 'vnua-threshold-notice-2026',
  },
  {
    id: 'vnua-program-catalog-image-unparsed',
    label: 'VNUA 2026 program/group catalog images have only been partially normalized into runtime group thresholds.',
    status: 'incomplete',
    impact: 'Program-level scope and UI selection metadata still need structured import before exact per-program UX can be offered.',
    sourceId: 'vnua-admission-notice-2026',
  },
  {
    id: 'vnua-bonus-detail-not-modeled',
    label:
      'VNUA cong bo diem cong (giai thuong hoc sinh gioi quoc gia/quoc te, chung chi ngoai ngu IELTS/HSK/SAT/ACT...) toi da 3,0/30, ap dung cho phuong thuc 2 va 3, nhung khong in bang quy doi cu the tung loai minh chung sang diem so (chi neu nhom va muc tran tung nhom). Runtime chua co field ho so tuong ung (giai thuong) va khong the tinh chinh xac tung truong hop.',
    status: 'official-but-unparsed',
    sourceId: 'vnua-admission-notice-2026',
    scoreAffecting: true,
    implemented: false,
    knownData: ['Tong diem cong toi da 3,0/30', 'Giai thuong (HSG quoc gia/quoc te) toi da 3,0', 'Diem khen thuong/khuyen khich toi da 1,5', 'Chung chi ngoai ngu (IELTS/HSK/SAT/ACT) toi da 1,5'],
    impact: 'DXT tham khao (`vnua-thpt-exam-exact-2026`) chi cong tong diem tho + diem uu tien, KHONG cong diem cong — thi sinh co giai thuong/chung chi can tu cong them truoc khi so DXT thuc te.',
  },
];

