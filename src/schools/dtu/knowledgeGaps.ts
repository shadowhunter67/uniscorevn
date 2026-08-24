import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dtu-program-threshold-table-not-imported',
    label: 'DTU 2026 cong bo nguong THPT theo 4 nhom nganh (chung, Luat, Dieu duong/KTXN, khoi suc khoe co chung chi hanh nghe); chua chon duoc nganh cu the de ap dung dung nhom.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh: >= 15,0/30 (thi TN THPT) hoac hoc luc lop 12 >= 6.0',
      'Luat, Luat kinh te: >= 18,0/30 hoac hoc luc lop 12 loai gioi + >=8,5/10 hoc ba',
      'Dieu duong, Ky thuat xet nghiem y hoc: >= 16,5/30 hoac >= 6,5/10 hoc ba',
      'Y khoa, Rang-Ham-Mat, Duoc hoc: >= 20,0/30 hoac >= 8,5/10 hoc ba',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (15/30 = ineligible chac chan); tu 15/30 den 20/30 can chon nganh de ket luan chinh xac.',
  },
  {
    id: 'dtu-transcript-vsat-danggia-not-modeled',
    label: 'DTU 2026 con co phuong thuc hoc ba (Ma 200), V-SAT, danh gia nang luc DHQG TPHCM (Ma 402: 700 diem khoi suc khoe co chung chi, 650 Dieu duong/KTXN, 600 nganh khac) va xet tuyen thang; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
  },
  {
    id: 'dtu-ielts-conversion-not-modeled',
    label: 'DTU cong bo bang quy doi chung chi tieng Anh quoc te (IELTS 5.5->8,0; 6.0->8,5; 6.5->9,0; 7.0->9,5; 7.5+->10,0 thang 10) ap dung cho mon tieng Anh trong xet tuyen ket hop; chua duoc trien khai trong bo tinh diem.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
  },
];
