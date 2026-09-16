import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dutKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dut-priority-value-silent',
    label:
      'Bảng "Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026" (ts.udn.vn) KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của DUT. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV/HPU2/TNUE/TNUFL.',
    status: 'incomplete',
    sourceId: 'dut-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'dut-combinations-not-modeled',
    label:
      'DUT KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng ngành trong bảng điểm chuẩn đã đọc được (chỉ có mã ngành + điểm, không có cột tổ hợp) — module chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn, không giới hạn theo ngành.',
    status: 'incomplete',
    sourceId: 'dut-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không loại được tổ hợp không hợp lệ theo quy định thực tế của từng ngành (nếu có) — người dùng cần tự xác nhận tổ hợp mình chọn được ngành đó chấp nhận.',
  },
  {
    id: 'dut-conversion-coefficient-not-needed',
    label:
      'DUT công bố áp dụng MỘT ngưỡng chung sau khi quy đổi tương đương giữa các phương thức (thi TN THPT, Đánh giá tư duy ĐHBK Hà Nội, xét tuyển thẳng). Bảng điểm chuẩn theo ngành đã đọc được (`dut-cutoff-2026`) ghi RIÊNG cột phương thức "Xét điểm thi THPT" cho mọi ngành DUT — module chỉ dùng đúng cột này, không cần hệ số quy đổi giữa các phương thức khác.',
    status: 'incomplete',
    sourceId: 'dut-admission-info-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng Đánh giá tư duy ĐHBK Hà Nội hoặc xét tuyển thẳng chưa tính được qua UniscoreVN cho DUT (dù điểm chuẩn thi TN THPT đã công bố và mô hình hoá đầy đủ).',
  },
  {
    id: 'dut-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'dut-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
