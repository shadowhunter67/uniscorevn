import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const unetiKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uneti-bonus-kk-not-modeled',
    label:
      'Thành phần KK ("Điểm xét thưởng đối với thí sinh có thành tích hoặc có năng khiếu đặc biệt và điểm khuyến khích cho các thí sinh có chứng chỉ ngoại ngữ") CỘNG THẲNG vào ĐXT trước khi tính điểm ưu tiên. Bảng giá trị đã đọc đủ ở cả 2 nhóm: (a) thành tích — giải KK HSG quốc gia / giải KHKT quốc gia / huy chương TDTT quốc gia / giải nghệ thuật chuyên nghiệp toàn quốc / giải tay nghề ASEAN-quốc tế = 1,50; Giải Nhất cấp tỉnh = 1,00; Nhì = 0,75; Ba = 0,50; Khuyến khích = 0,25; khen thưởng HSG/HS xuất sắc lớp 10-12 = 0,25; học sinh lớp chuyên môn trong tổ hợp = 0,50; học sinh trường chuyên không thuộc lớp chuyên = 0,25 (chỉ cộng mức cao nhất); (b) chứng chỉ ngoại ngữ — IELTS 7.0+/TOEFL iBT 94+/TOEIC 985 = 0,5; 6.5 / 79-93 / 940 = 0,4; 6.0 / 60-78 / 860 = 0,3; 5.5 / 46-59 / 785 = 0,2; 5.0 / 30-45 / 550 = 0,1. CHƯA wired vào `evaluate.ts` (hồ sơ dùng chung không có field thành tích/chứng chỉ tương ứng).',
    status: 'incomplete',
    sourceId: 'uneti-thongtin-tuyensinh-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích hoặc chứng chỉ ngoại ngữ sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại (tối đa +2,0 nếu đạt cả 2 nhóm ở mức cao nhất).',
  },
  {
    id: 'uneti-english-certificate-substitution-not-modeled',
    label:
      'Với phương thức xét kết quả thi TN THPT, "Thí sinh được quy đổi điểm [chứng chỉ tiếng Anh quốc tế] thành môn ngoại ngữ trong tổ hợp đăng ký xét tuyển nếu điểm quy đổi cao hơn" (Thông tin tuyển sinh 2026 cập nhật, mục I.1.2.1) — bảng quy đổi IELTS 7.0+/TOEFL iBT 94+/TOEIC 985 = 10; 6.5 = 9,5; 6.0 = 9,0; 5.5 = 8,5; 5.0 = 8,0. Công cụ chính chủ dkxt.uneti.edu.vn cài `anh = Math.max(điểm thi tiếng Anh, điểm quy đổi chứng chỉ)`. Bảng đã đọc đủ nhưng CHƯA wired vào runtime — `evaluate.ts` chỉ dùng điểm thi TN THPT môn tiếng Anh trong hồ sơ.',
    status: 'incomplete',
    sourceId: 'uneti-thongtin-tuyensinh-capnhat-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có chứng chỉ tiếng Anh quy đổi cao hơn điểm thi sẽ có Điểm xét tuyển thực tế cao hơn kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'uneti-ninhbinh-calculator-offset-not-applied',
    label:
      'BẤT NHẤT GIỮA 2 NGUỒN CHÍNH CHỦ: công cụ tính điểm dkxt.uneti.edu.vn cộng thêm 3,00 điểm vào điểm tổ hợp khi thí sinh chọn cơ sở Ninh Bình (`if (isNamDinh) raw += 3;`) — cách này chỉ đúng nếu so kết quả với BẢNG ĐIỂM CHUẨN CƠ SỞ HÀ NỘI. Trong khi đó Thông báo 826/TB-ĐHKTKTCN công bố BẢNG ĐIỂM CHUẨN RIÊNG, THẤP HƠN cho cơ sở Ninh Bình, và độ chênh thực tế giữa 2 cơ sở KHÔNG đồng nhất 3,0 điểm (vd. Ngôn ngữ Anh chênh 2,00; Quản trị kinh doanh chênh 3,50; Công nghệ kỹ thuật cơ khí chênh 2,80). Module này KHÔNG áp dụng khoản +3,00 và so trực tiếp với điểm chuẩn riêng của từng cơ sở theo văn bản công bố chính thức — không cộng gộp cả hai (sẽ tính trùng).',
    status: 'incomplete',
    sourceId: 'uneti-tohop-dkxt-2026',
    scoreAffecting: false,
    impact: 'Kết quả UniscoreVN cho các mã xét tuyển cơ sở Ninh Bình (hậu tố DKD) có thể LỆCH so với con số hiển thị trên công cụ tính điểm của trường đúng 3,00 điểm — hai bên dùng mốc so sánh khác nhau; UniscoreVN so với điểm chuẩn Ninh Bình đã công bố.',
  },
  {
    id: 'uneti-other-methods-not-modeled',
    label:
      'UNETI 2026 có 5 phương thức (Thông tin tuyển sinh 2026, mục II.2): PT1 xét tuyển thẳng; PT2 xét kết quả thi TN THPT 2026; PT3 xét kết quả học tập bậc THPT (ĐPT3 = (M1 x 4,5 + M2 x 3,5 + M3 x 2) x 3/10 với M1/M2/M3 là điểm trung bình chung cả năm lớp 10/11/12 của môn tương ứng; điều kiện riêng ngành Ngôn ngữ Anh: điểm tổng kết môn tiếng Anh >= 7,00); PT4 xét điểm ĐGTD (Đại học Bách khoa Hà Nội, thang 100); PT5 xét điểm ĐGNL (ĐHQG Hà Nội, thang 150). Module này CHỈ mô hình hoá PT2. PT3 có ĐỦ công thức và ĐỦ điểm chuẩn công bố (cột "Kết quả học bạ" của Thông báo 826) nhưng chưa implement ở batch này; PT4/PT5 dùng thang điểm riêng (100/150) ngoài phạm vi hồ sơ dùng chung hiện tại.',
    status: 'incomplete',
    sourceId: 'uneti-thongtin-tuyensinh-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / ĐGTD / ĐGNL chưa tính được qua UniscoreVN cho UNETI.',
  },
  {
    id: 'uneti-tiebreak-not-modeled',
    label:
      'Tiêu chí phụ khi bằng điểm ("Đối với các thí sinh có ĐXT bằng điểm chuẩn mà số lượng thí sinh đủ điều kiện trúng tuyển lớn hơn chỉ tiêu thì ưu tiên theo tiêu chí phụ là thứ tự nguyện vọng", Thông tin tuyển sinh 2026 cập nhật, mục I.1.1) KHÔNG mô hình hoá — hồ sơ dùng chung không có thứ tự nguyện vọng.',
    status: 'incomplete',
    sourceId: 'uneti-thongtin-tuyensinh-capnhat-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có ĐXT ĐÚNG BẰNG điểm chuẩn vẫn có thể trượt do tiêu chí phụ — UniscoreVN báo "đạt" ở trường hợp biên này.',
  },
];
