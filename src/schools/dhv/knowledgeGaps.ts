import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const dhvKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'dhv-law-psychology-not-modeled',
    label:
      'Nhóm ngành Luật và Tâm lý học chưa có ngưỡng công bố (chờ Bộ GD&ĐT ban hành quy định riêng khối sức khỏe/luật); KHÔNG áp dụng ngưỡng 15/30 chung của các ngành còn lại cho nhóm này.',
    status: 'official-but-unparsed',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'dhv-transcript-nlgn-methods-not-modeled',
    label:
      'Phương thức xét học bạ (ngưỡng 18/30, công thức Toán hoặc Ngữ văn + TB cả năm THPT x2, chưa rõ quy tắc chọn môn) và phương thức xét ĐGNL ĐHQG-HCM (ngưỡng 600/1200) chưa được mô hình hoá; chỉ phương thức xét kết quả thi TN THPT được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: false,
  },
  {
    id: 'dhv-priority-bonus-not-modeled',
    label: 'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT chưa được cộng vào tổng điểm trước khi so sánh với ngưỡng.',
    status: 'incomplete',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: true,
  },
  {
    id: 'dhv-priority-formula-source-not-found',
    label:
      'Batch 5 (2026-08-28) thử tìm nguồn chính thức DHV tự xác nhận công thức điểm xét tuyển đầy đủ (có cộng điểm ưu tiên/điểm cộng hay không, theo văn bản nào) qua tuyensinh.dhv.edu.vn, dhv.edu.vn/en/enrollment/tuyen-sinh-dai-hoc-chinh-quy và nhiều tìm kiếm web — KHÔNG tìm được Đề án/Thông báo/Quyết định tuyển sinh 2026 dạng PDF hoặc trang đọc được của DHV nêu rõ công thức. Giữ nguyên eligibility-only, không suy đoán.',
    status: 'incomplete',
    sourceId: 'dhv-admission-score-2026',
    scoreAffecting: false,
  },
];
