import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuebKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnueb-priority-value-silent',
    label:
      'Nguồn xác nhận trực tiếp điểm chuẩn = "tổng điểm các môn xét tuyển + điểm ưu tiên nếu có", nhưng KHÔNG công bố mức điểm ưu tiên cụ thể theo từng khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`).',
    status: 'incomplete',
    sourceId: 'vnueb-threshold-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số VNU-UEB tự công bố.',
  },
  {
    id: 'vnueb-tiebreak-not-modeled',
    label:
      'Khi bằng điểm chuẩn, một số ngành công bố tiêu chí phụ (vd Kế toán ưu tiên thí sinh có điểm Toán ≥ 7,25) — tiêu chí phụ theo ngành này CHƯA mô hình hoá, và bản chất ràng buộc (bắt buộc hay chỉ tham khảo) không được nguồn trích dẫn rõ ràng.',
    status: 'official-but-unparsed',
    sourceId: 'vnueb-threshold-2025',
    scoreAffecting: false,
    impact: 'Trường hợp bằng điểm chuẩn chính xác, UniscoreVN không phân biệt được thí sinh nào ưu tiên hơn theo tiêu chí phụ điểm Toán.',
  },
  {
    id: 'vnueb-primary-source-forbidden',
    label:
      'Cổng tuyển sinh chính thức (tuyensinhdaihoc.ueb.edu.vn) trả HTTP 403 khi truy cập trực tiếp trong lần research này — số liệu dùng trong runtime lấy từ 2 báo độc lập tường thuật (tuyensinh247, Sforum/CellphoneS) cross-check khớp nhau, không phải đọc trực tiếp từ văn bản gốc của trường.',
    status: 'official-but-unparsed',
    sourceId: 'vnueb-threshold-2025',
    scoreAffecting: false,
    impact: 'Độ tin cậy số liệu dựa trên cross-check báo chí thay vì đọc trực tiếp văn bản gốc của trường.',
  },
  {
    id: 'vnueb-other-methods-not-modeled',
    label: 'Trường còn tuyển theo phương thức xét điểm thi ĐGNL HSA (ĐHQGHN) và xét chứng chỉ tiếng Anh quốc tế kết hợp học bạ — 2 phương thức này CHƯA mô hình hoá, chỉ mô hình hoá nhánh xét điểm thi TN THPT.',
    status: 'official-but-unparsed',
    sourceId: 'vnueb-threshold-2025',
    scoreAffecting: false,
    impact: 'UniscoreVN chỉ tính được đường điểm thi TN THPT cho VNU-UEB.',
  },
];
