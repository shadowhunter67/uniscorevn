import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const actvnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'actvn-english-certificate-bonus-not-modeled',
    label:
      'ACTVN cộng điểm chứng chỉ tiếng Anh quốc tế (IELTS/TOEIC/TOEFL: +0,5 / +1 / +1,5, tối đa 3 điểm trên thang 30) và điểm chuẩn công bố "bao gồm điểm ưu tiên, điểm cộng (nếu có)" — điểm cộng chưa mô hình hoá, mô hình chỉ tính trên điểm thi TN THPT thô + điểm ưu tiên.',
    status: 'incomplete',
    sourceId: 'actvn-notice-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có chứng chỉ tiếng Anh quy định sẽ thấy Điểm xét thấp hơn thực tế tối đa 1,5 điểm.',
  },
  {
    id: 'actvn-priority-table-not-published',
    label:
      'Trang tuyển sinh của Học viện không in bảng mức điểm ưu tiên khu vực/đối tượng riêng — dùng khung điểm ưu tiên quốc gia hiện hành (Quy chế tuyển sinh của Bộ GD&ĐT) và công thức giảm từ 22,5 điểm làm judgment call, cùng tiền lệ nhiều trường khác trong hệ thống.',
    status: 'incomplete',
    sourceId: 'actvn-notice-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải bảng riêng của Học viện.',
  },
  {
    id: 'actvn-other-methods-and-programs-not-modeled',
    label:
      'ACTVN còn xét tuyển thẳng, xét ĐGNL/ĐGTD (ĐHQG Hà Nội, ĐHQG TP.HCM, ĐH Sư phạm Hà Nội, ĐH Bách khoa Hà Nội) và có hệ đào tạo phục vụ lĩnh vực mật mã riêng; chỉ phương thức xét điểm thi TN THPT của 4 mã xét tuyển hệ kinh tế - xã hội được mô hình hoá. Chương trình tài năng và chuyên ngành Hệ thống nhúng và thiết kế vi mạch có ngưỡng đầu vào riêng (Thông báo 32/TB-HĐTS) chưa mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'actvn-notice-2026',
  },
];
