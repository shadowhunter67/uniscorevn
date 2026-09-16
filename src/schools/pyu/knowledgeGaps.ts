import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pyuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pyu-priority-value-silent',
    label:
      'Thông báo điểm trúng tuyển (Quyết định số 497/QĐ-ĐHPY) KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU.',
    status: 'incomplete',
    sourceId: 'pyu-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'pyu-mamnon-not-modeled',
    label:
      'Giáo dục Mầm non (7140201) dùng tổ hợp thi năng khiếu (M03/M09) — không có SubjectId/combo tương ứng trong hệ thống (năng khiếu không phải môn văn hoá) — chưa mô hình hoá.',
    status: 'incomplete',
    sourceId: 'pyu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Giáo dục Mầm non tại PYU chưa tính được qua UniScoreVN.',
  },
  {
    id: 'pyu-combinations-not-modeled',
    label:
      'PYU công bố tổ hợp X10 (Sư phạm Khoa học tự nhiên) và B02 (Nông nghiệp) mà UniscoreVN chưa xác nhận đủ tin cậy khớp với combo cùng mã đã có trong `COMMON_SUBJECT_COMBINATIONS` (X10 hiện gán cho PVU với thành phần Toán/Hóa/Tin — khác kỳ vọng thông thường của một ngành khoa học tự nhiên) — loại các mã này khỏi `thresholds.ts` cho 2 ngành tương ứng, tránh gán sai môn.',
    status: 'incomplete',
    sourceId: 'pyu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Sư phạm Khoa học tự nhiên và Nông nghiệp vẫn tính được qua các tổ hợp còn lại đã khớp (3/4 mã mỗi ngành).',
  },
  {
    id: 'pyu-other-methods-not-modeled',
    label:
      'PYU 2026 còn 2 phương thức khác đã công bố điểm chuẩn song song trong cùng Thông báo: xét kết quả học tập THPT (học bạ, cột riêng) và xét điểm thi ĐGNL ĐHQG TP.HCM (thang điểm riêng) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'pyu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT hoặc điểm thi ĐGNL chưa tính được qua UniscoreVN cho PYU (dù điểm chuẩn đã công bố).',
  },
  {
    id: 'pyu-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'pyu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
