import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnueKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnue-priority-value-silent',
    label:
      'Thông báo điểm trúng tuyển (tuyensinh.tnue.edu.vn, 09/8/2026) KHÔNG tự công bố bảng mức điểm ưu tiên khu vực/đối tượng cụ thể. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV/HPU2.',
    status: 'incomplete',
    sourceId: 'tnue-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'tnue-aptitude-programs-not-modeled',
    label:
      'Giáo dục Thể chất (T01), Sư phạm Âm nhạc (N01), Huấn luyện thể thao (T11) dùng tổ hợp năng khiếu — không có SubjectId tương ứng trong hệ thống — chưa mô hình hoá.',
    status: 'incomplete',
    sourceId: 'tnue-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển 3 ngành này chưa tính được qua UniScoreVN cho TNUE.',
  },
  {
    id: 'tnue-tiebreak-criteria-not-modeled',
    label:
      'Một số ngành (Sư phạm Hoá học, Sư phạm Tiếng Anh, Sư phạm Tin học) công bố "Tiêu chí phụ" (vd Điểm cộng=0 & Điểm môn cốt lõi >= ngưỡng riêng) áp dụng cho thí sinh ở cuối danh sách trúng tuyển (bằng điểm chuẩn) — chưa mô hình hoá trong bộ tính điểm.',
    status: 'incomplete',
    sourceId: 'tnue-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn ở 3 ngành này có thể được báo "eligible" dù thực tế cần đáp ứng thêm tiêu chí phụ — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
  {
    id: 'tnue-other-methods-not-modeled',
    label: 'TNUE 2026 còn phương thức học bạ/đánh giá năng lực (V-SAT-TNU, HSA, ĐGNL ĐH Sư phạm Hà Nội), xét tuyển thẳng — chỉ phương thức thi TN THPT được mô hình hoá.',
    status: 'incomplete',
    sourceId: 'tnue-cutoff-2026',
    scoreAffecting: false,
  },
];
