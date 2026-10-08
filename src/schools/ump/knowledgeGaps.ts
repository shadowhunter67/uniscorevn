import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-19/20 — Thông báo 2415/TB-ĐHYD (công thức/tổ hợp/danh mục ngành) và Thông báo
 * 2983/TB-ĐHYD (ngưỡng đảm bảo chất lượng đầu vào theo từng ngành) đều đọc trực tiếp từ
 * `ump.edu.vn` (PDF/ảnh gốc, xem `sources.ts`) — công thức Điểm xét tuyển, điểm ưu tiên, điểm
 * khuyến khích đều verified đầy đủ, KHÔNG cần điều kiện "chỉ exact khi không có thành tích cộng
 * điểm" như nhiều trường khác trong dự án (UMP tự công bố công thức điểm khuyến khích cụ thể).
 * Các khoảng trống dưới đây KHÔNG chặn exact calculator của phương thức duy nhất (thi TN THPT).
 */
export const umpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ump-gender-restriction-not-modeled',
    label:
      'Ngành Hộ sinh (7720302) chỉ tuyển Nữ theo Thông báo 2415/TB-ĐHYD mục 5.4. UniscoreVN chưa có mục nhập giới tính, nên không kiểm tra được điều kiện này và chỉ đánh giá theo điểm số.',
    status: 'incomplete',
    sourceId: 'ump-admission-notice-2415-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred: 'Không mở rộng `ApplicantProfile` dùng chung thêm field giới tính chỉ để phục vụ 1 ngành của 1 trường — điều kiện phụ này thí sinh tự biết, không phải phần "tính điểm".',
    impact: 'eligibility-only-gap',
  },
  {
    id: 'ump-cutoffs-2026-not-imported',
    label:
      'Điểm trúng tuyển chính thức 2026 theo từng ngành và tổ hợp đã có trong Thông báo 3557/TB-ĐHYD ngày 10/8/2026 sau khi lọc ảo. UniscoreVN chưa nhập bảng này, nên UMP hiện chưa có phần so sánh với điểm chuẩn.',
    status: 'official-but-unparsed',
    sourceId: 'ump-cutoff-notice-3557-2026',
    scoreAffecting: false,
    implemented: false,
    whyNotInferred: 'Ưu tiên hoàn thiện exact calculator (công thức/ngưỡng/ưu tiên/khuyến khích) trước — cutoff là dữ liệu tham khảo bổ sung, không chặn việc tính điểm xét tuyển.',
    impact: 'cutoff-comparison-blocking',
  },
];
