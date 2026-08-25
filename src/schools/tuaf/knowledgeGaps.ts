import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tuafKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tuaf-other-methods-not-modeled',
    label:
      'TUAF 2026 con 3 phuong thuc khac ngoai thi TN THPT: xet hoc ba lop 12, xet ket qua V-SAT, va xet tuyen thang theo quy dinh cua Bo GD&DT; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tuaf-admission-info-2026',
  },
  {
    id: 'tuaf-round-2-plus-not-modeled',
    label: 'Nguong 16/30 la cho dot 1 (2026); cac dot xet tuyen bo sung tiep theo (neu co) co the cong bo nguong khac, chua duoc cap nhat.',
    status: 'official-but-unparsed',
    sourceId: 'tuaf-admission-info-2026',
  },
];
