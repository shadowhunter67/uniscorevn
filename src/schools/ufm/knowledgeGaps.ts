import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-18 (2 trang chính thức) → re-verify 2026-08-19 qua domain gốc → **batch
 * 2026-08-20: đọc TOÀN BỘ 8 trang PDF `Thông báo 2639/TB-ĐHTCM` (chrome-devtools screenshot trực
 * tiếp login.ufm.edu.vn, có dấu/chữ ký) — đóng dứt điểm `ufm-final-score-conversion-unparsed`
 * (trước đó chỉ đọc vài dòng đầu bảng 3.1), kéo theo đóng luôn `ufm-hocba-semester-granularity-gap`
 * và `ufm-vsat-scale-unconfirmed` (cả 2 blocker thật vốn chính là bảng quy đổi này). Bảng bách
 * phân vị đầy đủ (3.1 học bạ/3.2 ĐGNL/3.3 V-SAT) + công thức nội suy tuyến tính (3.4) + công thức
 * "Điểm xét tuyển" (mục 4) đã transcribe vào `conversionTable.ts`, wire vào `evaluate.ts` —
 * hocba/dgnl/vsat nay `exactCalculator: true` (xem `methods.ts`).
 */
export const ufmKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ufm-priority-table-not-ufm-specific',
    label: 'Điểm ưu tiên khu vực/đối tượng đang dùng bảng chuẩn quốc gia. Chưa tìm được trang UFM tự công bố bảng số riêng.',
    status: 'official-but-unparsed',
    sourceId: 'ufm-admission-plan-2026',
    scoreAffecting: true,
    implemented: true,
    whyNotInferred: 'Bảng số dùng cross-check nội bộ với 7 trường khác trong repo đã verified/cross-checked cùng công thức tỉ lệ quốc gia.',
    impact: 'evidence-verification-level-only',
  },
  {
    id: 'ufm-program-catalog-not-imported',
    label: 'Danh mục ngành/chương trình đào tạo 2026 của UFM gồm 5 nhóm: Chuẩn, Định hướng đặc thù, Tích hợp, Tiếng Anh toàn phần, Tài năng, với 8.000 chỉ tiêu. Mã ngành cụ thể chưa được đưa vào công cụ, nên người dùng cần chọn đúng nhóm ngưỡng và loại chương trình.',
    status: 'official-but-unparsed',
    sourceId: 'ufm-admission-plan-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'eligibility-only-gap',
  },
  {
    id: 'ufm-english-full-program-toan-coefficient-not-implemented',
    label:
      'Chưa hỗ trợ Chương trình Tiếng Anh toàn phần (định hướng quốc tế), trong đó môn Toán nhân hệ số 2 và có 3 công thức quy đổi riêng ở mục 3.4 cho học bạ, V-SAT và thi TN THPT. Hiện UniscoreVN chỉ tính cho chương trình Chuẩn, không nhân hệ số môn nào.',
    status: 'official-but-unparsed',
    sourceId: 'ufm-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Chương trình Tiếng Anh toàn phần ngoài phạm vi batch này (tập trung đóng gap quy đổi bách phân vị chương trình Chuẩn) — cần batch riêng để mở rộng `UfmThreeSubjectInput`/context nhận cờ "Toán hệ số 2".',
    impact: 'exact-blocking-for-english-full-program-only',
  },
];
