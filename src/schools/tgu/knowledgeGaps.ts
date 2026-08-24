import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tgu-mon-chinh-subscore-rule-not-modeled',
    label: 'TGU 2026 yeu cau diem mon Toan/Ngu van trong to hop phai dat toi thieu mot ty le rieng (1/3 diem xet tuyen o muc chung, hoac >=6,0 voi nganh Luat); runtime hien chua kiem tra dieu kien nay, chi kiem tong 3 mon.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh: tong 3 mon >= 15,0/30 VA (diem Toan hoac Ngu van) >= 1/3 tong diem xet tuyen',
      'Luat: tong 3 mon >= 18,0/30 VA (diem Toan hoac Ngu van) >= 6,0',
    ],
    impact: 'Mot so ho so co the dat tong diem nhung khong dat dieu kien mon chinh; runtime co the bao "eligible" sai trong truong hop nay.',
  },
  {
    id: 'tgu-other-methods-not-modeled',
    label: 'TGU 2026 con co phuong thuc hoc ba, V-SAT, danh gia nang luc DHQG TPHCM, va xet tuyen thang; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-info-2026',
  },
];
