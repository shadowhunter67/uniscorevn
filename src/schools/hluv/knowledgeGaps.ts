import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hluvKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hluv-priority-value-silent',
    label:
      'Nguồn tổng hợp trích công thức tự công bố = "Tổng điểm 3 môn trong tổ hợp xét tuyển + Điểm ưu tiên", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ HAT/HUMP.',
    status: 'incomplete',
    sourceId: 'hluv-combination-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HLUV tự công bố riêng.',
  },
  {
    id: 'hluv-official-source-unreachable',
    label:
      'Nguồn gốc chính thức của trường (hluv.edu.vn) không fetch được dưới dạng text sạch trong research (news-portal template, cùng hiện tượng đã ghi nhận trong `finalCatalog.generated.ts:hluv`) — số liệu dùng trong runtime lấy từ ảnh chụp nguyên văn thông báo gốc (đọc bằng vision) + 2 nguồn tổng hợp/báo đăng lại ĐỘC LẬP, khớp TUYỆT ĐỐI 8/8 ngành, cùng kỹ thuật cross-check đã chấp nhận cho HAT/HUMP/HUC.',
    status: 'official-but-unparsed',
    sourceId: 'hluv-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên ảnh chụp + 2 nguồn tổng hợp đăng lại khớp nhau thay vì đọc trực tiếp trang HTML gốc của trường.',
  },
  {
    id: 'hluv-mamnon-not-modeled',
    label:
      'Ngành Giáo dục Mầm non (7140201, điểm trúng tuyển 22,88/30) xét theo tổ hợp năng khiếu (M00/M05/M07/M11) — các tổ hợp này có môn năng khiếu không có SubjectId tương ứng trong hệ thống UniscoreVN — KHÔNG mô hình hoá.',
    status: 'incomplete',
    sourceId: 'hluv-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển ngành Giáo dục Mầm non chưa tính được qua UniscoreVN cho HLUV.',
  },
  {
    id: 'hluv-hocba-branch-not-modeled',
    label:
      '4 ngành (Kế toán, Quản trị kinh doanh, Du lịch, Công nghệ thông tin) công bố phương thức "Xét theo kết quả thi TN THPT HOẶC kết quả học THPT" với CÙNG 1 mức điểm — module này chỉ tính nhánh thi TN THPT, chưa mô hình hoá nhánh học bạ (khác cách tính điểm đầu vào).',
    status: 'incomplete',
    sourceId: 'hluv-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ THPT chưa tính được qua UniscoreVN cho HLUV (dù điểm chuẩn công bố trùng nhánh thi).',
  },
  {
    id: 'hluv-other-methods-not-modeled',
    label: 'HLUV 2025 còn các phương thức khác theo trang tuyển sinh chính thức (xét tuyển thẳng theo quy định, xét kết hợp) — module này CHỈ mô hình hoá nhánh xét kết quả thi TN THPT (phương thức 100).',
    status: 'incomplete',
    sourceId: 'hluv-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho HLUV.',
  },
];
