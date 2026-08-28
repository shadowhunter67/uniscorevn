import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tbduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tbdu-law-group-conditions-not-modeled',
    label:
      'Nhánh exact (tbdu-thpt-exam-exact-2026, nhóm ngành thường) đã model ngưỡng 15/30. Ngành Luật/Luật kinh tế áp dụng 1 trong 3 điều kiện riêng, không theo ngưỡng chung — ngoài phạm vi nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
    scoreAffecting: false,
    knownData: [
      'Da so nganh: tong 3 mon thi TN THPT >= 15,0/30',
      'Luat, Luat kinh te: (a) tong diem thi TN THPT (da gom uu tien) >= 20,0/30; HOAC (b) hoc luc lop 12 loai tot VA tong diem thi >= 18,0/30; HOAC (c) diem xet tot nghiep THPT >= 8,5/10',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tbdu-transcript-aptitude-not-modeled',
    label: 'TBDU 2026 con co phuong thuc hoc ba va hoc ba ket hop danh gia nang luc; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'tbdu-admission-info-2026',
  },
];
