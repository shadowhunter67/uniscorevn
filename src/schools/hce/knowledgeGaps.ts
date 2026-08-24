import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hceKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hce-program-threshold-table-not-imported',
    label: 'Bảng điểm sàn HCE 2026 theo từng ngành (trong khoảng 15-17/30) chưa được nhập đầy đủ theo từng mã ngành.',
    status: 'official-but-unparsed',
    sourceId: 'hce-threshold-2026',
    scoreAffecting: true,
    knownData: ['Điểm sàn thi THPT dao động 15-17/30 tùy ngành, 22 ngành đào tạo năm 2026'],
    impact: 'Compare chỉ loại chắc chắn hồ sơ dưới 15/30 và công nhận đạt chắc chắn từ 17/30 trở lên; hồ sơ trong khoảng 15-17/30 chưa kết luận được vì chưa rõ ngưỡng của ngành cụ thể.',
  },
  {
    id: 'hce-other-methods-not-modeled',
    label: 'HCE còn 4 phương thức khác (xét tuyển thẳng, kết hợp chứng chỉ ngoại ngữ, học bạ kết hợp chứng chỉ, ĐGNL ĐHQG-HCM) chưa được chuẩn hóa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hce-admission-methods-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
