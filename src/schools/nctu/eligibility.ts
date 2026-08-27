export const NCTU_THPT_THRESHOLD = {
  min30: 15,
  max30: 20,
  requiredText:
    'NCTU 2026: nguong THPT (ket qua thi tot nghiep THPT) thay doi theo nhom nganh; muc chung 15/30 cho da so 48 nganh, rieng nhom Suc khoe (Y khoa, RHM, Duoc) va Luat/Luat Kinh te theo ngung dam bao chat luong dau vao rieng cua Bo GD&DT, gan voi dieu kien hoc luc lop 12 xep loai Tot va tong diem tu 20/30 (hoac diem xet tot nghiep >= 8.5) — dieu kien hoc luc chua co truong du lieu ho so tuong ung nen khong mo hinh hoa.',
};

/** Ngưỡng chung 15/30 cho nhóm ngành ngoài Sức khỏe/Luật — dùng riêng cho exact calculator
 * (`nctu-thpt-exam-standard-2026`), tách khỏi văn bản mô tả đầy đủ cả 2 nhóm ở trên. */
export const NCTU_STANDARD_THPT_THRESHOLD = {
  min30: 15,
  requiredText: 'NCTU 2026: tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển, chưa cộng điểm ưu tiên, ≥ 15/30 — áp dụng nhóm ngành ngoài Sức khỏe (Y khoa, RHM, Dược) và Luật/Luật Kinh tế.',
};
