import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dtuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dtu-program-threshold-table-not-imported',
    label: 'DTU 2026 công bố ngưỡng THPT theo 4 nhóm ngành (chung, Luật, Điều dưỡng/KTXN, khoi sức khỏe co chung chi hanh nghe); chưa chọn được ngành cụ thể để áp dụng dung nhom.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Đa số ngành: >= 15,0/30 (thi TN THPT) hoặc học lực lớp 12 >= 6.0',
      'Luật, Luật kinh tế: >= 18,0/30 hoặc học lực lớp 12 loai gioi + >=8,5/10 học bạ',
      'Điều dưỡng, Kỹ thuật xét nghiệm y học: >= 16,5/30 hoặc >= 6,5/10 học bạ',
      'Y khoa, Răng-Hàm-Mặt, Dược học: >= 20,0/30 hoặc >= 8,5/10 học bạ',
    ],
    impact: 'Runtime chi kiểm tra được ngoai le dưới ngưỡng thấp nhất (15/30 = ineligible chac chan); tu 15/30 den 20/30 cần chọn ngành để kết luận chính xác.',
  },
  {
    id: 'dtu-formula-and-general-threshold-resolved',
    label:
      'Batch 2026-08-28: doc truc tiep trang tuyen sinh chính thức, tim được công thức Điểm xét tuyển nguyen van (mức V.1.a): "Điểm Xét tuyển = Điểm thi môn 1 + Điểm thi môn 2 + Điểm thi môn 3 + Điểm cong + Điểm ưu tiên" → mo nhanh exact `dtu-thpt-exam-exact-2026` cho ngành chung, thí sinh không điểm cộng. Ngành pháp luật/sức khỏe (điều kiện học lực + ngưỡng riêng) va Kiến trúc/Thanh nhac (năng khiếu) van ngoai phạm vi.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'dtu-transcript-vsat-danggia-not-modeled',
    label: 'DTU 2026 con co phương thức học bạ (Ma 200), V-SAT, danh gia năng lực DHQG TP.HCM (Ma 402: 700 điểm khoi sức khỏe co chung chi, 650 Điều dưỡng/KTXN, 600 ngành khác) va xét tuyển thẳng; chi phương thức thi TN THPT được mô hình hóa.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
  },
  {
    id: 'dtu-ielts-conversion-not-modeled',
    label: 'DTU công bố bằng quy đổi chung chi tieng Anh quốc tế (IELTS 5.5->8,0; 6.0->8,5; 6.5->9,0; 7.0->9,5; 7.5+->10,0 thang 10) áp dụng cho môn tieng Anh trong xét tuyển kết hợp; chưa được trien khai trong bo tính điểm.',
    status: 'official-but-unparsed',
    sourceId: 'dtu-admission-info-2026',
  },
];
