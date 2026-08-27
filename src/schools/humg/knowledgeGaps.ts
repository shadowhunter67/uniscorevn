import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const humgKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'humg-program-catalog-partially-imported',
    label:
      'Batch 2026-08-27: đã đọc trực tiếp toàn bộ Bảng 1 (53 mã xét tuyển, 15-21/30) từ Thông báo ngưỡng đợt 1 năm 2026 và mở nhánh exact `humg-thpt-exam-exact-2026` (công thức + điểm ưu tiên + ngưỡng theo mã đều trích nguyên văn). Không còn mã ngành nào thiếu ngưỡng.',
    status: 'official-but-unparsed',
    sourceId: 'humg-admission-2026',
    scoreAffecting: false,
    knownData: ['53/53 mã xét tuyển đã nhập ngưỡng theo thang 30 (xem `thresholds.ts`)'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'humg-conversion-table-not-imported',
    label:
      'Bảng quy đổi điểm cho các phương thức khác (học bạ, TSA, HSA, hồ sơ năng lực) chưa nhập vào runtime. Bảng điểm cộng (mục 3, QĐ 674/QĐ-MĐC) đã xác minh nhưng dựa trên bậc CEFR/loại giải nên không map trực tiếp field hồ sơ dùng chung — nhánh exact nhận điểm cộng do caller tự tính (mặc định 0).',
    status: 'official-but-unparsed',
    sourceId: 'humg-admission-2026',
    scoreAffecting: true,
    impact: 'Runtime chỉ tính exact cho phương thức xét điểm thi TN THPT; các phương thức quy đổi khác và tự động phân loại điểm cộng chưa được model hóa.',
  },
];
