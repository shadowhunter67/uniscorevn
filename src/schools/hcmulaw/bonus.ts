import { CEFR_LEVELS, HSK_LEVELS, JLPT_LEVELS, isAtLeastLevel, type ApplicantProfile } from '../../core/applicantProfile';
import type { HcmulawProgramId } from './programs';

/**
 * ===== ĐIỂM KHUYẾN KHÍCH — Phương thức 2 (mã 410) =====
 *
 * Nguồn: `hcmulaw-method-notice-2026` mục 2(c)(i)-(ii), đọc lại verbatim 2026-09-08 (tải HTML gốc,
 * strip tag, đọc thẳng 2 bảng dạng text — KHÔNG qua tóm tắt). Câu mở đầu mục (ii) verbatim:
 * "Điểm của tiêu chí, điều kiện nêu trên được quy đổi thành điểm khuyến khích (tối đa 1,50 điểm) để
 * xét tuyển".
 *
 * Có ĐÚNG 2 bảng, mỗi bảng có câu quy định "chỉ 1 loại cao nhất" riêng:
 *
 * (*) "Quy đổi điểm chứng chỉ tiếng Anh, hoặc kết quả Kỳ thi SAT của Mỹ (thí sinh chỉ được Trường
 *     công nhận điểm quy đổi tương ứng với duy nhất một loại chứng chỉ (hoặc kết quả Kỳ thi SAT)
 *     cao nhất)"
 *     | IELTS | TOEFL iBT (dự thi TRƯỚC 21/01/2026) | TOEFL iBT (dự thi TỪ 21/01/2026) | SAT | Điểm |
 *     | 5.5          | 65 - 72       | 3.0          | 1150 - 1200   | 0,50 |
 *     | 6.0          | 73 - 80       | 3.5          | 1210 - 1260   | 0,75 |
 *     | 6.5          | 81 - 88       | 4.0          | 1270 - 1320   | 1,00 |
 *     | 7.0          | 89 - 95       | 4.5          | 1330 - 1380   | 1,25 |
 *     | 7.5 trở lên  | 96 trở lên    | 5.0 trở lên  | 1390 trở lên  | 1,50 |
 *
 * (**) "Quy đổi điểm chứng chỉ tiếng Pháp, hoặc tiếng Nhật, hoặc tiếng Trung (thí sinh chỉ được
 *      Trường công nhận điểm quy đổi tương ứng với duy nhất một loại chứng chỉ cao nhất)"
 *      | DELF | TCF (tương đương) | JLPT | HSK | Điểm |
 *      | B1          | Tương đương B1         | N3 | HSK3         | 1,00 |
 *      | B2          | Tương đương B2         | N2 | HSK4         | 1,25 |
 *      | C1 trở lên  | Tương đương C1 trở lên | N1 | HSK5 trở lên | 1,50 |
 *
 * ===== 3 quyết định mô hình hoá, và vì sao KHÔNG phải đoán =====
 *
 * 1. LẤY MAX TOÀN BỘ, KHÔNG CỘNG DỒN 2 BẢNG. Tiêu chí (c) của Phương thức 2 là MỘT điều kiện duy
 *    nhất — "có chứng chỉ ngoại ngữ quốc tế (tiếng Anh, HOẶC tiếng Pháp, HOẶC tiếng Nhật, HOẶC
 *    tiếng Trung), hoặc có kết quả Kỳ thi SAT" — và mục (ii) chốt trần 1,50. Mức cao nhất của MỖI
 *    bảng đã đúng bằng 1,50, nên "lấy max toàn bộ" vừa thoả câu "duy nhất một loại cao nhất" của
 *    từng bảng, vừa không bao giờ vượt trần. Cộng dồn thì ngược lại: 2 chứng chỉ 1,50 sẽ ra 3,00,
 *    vượt trần mà nguồn nêu rõ — nên cộng dồn là cách đọc SAI, không phải cách đọc thay thế.
 *
 * 2. SO SÁNH BẰNG "TỪ ... TRỞ LÊN" thay vì khớp đúng ô. Cột IELTS/TOEFL-mới của bảng gốc ghi giá trị
 *    RỜI (5.5/6.0/6.5/7.0), cột SAT/TOEFL-cũ ghi KHOẢNG. Với thang điểm thật thì 2 cách này trùng
 *    nhau: IELTS chỉ có bước 0,5; SAT chỉ có bước 10 (nên 1200 và 1210 đều hợp lệ, còn 1205 không
 *    tồn tại). Dùng ngưỡng "≥" bảo đảm giá trị lọt vào kẽ hở giữa 2 khoảng (chỉ xảy ra với dữ liệu
 *    nhập tay sai) rơi xuống mức THẤP hơn, tức không bao giờ cộng dư.
 *
 * 3. TOEFL iBT: 2 THANG THEO NGÀY DỰ THI. `certificates.toeflIbtExamDate` quyết định dùng bảng nào.
 *    Thiếu ngày thì KHÔNG đoán: hàm này tính cả 2 cách và chỉ trả kết quả khi 2 cách KHÔNG làm đổi
 *    đáp án cuối (xem `toeflAmbiguous` bên dưới) — còn lại báo cần bổ sung ngày.
 *
 * ===== Ràng buộc theo ngành (mục 2(c)(i)) =====
 * Chứng chỉ tiếng Pháp/Nhật: "chỉ xét tuyển đối với ngành Luật". Tiếng Trung: "chỉ xét tuyển đối với
 * ngành Luật và ngành Ngôn ngữ Trung Quốc". Tiếng Anh/SAT: không giới hạn ngành. Đây là điều kiện
 * XÉT TUYỂN chứ không chỉ là quy đổi điểm — thí sinh chỉ có JLPT mà đăng ký Quản trị kinh doanh thì
 * KHÔNG đủ điều kiện Phương thức 2, chứ không phải "đủ điều kiện nhưng được 0 điểm khuyến khích".
 */

/** Mốc ETS đổi thang TOEFL iBT theo quy định của HCMULAW — verbatim "trước ngày 21/01/2026" /
 * "từ ngày 21/01/2026 trở về sau". */
export const HCMULAW_TOEFL_SCALE_CUTOFF_DATE = '2026-01-21';

export const HCMULAW_METHOD2_MAX_BONUS = 1.5;

/** Ngưỡng "từ ... trở lên" của bảng (*), xếp từ CAO xuống THẤP để duyệt là dừng ở mức đầu tiên đạt. */
const ENGLISH_TABLE = [
  { bonus: 1.5, ielts: 7.5, toeflOldScale: 96, toeflNewScale: 5.0, sat: 1390 },
  { bonus: 1.25, ielts: 7.0, toeflOldScale: 89, toeflNewScale: 4.5, sat: 1330 },
  { bonus: 1.0, ielts: 6.5, toeflOldScale: 81, toeflNewScale: 4.0, sat: 1270 },
  { bonus: 0.75, ielts: 6.0, toeflOldScale: 73, toeflNewScale: 3.5, sat: 1210 },
  { bonus: 0.5, ielts: 5.5, toeflOldScale: 65, toeflNewScale: 3.0, sat: 1150 },
] as const;

/** Bảng (**) — bậc tối thiểu của từng mức, cũng xếp từ CAO xuống THẤP. */
const LEVEL_TABLE = [
  { bonus: 1.5, cefr: 'C1', jlpt: 'N1', hsk: 'HSK5' },
  { bonus: 1.25, cefr: 'B2', jlpt: 'N2', hsk: 'HSK4' },
  { bonus: 1.0, cefr: 'B1', jlpt: 'N3', hsk: 'HSK3' },
] as const;

/** Ngành được phép dùng chứng chỉ tiếng Pháp/Nhật (mục 2(c)(i)) — chỉ ngành Luật. */
const FRENCH_JAPANESE_PROGRAM_IDS: readonly HcmulawProgramId[] = ['7380101'];
/** Ngành được phép dùng chứng chỉ tiếng Trung — Luật và Ngôn ngữ Trung Quốc. */
const CHINESE_PROGRAM_IDS: readonly HcmulawProgramId[] = ['7380101', '7220204'];

function bestOf(values: readonly (number | undefined)[]): number | undefined {
  const defined = values.filter((value): value is number => value !== undefined);
  return defined.length > 0 ? Math.max(...defined) : undefined;
}

function lookupByThreshold(value: number | undefined, pick: (row: (typeof ENGLISH_TABLE)[number]) => number): number | undefined {
  if (value === undefined) return undefined;
  return ENGLISH_TABLE.find((row) => value >= pick(row))?.bonus;
}

export interface HcmulawMethod2BonusResult {
  /** `undefined` = chưa kết luận được (xem `needsToeflExamDate`), KHÁC với `0` = có xét nhưng không
   * chứng chỉ nào đạt mức khuyến khích thấp nhất. */
  bonus30?: number;
  /** Loại chứng chỉ đã được chọn để quy đổi (loại CAO NHẤT) — để `explanation` nói rõ vì sao ra mức
   * đó, thay vì chỉ hiện một con số. `undefined` khi `bonus30` là 0 hoặc `undefined`. */
  source?: 'ielts' | 'toeflIbt' | 'sat' | 'delf' | 'tcf' | 'jlpt' | 'hsk';
  /** `true` = có điểm TOEFL nhưng thiếu ngày dự thi, VÀ chênh lệch giữa 2 thang thật sự đổi đáp án. */
  needsToeflExamDate: boolean;
  /** Chứng chỉ thí sinh có nhưng KHÔNG dùng được cho ngành đã chọn (ràng buộc ngành mục 2(c)(i)) —
   * để evaluator giải thích thay vì im lặng bỏ qua. */
  ignoredForProgram: ('delf' | 'tcf' | 'jlpt' | 'hsk')[];
}

/**
 * Tính điểm khuyến khích Phương thức 2. `programId` bắt buộc vì ràng buộc ngành của chứng chỉ
 * tiếng Pháp/Nhật/Trung là một phần của chính quy định (không phải hậu kiểm ở nơi khác).
 */
export function calculateHcmulawMethod2Bonus(
  certificates: ApplicantProfile['certificates'],
  programId: HcmulawProgramId
): HcmulawMethod2BonusResult {
  const certs = certificates ?? {};
  const ignoredForProgram: HcmulawMethod2BonusResult['ignoredForProgram'] = [];

  const frenchJapaneseAllowed = FRENCH_JAPANESE_PROGRAM_IDS.includes(programId);
  const chineseAllowed = CHINESE_PROGRAM_IDS.includes(programId);
  if (!frenchJapaneseAllowed) {
    if (certs.delf !== undefined) ignoredForProgram.push('delf');
    if (certs.tcf !== undefined) ignoredForProgram.push('tcf');
    if (certs.jlpt !== undefined) ignoredForProgram.push('jlpt');
  }
  if (!chineseAllowed && certs.hsk !== undefined) ignoredForProgram.push('hsk');

  const candidates: { source: NonNullable<HcmulawMethod2BonusResult['source']>; bonus: number | undefined }[] = [
    { source: 'ielts', bonus: lookupByThreshold(certs.ielts, (row) => row.ielts) },
    { source: 'sat', bonus: lookupByThreshold(certs.sat, (row) => row.sat) },
  ];

  // Bảng (**) — chỉ xét những loại ngành đã chọn được phép dùng.
  const levelBonus = (minimumOf: (row: (typeof LEVEL_TABLE)[number]) => string, has: (minimum: string) => boolean): number | undefined =>
    LEVEL_TABLE.find((row) => has(minimumOf(row)))?.bonus;

  if (frenchJapaneseAllowed) {
    candidates.push({
      source: 'delf',
      bonus: levelBonus((row) => row.cefr, (minimum) => isAtLeastLevel(CEFR_LEVELS, certs.delf, minimum as (typeof CEFR_LEVELS)[number])),
    });
    candidates.push({
      source: 'tcf',
      bonus: levelBonus((row) => row.cefr, (minimum) => isAtLeastLevel(CEFR_LEVELS, certs.tcf, minimum as (typeof CEFR_LEVELS)[number])),
    });
    candidates.push({
      source: 'jlpt',
      bonus: levelBonus((row) => row.jlpt, (minimum) => isAtLeastLevel(JLPT_LEVELS, certs.jlpt, minimum as (typeof JLPT_LEVELS)[number])),
    });
  }
  if (chineseAllowed) {
    candidates.push({
      source: 'hsk',
      bonus: levelBonus((row) => row.hsk, (minimum) => isAtLeastLevel(HSK_LEVELS, certs.hsk, minimum as (typeof HSK_LEVELS)[number])),
    });
  }

  const bestWithoutToefl = bestOf(candidates.map((candidate) => candidate.bonus));

  // ===== TOEFL: chọn thang theo ngày dự thi; thiếu ngày thì chỉ chốt khi không đổi đáp án =====
  const toeflOld = lookupByThreshold(certs.toeflIbt, (row) => row.toeflOldScale);
  const toeflNew = lookupByThreshold(certs.toeflIbt, (row) => row.toeflNewScale);
  let toeflBonus: number | undefined;
  let toeflAmbiguous = false;

  if (certs.toeflIbt !== undefined) {
    if (certs.toeflIbtExamDate !== undefined) {
      toeflBonus = certs.toeflIbtExamDate < HCMULAW_TOEFL_SCALE_CUTOFF_DATE ? toeflOld : toeflNew;
    } else if (toeflOld === toeflNew) {
      // 2 thang cho cùng một mức -> ngày dự thi không làm đổi kết quả, không cần hỏi.
      toeflBonus = toeflOld;
    } else {
      const maxPossible = bestOf([toeflOld, toeflNew]) ?? 0;
      if (bestWithoutToefl !== undefined && bestWithoutToefl >= maxPossible) {
        // Chứng chỉ khác đã cao hơn mọi khả năng của TOEFL -> TOEFL không thể là loại cao nhất.
        toeflBonus = undefined;
      } else {
        toeflAmbiguous = true;
      }
    }
  }

  if (toeflAmbiguous) {
    return { needsToeflExamDate: true, ignoredForProgram };
  }

  const all = [...candidates, { source: 'toeflIbt' as const, bonus: toeflBonus }];
  const best = bestOf(all.map((candidate) => candidate.bonus));
  if (best === undefined) return { bonus30: 0, needsToeflExamDate: false, ignoredForProgram };

  return {
    bonus30: Math.min(best, HCMULAW_METHOD2_MAX_BONUS),
    source: all.find((candidate) => candidate.bonus === best)?.source,
    needsToeflExamDate: false,
    ignoredForProgram,
  };
}

/**
 * Điều kiện XÉT TUYỂN của Phương thức 2 (mục 2(c)(i), khác với việc quy đổi điểm ở trên): phải có ít
 * nhất 1 chứng chỉ ĐẠT NGƯỠNG TỐI THIỂU và loại chứng chỉ đó phải dùng được cho ngành đã chọn.
 * Ngưỡng tối thiểu chính là mức 0,50 (tiếng Anh/SAT) và 1,00 (bảng bậc) của 2 bảng — nên "có điểm
 * khuyến khích > 0" và "đủ điều kiện chứng chỉ" là CÙNG một phép kiểm tra.
 */
export function hasHcmulawMethod2QualifyingCertificate(result: HcmulawMethod2BonusResult): boolean {
  return result.bonus30 !== undefined && result.bonus30 > 0;
}
