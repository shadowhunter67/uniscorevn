import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const tksKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'tks-procuracy-branch-not-modeled',
    label: 'Ngành Luật, chuyên ngành Kiểm sát có điểm chuẩn riêng theo KHU VỰC (Miền Bắc/Miền Nam) và GIỚI TÍNH (Nam/Nữ: 23,72-26,32/30) — ApplicantProfile không có trường giới tính, ngoài phạm vi nhánh exact.',
    status: 'incomplete',
    sourceId: 'tks-cutoff-notice-2026',
    scoreAffecting: false,
    knownData: ['Miền Bắc Nam: 25,65', 'Miền Bắc Nữ: 26,32', 'Miền Nam Nam: 23,72', 'Miền Nam Nữ: 24,60'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'tks-pre-screening-not-modeled',
    label: 'TKS yêu cầu thí sinh phải "Đạt sơ tuyển" (Phiếu đạt sơ tuyển do VKSND cấp tỉnh cấp, chỉ áp dụng ngành Kiểm sát) — điều kiện hồ sơ ngoài phạm vi điểm số.',
    status: 'incomplete',
    sourceId: 'tks-cutoff-notice-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'tks-other-methods-not-modeled',
    label: 'TKS còn phương thức xét học bạ và ĐGNL ĐHQG HN/HCM chưa chuẩn hoá — chỉ phương thức thi TN THPT có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'tks-conversion-table-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho phương thức thi TN THPT.',
  },
];
