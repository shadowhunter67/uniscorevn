import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vuiKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vui-other-methods-not-modeled',
    label: 'VUI còn 3 phương thức khác (học bạ, ĐGNL/ĐGTD, xét thẳng) chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'vui-cutoff-notice-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
  {
    id: 'vui-secondary-source-only',
    label: 'Trang chính thức vui.edu.vn không có bài đăng riêng cho điểm chuẩn 2026 tại thời điểm kiểm tra (mục "Tra cứu điểm trúng tuyển" có bảng nhưng rỗng) — dùng congthuong.vn (báo Bộ Công Thương, cơ quan chủ quản trực tiếp) trích đúng số Thông báo 121/ĐHCNVT làm nguồn.',
    status: 'provisional',
    sourceId: 'vui-cutoff-notice-2026',
    scoreAffecting: false,
    impact: 'Nên re-verify khi trang chính thức của trường cập nhật lại dữ liệu.',
  },
];
