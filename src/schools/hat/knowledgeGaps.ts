import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hatKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hat-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ HUMP.',
    status: 'incomplete',
    sourceId: 'hat-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HAT/Đại học Huế tự công bố riêng.',
  },
  {
    id: 'hat-official-source-unreachable',
    label:
      'Nguồn gốc chính thức của trường (huht.hueuni.edu.vn) trả về "connection refused" nhiều lần trong research — số liệu dùng trong runtime lấy từ 3 nguồn báo/tổng hợp đăng lại ĐỘC LẬP (tuyensinh247 + Báo Hà Tĩnh + Sforum/CellphoneS), khớp TUYỆT ĐỐI 7/7 ngành, cùng kỹ thuật cross-check đã chấp nhận cho HUMP/HUC/VNU-UET/HUS/USSH.',
    status: 'official-but-unparsed',
    sourceId: 'hat-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên 3 báo đăng lại khớp nhau thay vì đọc trực tiếp thông báo gốc của trường.',
  },
  {
    id: 'hat-bonus-not-modeled',
    label:
      'Đại học Huế (đề án tuyển sinh chung 2025) có bảng điểm cộng (thành tích giải HSG/chứng chỉ ngoại ngữ/HSG chuyên) áp dụng cho các trường thành viên, tối đa 10% thang điểm xét (3,0/30) — chi tiết mức điểm cộng theo hạng/giải KHÔNG trích xuất được từ PDF "THONG_TIN_TUYEN_SINH_2025_FN.pdf" (66 trang, nội dung nén, không đọc được text trực tiếp) — module này KHÔNG mô hình hoá điểm cộng (mặc định 0), cùng tiền lệ HUMP/DNU.',
    status: 'incomplete',
    sourceId: 'hat-threshold-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có thành tích đặc biệt không được cộng điểm cộng khi tính qua UniscoreVN cho HAT.',
  },
  {
    id: 'hat-other-methods-not-modeled',
    label: 'HAT 2025 còn phương thức xét học bạ THPT (điểm chuẩn 18,00–23,25/30 theo ngành) và các phương thức khác của Đại học Huế (xét tuyển thẳng, kết hợp chứng chỉ quốc tế) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT.',
    status: 'incomplete',
    sourceId: 'hat-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho HAT.',
  },
];
