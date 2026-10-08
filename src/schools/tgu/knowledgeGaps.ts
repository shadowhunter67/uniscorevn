import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tgu-mon-chinh-subscore-rule-not-modeled',
    label: 'Da model điều kiện môn chinh cho phạm vi "các ngành khác" (evaluậteTguThptExamExactAdmission, Toán/Ngữ văn >= 1/3 DXT). Rieng ngành Luật (điều kiện riêng: Toán hoặc Ngữ văn >= 6,0, kem điều kiện học lực) năm ngoai phạm vi phương thức exact — chưa model.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-scheme-2026',
    scoreAffecting: false,
    knownData: [
      'Đa số ngành (da model): tổng 3 môn >= 15,0/30 VA (điểm Toán hoặc Ngữ văn) >= 1/3 điểm xét tuyển',
      'Luật (chưa model): tổng 3 môn >= 18,0/30 VA (điểm Toán hoặc Ngữ văn) >= 6,0, kem điều kiện học lực lớp 12',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tgu-other-methods-not-modeled',
    label: 'TGU 2026 con co phương thức học bạ, V-SAT, danh gia năng lực DHQG TP.HCM, va xét tuyển thẳng; chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'tgu-admission-info-2026',
  },
];
