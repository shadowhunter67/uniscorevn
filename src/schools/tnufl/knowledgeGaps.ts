import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnuflKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnufl-program-threshold-table-not-imported',
    label: 'TNUFL 2026 cong bo diem chuan trung tuyen thi TN THPT rieng cho tung nganh (16,00-26,60/30, 5 nganh); chua chon duoc nganh cu the de ap dung dung muc.',
    status: 'official-but-unparsed',
    sourceId: 'tnufl-cutoff-2026',
    scoreAffecting: true,
    knownData: [
      'Ngon ngu Han Quoc: 16,00/30',
      'Ngon ngu Anh: 18,20/30',
      'Ngon ngu Trung Quoc: 20,60/30',
      'Su pham Tieng Anh: 25,60/30',
      'Su pham Tieng Trung Quoc: 26,60/30',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (16/30 = ineligible chac chan); tu 16/30 den 26,6/30 can chon nganh cu the de ket luan chinh xac. Muc diem cao cua 2 nganh su pham co the da gom diem uu tien/khu vuc, chua duoc tach rieng.',
  },
  {
    id: 'tnufl-other-methods-not-modeled',
    label: 'TNUFL 2026 cong bo 5 phuong thuc (xet tuyen thang, thi TN THPT, ket hop THPT + chung chi ngoai ngu quoc te, V-SAT, du bi dai hoc); chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tnufl-cutoff-2026',
  },
];
