import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tuuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tuu-conditional-programs-not-modeled',
    label:
      '4/25 ngành có điều kiện phụ ngoài tổng điểm 3 môn, chưa mô hình hoá: Luật (7380101)/Luật kinh tế (7380107) — Toán và Ngữ văn mỗi môn ≥6,0, tổng ĐXT ≥18; Ngôn ngữ Anh (7220201)/QTKD-IPOP (7340101P) — môn Tiếng Anh ≥7,0.',
    status: 'official-but-unparsed',
    sourceId: 'tuu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'tuu-priority-not-restated-for-pt100',
    label:
      'Đề án nêu công thức "ĐXT = tổng 3 môn + Điểm cộng + Điểm ưu tiên" cho phương thức học bạ/ĐGNL; mục phương thức thi TN THPT chỉ nêu ngưỡng + điều kiện + điểm cộng, không lặp lại công thức trên (nhưng cũng không loại trừ điểm ưu tiên) — điểm ưu tiên áp dụng theo khung quốc gia (judgment call), không phải trích dẫn trực tiếp từ mục phương thức thi THPT.',
    status: 'official-but-unparsed',
    sourceId: 'tuu-admission-info-2026',
    scoreAffecting: true,
  },
  {
    id: 'tuu-bonus-points-not-modeled',
    label:
      'Điểm cộng (giải HSG cấp tỉnh/thành phố trực thuộc trung ương: Nhất 1,5/Nhì 1,25/Ba 1,0, tối đa 10% thang điểm) chưa được tính vào Điểm xét tuyển — app chưa thu thập input thành tích.',
    status: 'official-but-unparsed',
    sourceId: 'tuu-admission-info-2026',
    scoreAffecting: true,
  },
  {
    id: 'tuu-foreign-language-combos-not-modeled',
    label:
      'Một số tổ hợp chính thức dùng môn A03/C07/X71 (chưa có trong `SubjectId`) hoặc năng khiếu — chỉ tổ hợp dùng môn đã hỗ trợ được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'tuu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'tuu-other-methods-not-modeled',
    label:
      'TUU 2026 còn phương thức xét tuyển thẳng (301), học bạ (200), ĐGNL Trường ĐHSP Hà Nội (402), đơn đặt hàng (500) — chỉ phương thức thi TN THPT (100) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'tuu-admission-info-2026',
  },
];
