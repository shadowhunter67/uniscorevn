import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hnueKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hnue-program-threshold-table-not-imported',
    label: 'Bảng ngưỡng đầu vào theo từng ngành/chương trình HNUE 2026 chưa được nhập thành dataset runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hnue-quality-threshold-2026',
    scoreAffecting: true,
    knownData: [
      'Ngưỡng nhiều ngành nằm trong khoảng 16,5-22/30 (theo cross-check chinhphu.vn), một số ngành sư phạm 21-24/30',
      'Một số ngành năng khiếu có điều kiện phụ theo 1 hoặc 2 môn văn hóa',
      'Cross-check research 2026-08-28: xác nhận lại "không nhân hệ số, không tính điểm cộng" cho khu vực 3 — nếu có bảng đầy đủ, có thể so TỔNG THÔ trực tiếp như UDA/TBDU/FPTU, không cần judgment call điểm cộng',
    ],
    attemptedSources: [
      '2026-08-28: fetch trực tiếp tuyensinh.hnue.edu.vn/thong-bao/667 và hnue.edu.vn/tin-tuc/11317/... — cả 2 trả HTTP 403',
      '2026-08-28: xaydungchinhsach.chinhphu.vn (cross-check, `hnue-threshold-crosscheck-chinhphu-2026`) — chỉ có vài mốc ví dụ, không phải bảng đầy đủ machine-readable cho toàn bộ ngành',
    ],
    whyNotInferred: 'Chưa đọc được bảng đầy đủ theo mã ngành từ nguồn official-school (403) hay cross-check (chỉ trích ví dụ) — không suy đoán số cho các ngành chưa xác nhận.',
    impact: 'Compare chỉ loại chắc chắn hồ sơ dưới 16,5/30; chưa kết luận đạt cho từng ngành hoặc ngành năng khiếu.',
  },
  {
    id: 'hnue-special-subject-thresholds-not-modeled',
    label: 'Điều kiện phụ cho Giáo dục Mầm non/GD Thể chất/SP Âm nhạc/SP Mỹ thuật/Huấn luyện thể thao chưa model hóa.',
    status: 'official-but-unparsed',
    sourceId: 'hnue-quality-threshold-2026',
    scoreAffecting: true,
  },
  {
    id: 'hnue-spt-conversion-not-imported',
    label: 'Quy đổi điểm PT2/SPT2026 chưa được nhập.',
    status: 'official-but-unparsed',
    sourceId: 'hnue-spt-conversion-2026',
    scoreAffecting: true,
  },
];
