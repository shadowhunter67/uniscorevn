import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tdu-program-threshold-table-not-imported',
    label:
      'Bang nguong day du 29 ma nganh (Thong bao 725/TB-DHTD, chinh thuc) DA nhap va dung cho nhanh exact (tdu-thpt-exam-exact-2026, pham vi 24 ma ngoai Duoc/Dieu duong/Luat). Nhom Duoc hoc/Dieu duong/Luat/Luat kinh te/Luat quoc te (5 ma, dieu kien phu hoc luc cho thi sinh tot nghiep truoc 2025) van ngoai pham vi — xem sources.ts.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'Dai diem chung: 15,0 - 20,0/30',
      'Muc cao nhat 20,0/30: Duoc hoc, Luat, Luat kinh te, Luat quoc te',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tdu-transcript-vsat-danggia-not-modeled',
    label: 'TDU 2026 con co phuong thuc hoc ba, V-SAT (Dai hoc Can Tho to chuc), danh gia nang luc DHQG TPHCM, va hoc ba ket hop phong van; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-admission-info-2026',
  },
];
