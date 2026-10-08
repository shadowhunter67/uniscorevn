import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tdu-program-threshold-table-not-imported',
    label:
      'Bang ngưỡng đãy du 29 mã ngành (Thông báo 725/TB-DHTD, chính thức) DA nhap va dung cho nhanh exact (tdu-thpt-exam-exact-2026, phạm vi 24 ma ngoai Dược/Điều dưỡng/Luật). Nhom Dược học/Điều dưỡng/Luật/Luật kinh tế/Luật quốc tế (5 ma, điều kiện phu học lực cho thí sinh tot nghiep truoc 2025) van ngoai phạm vi — xem sources.ts.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'Dai điểm chung: 15,0 - 20,0/30',
      'Mức cao nhat 20,0/30: Duoc hoc, Luat, Luat kinh te, Luat quoc te',
    ],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tdu-transcript-vsat-danggia-not-modeled',
    label: 'TDU 2026 con co phương thức học bạ, V-SAT (Đại học Cần Thơ to chuc), danh gia năng lực DHQG TP.HCM, va học bạ kết hợp phỏng vấn; chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'tdu-admission-info-2026',
  },
];
