import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pntuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pntu-threshold-table-cross-checked-not-primary',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 (14 ngành) của PNTU chỉ công bố dạng ảnh trên cổng trường (`pntu-threshold-notice-2026`); dữ liệu dùng trong runtime đối chiếu chéo 2 nguồn báo chí độc lập (VnExpress + Giáo dục & Thời đại, 10/07/2026) khớp tuyệt đối, nhưng chưa tự đọc được ảnh gốc — verification ở mức cross-checked, không phải verified.',
    status: 'official-but-unparsed',
    sourceId: 'pntu-threshold-notice-2026',
    scoreAffecting: true,
    impact: 'Runtime dùng cross-checked làm căn cứ tính điểm; nếu báo chí ghi sai lệch với ảnh gốc, số liệu sẽ sai theo — cần đọc lại ảnh gốc khi có điều kiện.',
  },
  {
    id: 'pntu-direct-admission-not-modeled',
    label: 'Phương thức xét tuyển thẳng (mã phương thức 301) chưa được mô hình hoá; runtime chỉ hỗ trợ phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    impact: 'Không kiểm tra được điều kiện tuyển thẳng.',
    sourceId: 'pntu-admission-2026',
  },
];
