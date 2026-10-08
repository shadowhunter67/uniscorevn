export const UAH_THPT_THRESHOLD = {
  min30: 15,
  max30: 21,
  requiredText:
    'UAH 2026 (Thông báo 975/TB-HDTS, 08/07/2026): ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) thay doi theo ngành: 21 (thiết kế cong nghiep, thiết kế đồ họa, thiết kế thời trang), 20 (kien truc, thiết kế nội thất), 18 (quy hoặch vung va đô thị, kien truc cảnh quan, my thuat đô thị), 17 (kỹ thuật xây dựng, quản lý xây dựng), 16 (kỹ thuật cơ sở hạ tầng), 15 (thiết kế đô thị - chương trình tiên tiến).',
};

/** Ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, khối A/D — không môn năng khiếu) — đọc trực tiếp bản
 * PDF gốc Thông báo 975/TB-HDTS (08/07/2026, mục "Ngưỡng ĐBCLĐV"), thay vì qua báo chí thứ cấp như
 * `UAH_THPT_THRESHOLD`: ngưỡng 16,00/30. Cross-check khớp đúng số đã có từ Tuổi Trẻ. */
export const UAH_KTCSHT_THPT_THRESHOLD = {
  min30: 16,
  requiredText:
    'UAH 2026 (Thông báo 975/TB-HĐTS, 08/07/2026, đọc trực tiếp bản PDF gốc): ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, tổ hợp C01/A01/D01/D07) là 16,00/30 điểm.',
};
