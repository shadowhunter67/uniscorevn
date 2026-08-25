import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ttuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ttu-program-threshold-table-not-imported',
    label:
      'TTU 2026 cong bo nguong THPT theo 4 nhom nganh (da so nganh, Dieu duong/KTXN, Luat, Y khoa); chua chon duoc nganh cu the de ap dung dung nhom.',
    status: 'official-but-unparsed',
    sourceId: 'ttu-floor-score-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh (ky thuat, cong nghe, kinh te, ngon ngu): >= 15,0/30',
      'Dieu duong, Ky thuat Xet nghiem Y hoc: >= 18,0/30',
      'Luat: >= 20,0/30',
      'Y khoa: >= 22,0/30',
    ],
    impact: 'Runtime chi loai duoc ho so duoi 15/30 va xac nhan dat tren 22/30 (moi nganh); giua 15/30 va 22/30 can chon nganh de ket luan chinh xac.',
  },
  {
    id: 'ttu-other-methods-not-modeled',
    label:
      'TTU 2026 con cac phuong thuc khac ngoai thi TN THPT (xet tuyen thang/uu tien theo quy dinh Bo GD&DT, va cac phuong thuc khac neu co); chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'ttu-floor-score-2026',
  },
];
