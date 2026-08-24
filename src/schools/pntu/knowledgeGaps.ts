import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pntuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pntu-program-catalog-partially-imported',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào 2026 của PNTU công bố dải 15,5-22,5/30 cho toàn bộ chương trình đào tạo (khoảng 15+ ngành); chỉ 3 ngành có tên + mã ngành + điểm sàn xác nhận chắc chắn qua báo chí đối chiếu (Y khoa, Răng-Hàm-Mặt, Tâm lý học) được nhập vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'pntu-threshold-notice-2026',
    scoreAffecting: false,
    knownData: ['7720101 Y khoa: 22.5/30', '7720501 Răng - Hàm - Mặt: 22.5/30', '7310401 Tâm lý học: 15.5/30'],
    missingData: ['Các ngành còn lại trong bảng ngưỡng PNTU 2026 (Dược học, Điều dưỡng, Y tế công cộng, Kỹ thuật xét nghiệm y học, ...)'],
    impact: 'Runtime chỉ kết luận được cho 3 ngành đã xác nhận; các ngành khác vẫn ở trạng thái chưa xác định.',
  },
  {
    id: 'pntu-priority-not-modeled',
    label: 'Quy định cộng điểm ưu tiên khu vực/đối tượng (Bộ GD&ĐT) chưa được nhập vào runtime.',
    status: 'incomplete',
    impact: 'Ngưỡng đã nhập chỉ áp dụng cho thí sinh khu vực 3, không cộng điểm; runtime chưa xử lý điểm ưu tiên.',
    sourceId: 'pntu-threshold-notice-2026',
  },
  {
    id: 'pntu-direct-admission-not-modeled',
    label: 'Phương thức xét tuyển thẳng (mã phương thức 301) chưa được mô hình hoá; runtime chỉ hỗ trợ phương thức xét kết quả thi TN THPT (mã 100).',
    status: 'incomplete',
    impact: 'Không kiểm tra được điều kiện tuyển thẳng.',
    sourceId: 'pntu-admission-2026',
  },
];
