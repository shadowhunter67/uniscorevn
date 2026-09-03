import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hcaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hca-bonus-appendix-mislabeled-method-code',
    label:
      'Phụ lục 3 "Cách tính điểm cộng khuyến khích" (`sources.ts:hca-de-an-2026`) tự ghi "Đối tượng áp dụng: ... phương thức xét tuyển theo kết quả thi tốt nghiệp THPT ... (mã phương thức: 200)" — nhưng bảng phương thức ở mục 2 phần II định nghĩa mã 100 = thi TN THPT, mã 200 = học bạ. Mục 6.1.6 (rõ ràng thuộc phương thức 100) lại dẫn chiếu thẳng Phụ lục 3 làm nguồn điểm khuyến khích của MÌNH ("Điểm cộng khuyến khích của Học viện được quy định tại mục 7.2 phần II"). Kết luận: mã "200" trong Phụ lục 3 là lỗi đánh máy/sao chép của văn bản gốc — module áp dụng điểm khuyến khích cho phương thức 100 theo mục 6.1.6, không theo nhãn sai ở Phụ lục 3.',
    status: 'incomplete',
    sourceId: 'hca-de-an-2026',
    scoreAffecting: true,
    impact: 'Nếu cách đọc trên sai (Phụ lục 3 thực ra chỉ áp dụng cho phương thức học bạ), điểm khuyến khích tính ra cho phương thức thi TN THPT sẽ cao hơn thực tế đối với thí sinh có context bonus.',
  },
  {
    id: 'hca-combination-year-mismatch-risk',
    label:
      'Bộ tổ hợp môn năm 2025 (`sources.ts:hca-notice-09-2025`) khác bộ tổ hợp năm 2026 (639-QĐ/HVCB bổ sung A07/D07/D09/D15/X01 và bớt/giữ khác nhau theo ngành) — module CHỈ dùng bộ tổ hợp 2025 khớp với điểm chuẩn 2025 đang model, không lấy nhầm bộ 2026.',
    status: 'verified',
    sourceId: 'hca-notice-09-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng nếu dùng đúng năm 2025 xuyên suốt — ghi chú để tránh nhầm lẫn khi có batch cập nhật lên năm 2026 sau này (cần đọc lại bảng tổ hợp + điểm chuẩn 2026 riêng, không tái sử dụng thresholds.ts hiện tại).',
  },
  {
    id: 'hca-priority-below-2025',
    label: 'Đối tượng ưu tiên (ĐT01-06) và khu vực chỉ có 4 mức chuẩn theo Phụ lục 4 — module không mô hình hoá các trường hợp ưu tiên đặc thù khác do Bộ trưởng Bộ GD&ĐT quyết định riêng (mục 2.b Phụ lục 4, "cho những đối tượng chính sách khác").',
    status: 'incomplete',
    sourceId: 'hca-de-an-2026',
    scoreAffecting: true,
    impact: 'Thí sinh thuộc diện chính sách đặc thù ngoài 6 nhóm đối tượng liệt kê sẽ không được tính điểm ưu tiên riêng đó qua UniScoreVN (hiếm gặp).',
  },
  {
    id: 'hca-tiebreak-not-modeled',
    label: 'Văn bản không nêu tiêu chí phụ khi bằng điểm chuẩn ở phương thức 100 — module không mô hình hoá tiêu chí phụ.',
    status: 'incomplete',
    sourceId: 'hca-de-an-2026',
    scoreAffecting: false,
    impact: 'Thí sinh có điểm xét tuyển đúng bằng điểm chuẩn có thể được báo "eligible" dù thực tế trường xét theo thứ tự nguyện vọng/tiêu chí phụ khác (nếu có) — chỉ ảnh hưởng trường hợp biên đúng ngưỡng.',
  },
];
