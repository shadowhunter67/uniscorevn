import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vinhuniKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vinhuni-per-program-threshold-table-not-imported',
    label:
      'Batch 2026-08-27: đã đọc trực tiếp Phụ lục 1 PDF và nhập bảng ngưỡng Phương thức 100 cho 55 mã ngành (nhóm sư phạm 21-23, ngoài sư phạm 15-20) — mở nhánh exact `vinhuni-thpt-exam-exact-2026`. Còn lại ngoài phạm vi: nhóm ngành năng khiếu (GDMN/GDTC/Kiến trúc), Sư phạm Tiếng Anh và Ngôn ngữ Trung Quốc (điều kiện ngoại ngữ nhiều lựa chọn).',
    status: 'official-but-unparsed',
    sourceId: 'vinhuni-quality-threshold-conversion-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'vinhuni-transcript-and-conversion-rules-not-modeled',
    label: 'Ngưỡng học bạ, quy đổi tương đương và các tiêu chí riêng nhóm ngôn ngữ/sức khỏe/pháp luật chưa model hóa đầy đủ.',
    status: 'official-but-unparsed',
    sourceId: 'vinhuni-admission-adjustment-2026',
    scoreAffecting: true,
  },
  {
    id: 'vinhuni-aptitude-method-not-modeled',
    label: 'Phương thức kết hợp thi năng khiếu cho Giáo dục Thể chất, Giáo dục Mầm non, Kiến trúc chưa được đưa vào evaluator.',
    status: 'official-but-unparsed',
    sourceId: 'vinhuni-quality-threshold-conversion-2026',
    scoreAffecting: true,
  },
];
