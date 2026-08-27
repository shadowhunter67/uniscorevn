import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hulKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hul-transcript-method-not-modeled',
    label: 'HUL phương thức xét học bạ (Phương thức 2) có công thức và điều kiện riêng nhưng chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hul-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra ngưỡng cho phương thức xét điểm thi TN THPT, chưa kiểm tra được ngưỡng/điểm xét tuyển bằng học bạ.',
  },
  {
    id: 'hul-bonus-priority-not-modeled',
    label:
      'Batch 2026-08-26 đã đọc trực tiếp Thông tin tuyển sinh 2026 của Đại học Huế (`hul-hueuni-ttts-2026`, mục V.2 + Bảng 1) và đóng gap điểm ưu tiên cho phương thức thi TN THPT (xem `hul-thpt-exam-exact-2026`). Điểm cộng (Phụ lục 2, TC1-TC12) chưa được phân loại tự động thành bảng tra cứu — evaluator nhận giá trị bonus30 đã tính sẵn từ caller thay vì tự suy từ thành tích.',
    status: 'incomplete',
    sourceId: 'hul-hueuni-ttts-2026',
    scoreAffecting: false,
    impact: 'program-catalog-only',
  },
];
