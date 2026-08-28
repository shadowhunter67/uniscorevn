import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bdu-program-threshold-table-not-imported',
    label:
      'Nhánh exact (bdu-thpt-exam-exact-2026) đã model 2 nhóm ngưỡng (standard 15/30 so RAW; lawOrPharmacy 20/30 so ĐXT) qua tham số `thresholdGroup` caller tự chọn — chưa ánh xạ ~100 tổ hợp xét tuyển (A00-Y11) hay danh mục ngành cụ thể tới 2 nhóm này.',
    status: 'official-but-unparsed',
    sourceId: 'bdu-admission-2026',
    scoreAffecting: false,
    knownData: [
      'Da so nganh: >= 15,0/30 (thi TN THPT)',
      'Luat, Luat Kinh te: >= 20,0/30 (thi TN THPT)',
      'Duoc hoc: >= 20,0/30 (thi TN THPT)',
    ],
    impact: 'program-catalog-only',
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
