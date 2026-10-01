import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const ntuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'ntu-priority-scale-40-judgment-call',
    label:
      'NTU không in bảng mức điểm ưu tiên KV/ĐT trên thang 40 và không công bố trong trang đã thu thập việc điểm trúng tuyển có gồm ưu tiên hay không (ảnh "Chính sách ưu tiên" trên trang đề án chỉ nói về ký túc xá/học bổng) — dùng khung điểm ưu tiên quốc gia (Điều 7 TT 06/2026, thang 30) quy đổi x4/3 và giả định điểm trúng tuyển là điểm xét tuyển đã gồm ưu tiên, judgment call cùng tiền lệ HANU/AJC.',
    status: 'incomplete',
    sourceId: 'ntu-cutoff-2026',
    scoreAffecting: true,
    impact: 'Thí sinh có ưu tiên KV/ĐT có thể chênh lệch nhỏ (tối đa 2,67 điểm thang 40) so với cách trường thực tế cộng.',
  },
  {
    id: 'ntu-english-condition-not-checked',
    label:
      'Bảng 1 có cột "Điều kiện tiếng Anh" (mức 5-7) cho các chương trình đặc biệt/chất lượng cao; UniscoreVN không kiểm tra điều kiện này, chỉ so điểm xét với điểm trúng tuyển theo tổ hợp.',
    status: 'incomplete',
    sourceId: 'ntu-cutoff-2026',
    scoreAffecting: false,
    impact: 'Kết quả "đạt điểm trúng tuyển" chưa bao gồm điều kiện tiếng Anh của chương trình.',
  },
  {
    id: 'ntu-other-methods-not-modeled',
    label:
      'NTU còn xét ĐGNL ĐHQG-HCM (thang 1.200), ĐGNL ĐHQG-HN (thang 150), xét tuyển thẳng và có bảng quy đổi tương đương; chỉ phương thức xét điểm thi TN THPT được mô hình hoá. Điểm cộng (nếu có) chưa mô hình hoá.',
    status: 'official-but-unparsed',
    sourceId: 'ntu-equivalence-2026',
  },
];
