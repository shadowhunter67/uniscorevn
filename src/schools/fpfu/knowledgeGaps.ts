import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fpfuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fpfu-primary-source-unverified',
    label:
      'FPFU 2026 (hệ dân sự) có ngưỡng chung 15,00/30 (thi TN THPT, 4 tổ hợp A00/A01/D07/D01) chỉ xác minh được qua 2 báo nhà nước độc lập; trang gốc daihocpccc.bocongan.gov.vn không fetch trực tiếp được trong lượt research này (DNS/mạng bị chặn trong môi trường research).',
    status: 'official-but-unparsed',
    sourceId: 'fpfu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng thi TN THPT hệ dân sự: 15,00/30 điểm, 4 tổ hợp A00/A01/D07/D01, chỉ tiêu 250'],
    impact: 'Runtime kiểm tra được ngưỡng chung, nhưng chưa xác nhận trực tiếp từ văn bản gốc; cần re-fetch daihocpccc.bocongan.gov.vn từ môi trường mạng khác để nâng độ tin cậy.',
  },
  {
    id: 'fpfu-additional-criteria-not-modeled',
    label: 'Điều kiện sức khỏe, lý lịch, và các tiêu chí xét tuyển khác ngoài điểm thi (đặc thù trường Công an/PCCC) chưa được mô hình hoá.',
    status: 'incomplete',
    sourceId: 'fpfu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Đạt ngưỡng điểm không đồng nghĩa đủ điều kiện trúng tuyển; hệ dân sự FPFU còn có sơ tuyển sức khỏe/lý lịch riêng chưa mô hình hoá trong runtime.',
  },
];
