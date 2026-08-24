import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bdu-program-threshold-table-not-imported',
    label:
      'BDU 2026 cong bo nguong diem san rieng theo khoi nganh (da so nganh 15,0/30; Luat/Luat Kinh te 20,0/30; Duoc hoc 20,0/30); chua chon duoc nganh cu the de ap dung dung muc, va con ~100 to hop xet tuyen (A00-Y11) chua duoc anh xa toi nhom nganh.',
    status: 'official-but-unparsed',
    sourceId: 'bdu-admission-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh: >= 15,0/30 (thi TN THPT)',
      'Luat, Luat Kinh te: >= 20,0/30 (thi TN THPT)',
      'Duoc hoc: >= 20,0/30 (thi TN THPT)',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (15/30 = ineligible chac chan); tu 15/30 den 20/30 can chon nganh de ket luan chinh xac.',
  },
  {
    id: 'bdu-transcript-method-not-modeled',
    label:
      'BDU 2026 con co phuong thuc xet hoc ba THPT (hoc luc lop 12 loai Gioi + tong diem to hop >= 18,0/30 hoac diem xet tot nghiep >= 8,5/10 cho Luat/Luat Kinh te; >= 20,0/30 hoac >= 8,5/10 cho Duoc hoc); chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'bdu-admission-2026',
  },
  {
    id: 'bdu-bonus-priority-not-modeled',
    label: 'Diem uu tien khu vuc/doi tuong theo Thong tu 06 duoc de cap nhung chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'bdu-admission-2026',
    impact: 'Bo tinh diem chua tinh duoc diem xet tuyen cuoi cung, chi kiem tra nguong dau vao.',
  },
];
