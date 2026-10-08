import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnufKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuf-transcript-ability-methods-not-modeled',
    label: 'VNUF 2026 con co phương thức 200 (học bạ, tổng 3 môn >= 18,0/30), 402 (danh gia năng lực/tư duy: DHQG Hà Nội >=35, DH Bach Khoa Hà Nội >=35, DHQG TP.HCM >=600) va 301 (xét tuyển thẳng); chi phương thức 100 (thi TN THPT) được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'vnuf-admission-scheme-2026',
    knownData: [
      'Phương thức 200 (học bạ): tổng 3 môn >= 18,0/30 (chương trình chính quy tap trung); 15,0/30 (vua lam vua hoc/lien thong)',
      'Phương thức 402 (danh gia năng lực): DHQG Hà Nội >= 35 điểm; DH Bach Khoa Hà Nội >= 35 điểm; DHQG TP.HCM >= 600 điểm',
    ],
  },
  {
    id: 'vnuf-bonus-priority-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Thong tu 06 được để cap nhung chưa được trien khai trong bo tính điểm.',
    status: 'incomplete',
    sourceId: 'vnuf-admission-scheme-2026',
    impact: 'Bo tính điểm chưa tinh được điểm xét tuyển cuoi cung, chi kiểm tra ngưỡng đãu vao.',
  },
];
