import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-21 (browser thật, chrome-devtools, đọc trực tiếp `www.uef.edu.vn`). Mức điểm
 * nhận hồ sơ 4 phương thức, điều kiện riêng nhóm Luật, đã verified từ 1 bài công bố chính thức.
 */
export const uefKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uef-dgnl-vsat-methods-not-modeled',
    label:
      'Phương thức ĐGNL ĐHQG TP.HCM (≥600/1200) và V-SAT (≥225/400) có mức điểm nhận hồ sơ công bố chính thức, kèm điều kiện riêng nhóm Luật (giống phương thức học bạ) nhưng CHƯA được model hoá trong batch này — scope batch này chỉ implement phương thức thi TN THPT và học bạ.',
    status: 'incomplete',
    sourceId: 'uef-quality-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'uef-transcript-methodology-unpublished',
    label:
      'Công thức tính điểm học bạ — nguồn ghi "điểm trung bình tổ hợp 3 môn của 6 học kỳ" nhưng `ApplicantProfile.transcript` hiện chỉ lưu điểm theo NĂM (grade10/11/12), không có độ chi tiết theo học kỳ — cùng loại data-model gap đã ghi nhận ở VLU/HSU/HUTECH/UFM. Calculator chỉ nhận tổng điểm người dùng tự cung cấp.',
    status: 'incomplete',
    sourceId: 'uef-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'exact-final-score-blocking',
  },
  {
    id: 'uef-priority-bonus-table-not-found',
    label:
      'Batch 2026-08-26 đã đọc trực tiếp Đề án tuyển sinh 2026 (PDF gốc, `uef-de-an-tuyen-sinh-2026`, mục 7) và tìm thấy đầy đủ bảng điểm ưu tiên khu vực/đối tượng UEF tự công bố (dùng cho exact calculator nhóm ngành ngoài Luật, xem `uef-thpt-exam-standard-2026`). Gap này chỉ còn áp dụng cho phương thức học bạ nhóm ngành Luật (`evaluateUefTranscriptAdmission`) — chưa có công thức điểm học lực đầy đủ (xem `uef-transcript-methodology-unpublished`) nên chưa cần đến bảng ưu tiên ở nhánh đó.',
    status: 'incomplete',
    sourceId: 'uef-de-an-tuyen-sinh-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'uef-program-catalog-not-imported',
    label: 'Danh mục 38 ngành song ngữ + 4 ngành tài năng (100% tiếng Anh) và tổ hợp môn xét tuyển từng ngành chưa import — evaluator nhận `UefThresholdGroup` trực tiếp từ caller (cùng pattern VLU/HUB/HUIT/NTTU/HSU).',
    status: 'incomplete',
    sourceId: 'uef-quality-threshold-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'program-catalog-only',
  },
];
