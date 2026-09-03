import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const thanglongKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'thanglong-priority-value-silent',
    label:
      'Cả 2 thông báo gốc (điểm trúng tuyển + quy tắc quy đổi) đều KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ HLUV/HAT/HUMP.',
    status: 'incomplete',
    sourceId: 'thanglong-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TLU-HN tự công bố riêng.',
  },
  {
    id: 'thanglong-group4-not-modeled',
    label:
      '2 ngành Thanh nhạc (7210205, 18,00/30) và Thiết kế đồ hoạ (7210403, 20,00/30) thuộc Nhóm 4 — theo Thông báo 25072301/TB-ĐHTL, nhóm này "không có tổ hợp gốc" và không có bảng quy đổi (chỉ xét bằng 1 phương thức duy nhất — học bạ kết hợp thi năng khiếu), dùng tổ hợp năng khiếu không có SubjectId tương ứng trong hệ thống UniscoreVN — KHÔNG mô hình hoá.',
    status: 'incomplete',
    sourceId: 'thanglong-combo-delta-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Thanh nhạc hoặc Thiết kế đồ hoạ chưa tính được qua UniscoreVN cho TLU-HN.',
  },
  {
    id: 'thanglong-foreign-language-combo-not-modeled',
    label:
      'Nhóm 2 (gốc D01) còn 3 tổ hợp D04, D06, DD2 (chênh lệch 0 so với D01) dùng ngoại ngữ Trung/Nga/Đức làm môn thứ 3 — các môn ngoại ngữ này không có SubjectId tương ứng trong hệ thống UniscoreVN (chỉ có "english") — KHÔNG mô hình hoá, bỏ khỏi bảng chênh lệch (`combos.ts`).',
    status: 'incomplete',
    sourceId: 'thanglong-combo-delta-2025',
    scoreAffecting: false,
    impact: 'Thí sinh dùng tổ hợp D04/D06/DD2 chưa tính được qua UniscoreVN cho TLU-HN (vẫn tính được qua D01 hoặc các tổ hợp khác đã mô hình hoá trong cùng nhóm).',
  },
  {
    id: 'thanglong-other-methods-not-modeled',
    label:
      'TLU-HN 2025 còn 4 phương thức khác (chứng chỉ ngoại ngữ quốc tế kết hợp thi TN THPT; HSA/TSA/SPT; học bạ; học bạ kết hợp năng khiếu) — module này CHỈ mô hình hoá phương thức 1 (xét kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'thanglong-combo-delta-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho TLU-HN.',
  },
];
