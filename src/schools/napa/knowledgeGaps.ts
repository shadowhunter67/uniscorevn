import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const napaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'napa-combo-conversion-not-modeled',
    label: 'Chua mo hinh hoa quy doi sang cac to hop khac D01',
    status: 'verified',
    scoreAffecting: true,
    implemented: false,
    note:
      'Thong bao diem trung tuyen 2026 cong bo nguong da quy doi ve phuong thuc goc, to hop mon goc D01. Batch nay chi tinh nhanh D01; cac to hop C00/C03/C04/D10/D14... can bang quy doi chi tiet doc sach truoc khi mo hinh hoa.',
  },
];
