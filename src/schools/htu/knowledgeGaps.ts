import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const htuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'htu-priority-value-silent',
    label:
      'Mục 5 của "Thông tin tuyển sinh năm 2025" chỉ nêu công thức GIẢM điểm ưu tiên cho thí sinh đạt từ 22,5/30 trở lên (trích Văn bản hợp nhất 02/VBHN-BGDĐT), KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ TNUT/TUEBA/PVU/HUST/DNU/TUMP.',
    status: 'incomplete',
    sourceId: 'htu-dean-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số HTU tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'htu-bonus-not-modeled',
    label: 'Mục 5.b "Thông tin tuyển sinh năm 2025" chỉ nêu "Điểm cộng được tính theo hướng dẫn của Bộ Giáo dục và Đào tạo" — trường không tự công bố bảng điểm cộng riêng (chứng chỉ quốc tế/giải thưởng...) cho phương thức 1. Module KHÔNG mô hình hoá điểm cộng (giả định = 0).',
    status: 'incomplete',
    sourceId: 'htu-dean-2025',
    scoreAffecting: true,
    impact: 'Thí sinh có điểm cộng theo hướng dẫn Bộ GD&ĐT (nếu có) chưa được cộng vào Điểm xét tuyển hiển thị cho HTU.',
  },
  {
    id: 'htu-luat-subject-floor-conflicting',
    label:
      'Ngành Luật (7380101) có điều kiện phụ được nêu KHÁC NHAU giữa 2 nguồn: `htu-threshold-2025` (thông báo điểm trúng tuyển) ghi "tổng điểm môn Toán và Văn >= 12 điểm", còn `htu-dean-2025` (đề án tuyển sinh, mục 5.c) ghi "điểm môn Toán và Văn phải từ 6 điểm trở lên" (có thể hiểu là mỗi môn riêng lẻ >= 6, một điều kiện chặt hơn). Module KHÔNG mô hình hoá điều kiện phụ này để tránh áp sai — chỉ so sánh với ngưỡng tổng điểm xét tuyển 18/30 đã công bố.',
    status: 'incomplete',
    sourceId: 'htu-threshold-2025',
    scoreAffecting: false,
    impact: 'Thí sinh đạt tổng điểm xét tuyển ngành Luật >= 18/30 nhưng không đạt điều kiện phụ Toán/Văn (nếu điều kiện chặt hơn là đúng) có thể được module báo "eligible" sai — cần thí sinh tự đối chiếu thêm điều kiện phụ trên trang trường.',
  },
  {
    id: 'htu-other-methods-not-modeled',
    label: 'HTU 2025 còn 5 phương thức khác: xét học bạ lớp 12 (mã 200), kết hợp IELTS (mã 409), xét ĐGNL/ĐGTD của ĐHQGHN/ĐHQG TPHCM/ĐHBK Hà Nội/ĐHSP Hà Nội (mã 402), xét TN THPT nước ngoài (mã 411), xét tuyển thẳng/ưu tiên xét tuyển (mã 301) — module CHỈ mô hình hoá phương thức 1 (kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'htu-dean-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho HTU.',
  },
  {
    id: 'htu-gdth-alt-method-condition-not-modeled',
    label: 'Ngành Giáo dục Tiểu học có điều kiện phụ riêng khi xét các phương thức KHÔNG dùng kết quả thi TN THPT (yêu cầu học lực giỏi hoặc điểm xét TN THPT >= 8,0) — không ảnh hưởng module này vì chỉ mô hình hoá phương thức 1 (thi TN THPT).',
    status: 'incomplete',
    sourceId: 'htu-threshold-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng — điều kiện này chỉ áp dụng cho các phương thức chưa mô hình hoá.',
  },
];
