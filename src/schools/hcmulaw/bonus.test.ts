import { describe, expect, it } from 'vitest';
import { calculateHcmulawMethod2Bonus, hasHcmulawMethod2QualifyingCertificate, HCMULAW_METHOD2_MAX_BONUS } from './bonus';

const LAW = '7380101' as const; // ngành Luật — dùng được MỌI loại chứng chỉ
const CHINESE = '7220204' as const; // Ngôn ngữ Trung Quốc — chỉ thêm được HSK
const BUSINESS = '7340101' as const; // Quản trị kinh doanh — chỉ tiếng Anh/SAT

/** Mọi cặp giá trị -> điểm dưới đây đối chiếu THẲNG với 2 bảng verbatim ở đầu `bonus.ts`. */
describe('bảng (*) — chứng chỉ tiếng Anh / SAT', () => {
  it.each([
    [5.5, 0.5],
    [6.0, 0.75],
    [6.5, 1.0],
    [7.0, 1.25],
    [7.5, 1.5],
    [9.0, 1.5], // "7.5 trở lên"
  ])('IELTS %s -> %s', (ielts, expected) => {
    expect(calculateHcmulawMethod2Bonus({ ielts }, LAW).bonus30).toBe(expected);
  });

  it('IELTS 5.0 dưới ngưỡng tối thiểu 5.5 -> 0 (không đủ điều kiện Phương thức 2)', () => {
    const result = calculateHcmulawMethod2Bonus({ ielts: 5.0 }, LAW);
    expect(result.bonus30).toBe(0);
    expect(hasHcmulawMethod2QualifyingCertificate(result)).toBe(false);
  });

  it.each([
    [1150, 0.5],
    [1200, 0.5], // biên trên khoảng 1150-1200
    [1210, 0.75], // biên dưới khoảng kế tiếp
    [1270, 1.0],
    [1330, 1.25],
    [1390, 1.5],
    [1600, 1.5],
  ])('SAT %s -> %s', (sat, expected) => {
    expect(calculateHcmulawMethod2Bonus({ sat }, LAW).bonus30).toBe(expected);
  });

  it('SAT 1140 dưới ngưỡng 1150 -> 0', () => {
    expect(calculateHcmulawMethod2Bonus({ sat: 1140 }, LAW).bonus30).toBe(0);
  });

  it.each([
    [65, 0.5],
    [72, 0.5],
    [73, 0.75],
    [81, 1.0],
    [89, 1.25],
    [96, 1.5],
    [120, 1.5],
  ])('TOEFL iBT %s (thang CŨ, dự thi 2026-01-20) -> %s', (toeflIbt, expected) => {
    expect(calculateHcmulawMethod2Bonus({ toeflIbt, toeflIbtExamDate: '2026-01-20' }, LAW).bonus30).toBe(expected);
  });

  it.each([
    [3.0, 0.5],
    [3.5, 0.75],
    [4.0, 1.0],
    [4.5, 1.25],
    [5.0, 1.5],
    [6.0, 1.5],
  ])('TOEFL iBT %s (thang MỚI, dự thi 2026-06-01) -> %s', (toeflIbt, expected) => {
    expect(calculateHcmulawMethod2Bonus({ toeflIbt, toeflIbtExamDate: '2026-06-01' }, LAW).bonus30).toBe(expected);
  });

  it('mốc 21/01/2026: dự thi ĐÚNG ngày đó đã dùng thang MỚI ("từ ngày ... trở về sau")', () => {
    expect(calculateHcmulawMethod2Bonus({ toeflIbt: 4.0, toeflIbtExamDate: '2026-01-21' }, LAW).bonus30).toBe(1.0);
    // Cùng con số 4.0 nhưng ở thang CŨ thì dưới cả ngưỡng 65 -> 0.
    expect(calculateHcmulawMethod2Bonus({ toeflIbt: 4.0, toeflIbtExamDate: '2026-01-20' }, LAW).bonus30).toBe(0);
  });
});

describe('bảng (**) — chứng chỉ tiếng Pháp / Nhật / Trung', () => {
  it.each([
    ['B1', 1.0],
    ['B2', 1.25],
    ['C1', 1.5],
    ['C2', 1.5], // "C1 trở lên"
  ] as const)('DELF %s -> %s', (delf, expected) => {
    expect(calculateHcmulawMethod2Bonus({ delf }, LAW).bonus30).toBe(expected);
  });

  it.each([
    ['A1', 0],
    ['A2', 0],
  ] as const)('DELF %s dưới ngưỡng B1 -> %s', (delf, expected) => {
    expect(calculateHcmulawMethod2Bonus({ delf }, LAW).bonus30).toBe(expected);
  });

  it.each([
    ['N3', 1.0],
    ['N2', 1.25],
    ['N1', 1.5],
  ] as const)('JLPT %s -> %s (N1 là bậc CAO nhất, không phải thấp nhất)', (jlpt, expected) => {
    expect(calculateHcmulawMethod2Bonus({ jlpt }, LAW).bonus30).toBe(expected);
  });

  it.each([
    ['N5', 0],
    ['N4', 0],
  ] as const)('JLPT %s dưới ngưỡng N3 -> %s', (jlpt, expected) => {
    expect(calculateHcmulawMethod2Bonus({ jlpt }, LAW).bonus30).toBe(expected);
  });

  it.each([
    ['HSK3', 1.0],
    ['HSK4', 1.25],
    ['HSK5', 1.5],
    ['HSK6', 1.5], // "HSK5 trở lên"
    ['HSK2', 0],
  ] as const)('HSK %s -> %s', (hsk, expected) => {
    expect(calculateHcmulawMethod2Bonus({ hsk }, LAW).bonus30).toBe(expected);
  });

  it('TCF dùng chung thang CEFR với DELF ("Tương đương B1/B2/C1 trở lên")', () => {
    expect(calculateHcmulawMethod2Bonus({ tcf: 'B2' }, LAW).bonus30).toBe(1.25);
  });
});

describe('"chỉ công nhận DUY NHẤT một loại chứng chỉ cao nhất"', () => {
  it('lấy max, KHÔNG cộng dồn — 3 chứng chỉ 1,50 vẫn chỉ 1,50 (bằng trần)', () => {
    const result = calculateHcmulawMethod2Bonus({ ielts: 7.5, sat: 1390, jlpt: 'N1' }, LAW);
    expect(result.bonus30).toBe(1.5);
    expect(result.bonus30).toBe(HCMULAW_METHOD2_MAX_BONUS);
  });

  it('max lấy được cả xuyên qua 2 bảng khác nhau: SAT 1150 (0,50) vs HSK4 (1,25) -> 1,25', () => {
    const result = calculateHcmulawMethod2Bonus({ sat: 1150, hsk: 'HSK4' }, LAW);
    expect(result.bonus30).toBe(1.25);
    expect(result.source).toBe('hsk');
  });

  it('báo đúng loại chứng chỉ đã dùng để quy đổi', () => {
    expect(calculateHcmulawMethod2Bonus({ ielts: 7.0, sat: 1150 }, LAW).source).toBe('ielts');
    expect(calculateHcmulawMethod2Bonus({ ielts: 5.5, sat: 1390 }, LAW).source).toBe('sat');
  });
});

describe('ràng buộc ngành (mục 2(c)(i))', () => {
  it('tiếng Pháp/Nhật CHỈ dùng cho ngành Luật', () => {
    expect(calculateHcmulawMethod2Bonus({ delf: 'C1', jlpt: 'N1' }, LAW).bonus30).toBe(1.5);
    const business = calculateHcmulawMethod2Bonus({ delf: 'C1', jlpt: 'N1' }, BUSINESS);
    expect(business.bonus30).toBe(0);
    expect(business.ignoredForProgram).toEqual(['delf', 'jlpt']);
  });

  it('tiếng Trung dùng cho ngành Luật VÀ Ngôn ngữ Trung Quốc, không dùng cho ngành khác', () => {
    expect(calculateHcmulawMethod2Bonus({ hsk: 'HSK5' }, LAW).bonus30).toBe(1.5);
    expect(calculateHcmulawMethod2Bonus({ hsk: 'HSK5' }, CHINESE).bonus30).toBe(1.5);
    expect(calculateHcmulawMethod2Bonus({ hsk: 'HSK5' }, BUSINESS).bonus30).toBe(0);
  });

  it('ngành Ngôn ngữ Trung Quốc KHÔNG dùng được tiếng Pháp/Nhật', () => {
    const result = calculateHcmulawMethod2Bonus({ jlpt: 'N1' }, CHINESE);
    expect(result.bonus30).toBe(0);
    expect(result.ignoredForProgram).toContain('jlpt');
  });

  it('tiếng Anh/SAT không bị giới hạn ngành', () => {
    expect(calculateHcmulawMethod2Bonus({ ielts: 6.5 }, BUSINESS).bonus30).toBe(1.0);
  });
});

describe('TOEFL thiếu ngày dự thi — không đoán thang', () => {
  it('2 thang cho 2 mức khác nhau và chưa có gì cao hơn -> needsToeflExamDate', () => {
    const result = calculateHcmulawMethod2Bonus({ toeflIbt: 90 }, LAW);
    expect(result.needsToeflExamDate).toBe(true);
    expect(result.bonus30).toBeUndefined();
  });

  it('2 thang cho CÙNG mức (100: thang cũ >=96 và thang mới >=5.0 đều 1,50) -> chốt luôn', () => {
    const result = calculateHcmulawMethod2Bonus({ toeflIbt: 100 }, LAW);
    expect(result.needsToeflExamDate).toBe(false);
    expect(result.bonus30).toBe(1.5);
  });

  it('chứng chỉ khác đã đạt trần 1,50 -> TOEFL không thể là loại cao nhất, không cần hỏi ngày', () => {
    const result = calculateHcmulawMethod2Bonus({ toeflIbt: 90, ielts: 7.5 }, LAW);
    expect(result.needsToeflExamDate).toBe(false);
    expect(result.bonus30).toBe(1.5);
    expect(result.source).toBe('ielts');
  });

  it('chứng chỉ khác thấp hơn khả năng cao nhất của TOEFL -> vẫn phải hỏi ngày', () => {
    expect(calculateHcmulawMethod2Bonus({ toeflIbt: 90, ielts: 6.0 }, LAW).needsToeflExamDate).toBe(true);
  });
});

describe('không có chứng chỉ nào', () => {
  it('hồ sơ rỗng -> 0, không đủ điều kiện Phương thức 2', () => {
    const result = calculateHcmulawMethod2Bonus(undefined, LAW);
    expect(result.bonus30).toBe(0);
    expect(result.needsToeflExamDate).toBe(false);
    expect(hasHcmulawMethod2QualifyingCertificate(result)).toBe(false);
  });

  it('chỉ có chứng chỉ nguồn KHÔNG tính cho Phương thức 2 (TOEIC/ACT/IB) -> 0', () => {
    expect(calculateHcmulawMethod2Bonus({ toeic: 990, act: 36, ib: 45 }, LAW).bonus30).toBe(0);
  });
});
