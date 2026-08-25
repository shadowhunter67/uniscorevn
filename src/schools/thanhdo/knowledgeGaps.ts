import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const thanhdoKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'thanhdo-program-threshold-table-not-imported',
    label: 'ThanhDo 2026 cong bo diem chuan thi TN THPT rieng cho tung nganh (16,0-20,0/30, 14 nganh); chua chon duoc nganh cu the de ap dung dung muc.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
    scoreAffecting: true,
    knownData: [
      'Muc thap nhat 16,0/30: Ke toan, Quan tri Van phong, Quan tri Khach san, Viet Nam hoc, Giao duc hoc',
      'Muc 16,5/30: Quan tri kinh doanh',
      'Muc 17,0/30: Cong nghe ky thuat O to, Ngon ngu Anh',
      'Muc 17,5/30: CNTT, Cong nghe ky thuat Dien-Dien tu, Ngon ngu Trung Quoc',
      'Muc 18,0/30: Dieu duong',
      'Muc cao nhat 20,0/30: Luat, Duoc hoc',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (16/30 = ineligible chac chan); tu 16/30 den 20/30 can chon nganh cu the de ket luan chinh xac.',
  },
  {
    id: 'thanhdo-transcript-aptitude-not-modeled',
    label: 'ThanhDo 2026 con co phuong thuc hoc ba (18,0-20,0/30), thi danh gia nang luc/tu duy (HSA >=75/150, TSA >=50/100), va xet tuyen thang; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'thanhdo-cutoff-2026',
  },
];
