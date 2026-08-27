import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hceKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hce-program-threshold-table-not-imported',
    label:
      'Batch 2026-08-26 đã đọc trực tiếp Phụ lục 1 (Thông báo 42/TB-HĐTSĐH, `hce-hueu-threshold-appendix-2026`) và đóng gap này cho toàn bộ 18 ngành Trường Đại học Kinh tế (2 nhóm ngưỡng rõ ràng: 15/30 hoặc 17/30, xem `hce-thpt-exam-kinhte-2026`). Gap chỉ còn áp dụng cho các trường thành viên khác của Đại học Huế nếu UniscoreVN mở rộng phạm vi sau này.',
    status: 'official-but-unparsed',
    sourceId: 'hce-hueu-threshold-appendix-2026',
    scoreAffecting: false,
    knownData: ['Điểm sàn thi THPT: 15/30 (15 ngành), 17/30 (Marketing, Kinh doanh quốc tế, Logistics và Quản lý chuỗi cung ứng)'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'hce-other-methods-not-modeled',
    label: 'HCE còn 4 phương thức khác (xét tuyển thẳng, kết hợp chứng chỉ ngoại ngữ, học bạ kết hợp chứng chỉ, ĐGNL ĐHQG-HCM) chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hce-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
