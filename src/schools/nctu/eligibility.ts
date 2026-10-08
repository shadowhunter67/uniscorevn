export const NCTU_THPT_THRESHOLD = {
  min30: 15,
  max30: 20,
  requiredText:
    'NCTU 2026: ngưỡng THPT (kết quả thi tốt nghiệp THPT) thay doi theo nhóm ngành; mức chung 15/30 cho đa số 48 ngành, riêng nhom Sức khỏe (Y khoa, RHM, Dược) va Luật/Luật Kinh tế theo ngung dam bao chất lượng đầu vào riêng của Bộ GD&ĐT, gan voi điều kiện học lực lớp 12 xếp loại Tốt va tổng điểm từ 20/30 (hoặc điểm xét tot nghiep >= 8.5) — điều kiện học lực chưa có trường du lieu hồ sơ tuong ung nen không mô hình hóa.',
};

/** Ngưỡng chung 15/30 cho nhóm ngành ngoài Sức khỏe/Luật — dùng riêng cho exact calculator
 * (`nctu-thpt-exam-standard-2026`), tách khỏi văn bản mô tả đầy đủ cả 2 nhóm ở trên. */
export const NCTU_STANDARD_THPT_THRESHOLD = {
  min30: 15,
  requiredText: 'NCTU 2026: tổng điểm 3 môn thi TN THPT theo tổ hợp xét tuyển, chưa cộng điểm ưu tiên, ≥ 15/30 — áp dụng nhóm ngành ngoài Sức khỏe (Y khoa, RHM, Dược) và Luật/Luật Kinh tế.',
};
