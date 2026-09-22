import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dpdKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dpd-program-coverage-partial',
    label:
      'DPD có tổng ~39 chương trình đào tạo (6 khoa) nhưng infographic điểm chuẩn 2026 đã đọc chỉ liệt kê 14 chương trình (khối Công nghệ/Kinh doanh). Các chương trình còn lại (vd Ngôn ngữ Anh, Ngôn ngữ Trung, Kiến trúc, Xây dựng...) chưa có điểm chuẩn thật trong nguồn đã đọc.',
    status: 'official-but-unparsed',
    sourceId: 'dpd-cutoff-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'dpd-program-code-not-found',
    label: 'Nguồn điểm chuẩn không kèm mã ngành/mã xét tuyển — runtime dùng slug tên chương trình làm khoá thay vì mã ngành MOET (tránh đoán sai, score-affecting).',
    status: 'official-but-unparsed',
    sourceId: 'dpd-cutoff-2026',
    scoreAffecting: false,
  },
  {
    id: 'dpd-other-methods-not-modeled',
    label: 'DPD 2026 còn phương thức học bạ (mã 200/406) và ĐGNL/ĐGTD (mã 402); chỉ phương thức thi TN THPT (mã 100/405) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'dpd-cutoff-2026',
  },
];
