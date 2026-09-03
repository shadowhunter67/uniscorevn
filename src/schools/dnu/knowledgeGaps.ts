import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dnuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dnu-priority-value-silent',
    label:
      'Mục II.7 "Chính sách ưu tiên" của Thông tin tuyển sinh 2025 chỉ dẫn chiếu Phụ lục I/II của Thông tư 08/2022/TT-BGDĐT (sửa đổi bởi Thông tư 06/2025/TT-BGDĐT), KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ TUEBA/PVU/HUST.',
    status: 'incomplete',
    sourceId: 'dnu-thongtin-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số DNU tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'dnu-bonus-not-modeled',
    label: 'Mục II.5.b "Điểm cộng" của Thông tin tuyển sinh 2025 để trống — không có bảng điểm cộng cụ thể theo loại thành tích/chứng chỉ cho DNU — module này KHÔNG mô hình hoá điểm cộng (mặc định 0).',
    status: 'incomplete',
    sourceId: 'dnu-thongtin-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích đặc biệt không được cộng điểm cộng khi tính qua UniscoreVN.',
  },
  {
    id: 'dnu-dong-nai-residency-not-enforced',
    label:
      'Ngành Sư phạm (Giáo dục Tiểu học, Sư phạm Toán học, Sư phạm Ngữ văn, Sư phạm Tiếng Anh) chỉ tuyển thí sinh có hộ khẩu/thường trú tại tỉnh Đồng Nai trước ngày tổ chức kỳ thi THPT (trừ thí sinh khuyết tật xét tuyển thẳng), mục II.1.c. `ApplicantProfile` không có trường hộ khẩu/thường trú tương ứng — module này KHÔNG kiểm tra điều kiện này (chỉ hiển thị cảnh báo trong `reasons`).',
    status: 'incomplete',
    sourceId: 'dnu-thongtin-2025',
    scoreAffecting: false,
    impact: 'Kết quả "đủ điều kiện" cho ngành Sư phạm không đảm bảo thí sinh thoả điều kiện hộ khẩu/thường trú Đồng Nai.',
  },
  {
    id: 'dnu-mam-non-not-modeled',
    label: '2 ngành Giáo dục Mầm non (cao đẳng 51140201, đại học 7140201) chỉ tuyển bằng phương thức kết hợp Năng khiếu (405/406) hoặc xét tuyển thẳng (301), KHÔNG có phương thức xét điểm thi TN THPT (100) — không đưa vào `thresholds.ts`.',
    status: 'incomplete',
    sourceId: 'dnu-thongtin-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Giáo dục Mầm non chưa tính được qua UniscoreVN cho DNU.',
  },
  {
    id: 'dnu-other-methods-not-modeled',
    label: 'DNU 2025 còn phương thức xét học bạ lớp 12 (mã 200), xét tuyển thẳng (mã 301), kết hợp THPT/học bạ với Năng khiếu (405/406), và kết hợp THPT với chứng chỉ quốc tế (mã 409) — module này CHỈ mô hình hoá phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    sourceId: 'dnu-thongtin-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho DNU.',
  },
];
