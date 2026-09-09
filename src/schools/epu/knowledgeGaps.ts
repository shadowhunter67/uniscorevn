import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const epuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'epu-other-methods-not-modeled',
    label:
      'EPU 2026 có 4 phương thức tuyển sinh (Thông báo 466/TB-ĐHĐL mục II.2): PT1 xét học bạ (ĐXT = ĐTB Môn 1 + ĐTB Môn 2 + ĐTB Môn 3 + ĐƯT, mỗi ĐTB là trung bình cả năm lớp 10/11/12 của môn đó); PT2 xét kết hợp chứng chỉ tiếng Anh quốc tế với học bạ 2 môn còn lại (ĐXT = Điểm CCTA quy đổi + ĐTB Môn 1 + ĐTB Môn 2 + ĐƯT, bảng quy đổi IELTS 4.5→8,0; 5.0→8,5; 5.5→9,0; 6.0→9,5; 6.5-9.0→10,0; TOEFL iBT 32-34→8,0; 35-45→8,5; 46-59→9,0; 60-78→9,5; 79-120→10,0); PT3 xét kết quả thi TN THPT 2026; PT4 xét tuyển thẳng. Module này CHỈ mô hình hoá PT3 — vì Thông báo 3020/TB-ĐHĐL (09/8/2026) chỉ công bố điểm trúng tuyển CHO PT3 ("theo phương thức xét tuyển dựa trên điểm thi tốt nghiệp THPT năm 2026"), không có bảng điểm trúng tuyển tương ứng cho PT1/PT2.',
    status: 'incomplete',
    sourceId: 'epu-thongtin-tuyensinh-466-2026',
    scoreAffecting: false,
    knownData: [
      'PT1 (học bạ): ĐXT = ĐTB Môn 1 + ĐTB Môn 2 + ĐTB Môn 3 + ĐƯT (nếu có); điều kiện tổng ĐTB 3 môn >= 18,00/30',
      'PT2 (CCTA + học bạ): ĐXT = Điểm CCTA quy đổi + ĐTB Môn 1 + ĐTB Môn 2 + ĐƯT (nếu có); điều kiện IELTS >= 4.5 hoặc TOEFL iBT >= 32 và tổng >= 18,00/30',
    ],
    impact: 'Thí sinh xét tuyển bằng học bạ (PT1) hoặc kết hợp chứng chỉ tiếng Anh (PT2) chưa tính được qua UniscoreVN cho EPU — thiếu điểm trúng tuyển công bố cho 2 phương thức này, không phải thiếu công thức.',
  },
  {
    id: 'epu-english-certificate-substitution-not-modeled',
    label:
      'Thông báo 466/TB-ĐHĐL mục II.2.3 cho phép thí sinh dùng tổ hợp có môn tiếng Anh THAY điểm thi TN THPT môn tiếng Anh bằng chứng chỉ IELTS/TOEFL iBT còn hiệu lực đến 20/7/2026, quy đổi theo bảng của trường (IELTS 4.5→8,0; 5.0→8,5; 5.5→9,0; 6.0→9,5; 6.5-9.0→10,0; TOEFL iBT 32-34→8,0; 35-45→8,5; 46-59→9,0; 60-78→9,5; 79-120→10,0). Bảng quy đổi ĐÃ ĐỌC ĐỦ nhưng CHƯA wired vào `evaluate.ts` — runtime hiện chỉ dùng điểm thi TN THPT môn tiếng Anh trong hồ sơ.',
    status: 'incomplete',
    sourceId: 'epu-thongtin-tuyensinh-466-2026',
    scoreAffecting: true,
    knownData: ['IELTS 4.5 = 8,0; 5.0 = 8,5; 5.5 = 9,0; 6.0 = 9,5; 6.5-9.0 = 10,0', 'TOEFL iBT 32-34 = 8,0; 35-45 = 8,5; 46-59 = 9,0; 60-78 = 9,5; 79-120 = 10,0'],
    impact: 'Thí sinh có chứng chỉ tiếng Anh quốc tế quy đổi CAO HƠN điểm thi môn tiếng Anh sẽ có Điểm xét tuyển thực tế cao hơn kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'epu-x56-combination-not-modeled',
    label:
      'Ngành Toán tin (7460117) công bố tổ hợp xét tuyển nhánh thi TN THPT gồm A00, A01, D01, D07, X02 và X56. Mã tổ hợp X56 chưa có trong `core/subjects.ts` (danh mục tổ hợp dùng chung) và Thông báo 466/TB-ĐHĐL KHÔNG chú giải thành phần 3 môn của mã này — không suy đoán, nên `thresholds.ts` chỉ liệt kê 5 tổ hợp còn lại cho ngành Toán tin.',
    status: 'incomplete',
    sourceId: 'epu-thongtin-tuyensinh-466-2026',
    scoreAffecting: false,
    impact: 'Thí sinh muốn xét ngành Toán tin bằng tổ hợp X56 chưa tính được qua UniscoreVN — 5 tổ hợp còn lại của ngành vẫn tính được bình thường.',
  },
  {
    id: 'epu-graduation-year-priority-gate-not-modeled',
    label:
      'Thông báo 466/TB-ĐHĐL ghi rõ "Các thí sinh đã tốt nghiệp từ năm 2024 trở về trước không được cộng điểm ưu tiên". Hồ sơ dùng chung `ApplicantProfile` không có trường "năm tốt nghiệp THPT" nên điều kiện này KHÔNG enforce được — runtime luôn cộng điểm ưu tiên KV/ĐT nếu người dùng nhập.',
    status: 'incomplete',
    sourceId: 'epu-thongtin-tuyensinh-466-2026',
    scoreAffecting: true,
    impact: 'Thí sinh tốt nghiệp THPT từ 2024 trở về trước sẽ thấy Điểm xét tuyển UniscoreVN CAO HƠN thực tế đúng bằng phần điểm ưu tiên đã nhập.',
  },
];
