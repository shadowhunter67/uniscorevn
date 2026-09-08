import { describe, expect, it } from 'vitest';
import { findVluProgram, inferVluThresholdGroup, vluPrograms, VLU_FIELD_BLOCK_LABELS } from './programs';

describe('vluPrograms — danh mục 64 ngành Chương trình tiêu chuẩn', () => {
  it('đúng 64 ngành (con số trường tự nêu: "64 ngành đào tạo")', () => {
    expect(vluPrograms).toHaveLength(64);
  });

  it('mã ngành không trùng nhau', () => {
    const ids = vluPrograms.map((program) => program.id);
    expect(new Set(ids).size).toBe(64);
  });

  it('mọi mã ngành đều đúng dạng 7 chữ số của Bộ GD&ĐT', () => {
    expect(vluPrograms.every((program) => /^7\d{6}$/.test(program.id))).toBe(true);
  });

  it('dùng đủ 9 khối ngành của cột "KHỐI NGÀNH" trong ảnh gốc', () => {
    const blocks = new Set(vluPrograms.map((program) => program.fieldBlock));
    expect(blocks.size).toBe(Object.keys(VLU_FIELD_BLOCK_LABELS).length);
    expect(blocks.size).toBe(9);
  });

  it('khối Khoa học Sức khỏe có đúng 5 ngành (Y khoa/Dược/Điều dưỡng/RHM/KTXNYH)', () => {
    const health = vluPrograms.filter((program) => program.fieldBlock === 'khoa-hoc-suc-khoe');
    expect(health.map((program) => program.id)).toEqual(['7720101', '7720201', '7720301', '7720501', '7720601']);
  });

  it('findVluProgram tra được theo mã ngành, trả undefined cho mã lạ', () => {
    expect(findVluProgram('7380107')?.name).toBe('Luật kinh tế');
    expect(findVluProgram('7999999')).toBeUndefined();
    expect(findVluProgram(undefined)).toBeUndefined();
  });
});

describe('inferVluThresholdGroup — suy nhóm ngưỡng từ MÃ NGÀNH', () => {
  // Mỗi cặp dưới đây đối chiếu trực tiếp với dòng tương ứng của bảng điểm sàn chính thức
  // (`evidence.ts:vluTranscriptThresholdEvidence`), không suy từ tên ngành.
  it.each([
    ['7380101', 'law'], // Luật
    ['7380107', 'law'], // Luật kinh tế
    ['7720101', 'medicine-dentistry'], // Y khoa
    ['7720501', 'medicine-dentistry'], // Răng - Hàm - Mặt
    ['7720201', 'pharmacy'], // Dược học
    ['7720301', 'nursing-medlab'], // Điều dưỡng
    ['7720601', 'nursing-medlab'], // Kỹ thuật xét nghiệm y học
  ])('mã %s -> nhóm %s', (programId, expected) => {
    expect(inferVluThresholdGroup(programId)).toBe(expected);
  });

  it('ngành ngoài khối Sức khỏe/Luật -> standard (kể cả ngành cùng khối "Luật - Kinh doanh & Quản lý")', () => {
    expect(inferVluThresholdGroup('7340101')).toBe('standard'); // Quản trị Kinh doanh
    expect(inferVluThresholdGroup('7340301')).toBe('standard'); // Kế toán
    expect(inferVluThresholdGroup('7480201')).toBe('standard'); // Công nghệ thông tin
    expect(inferVluThresholdGroup('7580101')).toBe('standard'); // Kiến trúc
  });

  it('mã lạ -> undefined, KHÔNG mặc định standard (mã lạ có thể là ngành Global Elite, ngưỡng cao hơn)', () => {
    expect(inferVluThresholdGroup('7999999')).toBeUndefined();
    expect(inferVluThresholdGroup(undefined)).toBeUndefined();
  });
});
