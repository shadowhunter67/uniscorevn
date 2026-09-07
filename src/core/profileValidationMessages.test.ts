import { describe, expect, it } from 'vitest';
import { validateCertificateScore, validateThptScore, validateVactTotal } from './profileValidationMessages';

describe('profileValidationMessages', () => {
  it('rỗng -> không lỗi (chưa nhập, không phải nhập sai)', () => {
    expect(validateThptScore('Toán', '')).toBeNull();
    expect(validateThptScore('Toán', '  ')).toBeNull();
  });

  it('không phải số -> thông báo bằng tiếng người, có trích giá trị đã nhập', () => {
    const message = validateThptScore('Toán', 'abc');
    expect(message).toContain('Điểm Toán');
    expect(message).toContain('abc');
  });

  it('THPT ngoài range 0-10 -> thông báo đúng range + giá trị đã nhập', () => {
    const message = validateThptScore('Toán', '12');
    expect(message).toBe('Điểm Toán phải từ 0 đến 10 — bạn đang nhập 12.');
  });

  it('THPT trong range -> không lỗi', () => {
    expect(validateThptScore('Toán', '8.5')).toBeNull();
    expect(validateThptScore('Toán', '0')).toBeNull();
    expect(validateThptScore('Toán', '10')).toBeNull();
  });

  it('ĐGNL dùng đúng range 0-1200, không lẫn range THPT', () => {
    expect(validateVactTotal('1201')).toContain('0 đến 1200');
    expect(validateVactTotal('1200')).toBeNull();
  });

  it('chứng chỉ dùng đúng range riêng từng loại', () => {
    expect(validateCertificateScore('ielts', 'IELTS', '9.5')).toContain('0 đến 9');
    expect(validateCertificateScore('ielts', 'IELTS', '9')).toBeNull();
    expect(validateCertificateScore('toeic', 'TOEIC', '1000')).toContain('0 đến 990');
  });
});
