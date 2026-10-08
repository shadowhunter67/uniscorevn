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
      'Đa số ngành: >= 15,0/30 (thi TN THPT)',
      'Luat, Luat Kinh te: >= 20,0/30 (thi TN THPT)',
      'Duoc hoc: >= 20,0/30 (thi TN THPT)',
    ],
    impact: 'program-catalog-only',
  },
  {
    id: 'bdu-transcript-method-not-modeled',
    label:
      'BDU 2026 con co phương thức xét học bạ THPT (học lực lớp 12 loai Giỏi + tổng điểm tổ hợp >= 18,0/30 hoặc điểm xét tot nghiep >= 8,5/10 cho Luật/Luật Kinh tế; >= 20,0/30 hoặc >= 8,5/10 cho Dược học); chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'bdu-admission-2026',
  },
  {
    id: 'bdu-bonus-priority-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Thong tu 06 được để cap nhung chưa được trien khai trong bo tính điểm.',
    status: 'incomplete',
    sourceId: 'bdu-admission-2026',
    impact: 'Bo tính điểm chưa tinh được điểm xét tuyển cuoi cung, chi kiểm tra ngưỡng đãu vao.',
  },
];
