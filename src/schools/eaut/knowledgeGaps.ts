import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const eautKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'eaut-program-mapping-not-imported',
    label:
      'EAUT 2026 công bố ngưỡng học bạ 18,0/30 áp dụng theo tổ hợp 3 môn tương ứng từng ngành (34 ngành), nhưng danh mục ngành/tổ hợp môn xét tuyển cụ thể chưa được nhập vào runtime — thí sinh phải tự chọn tổ hợp.',
    status: 'incomplete',
    sourceId: 'eaut-admission-methods-2026',
    scoreAffecting: false,
    knownData: ['Ngưỡng chung phương thức học bạ: 18,0/30 (6 học kỳ) + điểm thi TN THPT >= 15,0/30'],
    impact: 'Runtime chỉ kiểm tra được ngưỡng chung theo tổ hợp môn do người dùng tự chọn; chưa xác định được ngành nào dùng tổ hợp nào.',
  },
  {
    id: 'eaut-thpt-exam-method-threshold-missing',
    label:
      'Phương thức 2 (xét điểm thi TN THPT 2026, không kèm học bạ) được EAUT công bố là có áp dụng nhưng bài đăng nguồn chính thức không nêu ngưỡng điểm sàn riêng cho phương thức này.',
    status: 'incomplete',
    sourceId: 'eaut-admission-methods-2026',
    scoreAffecting: true,
    impact: 'Không tính được eligibility cho thí sinh chỉ xét bằng điểm thi TN THPT (không kèm học bạ) — module hiện chỉ hỗ trợ phương thức 1 (học bạ + điều kiện điểm thi tốt nghiệp).',
  },
  {
    id: 'eaut-method-3-4-not-modeled',
    label: 'Phương thức 3 (kết hợp điểm thi + học bạ) và phương thức 4 (dùng kết quả ĐGNL/tư duy các đại học khác) chưa được model do thiếu công thức/hệ số quy đổi cụ thể.',
    status: 'incomplete',
    sourceId: 'eaut-admission-methods-2026',
    scoreAffecting: true,
    impact: 'Thí sinh xét tuyển bằng phương thức 3/4 chưa kiểm tra được ở EAUT trên UniScoreVN.',
  },
  {
    id: 'eaut-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GDĐT chưa được cộng vào tổng điểm trước khi so với ngưỡng.',
    status: 'incomplete',
    sourceId: 'eaut-admission-methods-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện ưu tiên khu vực/đối tượng cần tự cộng điểm ưu tiên của mình trước khi so sánh với ngưỡng đã công bố.',
  },
];
