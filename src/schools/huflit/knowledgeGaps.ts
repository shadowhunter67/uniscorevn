import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-18 — 2 trang chính thức `huflit.edu.vn` (xem `sources.ts`) xác nhận đầy đủ 3
 * phương thức tính điểm (PT1 tổng thô 3 môn THPT, PT2 tổng TB 3 môn 3 năm, PT3 ĐGNL) + ngưỡng đầu
 * vào chính xác từng phương thức (công bố 09/7/2026, supersede statement "sẽ công bố sau" của
 * trang 02/4/2026). Các khoảng trống dưới đây là phần đã tìm kỹ nhưng KHÔNG định vị được nguồn
 * chính thức đọc được.
 */
export const huflitKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'huflit-bonus-table-not-found',
    label:
      'Chưa có bảng chính thức nêu rõ điểm thưởng cho thành tích HSG/giải thưởng và điểm khuyến khích cho chứng chỉ ngoại ngữ. Các nguồn hiện có chỉ cho biết HUFLIT có điểm cộng, gồm điểm thưởng và điểm khuyến khích, tối đa 10% thang điểm xét tuyển = 3,00/30; nếu có nhiều thành tích thì chỉ cộng mức cao nhất.',
    status: 'incomplete',
    sourceId: 'huflit-admission-plan-2026',
    scoreAffecting: true,
    implemented: false,
    whyNotInferred: 'Đã search nhiều truy vấn (tên trường + "điểm thưởng"/"điểm khuyến khích"/"bảng quy đổi chứng chỉ") và duyệt huflit.edu.vn/thongtintuyensinh.huflit.edu.vn trực tiếp — không tìm được bảng số. Không suy đoán giá trị.',
    impact: 'exact-blocking-unless-no-achievement',
  },
  {
    id: 'huflit-priority-table-not-huflit-specific',
    label:
      'Điểm ưu tiên khu vực/đối tượng đang dùng bảng chuẩn quốc gia theo Quy chế tuyển sinh Bộ GDĐT: KV1=0,75; KV2-NT=0,5; KV2=0,25; KV3=0; ĐT01-03=2; ĐT04-06=1 trên thang 30, giảm khi tổng ≥22,5/30 và chia 7,5. Chưa tìm được trang HUFLIT tự công bố bảng số riêng.',
    status: 'official-but-unparsed',
    sourceId: 'huflit-admission-plan-2026',
    scoreAffecting: true,
    implemented: true,
    whyNotInferred: 'Bảng số dùng cross-check nội bộ với 5 trường khác trong repo (HCMUS/UEL/IU/USSH/HCMUTE/TDTU) đã verified/cross-checked cùng công thức tỉ lệ quốc gia — verification level giữ `cross-checked`, KHÔNG nâng lên `verified` vì không có trang HUFLIT trực tiếp.',
    impact: 'evidence-verification-level-only',
  },
  {
    id: 'huflit-program-catalog-not-imported',
    label:
      'Danh mục đầy đủ 23 ngành và tổ hợp môn xét tuyển theo từng ngành chưa được đưa vào công cụ. Người dùng vẫn cần chọn tổ hợp môn; hiện chỉ 2 ngành có ngưỡng riêng là Luật và Luật kinh tế được nhận diện riêng.',
    status: 'official-but-unparsed',
    sourceId: 'huflit-admission-plan-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'eligibility-only-gap',
  },
];
