import { describe, expect, it } from 'vitest';
import { displaySourceLabel, userFacingText } from './userFacingText';

describe('userFacingText', () => {
  it('bỏ tham chiếu mã nội bộ trong backtick', () => {
    expect(userFacingText('điểm chuẩn khớp (`sources.ts:tvu-threshold-2025`/`tvu-threshold-secondary-2025`, khớp số liệu)')).toBe(
      'điểm chuẩn khớp (khớp số liệu)'
    );
  });

  it('đổi tên file trong backtick thành cụm dễ hiểu, bỏ id kebab', () => {
    expect(userFacingText('Ngưỡng lấy từ `hutech-quality-threshold-2026` và `eligibility.ts` nên cần xác nhận.')).toBe(
      'Ngưỡng lấy từ và bộ điều kiện xét tuyển nên cần xác nhận.'
    );
  });

  it('giữ code span không phải tham chiếu nội bộ, chỉ bỏ backtick', () => {
    expect(userFacingText('Điểm = `a + b` theo thông báo')).toBe('Điểm = a + b theo thông báo');
  });

  it('bỏ cụm "xem file.ts" không có backtick', () => {
    expect(userFacingText('chưa mô hình hoá (xem knowledgeGaps.ts). Chỉ tính PT2.')).toBe('chưa mô hình hoá. Chỉ tính PT2.');
    expect(userFacingText('Tiếng Trung không có SubjectId — xem knowledgeGaps.ts.')).toBe('Tiếng Trung không có mã môn.');
  });

  it('đổi đường dẫn file còn sót thành cụm dễ hiểu', () => {
    expect(userFacingText('CHƯA transcribe vào data/cutoffs.ts — UMP chưa có cutoff')).toBe(
      'CHƯA chép lại vào dữ liệu điểm chuẩn — UMP chưa có điểm chuẩn'
    );
  });

  it('bỏ mã kebab-case trong ngoặc đơn và từ lóng "batch"', () => {
    expect(userFacingText('dùng cho nhánh exact (ou-thpt-exam-exact-2026). Nhóm Luật')).toBe('dùng cho nhánh chính xác. Nhóm Luật');
    expect(userFacingText('thêm vào danh mục (X01 thêm trong batch này). Tiêu chí')).toBe('thêm vào danh mục (X01 thêm). Tiêu chí');
  });

  it('bỏ mã kebab-case đứng đầu ngoặc kèm chữ khác và dạng viết hoa', () => {
    expect(userFacingText('Nhánh exact (tbdu-thpt-exam-exact-2026, nhóm ngành thường) đã model.')).toBe('Nhánh chính xác (nhóm ngành thường) đã model.');
    expect(userFacingText('để tránh đoán sai (Do-not-guess-formula).')).toBe('để tránh đoán sai.');
  });

  it('KHÔNG xoá danh sách tổ hợp môn hợp lệ trong ngoặc', () => {
    expect(userFacingText('Xét tổ hợp (A00-A01-D01) và (A00-B00-C00, D01).')).toBe('Xét tổ hợp (A00-A01-D01) và (A00-B00-C00, D01).');
  });

  it('đổi thuật ngữ lập trình sang tiếng Việt cùng nghĩa', () => {
    expect(userFacingText('evaluator nhận thresholdGroup từ caller, chưa wired vào runtime.')).toBe(
      'bộ tính điểm nhận nhóm ngưỡng từ nơi gọi, chưa đưa vào phần tính toán.'
    );
    expect(userFacingText('Nhánh exact dùng khung quốc gia làm judgment call (ApplicantProfile).')).toBe(
      'Nhánh chính xác dùng khung quốc gia làm giả định của UniScoreVN (hồ sơ dùng chung).'
    );
  });

  it('không đổi chuỗi bình thường', () => {
    expect(userFacingText('Tính được điểm xét tuyển (thang 30).')).toBe('Tính được điểm xét tuyển (thang 30).');
  });
});

describe('displaySourceLabel', () => {
  it('ưu tiên tiêu đề đã lọc, không lộ id kebab-case', () => {
    expect(displaySourceLabel('Thông báo 2026', 'abc-threshold-2025')).toBe('Thông báo 2026');
    expect(displaySourceLabel(undefined, 'abc-threshold-2025')).toBe('Nguồn tham khảo');
    expect(displaySourceLabel(undefined, 'official')).toBe('official');
  });
});
