/**
 * BVU 2026 — ngưỡng điểm sàn học bạ, cập nhật theo bài đăng chính thức 10/08/2026
 * (`bvu-diem-trung-tuyen-2026`, thay thế số "dự kiến" 24,0/19,5 trước đó): Dược học 20,0/30,
 * Điều dưỡng 18,0/30, Luật 20,0/30, các ngành khác 18,0/30. Trang cũ (`bvu-admission-2026`) mô tả
 * công thức = điểm TB lớp 12 của 3 môn tổ hợp + điểm ưu tiên, nhưng nay đã 404 — bài đăng mới KHÔNG
 * xác nhận lại việc cộng điểm ưu tiên cho phương thức học bạ (chỉ xác nhận rõ KHÔNG cộng ưu tiên
 * cho phương thức thi THPT) nên giữ nguyên `partial`/`unknown` cho học bạ, không nâng exact.
 */
export const BVU_TRANSCRIPT_THRESHOLD = {
  min30: 18,
  max30: 20,
  requiredText:
    'BVU 2026: ngưỡng điểm sàn học bạ (điểm trung bình lớp 12 của 3 môn tổ hợp xét tuyển), thang 30. Đa số ngành/chương trình >= 18,0/30; Dược học >= 20,0/30; Điều dưỡng >= 18,0/30; Luật >= 20,0/30 (cập nhật 10/08/2026, thay số "dự kiến" trước đó).',
};
