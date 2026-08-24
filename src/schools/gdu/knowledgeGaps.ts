import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const gduKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'gdu-health-law-scope-excluded',
    label:
      'Ngưỡng 15,0/30 chỉ áp dụng cho nhóm ngành IT/truyền thông/quản trị/kinh doanh/tài chính-ngân hàng/khoa học xã hội/ngôn ngữ quốc tế. Khối Sức khỏe (Răng Hàm Mặt 22,0 thi THPT/20,0 học bạ; Điều dưỡng, Kỹ thuật phục hồi chức năng 18,0 thi THPT/16,5 học bạ) và Luật/Luật kinh tế (20,0 thi THPT/18,0 học bạ) chưa được mô hình hoá riêng.',
    status: 'official-but-unparsed',
    sourceId: 'gdu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: [
      'Điểm chuẩn Răng Hàm Mặt: 22,0/30 (thi TN THPT), 20,0/30 (học bạ)',
      'Điểm chuẩn Luật, Luật kinh tế: 20,0/30 (thi TN THPT), từ 18,0/30 (học bạ)',
      'Điểm chuẩn Điều dưỡng, Kỹ thuật phục hồi chức năng: 18,0/30 (thi TN THPT), từ 16,5/30 (học bạ)',
    ],
    impact: 'Runtime chỉ đánh giá đúng cho nhóm ngành phổ thông (không Sức khỏe/Luật); áp dụng ngưỡng 15,0/30 cho ngành Sức khỏe hoặc Luật sẽ SAI (thấp hơn ngưỡng thật của các ngành đó).',
  },
  {
    id: 'gdu-other-methods-not-modeled',
    label: 'Phương thức xét học bạ (6 học kỳ), ĐGNL ĐHQG, và tổ hợp thi THPT + điểm tốt nghiệp chưa được mô hình hoá; chỉ mới có phương thức xét điểm thi TN THPT.',
    status: 'incomplete',
    sourceId: 'gdu-quality-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh dùng phương thức khác ngoài thi TN THPT cần tự tra cứu ngưỡng riêng, chưa kiểm tra được qua runtime.',
  },
];
