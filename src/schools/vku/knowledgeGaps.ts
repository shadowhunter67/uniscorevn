import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * RE-AUDIT 2026-08-27: đã tải & đọc trực tiếp toàn văn PDF "Thông tin tuyển sinh năm 2026 (cập
 * nhật 09/4/2026)" — công thức Phương thức 2 (học bạ 60% + thi THPT 40% + điểm cộng + điểm ưu
 * tiên), bảng điểm cộng chứng chỉ (Phụ lục II) và công thức giảm điểm ưu tiên (Mục 5.2.b) đều
 * verified nguyên văn. Gap `vku-combined-formula-not-executed` đã RESOLVED (bỏ khỏi mảng) — nhánh
 * `vku-combined-exact-2026` (`methods.ts`) giờ tính đủ Điểm xét tuyển. Các gap còn lại dưới đây là
 * những gì CHÍNH PDF chưa công bố hoặc ngoài hồ sơ dùng chung.
 */
export const vkuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vku-combined-threshold-not-published',
    label:
      'VKU chưa công bố ngưỡng đảm bảo chất lượng đầu vào cho Phương thức 2 (xét tuyển kết hợp) — PDF ghi "Trường sẽ công bố theo kế hoạch của Bộ GDĐT" (Mục 3.1). Nhánh exact tính đúng Điểm xét tuyển nhưng trả eligibility "unknown".',
    status: 'incomplete',
    sourceId: 'vku-admission-info-2026',
    scoreAffecting: false,
    impact: 'eligibility-unknown-for-exact-score',
  },
  {
    id: 'vku-program-cutoffs-not-imported',
    label: 'Điểm trúng tuyển 2026 theo từng ngành/chương trình VKU chưa được nhập (công bố sau). Bảng điểm chuẩn 2024-2025 có trong PDF (Mục 11) nhưng chưa dùng cho /compare.',
    status: 'official-but-unparsed',
    sourceId: 'vku-admission-info-2026',
    scoreAffecting: false,
    impact: 'no-cutoff-comparison',
  },
  {
    id: 'vku-dgnl-and-english-cert-conversion-not-modeled',
    label:
      'Phương thức 3 (ĐGNL ĐHQG TP.HCM) chưa mô hình hoá (công thức quy đổi công bố sau theo kế hoạch Bộ GDĐT). Quy đổi chứng chỉ tiếng Anh THAY điểm môn (Phụ lục II Mục II, "dự kiến") và nhóm điểm thưởng/xét thưởng thành tích (giải HSG/KHKT/Olympic — không có field trong hồ sơ dùng chung) cũng chưa mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'vku-admission-info-2026',
    scoreAffecting: true,
    impact: 'partial-for-dgnl-route-and-achievement-applicants',
  },
];
