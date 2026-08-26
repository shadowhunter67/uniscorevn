export const UAH_THPT_THRESHOLD = {
  min30: 15,
  max30: 21,
  requiredText:
    'UAH 2026 (Thong bao 975/TB-HDTS, 08/07/2026): nguong dam bao chat luong dau vao (thi TN THPT) thay doi theo nganh: 21 (thiet ke cong nghiep, thiet ke do hoa, thiet ke thoi trang), 20 (kien truc, thiet ke noi that), 18 (quy hoach vung va do thi, kien truc canh quan, my thuat do thi), 17 (ky thuat xay dung, quan ly xay dung), 16 (ky thuat co so ha tang), 15 (thiet ke do thi - chuong trinh tien tien).',
};

/** Ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, khối A/D — không môn năng khiếu) — đọc trực tiếp bản
 * PDF gốc Thông báo 975/TB-HDTS (08/07/2026, mục "Ngưỡng ĐBCLĐV"), thay vì qua báo chí thứ cấp như
 * `UAH_THPT_THRESHOLD`: ngưỡng 16,00/30. Cross-check khớp đúng số đã có từ Tuổi Trẻ. */
export const UAH_KTCSHT_THPT_THRESHOLD = {
  min30: 16,
  requiredText:
    'UAH 2026 (Thông báo 975/TB-HĐTS, 08/07/2026, đọc trực tiếp bản PDF gốc): ngưỡng đảm bảo chất lượng đầu vào (thi TN THPT) ngành Kỹ thuật cơ sở hạ tầng (mã 7580210, tổ hợp C01/A01/D01/D07) là 16,00/30 điểm.',
};
