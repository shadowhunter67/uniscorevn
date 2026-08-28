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
      'Ngưỡng công bố ở đây là điểm SÀN NHẬN HỒ SƠ (ngưỡng đảm bảo chất lượng đầu vào), KHÔNG PHẢI điểm chuẩn trúng tuyển cuối cùng. Trang đề án chỉ có 1 câu chung chung "Chính sách ưu tiên": thực hiện theo Quy chế tuyển sinh hiện hành (không tự xác nhận điểm ưu tiên CỘNG vào điểm xét tuyển như thế nào — khác PNTU/HCMUE/CTUMP/VNUA/UHD/APD/TBU đều tự trích rõ công thức). "Điểm cộng: Thực hiện theo quy định của Bộ Giáo dục và Đào tạo" (không có bảng số riêng của EIU). Recheck 2026-08-28: có 1 bảng quy đổi IELTS (5,0=8 điểm ... 7,0+=10 điểm) trong mục "Thông tin cần thiết khác" nhưng KHÔNG rõ áp dụng cho phương thức nào (thay thế điểm 1 môn? cộng điểm? kênh xét tuyển riêng?) — không đủ căn cứ để model, cần fetch thêm `eiu.edu.vn/tuyen-sinh/tuyen-sinh-2026/thong-tin-tuyen-sinh/` ở batch sau.',
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
