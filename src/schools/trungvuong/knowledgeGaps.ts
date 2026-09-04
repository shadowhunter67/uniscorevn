import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const trungvuongKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'trungvuong-priority-value-silent',
    label:
      'Mục 7 "Chính sách ưu tiên" của Thông báo 387/TB-ĐHTV chỉ ghi "Theo quy chế tuyển sinh của Bộ Giáo dục và Đào tạo", KHÔNG tự công bố mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung điểm ưu tiên quốc gia hiện hành làm judgment call cho giá trị bảng (`priority.ts`), cùng tiền lệ DNU/TUEBA/PVU/HUST.',
    status: 'incomplete',
    sourceId: 'trungvuong-thongbao-387-2025',
    scoreAffecting: true,
    impact: 'Điểm ưu tiên hiển thị dùng giá trị bảng chuẩn quốc gia, không phải số TVUni tự công bố riêng (trường không công bố số riêng).',
  },
  {
    id: 'trungvuong-threshold-not-first-party-fetchable',
    label:
      'Trang chính chủ tv-uni.edu.vn/diem-chuan-truong-dai-hoc-trung-vuong-2025/ không có bảng điểm chuẩn đầy đủ theo ngành khi truy cập lại (đã được cập nhật cho các mùa tuyển sinh sau) — bảng điểm trúng tuyển 2025 theo ngành dùng cross-check 3 nguồn tổng hợp độc lập khớp tuyệt đối (tuyensinh247.com, fptshop.com.vn, trangedu.com), không phải văn bản chính chủ có chữ ký/con dấu cho riêng bảng điểm chuẩn (công thức và tổ hợp môn vẫn lấy từ văn bản chính chủ có chữ ký/con dấu Thông báo 387/TB-ĐHTV).',
    status: 'incomplete',
    sourceId: 'trungvuong-diemchuan-2025-crosscheck',
    scoreAffecting: true,
    impact: 'Bảng điểm chuẩn dùng cross-check thay vì văn bản gốc có chữ ký cho riêng số liệu điểm chuẩn — rủi ro thấp do 3 nguồn độc lập khớp tuyệt đối trên toàn bộ 16/16 ngành.',
  },
  {
    id: 'trungvuong-foreign-language-combos-excluded',
    label:
      'Các tổ hợp dùng ngoại ngữ không có SubjectId tương ứng trong hệ thống (D04 — Ngữ văn/Toán/Tiếng Trung Quốc; DD2 — Toán/Ngữ văn/Tiếng Hàn) và 2 mã tổ hợp không xác định rõ thành phần môn (B01, D02, riêng của ngành Quản trị dịch vụ du lịch và lữ hành) bị LOẠI khỏi `thresholds.ts` — các tổ hợp còn lại của mỗi ngành liên quan vẫn tính được (Ngôn ngữ Trung Quốc 6/7 tổ hợp; Ngôn ngữ Hàn Quốc 6/7 tổ hợp; Quản trị dịch vụ du lịch và lữ hành 5/8 tổ hợp).',
    status: 'incomplete',
    sourceId: 'trungvuong-thongbao-387-2025',
    scoreAffecting: false,
    impact: 'Thí sinh chỉ có điểm thi các tổ hợp bị loại (D04/DD2/B01/D02) không tính được qua UniscoreVN cho các ngành liên quan.',
  },
  {
    id: 'trungvuong-health-quality-floor-not-modeled',
    label:
      'Mục 3.2 "Điều kiện xét tuyển" ghi ngưỡng đảm bảo chất lượng đầu vào ngành Điều dưỡng, Dược học "do Bộ Giáo dục và Đào tạo công bố" (điểm sàn khối ngành sức khỏe) — không mô hình hoá riêng, chỉ dùng điểm trúng tuyển thực tế đã công bố (17,5/30 và 19,0/30) làm ngưỡng so sánh.',
    status: 'incomplete',
    sourceId: 'trungvuong-thongbao-387-2025',
    scoreAffecting: false,
    impact: 'Không ảnh hưởng kết quả tính vì điểm trúng tuyển thực tế đã công bố luôn >= điểm sàn khối sức khỏe của Bộ.',
  },
  {
    id: 'trungvuong-other-methods-not-modeled',
    label:
      'TVUni 2025 còn Phương thức 1 (xét học bạ, công thức ĐXT1 = MH1+MH2+MH3 riêng — KHÔNG cộng điểm ưu tiên), Phương thức 3 (xét tuyển thẳng) và Phương thức 4 (kết quả ĐGNL/ĐGTD) — module này CHỈ mô hình hoá Phương thức 2 (xét kết quả thi TN THPT).',
    status: 'incomplete',
    sourceId: 'trungvuong-thongbao-387-2025',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng các phương thức khác chưa tính được qua UniscoreVN cho TVUni.',
  },
];
