import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const mtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'mtu-other-methods-not-modeled',
    label: 'MTU còn 3 phương thức khác (ĐGNL ĐHQG-HCM ≥550-600/1200, V-SAT ĐH Cần Thơ ≥225, học bạ) chưa chuẩn hoá — chỉ Phương thức 1 (thi TN THPT) có nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'mtu-admission-info-2026',
    scoreAffecting: true,
    knownData: ['ĐGNL ĐHQG-HCM: ≥550-600/1200 (tùy ngành)', 'V-SAT ĐH Cần Thơ: ≥225/tổng tổ hợp'],
    impact: 'UniscoreVN chỉ kiểm tra/tính được cho Phương thức 1 (thi TN THPT).',
  },
  {
    id: 'mtu-english-certificate-not-modeled',
    label: 'Bảng quy đổi chứng chỉ tiếng Anh (IELTS/TOEFL/TOEIC/Aptis) thay thế điểm môn Tiếng Anh trong tổ hợp chưa model trong ApplicantProfile.',
    status: 'incomplete',
    sourceId: 'mtu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
];
