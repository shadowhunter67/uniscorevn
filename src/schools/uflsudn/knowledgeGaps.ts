import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uflsudnKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uflsudn-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đảm bảo chất lượng đầu vào 2026 theo từng ngành/chương trình của UFLS chưa được nhập đầy đủ thành dataset runtime (mới có khoảng min-max tổng hợp).',
    status: 'official-but-unparsed',
    sourceId: 'uflsudn-quality-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng UFLS 2026 dao động khoảng 15.5-20/30 theo ngành/chương trình'],
    impact: 'So sánh chỉ loại chắc chắn hồ sơ dưới 15.5/30; chưa kết luận đạt cho từng ngành cụ thể.',
  },
  {
    id: 'uflsudn-cu-nhan-hocba-formula-not-modeled',
    label:
      'Với các ngành cử nhân (Ngôn ngữ Anh/Nga/Pháp/Trung/Nhật/Hàn/Thái, Quan hệ quốc tế, Quốc tế học, Đông phương học, Nhật Bản học, Hàn Quốc học, Tiếng Việt và văn hóa Việt Nam...), ngưỡng đầu vào là Điểm xét tuyển ĐẦY ĐỦ (THPT×0,6 + học bạ×0,4 + điểm cộng + điểm ưu tiên, ngưỡng riêng 15,5-17,5/30 tuỳ ngành) — CẦN điểm học bạ (không có trong hồ sơ chung hiện tại), chưa mô hình hoá. Chỉ nhánh exact 4 ngành đào tạo giáo viên ngoại ngữ (chỉ dùng điểm thi THPT thô + ưu tiên, KHÔNG cần học bạ) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'uflsudn-teacher-training-threshold-2026',
    scoreAffecting: true,
    knownData: ['Ngưỡng 4 ngành cử nhân tiêu biểu: Ngôn ngữ Anh 16,5; Ngôn ngữ Nga/Pháp/Thái Lan 15,5; Ngôn ngữ Trung/Nhật/Hàn 17,5 (Điểm xét tuyển đầy đủ, thang 30)'],
    impact: 'Runtime chỉ tính chính xác cho 4 ngành Sư phạm ngoại ngữ; ngành cử nhân trả kết quả không xác định thay vì áp nhầm công thức/ngưỡng.',
  },
  {
    id: 'uflsudn-bonus-points-not-modeled',
    label: 'Bảng điểm cộng (HSG cấp tỉnh/quốc gia, chứng chỉ ngoại ngữ quốc tế/quốc gia, tối đa 3,0/30) tại mục 5.2 của Thông tin tuyển sinh chưa được mô hình hoá — không ảnh hưởng nhánh exact Sư phạm ngoại ngữ (ngưỡng đó không cộng điểm cộng) nhưng cần cho nhánh cử nhân trong tương lai.',
    status: 'official-but-unparsed',
    sourceId: 'uflsudn-admission-info-2026',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả nhánh exact hiện tại (4 ngành Sư phạm ngoại ngữ); chỉ liên quan khi mở rộng sang nhánh cử nhân.',
  },
];
