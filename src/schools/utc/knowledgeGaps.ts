import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * RE-AUDIT 2026-08-27: đã fetch trực tiếp trang "Thông tin tuyển sinh 2026" + trang "Ngưỡng đảm
 * bảo chất lượng đầu vào 2026" của UTC. Công thức (Toán×2 + 2 môn)×3/4 / nhánh Ngôn ngữ Anh, bảng
 * điểm cộng (giải HSG tỉnh + IELTS) và bảng ngưỡng theo ngành đều verified nguyên văn → nhánh
 * `utc-thpt-exam-exact-2026` (`methods.ts`) tính đủ Tổng điểm xét tuyển. Gap
 * `utc-weighted-math-context-not-modeled` và `utc-program-threshold-table-not-imported` đã RESOLVED
 * (bỏ khỏi mảng). Còn lại là các nhánh ngoài phương thức thi TN THPT.
 */
export const utcKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'utc-hsa-tsa-vact-conversion-not-modeled',
    label: 'Các phương thức xét HSA (ĐGNL ĐHQGHN) / TSA (ĐGTD Bách khoa HN) / ĐGNL ĐHQG-HCM và công thức quy đổi về thang THPT chưa được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'utc-quality-threshold-2026',
    scoreAffecting: true,
    impact: 'partial-for-aptitude-test-routes',
  },
  {
    id: 'utc-combined-transcript-method-not-modeled',
    label: 'Phương thức xét kết hợp học bạ THPT với điều kiện điểm thi TN THPT (dùng cùng công thức Toán×2) chưa được mô hình hoá — cần điểm học bạ theo học kỳ/năm và bảng điều kiện riêng.',
    status: 'official-but-unparsed',
    sourceId: 'utc-admission-info-2026',
    scoreAffecting: true,
    impact: 'partial-for-combined-transcript-route',
  },
];
