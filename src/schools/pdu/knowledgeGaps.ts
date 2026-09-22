import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pdu-mamnon-not-modeled',
    label:
      'Ngành Giáo dục Mầm non (51140201, điểm chuẩn 23,24/30) là trình độ CAO ĐẲNG (khác cấp đào tạo với 13 ngành đại học còn lại) và xét theo tổ hợp năng khiếu M01 (Ngữ văn + Năng khiếu 1 + Năng khiếu 2)/M09 (Toán + NK1 + NK2) — môn năng khiếu không có SubjectId tương ứng trong hệ thống UniscoreVN — KHÔNG mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'pdu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Giáo dục Mầm non (cao đẳng) chưa tính được qua UniscoreVN cho PDU.',
  },
  {
    id: 'pdu-hocba-dgnl-dubi-branch-not-modeled',
    label:
      'PDU 2026 còn 3 phương thức khác cho bậc đại học: Phương thức 2 (xét học bạ THPT), Phương thức 3 (kết quả ĐGNL ĐHQG-HCM), Phương thức 4 (dự bị đại học) — module này CHỈ mô hình hoá Phương thức 1 (thi TN THPT 2026).',
    status: 'official-but-unparsed',
    sourceId: 'pdu-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ, ĐGNL, hoặc diện dự bị đại học chưa tính được qua UniscoreVN cho PDU.',
  },
];
