import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnua-ministry-governed-group-thresholds',
    label:
      'VNUA HVN13 and HVN19 use Ministry of Education and Training threshold rules that are not modeled yet.',
    status: 'incomplete',
    impact:
      'The runtime cần evaluậte numeric VNUA groups, but it cannot conclude eligibility for the ministry-governed Law and Technology Pedagogy groups.',
    sourceId: 'vnua-threshold-notice-2026',
  },
  {
    id: 'vnua-program-catalog-image-unparsed',
    label: 'VNUA 2026 program/group catalog images have only been partially normalized into runtime group thresholds.',
    status: 'incomplete',
    impact: 'Program-level scope and UI selection metadata still need structured import before exact per-program UX cần be offered.',
    sourceId: 'vnua-admission-notice-2026',
  },
  {
    id: 'vnua-bonus-detail-not-modeled',
    label:
      'VNUA công bố điểm cộng (giai thuong hoc sinh gioi quốc gia/quốc tế, chung chi ngoại ngữ IELTS/HSK/SAT/ACT...) tối đa 3,0/30, áp dụng cho phương thức 2 va 3, nhung không in bằng quy đổi cụ thể tung loai minh chung sang điểm số (chi nêu nhom va mức tran tung nhom). Runtime chưa có field hồ sơ tuong ung (giai thuong) va không the tinh chính xác tung trường hợp.',
    status: 'official-but-unparsed',
    sourceId: 'vnua-admission-notice-2026',
    scoreAffecting: true,
    implemented: false,
    knownData: ['Tổng điểm cộng tối đa 3,0/30', 'Giải thưởng (HSG quốc gia/quốc tế) tối đa 3,0', 'Điểm khen thưởng/khuyến khích tối đa 1,5', 'Chứng chỉ ngoại ngữ (IELTS/HSK/SAT/ACT) tối đa 1,5'],
    impact: 'DXT tham khảo (`vnua-thpt-exam-exact-2026`) chi cong tổng điểm thô + điểm ưu tiên, KHONG cộng điểm cộng — thí sinh co giai thuong/chung chi cần tu cong them truoc khi so DXT thuc te.',
  },
];

