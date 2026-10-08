import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uahKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uah-program-threshold-table-not-imported',
    label:
      'UAH 2026 công bố ngưỡng theo từng ngành cụ thể (Thông báo 975/TB-HDTS). Batch 2026-08-26 đã đọc truc tiep bản PDF gốc (không cón chi qua báo chí Tuoi Tre) va xác nhận dung so cho ngành Kỹ thuật cơ sở hạ tầng (16,00/30, xem `uah-thpt-exam-ktcsht-2026` — exact calculator riêng). Các ngành còn lại (Kiến trúc, Quy hoạch, Thiết kế...) vẫn chỉ dừng ở mức đã có số ngưỡng (đọc được từ cùng PDF) nhưng CHƯA đóng thành exact calculator vì đa số dùng tổ hợp có môn năng khiếu (V00/V01/V02/H01/H06 — xem gap `uah-talent-subject-coefficient-not-modeled`).',
    status: 'official-but-unparsed',
    sourceId: 'uah-notice-975-pdf-2026',
    scoreAffecting: true,
    knownData: [
      '21/30: thiết kế cong nghiep, thiết kế đồ họa, thiết kế thời trang (chương trình chuẩn va định hướng quốc tế)',
      '20/30: kien truc, thiet ke noi that (co so TPHCM, Cần Tho, Da Lat, va chuong trinh dinh huong quoc te)',
      '18/30: quy hoach vung va do thi, kien truc canh quan, my thuat do thi',
      '17/30: kỹ thuật xây dựng, quản lý xây dựng',
      '16/30: kỹ thuật cơ sở hạ tầng (đã lên exact calculator)',
      '15/30: thiet ke do thi (chuong trinh tien tien, yeu cau tieng Anh)',
    ],
    impact: 'Runtime tính exact cho ngành Kỹ thuật cơ sở hạ tầng; các ngành khác vẫn chỉ kiểm tra được ngưỡng (không tính điểm xét tuyển cuối) do thiếu công thức hệ số môn năng khiếu.',
  },
  {
    id: 'uah-talent-subject-coefficient-not-modeled',
    label:
      'Các ngành khối V (Vẽ Mỹ thuật) và khối H (Vẽ Trang trí màu) — Kiến trúc, Quy hoạch vùng và đô thị, Kiến trúc cảnh quan, Thiết kế nội thất, Thiết kế đồ họa, Mỹ thuật đô thị... — dùng công thức có hệ số (vd "(Toán×1,5 + Môn2 + Vẽ Mỹ thuật×2)×2/3", mục 4.2 Thông báo 391/TB-HĐTS) và cần điểm thi năng khiếu riêng do UAH tổ chức. `SubjectId` (core/subjects.ts) hiện không có môn năng khiếu/vẽ — chưa mô hình hoá được input này.',
    status: 'official-but-unparsed',
    sourceId: 'uah-notice-391-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Không suy đoán điểm năng khiếu bằng proxy nào khác — đây là kỳ thi riêng UAH tổ chức, không nằm trong dữ liệu điểm thi TN THPT/học bạ chuẩn.',
    impact: 'Phần lớn ngành UAH (trừ Kỹ thuật cơ sở hạ tầng, Quản lý xây dựng — khối A/C/D thuần) chưa lên được exact calculator vì lý do này.',
  },
  {
    id: 'uah-ability-assessment-not-modeled',
    label: 'UAH con xét tuyển theo kết quả ky thi danh gia năng lực DHQG TP.HCM va các phương thức khác (học bạ, ...); chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'uah-notice-391-2026',
  },
];
