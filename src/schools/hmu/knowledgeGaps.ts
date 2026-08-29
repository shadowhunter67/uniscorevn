import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hmuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hmu-primary-document-not-located',
    label:
      'Không tìm được bản PDF/trang gốc hmu.edu.vn hoặc tuyensinh.hmu.edu.vn đăng trực tiếp Thông báo số 3142/TB-ĐHYHN (10/07/2026) — số liệu lấy từ nhiều báo chí chính thống trích dẫn trực tiếp và khớp tuyệt đối, KHÔNG phải đọc trực tiếp văn bản gốc.',
    status: 'official-but-unparsed',
    sourceId: 'hmu-threshold-2026',
    scoreAffecting: false,
    impact: 'Nếu sau này tìm được văn bản gốc mà số liệu lệch so với báo chí, cần cập nhật lại bảng ngưỡng.',
  },
  {
    id: 'hmu-bonus-priority-table-not-modeled',
    label:
      'Ngưỡng đảm bảo chất lượng đầu vào HMU 2026 công bố KHÔNG cộng điểm ưu tiên khu vực/đối tượng và KHÔNG cộng điểm khuyến khích (chứng chỉ ngoại ngữ quốc tế IELTS/TOEFL/HSK...) — đây là ngưỡng SÀN (điều kiện đăng ký), không phải điểm chuẩn trúng tuyển cuối cùng (vốn có cộng ưu tiên/điểm thưởng, luôn >= sàn). UniscoreVN chỉ kiểm tra điều kiện sàn, KHÔNG dự đoán điểm chuẩn trúng tuyển thực tế hay tính điểm cộng chứng chỉ ngoại ngữ (bảng đầy đủ theo chứng chỉ/mức điểm chưa được xác minh từ nguồn chính thức, chỉ có vài mốc rải rác trên báo chí thứ cấp).',
    status: 'official-but-unparsed',
    sourceId: 'hmu-threshold-2026',
    scoreAffecting: true,
    impact: 'Thí sinh đạt sàn KHÔNG đồng nghĩa trúng tuyển — điểm chuẩn thực tế theo ngành thường cao hơn sàn và có cộng ưu tiên/điểm thưởng.',
  },
  {
    id: 'hmu-subject-combination-not-validated',
    label:
      'Runtime KHÔNG kiểm tra tổ hợp môn đã chọn có thuộc danh sách tổ hợp hợp lệ của ngành hay không (chỉ hiển thị tham khảo trong `thresholds.ts`) — người dùng tự chịu trách nhiệm chọn đúng tổ hợp theo đề án tuyển sinh chi tiết của HMU.',
    status: 'incomplete',
    sourceId: 'hmu-threshold-2026',
    scoreAffecting: false,
  },
  {
    id: 'hmu-other-methods-not-modeled',
    label: 'HMU còn phương thức xét tuyển thẳng/ưu tiên xét tuyển và xét điểm thi đánh giá năng lực (SPT) quy đổi sang thang THPT — chỉ phương thức xét điểm thi TN THPT được mô hình hoá trong batch này.',
    status: 'official-but-unparsed',
    sourceId: 'hmu-threshold-2026',
    scoreAffecting: true,
    impact: 'UniscoreVN chỉ kiểm tra được ngưỡng cho phương thức xét điểm thi TN THPT.',
  },
];
