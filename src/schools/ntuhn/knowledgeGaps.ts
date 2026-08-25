import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ntuhnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ntuhn-transcript-method-not-modeled',
    label: 'Phuong thuc xet hoc ba THPT (nguong 18/30) va 2 phuong thuc ket hop diem nang khieu (danh cho Thiet ke do hoa, Kien truc, Thiet ke noi that) chua duoc mo hinh hoa; chi phuong thuc xet ket qua thi TN THPT duoc kiem tra.',
    status: 'official-but-unparsed',
    sourceId: 'ntuhn-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'ntuhn-priority-bonus-not-modeled',
    label: 'Diem uu tien khu vuc/doi tuong theo Quy che tuyen sinh cua Bo GDDT chua duoc cong vao tong diem truoc khi so sanh voi nguong.',
    status: 'incomplete',
    sourceId: 'ntuhn-admission-score-2026',
    scoreAffecting: true,
  },
];
