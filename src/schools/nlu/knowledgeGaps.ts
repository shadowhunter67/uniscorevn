import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const nluKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'nlu-per-program-band-not-resolved',
    label:
      'Batch 2026-08-28: tìm được ảnh bảng ngưỡng gốc trên ts.hcmuaf.edu.vn (qua chrome-devtools, không phải bản báo chí thứ cấp) và đọc bằng vision — nhập đủ 53/56 mã xét tuyển vào `thresholds.ts` → mở nhánh exact `nlu-thpt-exam-exact-2026`. Phương thức eligibility rộng (`nlu-thpt-exam-2026`) vẫn chỉ dùng dải điểm chung (16-18/30).',
    status: 'official-but-unparsed',
    sourceId: 'nlu-threshold-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'nlu-pedagogy-excluded',
    label: 'Ngành Giáo dục mầm non/Sư phạm kỹ thuật nông nghiệp theo quy định riêng của Bộ GD&ĐT (TT 06/2026), KHÔNG có cột ngưỡng THPT trong bảng — ngoài phạm vi nhánh exact.',
    status: 'official-but-unparsed',
    sourceId: 'nlu-threshold-2026',
    scoreAffecting: false,
  },
  {
    id: 'nlu-transcript-dgnl-not-modeled',
    label: 'Phương thức xét học bạ (HB) và ĐGNL ĐHQG-HCM chưa được mô hình hoá; chỉ phương thức thi TN THPT được kiểm tra/tính.',
    status: 'official-but-unparsed',
    sourceId: 'nlu-threshold-2026',
    scoreAffecting: false,
  },
];
