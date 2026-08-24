import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const humgKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'humg-program-catalog-partially-imported',
    label:
      'Bảng ngưỡng HUMG 2026 công bố khoảng 53 chương trình (15-21/30); chỉ 7 chương trình có tên ngành tiếng Việt + mã ngành xác nhận chắc chắn được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'humg-admission-2026',
    scoreAffecting: false,
    knownData: [
      '7220201 Ngôn ngữ Anh: 17/30',
      '7440201 Địa chất học: 16/30',
      '7480201 Công nghệ thông tin: 19/30',
      '7520103 Kỹ thuật cơ khí: 18/30',
      '7520216 Kỹ thuật điều khiển và tự động hoá: 20/30',
      '7580201 Kỹ thuật xây dựng: 17/30',
      '7850101 Quản lý tài nguyên và môi trường: 16/30',
    ],
    missingData: ['~46 chương trình còn lại trong bảng ngưỡng HUMG 2026 (bao gồm các chương trình chất lượng cao/tài năng 21/30)'],
    impact: 'Runtime chỉ kết luận được cho 7 mã ngành đã xác nhận; các mã ngành khác vẫn ở trạng thái chưa xác định.',
  },
  {
    id: 'humg-conversion-table-not-imported',
    label: 'Bảng quy đổi điểm cho các phương thức khác (học bạ, TSA, HSA, hồ sơ năng lực) và điểm khuyến khích/cộng chưa được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'humg-admission-2026',
    scoreAffecting: true,
    impact: 'Runtime chỉ hỗ trợ phương thức xét điểm thi TN THPT; các phương thức khác chưa được model hóa.',
  },
];
