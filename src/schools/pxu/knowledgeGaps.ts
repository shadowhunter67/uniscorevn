import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const pxuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'pxu-bonus-points-not-modeled',
    label:
      'Số 041/TB-PXU mục 5.2 "Điểm cộng" công bố 3 nhóm điểm cộng CỘNG THÊM vào Điểm xét tuyển (ngoài điểm ưu tiên KV/ĐT): (a) giải HSG cấp tỉnh/TP + học sinh trường chuyên/năng khiếu/THPT thực hành + khen thưởng HSG/HS xuất sắc lớp 10-12 (0,5 - 1,5 điểm, mức cao nhất áp dụng nếu đạt nhiều điều kiện); (b) giải NCKH/KHKT cấp tỉnh/TP (2,25 - 2,75 điểm); (c) chứng chỉ ngoại ngữ quốc tế còn hạn — Anh/Trung/Hàn/Nhật/Pháp theo khung năng lực bậc 3-5 (0,5 - 1,5 điểm). Cả 3 bảng đều có giá trị cụ thể ĐÃ ĐỌC (không phải thiếu nguồn) nhưng CHƯA wired vào `evaluate.ts` — runtime hiện chỉ cộng điểm ưu tiên KV/ĐT, bỏ qua điểm cộng.',
    status: 'incomplete',
    sourceId: 'pxu-thongbao-041-2026',
    scoreAffecting: true,
    knownData: [
      'Điểm cộng (a) — thành tích học tập: Giải Nhất/Nhì cấp tỉnh 1,5; Giải Ba cấp tỉnh 1,0; Giải Khuyến khích cấp tỉnh 1,0; HS xuất sắc/giỏi lớp 10-12 1,0; HS lớp chuyên/năng khiếu 1,0; HS trường chuyên (không lớp chuyên) 0,5',
      'Điểm cộng (b) — NCKH/KHKT: Giải Nhất cấp tỉnh/TP 2,75; Giải Nhì 2,50; Giải Ba 2,25',
      'Điểm cộng (c) — chứng chỉ ngoại ngữ (Anh/Trung/Hàn/Nhật/Pháp): Bậc 3 = 0,5; Bậc 4 = 1,0; Bậc 5 trở lên = 1,5',
    ],
    impact: 'Thí sinh có thành tích thuộc 1 trong 3 nhóm trên sẽ có Điểm xét tuyển thực tế CAO HƠN kết quả UniscoreVN tính hiện tại (chỉ thiếu điểm cộng, không sai điểm thô/điểm ưu tiên).',
  },
  {
    id: 'pxu-chinese-combination-not-modeled',
    label:
      'Số 041/TB-PXU liệt kê 4 tổ hợp có môn Tiếng Trung Quốc (D04: Toán-Văn-Trung; D45: Văn-Địa-Trung; D65: Văn-Sử-Trung; X37: Toán-GDKTPL-Trung) cho các ngành Quản trị kinh doanh, Ngôn ngữ Trung Quốc, Quản trị dịch vụ Du lịch và Lữ hành, Quản lý công nghiệp, Truyền thông đa phương tiện. `core/subjects.ts` (dùng chung toàn hệ thống) hiện KHÔNG có subject id cho "Tiếng Trung Quốc" nên 4 tổ hợp này không mô hình hoá được ở batch này — `thresholds.ts` chỉ liệt kê tổ hợp KHÔNG dùng Tiếng Trung cho mỗi ngành (mọi ngành đều còn ít nhất 1 tổ hợp hợp lệ khác).',
    status: 'incomplete',
    sourceId: 'pxu-thongbao-041-2026',
    scoreAffecting: false,
    impact: 'Thí sinh muốn xét tuyển bằng tổ hợp có môn Tiếng Trung (đặc biệt ngành Ngôn ngữ Trung Quốc) chưa tính được qua UniscoreVN cho PXU — vẫn còn tổ hợp khác hợp lệ để chọn.',
  },
  {
    id: 'pxu-other-methods-not-modeled',
    label:
      'PXU 2026 có 5 phương thức tuyển sinh (Số 041/TB-PXU mục II.2): PT1 (thi TN THPT), PT2 (học bạ + phỏng vấn), PT3 (thi TN THPT/học bạ kết hợp chứng chỉ ngoại ngữ), PT4 (điểm ĐGNL ĐHQG Hà Nội/TP.HCM), PT5 (xét tuyển thẳng theo quy chế Bộ GD&ĐT). Module này CHỈ mô hình hoá PT1 và PT2 — PT3 cần bảng quy đổi chứng chỉ ngoại ngữ (đã đọc, Phụ lục 1.1/1.2, nhưng workflow riêng biệt CHƯA implement); PT4 cần bảng quy đổi điểm ĐGNL riêng của ĐHQG (không phải PXU công bố); PT5 là tuyển thẳng, không có công thức tính điểm.',
    status: 'incomplete',
    sourceId: 'pxu-thongbao-041-2026',
    scoreAffecting: false,
    impact: 'Thí sinh xét tuyển bằng PT3/PT4/PT5 chưa tính được qua UniscoreVN cho PXU.',
  },
];
