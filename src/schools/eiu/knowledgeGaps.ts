import type { KnowledgeGap } from '../../core/knowledgeStatus';

/**
 * Research 2026-08-24 (đọc trực tiếp `eiu.edu.vn/tuyen-sinh/tuyen-sinh-2026/de-an-tuyen-sinh/`,
 * xem `sources.ts:eiu-admission-scheme-2026`). Ngưỡng chung 3 phương thức có input khớp
 * `ApplicantProfile` (thi TN THPT/học bạ/ĐGNL ĐHQG-HCM) đã verified. Các mục dưới đây là gap cụ
 * thể đọc được từ chính văn bản.
 */
export const eiuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'eiu-nursing-moet-threshold-not-modeled',
    label:
      'Ngành Điều dưỡng áp dụng "ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT công bố hàng năm" thay vì ngưỡng chung EIU — con số cụ thể do Bộ công bố riêng theo khối ngành sức khỏe, chưa tra cứu/import trong batch này.',
    status: 'incomplete',
    sourceId: 'eiu-admission-scheme-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'eligibility-partial-scope',
  },
  {
    id: 'eiu-priority-bonus-table-not-found',
    label:
      'Ngưỡng công bố ở đây là điểm SÀN NHẬN HỒ SƠ (ngưỡng đảm bảo chất lượng đầu vào), KHÔNG PHẢI điểm chuẩn trúng tuyển cuối cùng — bảng điểm ưu tiên khu vực/đối tượng và điểm cộng thành tích/chứng chỉ riêng của EIU (nếu có) chưa tìm được nguồn trường tự công bố dạng bảng số.',
    status: 'incomplete',
    sourceId: 'eiu-admission-scheme-2026',
    scoreAffecting: true,
    implemented: false,
    impact: 'exact-final-score-blocking',
  },
  {
    id: 'eiu-program-catalog-not-imported',
    label:
      'Danh mục 10 ngành đào tạo 2026, mã ngành, và tổ hợp môn xét tuyển đầy đủ (tổ hợp nguồn liệt kê gồm cả các mã ít phổ biến như X05, X06, A07, C01-C04, X01, X02, D09, D10, X25, X26) chưa import — `COMMON_SUBJECT_COMBINATIONS` dùng chung hiện chỉ có A00/A01/B00/D01/D07 trong danh sách EIU công bố, các tổ hợp còn lại chưa có trong danh mục dùng chung của UniscoreVN.',
    status: 'incomplete',
    sourceId: 'eiu-admission-scheme-2026',
    scoreAffecting: false,
    implemented: false,
    impact: 'program-catalog-only',
  },
];
