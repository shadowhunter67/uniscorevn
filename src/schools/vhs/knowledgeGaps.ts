import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vhsKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vhs-subject-combination-dominance-condition-not-enforced',
    label:
      'Thông báo 34/TB-ĐHVHHCM (mục 4) gắn kèm mỗi mã tổ hợp một điều kiện "môn chính" (vd "A07: Toán, Lịch sử, Địa lí — Toán x2 >= Lịch sử + Địa lí"; "D01: Toán, Ngữ Văn, Tiếng Anh — Toán + Ngữ Văn >= Tiếng Anh"), căn cứ Điều 9 Thông tư 08/2022/TT-BGDĐT. Đây là điều kiện chọn tổ hợp (không phải công thức tính điểm — mục 3 xác nhận điểm xét vẫn là tổng thô không hệ số 3 môn), nhưng module này KHÔNG kiểm tra điều kiện dominance này khi thí sinh chọn tổ hợp — giả định thí sinh chọn tổ hợp hợp lệ.',
    status: 'incomplete',
    sourceId: 'vhs-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Trong trường hợp hiếm thí sinh chọn tổ hợp không thỏa điều kiện dominance của trường, kết quả UniscoreVN có thể lạc quan hơn thực tế xét tuyển (trường có thể không chấp nhận tổ hợp đó cho thí sinh này).',
  },
  {
    id: 'vhs-chinese-language-combination-not-modeled',
    label:
      'Tổ hợp D04 (Toán, Ngữ văn, Tiếng Trung) xuất hiện trong danh mục tổ hợp của nhiều ngành (Di sản học CN phát triển du lịch, Du lịch, cả 2 chuyên ngành Quản trị dịch vụ du lịch và lữ hành, cả 3 chuyên ngành Văn hóa học, Văn hóa các dân tộc thiểu số Việt Nam) nhưng Tiếng Trung không có SubjectId trong hệ thống — không mô hình hoá tổ hợp này; các tổ hợp còn lại của mỗi ngành vẫn tính được.',
    status: 'incomplete',
    sourceId: 'vhs-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh dùng tổ hợp Toán/Ngữ văn/Tiếng Trung chưa tính được qua UniscoreVN cho các ngành này (vẫn dùng được tổ hợp khác của cùng ngành).',
  },
  {
    id: 'vhs-talent-major-not-modeled',
    label:
      '1/16 ngành/chuyên ngành có mã 100 trong Thông báo 207 KHÔNG được mô hình hoá: 7229042C (Quản lý văn hóa — Chuyên ngành Tổ chức, dàn dựng chương trình văn hóa nghệ thuật) chỉ có dòng mã phương thức 405/406 (kết hợp thi TN THPT/học bạ VỚI điểm thi năng khiếu R01/R02/R03 do trường tổ chức) — không có dòng mã 100 thuần và không có trường điểm năng khiếu trong ApplicantProfile.',
    status: 'incomplete',
    sourceId: 'vhs-threshold-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển vào chuyên ngành Tổ chức, dàn dựng chương trình văn hóa nghệ thuật chưa tính được qua UniscoreVN.',
  },
  {
    id: 'vhs-other-methods-not-modeled',
    label:
      'VHS 2026 còn phương thức mã 200 (xét kết quả học tập THPT — học bạ) và mã 301/302 (xét tuyển thẳng/ưu tiên xét tuyển) — module này CHỈ mô hình hoá mã 100 (xét kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'vhs-admission-scheme-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng học bạ hoặc xét tuyển thẳng chưa tính được qua UniscoreVN cho VHS.',
  },
];
