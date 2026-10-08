import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-19/20 (5 nguồn chính thức, xem `sources.ts`). IUH 2026 chỉ có 1 phương thức có
 * công thức điểm ("xét tuyển kết hợp", công thức Max(XT1,XT2,XT3) — xem `evidence.ts`). Gap dưới đây
 * liệt kê đầy đủ phần CHƯA implement, theo đúng nguyên tắc "ghi rõ phần thiếu, không âm thầm bỏ sót".
 *
 * Batch 2026-08-20: đóng gap `iuh-dgnl-top-score-unresolved` (ĐTK 2026 cho nhánh XT3) — verified
 * ĐTK=1139 qua nguồn chính thức ĐHQG-HCM (`cetqa.vnuhcm.edu.vn`) + cross-check độc lập với UFM (cùng
 * số 1139 xuất hiện trong bảng quy đổi bách phân vị của họ, đọc trực tiếp PDF gốc) — xem
 * `calculator.ts:IUH_DTK_2026`. Nhánh XT3 nay tính được đầy đủ.
 */
export const iuhKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'iuh-bonus-school-lookup-not-modeled',
    label:
      'Chưa có danh mục trường THPT dùng để cộng điểm ở Phụ lục 1 dòng 5-7: trường ký kết hợp tác với IUH +1,25; trường chuyên/năng khiếu +1,50; trường Top chất lượng theo 3 mức 1,25/1,00/0,75. Các danh mục này phải tra cứu trên cổng tuyển sinh IUH, không nằm cố định trong văn bản.',
    status: 'official-but-unparsed',
    sourceId: 'iuh-bonus-appendix-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Danh mục trường là dữ liệu động (tra cứu theo link), không phải bảng số cố định trong Phụ lục — không suy đoán/hard-code danh sách trường.',
    impact: 'bonus-undercount-risk-for-3-of-7-reward-categories',
  },
  {
    id: 'iuh-award-amount-unquantified',
    label: '"Điểm thưởng" dành cho thí sinh đủ điều kiện xét tuyển thẳng theo khoản 2 Điều 8 Quy chế tuyển sinh Bộ GD-ĐT nhưng không dùng quyền xét thẳng. Hai văn bản đã đọc không nêu bảng mức điểm cụ thể.',
    status: 'incomplete',
    sourceId: 'iuh-bonus-appendix-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Không tìm được mức điểm cụ thể — phạm vi áp dụng cũng hẹp (chỉ thí sinh đủ điều kiện xét thẳng nhưng không dùng), không suy đoán số.',
    impact: 'narrow-scope-gap',
  },
  {
    id: 'iuh-program-catalog-and-cutoffs-not-imported',
    label:
      'Danh mục ngành, mã ngành và tổ hợp xét tuyển theo từng ngành của Trụ sở chính TP.HCM (40 dòng) chưa được đưa vào công cụ. Bảng điểm trúng tuyển 2026 (32 dòng) cũng chưa được nhập, nên người dùng cần chọn trực tiếp tổ hợp 3 môn và chưa có so sánh điểm chuẩn theo ngành.',
    status: 'official-but-unparsed',
    sourceId: 'iuh-admission-notice-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'eligibility-only-gap',
  },
  {
    id: 'iuh-tcta-quangngai-lawpharmacy-tracks-not-implemented',
    label:
      'Chưa hỗ trợ Chương trình Tăng cường tiếng Anh (TCTA, ngưỡng 17,00/30), Phân hiệu Quảng Ngãi (ngưỡng 16,00/30 mọi ngành), và ngành Dược học/lĩnh vực Pháp luật tại Trụ sở chính. Với Dược học và Pháp luật, văn bản IUH chỉ dẫn chiếu ngưỡng riêng theo quy định Bộ GD-ĐT nhưng chưa nêu số cụ thể. Hiện UniscoreVN chỉ tính cho Trụ sở chính TP.HCM, chương trình Chuẩn, ngoài Dược/Pháp luật.',
    status: 'official-but-unparsed',
    sourceId: 'iuh-quality-threshold-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Ngưỡng Dược/Pháp luật dẫn chiếu "theo quy định của Bộ Giáo dục và Đào tạo" chứ không nêu số cụ thể trong văn bản IUH đã đọc — chưa tra cứu quy định gốc Bộ GD-ĐT trong batch này.',
    impact: 'scope-restricted-to-hcmc-standard-track',
  },
];
