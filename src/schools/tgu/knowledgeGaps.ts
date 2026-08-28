import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tgu-mon-chinh-subscore-rule-not-modeled',
    label: 'Da model dieu kien mon chinh cho pham vi "cac nganh khac" (evaluateTguThptExamExactAdmission, Toan/Ngu van >= 1/3 DXT). Rieng nganh Luat (dieu kien rieng: Toan hoac Ngu van >= 6,0, kem dieu kien hoc luc) nam ngoai pham vi phuong thuc exact — chua model.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-scheme-2026',
    scoreAffecting: false,
    knownData: [
      'Da so nganh (da model): tong 3 mon >= 15,0/30 VA (diem Toan hoac Ngu van) >= 1/3 diem xet tuyen',
      'Luat (chua model): tong 3 mon >= 18,0/30 VA (diem Toan hoac Ngu van) >= 6,0, kem dieu kien hoc luc lop 12',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tgu-other-methods-not-modeled',
    label: 'TGU 2026 con co phuong thuc hoc ba, V-SAT, danh gia nang luc DHQG TPHCM, va xet tuyen thang; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-info-2026',
  },
];
