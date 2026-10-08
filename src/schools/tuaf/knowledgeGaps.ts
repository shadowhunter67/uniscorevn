import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tuafKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tuaf-other-methods-not-modeled',
    label:
      'TUAF 2026 con 3 phương thức khác ngoai thi TN THPT: xét học bạ lớp 12, xét kết quả V-SAT (quy đổi piecewise về THPT — mức II.2.2 Thông báo 727), va xét tuyển thẳng; chi phương thức thi TN THPT (nhanh exact `tuaf-thpt-exam-exact-2026`) được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'tuaf-thpt-threshold-2026',
  },
  {
    id: 'tuaf-round-2-plus-not-modeled',
    label: 'Nguong 16/30 la cho dot 1 (2026); các dot xét tuyển bo sung tiếp theo (nêu co) co the công bố ngưỡng khác, chưa được cap nhat.',
    status: 'official-but-unparsed',
    sourceId: 'tuaf-admission-info-2026',
  },
];
