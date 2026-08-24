import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tbduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tbdu-law-group-conditions-not-modeled',
    label: 'TBDU 2026 nganh Luat/Luat kinh te ap dung 1 trong 3 dieu kien rieng, khong theo nguong chung 15/30.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh: tong 3 mon thi TN THPT >= 15,0/30',
      'Luat, Luat kinh te: (a) tong diem thi TN THPT (da gom uu tien) >= 20,0/30; HOAC (b) hoc luc lop 12 loai tot VA tong diem thi >= 18,0/30; HOAC (c) diem xet tot nghiep THPT >= 8,5/10',
    ],
    impact:
      'Runtime chi kiem tra duoc nguong chung 15/30 (duoi muc nay chac chan ineligible); voi nganh Luat/Luat kinh te can chon nganh va nhap them du lieu hoc luc/diem xet tot nghiep de ket luan chinh xac.',
  },
  {
    id: 'tbdu-transcript-aptitude-not-modeled',
    label: 'TBDU 2026 con co phuong thuc hoc ba va hoc ba ket hop danh gia nang luc; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
  },
];
