import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const huphKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'huph-english-certificate-not-modeled',
    label:
      'Thông tin tuyển sinh 2026 mục 5.2 + Bảng 2 cho phép thí sinh có IELTS (academic) hoặc TOEFL iBT (không chấp nhận Home Edition) còn hiệu lực 02 năm CHỌN 1 trong 2 cách: (a) quy đổi thành ĐIỂM MÔN TIẾNG ANH trong tổ hợp có môn tiếng Anh khi xét theo điểm thi TN THPT 2026, hoặc (b) cộng ĐIỂM KHUYẾN KHÍCH. Bảng 2 (đã đọc đủ, thang 30): IELTS 5.0 / TOEFL iBT 30-45 → điểm quy đổi 8,0, điểm khuyến khích 0,3; 5.5 / 46-61 → 8,5 và 0,6; 6.0 / 62-77 → 9,0 và 0,9; 6.5 / 78-93 → 9,5 và 1,2; 7.0-9.0 / 94-120 → 10 và 1,5 (trần điểm khuyến khích 1,50/30). Lưu ý của trường: nếu đã dùng chứng chỉ để quy đổi thành điểm môn tiếng Anh thì KHÔNG được cộng điểm khuyến khích cho tổ hợp đó. CHƯA wired vào `evaluate.ts` — hồ sơ dùng chung chưa có field chứng chỉ ngoại ngữ cho HUPH.',
    status: 'incomplete',
    sourceId: 'huph-thongtin-tuyensinh-314-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có IELTS/TOEFL iBT sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại (tối đa +1,50 nếu cộng khuyến khích, hoặc cao hơn nữa nếu quy đổi thay điểm thi tiếng Anh thấp).',
  },
  {
    id: 'huph-other-methods-not-modeled',
    label:
      'HUPH 2026 có 5 phương thức (Thông tin tuyển sinh mục 2): xét tuyển thẳng; xét chuyển vào học trình độ đại học đối với học sinh dự bị đại học (ĐXT = [Điểm Môn 1+2+3 + khuyến khích] + ưu tiên, điểm môn là điểm tổng kết thi cuối khóa dự bị); xét kết quả thi TN THPT 2026 (6/6 ngành); xét kết quả học tập bậc THPT (4 ngành — trừ Kỹ thuật xét nghiệm y học và Kỹ thuật phục hồi chức năng; ĐXT dùng điểm TB cả năm lớp 10/11/12); xét kết quả ĐGNL ĐHQG Hà Nội 2026 (chỉ ngành Khoa học dữ liệu, thang 150). Module này CHỈ mô hình hoá phương thức thi TN THPT — trường gọi đây là "phương thức gốc" và điểm trúng tuyển của các phương thức khác chỉ là điểm QUY ĐỔI TƯƠNG ĐƯƠNG về phương thức gốc, quy tắc quy đổi công bố riêng (Thông báo 641/TB-ĐHYTCC) chưa đọc trong batch này.',
    status: 'incomplete',
    sourceId: 'huph-thongtin-tuyensinh-314-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / ĐGNL / dự bị đại học chưa tính được qua UniscoreVN cho HUPH.',
  },
  {
    id: 'huph-tiebreak-not-modeled',
    label:
      'Tiêu chí phụ khi bằng điểm (Thông tin tuyển sinh mục 5.3): ưu tiên thí sinh có điểm khuyến khích THẤP hơn; ưu tiên thí sinh có nguyện vọng cao hơn; ưu tiên thí sinh nữ theo khoản 4 Điều 16 Nghị định 48/2009/NĐ-CP. Riêng ngành Kỹ thuật phục hồi chức năng, Thông báo 743/TB-ĐHYTCC ghi tiêu chí phụ TTNV <= 2 (thứ tự nguyện vọng không quá 2). Hồ sơ dùng chung không có thứ tự nguyện vọng / giới tính nên KHÔNG mô hình hoá.',
    status: 'incomplete',
    sourceId: 'huph-diemtrungtuyen-743-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có Điểm xét tuyển ĐÚNG BẰNG điểm trúng tuyển ngành Kỹ thuật phục hồi chức năng vẫn có thể trượt nếu đăng ký ở nguyện vọng thứ 3 trở đi — UniscoreVN báo "đạt" ở trường hợp biên này.',
  },
];
