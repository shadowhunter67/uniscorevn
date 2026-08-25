import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnueKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnue-program-threshold-table-not-imported',
    label: 'TNUE 2026 cong bo nguong dam bao chat luong dau vao theo nhom nganh (17,00-22,50/30); chua nhap duoc bang day du tung nganh cu the va to hop mon tuong ung.',
    status: 'official-but-unparsed',
    sourceId: 'tnue-threshold-2026',
    scoreAffecting: true,
    knownData: [
      'Cao nhat 22,50/30: Su pham Ngu van, Su pham Lich su, Su pham Dia ly',
      '21,00-22,00/30: Su pham Toan hoc, Su pham Vat ly, Su pham Hoa hoc, Su pham Lich su-Dia ly',
      '20,00-20,50/30: Giao duc Mam non, Giao duc Tieu hoc, Giao duc Chinh tri, Giao duc Cong dan, Su pham Tin hoc, Su pham Sinh hoc, Su pham Tieng Anh, Su pham Khoa hoc tu nhien',
      '17,00-19,00/30: Giao duc The chat, Su pham Am nhac, Giao duc hoc, Tam ly hoc giao duc, Sinh hoc ung dung, Ngon ngu Anh, Huan luyen the thao',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (17/30 = ineligible chac chan); tu 17/30 den 22,5/30 can chon nganh cu the de ket luan chinh xac.',
  },
  {
    id: 'tnue-other-methods-not-modeled',
    label: 'TNUE 2026 co the co them phuong thuc hoc ba/danh gia nang luc ngoai thi TN THPT (theo he thong Dai hoc Thai Nguyen); chua duoc xac minh/mo hinh hoa rieng cho TNUE.',
    status: 'official-but-unparsed',
    sourceId: 'tnue-threshold-2026',
  },
];
