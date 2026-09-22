import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const usthKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'usth-other-methods-not-modeled',
    label: 'USTH 2026 còn 3 phương thức khác: PT1 (thi đánh giá năng lực do trường tổ chức, thang 100), PT2 (học tập THPT kết hợp phỏng vấn, thang 100), PT3 (xét tuyển thẳng); chỉ PT4 (mã 100, thi TN THPT, thang 30) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'usth-scheme-2026',
  },
  {
    id: 'usth-aviation-dual-degree-out-of-scope',
    label: 'Kỹ thuật Hàng không (7520120) và 3 chương trình song bằng Việt-Pháp không xét tuyển qua PT4 (chỉ PT1/PT2/PT3, thang 100) — ngoài phạm vi bảng điểm chuẩn PT4.',
    status: 'official-but-unparsed',
    sourceId: 'usth-cutoff-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
