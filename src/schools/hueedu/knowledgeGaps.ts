import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hueeduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hueedu-program-threshold-table-not-fully-mapped',
    label: 'Bảng điểm xét tuyển HUEEDU 2026 theo từng ngành/mã xét tuyển (22 ngành, Phụ lục 1 Đại học Huế) đã xác minh nhưng chưa nhập theo từng mã ngành cụ thể vào runtime; hệ thống mới kiểm tra được theo khoảng 16,00-22,75/30.',
    status: 'official-but-unparsed',
    sourceId: 'hueedu-hueu-threshold-appendix-2026',
    scoreAffecting: true,
    knownData: [
      'Phần lớn ngành sư phạm/giáo dục: 20,00/30',
      'Sư phạm Âm nhạc: 19,00/30 (điểm năng khiếu >=5)',
      'Giáo dục mầm non: 20,00/30 (điểm năng khiếu >=5)',
      'Tâm lý học giáo dục, Hệ thống thông tin: 16,00/30',
      'Vật lý kỹ thuật (Công nghệ vật liệu và kỹ thuật hạt nhân): 18,00/30',
      'Kỹ thuật công nghiệp (liên kết INSA CVL): 22,00/30 kèm điều kiện Toán TN THPT >=7,5',
      'Vật lý kỹ thuật (Bán dẫn và Thiết kế vi mạch): 22,75/30 kèm điều kiện top 20% điểm Toán toàn quốc',
    ],
    impact: 'Compare chỉ loại chắc chắn hồ sơ dưới 16/30 và công nhận đạt chắc chắn từ 22,75/30 trở lên; hồ sơ trong khoảng 16-22,75/30 chưa kết luận được vì chưa rõ ngưỡng của đúng mã ngành đã chọn.',
  },
  {
    id: 'hueedu-other-methods-not-modeled',
    label: 'HUEEDU còn các phương thức khác (xét tuyển thẳng/ưu tiên, xét học bạ cho 3 ngành Hệ thống thông tin/Tâm lý học giáo dục/Vật lý kỹ thuật, đánh giá năng lực, xét tuyển kết hợp chứng chỉ ngoại ngữ/năng khiếu) chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hueedu-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
  {
    id: 'hueedu-teacher-training-moet-floor-not-cross-checked',
    label: 'Ngưỡng đảm bảo chất lượng đầu vào khối ngành đào tạo giáo viên theo Thông tư 06/2026/TT-BGDĐT (Bộ GDĐT) áp dụng đồng thời với ngưỡng Đại học Huế, nhưng bảng quy đổi/áp dụng chi tiết theo Thông tư 06 chưa được đối chiếu từng ngành trong runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hueedu-hueu-threshold-appendix-2026',
    scoreAffecting: false,
    impact: 'Với các ngành sư phạm/pháp luật/sức khỏe, thí sinh phải đạt đồng thời cả hai ngưỡng; UniscoreVN hiện chỉ kiểm tra ngưỡng do Đại học Huế công bố.',
  },
];
