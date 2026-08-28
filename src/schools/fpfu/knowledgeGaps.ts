import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fpfuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fpfu-primary-source-unverified',
    label:
      'FPFU 2026 (hệ dân sự) có ngưỡng chung 15,00/30 (thi TN THPT, 4 tổ hợp A00/A01/D07/D01) và công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu tiên (Điều 7 TT 06/2026/TT-BGDĐT) xác nhận qua 2 báo nhà nước độc lập + 2 lượt tra cứu độc lập trang tuyển sinh chính thức; trang gốc daihocpccc.bocongan.gov.vn vẫn không fetch trực tiếp được (DNS/mạng bị chặn trong môi trường research, xác nhận lại 2026-08-28).',
    status: 'official-but-unparsed',
    sourceId: 'fpfu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng thi TN THPT hệ dân sự: 15,00/30 điểm, 4 tổ hợp A00/A01/D07/D01, chỉ tiêu 250'],
    impact: 'Runtime kiểm tra được ngưỡng và điểm ưu tiên (mức chuẩn toàn quốc, judgment call), nhưng chưa xác nhận trực tiếp từ văn bản gốc; cần re-fetch daihocpccc.bocongan.gov.vn từ môi trường mạng khác để nâng độ tin cậy.',
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
