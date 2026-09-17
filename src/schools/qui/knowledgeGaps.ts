import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const quiKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'qui-other-methods-not-modeled',
    label: 'QUI còn 4 phương thức khác (học bạ ≥18/30, kết hợp ≥17/30, ĐGNL ĐHQGHN ≥54/150, ĐGTD ĐHBKHN ≥38,92/100) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'qui-threshold-notice-2026',
    scoreAffecting: true,
    knownData: ['Học bạ: ≥18/30', 'Kết hợp: ≥17/30', 'ĐGNL ĐHQGHN: ≥54/150', 'ĐGTD ĐHBKHN: ≥38,92/100'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'qui-real-cutoff-notice-broken',
    label: 'Bài "Thông báo điểm chuẩn trúng tuyển đợt 1 năm 2026" của trường bị lỗi/thiếu nội dung (mục bảng điểm trống hoàn toàn) — chỉ có ngưỡng SÀN (nhận hồ sơ), chưa xác nhận được điểm chuẩn trúng tuyển thật theo từng ngành.',
    status: 'incomplete',
    sourceId: 'qui-threshold-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
