import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dueudnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dueudn-priority-value-silent',
    label:
      'Bảng "Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026" (ts.udn.vn) KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của DUE. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV/HPU2/TNUE/TNUFL/DUT.',
    status: 'incomplete',
    sourceId: 'dueudn-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'dueudn-combinations-not-modeled',
    label:
      'DUE KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng mã trong bảng điểm chuẩn đã đọc được (chỉ có mã xét tuyển + điểm, không có cột tổ hợp) — module chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn, không giới hạn theo mã.',
    status: 'incomplete',
    sourceId: 'dueudn-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không loại được tổ hợp không hợp lệ theo quy định thực tế của từng mã (nếu có) — người dùng cần tự xác nhận tổ hợp mình chọn được ngành đó chấp nhận.',
  },
  {
    id: 'dueudn-pr-gb-el-not-modeled',
    label:
      'DUE công bố 17/36 mã xét tuyển thuộc nhóm "PR - Bán phần tiếng Anh" / "GB - Toàn phần tiếng Anh" / "EL - DUE-Elite", phương thức "Xét kết hợp HB + tiếng Anh" (không phải thi TN THPT thuần, cần điểm học bạ + chứng chỉ tiếng Anh quốc tế) — công thức trọng số cụ thể chưa xác minh, không mô hình hoá.',
    status: 'incomplete',
    sourceId: 'dueudn-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển các chương trình song ngữ/toàn phần tiếng Anh (Marketing số, Ngoại thương, Kinh tế quốc tế PR...) chưa tính được qua UniscoreVN cho DUE.',
  },
  {
    id: 'dueudn-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'dueudn-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
