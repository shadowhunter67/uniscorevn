import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ndunKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ndun-bonus-kk-not-modeled',
    label:
      'Thành phần KK ("Điểm xét thưởng đối với thí sinh có thành tích hoặc có năng khiếu đặc biệt và điểm khuyến khích cho các thí sinh có chứng chỉ ngoại ngữ") cộng thẳng vào Điểm xét tuyển trước điểm ưu tiên, nhưng Thông tin tuyển sinh đại học năm 2026 KHÔNG in bảng giá trị KK trong phần đã đọc. Đây là thiếu NGUỒN, không phải thiếu implement — runtime hiện chỉ cộng điểm ưu tiên KV/ĐT. Ghi chú riêng của trường: "Thí sinh không được cộng điểm KK đối với tổ hợp có môn Tiếng Anh nếu sử dụng chứng chỉ để miễn thi tốt nghiệp môn ngoại ngữ".',
    status: 'incomplete',
    sourceId: 'ndun-thongtin-tuyensinh-1155-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích/năng khiếu đặc biệt hoặc chứng chỉ ngoại ngữ sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại.',
  },
  {
    id: 'ndun-other-methods-not-modeled',
    label:
      'NDUN 2026 có 4 phương thức (Thông tin tuyển sinh mục 2): 100 xét kết quả kỳ thi TN THPT 2026; 301 xét tuyển thẳng/ưu tiên xét tuyển (chỉ ngành Điều dưỡng); 200 xét kết quả học tập cấp THPT (ĐXT = (ĐPT3 + KK) + UT với ĐPT3 = M1+M2+M3 là điểm trung bình chung cả năm lớp 10/11/12 của các môn trong tổ hợp — có ĐỦ công thức và ĐỦ điểm chuẩn ở cột "Phương thức xét tuyển học bạ THPT" của Thông báo 2058, nhưng chưa implement ở batch này); 402 xét điểm ĐGNL HSA ĐHQG Hà Nội (thang 150). Module này CHỈ mô hình hoá phương thức 100.',
    status: 'incomplete',
    sourceId: 'ndun-thongtin-tuyensinh-1155-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét học bạ / ĐGNL HSA / tuyển thẳng chưa tính được qua UniscoreVN cho NDUN.',
  },
];
