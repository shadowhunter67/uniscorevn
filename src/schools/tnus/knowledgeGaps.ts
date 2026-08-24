import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnusKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnus-program-threshold-table-not-imported',
    label: 'TNUS 2026 cong bo diem chuan trung tuyen thi TN THPT rieng cho tung nganh/chuong trinh (16,35-22,50/30, ~40 nganh); chua nhap duoc bang day du.',
    status: 'official-but-unparsed',
    sourceId: 'tnus-cutoff-2026',
    scoreAffecting: true,
    knownData: [
      'Cao nhat 22,50/30: Cong nghe Ban dan',
      '21,75/30: Ngon ngu Trung Quoc',
      '21,00/30: Lich su-Dia ly, Kinh te-Luat',
      '20,43/30: Sinh hoc',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (16,35/30 = ineligible chac chan); tu 16,35/30 den 22,5/30 can chon nganh cu the de ket luan chinh xac.',
  },
  {
    id: 'tnus-other-methods-not-modeled',
    label: 'TNUS 2026 co them phuong thuc xet hoc ba, xet tuyen thang, danh gia nang luc V-SAT/DHQG Ha Noi/DHBK Ha Noi; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tnus-cutoff-2026',
  },
];
