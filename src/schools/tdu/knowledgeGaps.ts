import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tdu-program-threshold-table-not-imported',
    label: 'TDU 2026 cong bo diem trung tuyen thi TN THPT theo tung nganh (15-20/30, 29 nganh); chua nhap duoc bang day du theo tung nganh cu the.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Dai diem chung: 15,0 - 20,0/30',
      'Muc cao nhat 20,0/30: Duoc hoc, Luat, Luat kinh te, Luat quoc te',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (15/30 = ineligible chac chan); tu 15/30 den 20/30 can chon nganh cu the de ket luan chinh xac.',
  },
  {
    id: 'tdu-transcript-vsat-danggia-not-modeled',
    label: 'TDU 2026 con co phuong thuc hoc ba, V-SAT (Dai hoc Can Tho to chuc), danh gia nang luc DHQG TPHCM, va hoc ba ket hop phong van; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-admission-info-2026',
  },
];
