import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hpmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hpmu-blended-threshold-caveat',
    label:
      'Điểm chuẩn công bố là "điểm đã quy đổi tương đương giữa 2 phương thức xét kết quả thi tốt nghiệp THPT năm 2025 và xét học bạ THPT" — 1 số DUY NHẤT áp dụng cho cả 2 phương thức sau quy đổi. UniscoreVN chỉ mô hình hoá nhánh thi TN THPT (thang điểm trùng thang công bố, không cần quy đổi thêm cho nhánh này) — KHÔNG mô hình hoá nhánh học bạ (công thức quy đổi giữa 2 phương thức không được trường công bố chi tiết).',
    status: 'official-but-unparsed',
    sourceId: 'hpmu-threshold-2025',
    scoreAffecting: false,
    impact: 'UniscoreVN chỉ tính được đường điểm thi TN THPT cho HPMU, chưa hỗ trợ xét học bạ.',
  },
  {
    id: 'hpmu-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn ĐÃ CỘNG điểm ưu tiên khu vực/đối tượng và điểm thưởng, nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng, và KHÔNG công bố "điểm thưởng" là gì — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), KHÔNG mô hình hoá điểm thưởng.',
    status: 'incomplete',
    sourceId: 'hpmu-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HPMU tự công bố; không mô hình hoá "điểm thưởng" nếu có.',
  },
  {
    id: 'hpmu-tiebreak-not-modeled',
    label: 'Khi bằng điểm, trường ưu tiên thí sinh có điểm Toán cao hơn, sau đó điểm Hóa — tiêu chí phụ này CHƯA mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'hpmu-threshold-2025',
    scoreAffecting: false,
    impact: 'Trường hợp bằng điểm chuẩn chính xác, UniscoreVN không phân biệt được thí sinh nào ưu tiên hơn theo tiêu chí phụ.',
  },
  {
    id: 'hpmu-primary-source-image-only',
    label:
      'Nguồn gốc chính thức (Cổng TTĐT Chính phủ) đăng thông báo điểm chuẩn dạng ẢNH (trang render bằng JS/SPA, không trích xuất được bằng text) — số liệu dùng trong runtime lấy từ 2 báo độc lập tường thuật (VietNamNet, Công lý) cross-check khớp nhau, không phải đọc trực tiếp từ văn bản gốc.',
    status: 'official-but-unparsed',
    sourceId: 'hpmu-threshold-chinhphu-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên cross-check báo chí thay vì đọc trực tiếp văn bản gốc của trường.',
  },
];
