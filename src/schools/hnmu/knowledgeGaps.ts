import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hnmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hnmu-primary-document-not-located',
    label:
      'Không tìm được PDF/trang gốc hnmu.edu.vn đăng trực tiếp thông báo ngưỡng đảm bảo chất lượng đầu vào 2026 — số liệu lấy từ 2 báo chí chính thống độc lập trích dẫn khớp tuyệt đối (giadinh.suckhoedoisong.vn, vietnamnet.vn), KHÔNG phải đọc trực tiếp văn bản gốc.',
    status: 'official-but-unparsed',
    sourceId: 'hnmu-threshold-2026',
    scoreAffecting: false,
    impact: 'Nếu sau này tìm được văn bản gốc mà số liệu lệch so với báo chí, cần cập nhật lại bảng ngưỡng.',
  },
  {
    id: 'hnmu-law-secondary-condition-not-modeled',
    label: 'Chương trình đào tạo thuộc lĩnh vực pháp luật có điều kiện phụ "điểm xét tuyển có môn Toán hoặc môn Ngữ văn đạt tối thiểu 6 điểm" — CHƯA đưa vào runtime.',
    status: 'official-but-unparsed',
    sourceId: 'hnmu-threshold-2026',
    scoreAffecting: false,
    impact: 'UniscoreVN có thể báo "đạt ngưỡng" cho ngành pháp luật dù chưa kiểm tra điều kiện phụ Toán/Văn >=6.',
  },
  {
    id: 'hnmu-priority-not-modeled',
    label:
      'Ngưỡng công bố ÁP DỤNG CHO THÍ SINH KHU VỰC 3 (điểm ưu tiên = 0), không nói rõ cách tính cho khu vực/đối tượng khác — theo đúng tiền lệ `schools/hmu` (wording gần như giống hệt), runtime KHÔNG cộng điểm ưu tiên khi hiển thị Điểm xét tuyển (khác với `schools/hou`/`schools/utm`, nơi nguồn nói rõ CÓ cộng ưu tiên hoặc hoàn toàn im lặng).',
    status: 'official-but-unparsed',
    sourceId: 'hnmu-threshold-2026',
    scoreAffecting: true,
    impact: 'Điểm chuẩn trúng tuyển thực tế cho thí sinh có ưu tiên khu vực/đối tượng có thể khác với ngưỡng hiển thị.',
  },
  {
    id: 'hnmu-subject-combination-not-validated',
    label: 'Runtime KHÔNG kiểm tra tổ hợp môn đã chọn có thuộc danh sách tổ hợp hợp lệ của nhóm ngành hay không.',
    status: 'incomplete',
    sourceId: 'hnmu-threshold-2026',
    scoreAffecting: false,
  },
  {
    id: 'hnmu-other-methods-not-modeled',
    label: 'HNMU còn phương thức xét học bạ THPT và bảng quy đổi điểm giữa các phương thức — chỉ phương thức xét điểm thi TN THPT được mô hình hoá trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'hnmu-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
