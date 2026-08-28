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
    label: 'Batch 2026-08-28: da tim duoc thong bao chinh thuc (khong chi bao chi thu cap) va model diem uu tien (Dieu 7 TT 06/2026, judgment call) trong nhanh exact `ntuhn-thpt-exam-exact-2026`. Phuong thuc eligibility rong (`ntuhn-thpt-exam-2026`) van chi cong diem tho 3 mon.',
    status: 'incomplete',
    sourceId: 'ntuhn-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
