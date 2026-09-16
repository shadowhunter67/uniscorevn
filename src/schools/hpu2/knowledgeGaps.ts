import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hpu2KnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hpu2-priority-value-silent',
    label:
      'Nguồn điểm chuẩn (Cổng TTĐT Chính phủ, 10/8/2026) KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của trường. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV.',
    status: 'incomplete',
    sourceId: 'hpu2-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'hpu2-combinations-not-modeled',
    label:
      'HPU2 KHÔNG công bố tổ hợp môn xét tuyển riêng theo từng ngành trong nguồn đã đọc được (bảng điểm chuẩn chỉ có mã ngành + điểm, không có cột tổ hợp) — module chấp nhận bất kỳ tổ hợp 3 môn nào người dùng chọn, không giới hạn theo ngành.',
    status: 'incomplete',
    sourceId: 'hpu2-cutoff-2026',
    scoreAffecting: false,
    impact: 'Không loại được tổ hợp không hợp lệ theo quy định thực tế của từng ngành (nếu có) — người dùng cần tự xác nhận tổ hợp mình chọn được ngành đó chấp nhận.',
  },
  {
    id: 'hpu2-two-subject-programs-not-modeled',
    label:
      'Giáo dục Thể chất, Giáo dục Mầm non, Quản lý thể dục thể thao dùng tổ hợp 2 môn văn hoá + thi năng khiếu (không phải 3-môn chuẩn) — chưa mô hình hoá vì không có SubjectId/kết cấu đầu vào cho điểm năng khiếu.',
    status: 'incomplete',
    sourceId: 'hpu2-admission-info-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển 3 ngành này chưa tính được qua UniScoreVN cho HPU2.',
  },
  {
    id: 'hpu2-other-methods-not-modeled',
    label:
      'HPU2 còn xét tuyển thẳng/ưu tiên, học bạ (một số ngành), đánh giá năng lực SP2E (trường tự tổ chức) hoặc H-SCA (ĐH Sư phạm TP.HCM) — chỉ phương thức thi TN THPT 3-môn được mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hpu2-admission-info-2026',
    scoreAffecting: false,
  },
  {
    id: 'hpu2-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'hpu2-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế cần tiêu chí phụ khác (nếu có) để trúng tuyển — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
