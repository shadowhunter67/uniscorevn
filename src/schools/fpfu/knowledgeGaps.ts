import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const fpfuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'fpfu-primary-source-unverified',
    label:
      'FPFU 2026 (hệ dân sự): ngưỡng/điểm chuẩn 15,00/30, 4 tổ hợp A00/A01/D07/D01, 250 chỉ tiêu và việc tổng 3 môn đã gồm điểm ưu tiên ĐÃ xác nhận trực tiếp từ trang chính thức mới (hocvienpccc.bocongan.gov.vn, 10/08/2026). Chưa đọc trang thông tin tuyển sinh gốc (domain cũ daihocpccc.bocongan.gov.vn đã gỡ) nên công thức chi tiết Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu tiên (Điều 7 TT 06/2026/TT-BGDĐT) vẫn dựa vào đối chiếu báo chí.',
    status: 'official-but-unparsed',
    sourceId: 'fpfu-cutoff-notice-hocvien-2026',
    scoreAffecting: false,
    knownData: ['Điểm chuẩn hệ dân sự: 15,00/30 điểm, 4 tổ hợp A00/A01/D07/D01, chỉ tiêu 250 (nguồn chính thức, 10/08/2026)'],
    impact: 'Ngưỡng và tổ hợp đã khớp nguồn chính thức; chỉ còn công thức điểm ưu tiên chi tiết chưa đọc trực tiếp từ văn bản gốc.',
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
