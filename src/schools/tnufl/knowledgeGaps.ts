import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tnuflKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tnufl-priority-value-silent',
    label:
      'Nguồn điểm chuẩn (tnu.edu.vn) KHÔNG kèm bảng mức điểm ưu tiên khu vực/đối tượng cụ thể của trường. Dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho GIÁ TRỊ bảng (`priority.ts`), cùng tiền lệ DLA/BMTU/DNU/TUEBA/PVU/HTU/TUMP/NAEM/MKU/PYU/DHV/HPU2/TNUE.',
    status: 'incomplete',
    sourceId: 'tnufl-cutoff-2026',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng khung quốc gia hiện hành, không phải bảng riêng của trường (trường không công bố bảng riêng).',
  },
  {
    id: 'tnufl-chinese-korean-programs-not-modeled',
    label:
      'Ngôn ngữ Trung Quốc (20,60/30), Ngôn ngữ Hàn Quốc (16,00/30), Sư phạm Tiếng Trung Quốc (26,60/30) dùng điểm thi ngoại ngữ Trung/Hàn làm 1 trong 3 môn tổ hợp — hệ thống SubjectId chỉ có "english" là ngoại ngữ duy nhất, không có Trung/Hàn — không mô hình hoá.',
    status: 'incomplete',
    sourceId: 'tnufl-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển 3 ngành này chưa tính được qua UniScoreVN cho TNUFL.',
  },
  {
    id: 'tnufl-combination-per-program-not-confirmed',
    label:
      'Trang công bố phương thức xét tuyển chỉ liệt kê 8 tổ hợp DÙNG CHUNG TOÀN TRƯỜNG, không xác nhận riêng Ngôn ngữ Anh/Sư phạm Tiếng Anh dùng đúng tập con nào — module chấp nhận cả 4 tổ hợp khớp hệ thống có Tiếng Anh (D01/D14/D15/X78) cho cả 2 ngành.',
    status: 'incomplete',
    sourceId: 'tnufl-combinations-2026',
    scoreAffecting: false,
    impact: 'Có thể chấp nhận tổ hợp không thực sự áp dụng cho 1 trong 2 ngành (nếu trường có giới hạn riêng chưa công bố công khai).',
  },
  {
    id: 'tnufl-other-methods-not-modeled',
    label: 'TNUFL 2026 công bố 5 phương thức (xét tuyển thẳng, thi TN THPT, kết hợp THPT + chứng chỉ ngoại ngữ quốc tế, V-SAT, dự bị đại học); chỉ phương thức thi TN THPT được mô hình hoá.',
    status: 'incomplete',
    sourceId: 'tnufl-cutoff-2026',
    scoreAffecting: false,
  },
  {
    id: 'tnufl-tiebreak-not-modeled',
    label: 'Không tìm thấy văn bản nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức thi TN THPT — module không mô hình hoá tiêu chí phụ cho trường hợp bằng điểm chuẩn.',
    status: 'incomplete',
    sourceId: 'tnufl-cutoff-2026',
    scoreAffecting: false,
  },
];
