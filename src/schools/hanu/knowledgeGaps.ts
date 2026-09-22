import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hanuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hanu-other-methods-not-modeled',
    label: 'HANU 2026 còn phương thức xét tuyển kết hợp theo quy định riêng của Trường; chỉ phương thức thi TN THPT (mã 100) được mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'hanu-scheme-2026',
  },
  {
    id: 'hanu-non-english-foreign-language-out-of-scope',
    label: 'Các tổ hợp có môn ngoại ngữ khác tiếng Anh (Nga D02, Pháp D03, Trung D04, Đức D05, Nhật D06, Hàn DD2) không mô hình hoá được — taxonomy môn học của UniscoreVN chưa có các môn ngoại ngữ này. Runtime chỉ tính được cho tổ hợp dùng tiếng Anh làm Ngoại ngữ (D01, A01, X26, D10, D14, D15).',
    status: 'official-but-unparsed',
    sourceId: 'hanu-scheme-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'hanu-priority-scale-40-judgment-call',
    label: 'HANU không tự công bố bảng mức điểm ưu tiên KV/ĐT cụ thể trên thang 40 — dùng khung điểm ưu tiên quốc gia (Điều 7 TT 06/2026, định nghĩa trên thang 30) quy đổi ×4/3, judgment call cùng tiền lệ `schools/ajc`.',
    status: 'official-but-unparsed',
    sourceId: 'hanu-cutoff-2026',
    scoreAffecting: false,
  },
];
