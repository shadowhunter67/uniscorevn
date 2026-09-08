import type { SubjectId } from './subjects';
import type { TranscriptBySemester } from './transcriptSemesters';
import type { VactProfile } from './vactProfile';

/**
 * Dữ liệu FACTUAL của một thí sinh — nhập 1 lần, nhiều school adapter (`schools/<id>/
 * applicantProfileAdapter.ts`) đọc và map sang input riêng của trường/phương thức đó. KHÔNG
 * phải universal formula input — school vẫn tự quyết map field nào dùng, bỏ field nào. Chỉ
 * field đã có consumer thật (xem `schools/hcmut/applicantProfileAdapter.ts`) mới coi là "đã
 * dùng"; field còn lại (certificates ngoài ielts, achievements...) để sẵn cho adapter sau, chưa
 * bắt buộc implement ngay.
 */
/**
 * Bậc chứng chỉ ngoại ngữ dùng trong `ApplicantProfile.certificates` — khai theo THỨ TỰ TĂNG DẦN để
 * mọi consumer so sánh bằng `indexOf` trên cùng một mảng, không mỗi trường tự bịa thứ tự. LƯU Ý
 * JLPT: nhãn N5 là THẤP nhất, N1 là CAO nhất (ngược chiều với con số) — đây chính là chỗ dễ sai nếu
 * lưu bằng `number`, nên các field này cố ý là string union chứ không phải số.
 */
export const CEFR_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
export const JLPT_LEVELS = ['N5', 'N4', 'N3', 'N2', 'N1'] as const;
export const HSK_LEVELS = ['HSK1', 'HSK2', 'HSK3', 'HSK4', 'HSK5', 'HSK6'] as const;

export type CefrLevel = (typeof CEFR_LEVELS)[number];
export type JlptLevel = (typeof JLPT_LEVELS)[number];
export type HskLevel = (typeof HSK_LEVELS)[number];

/** `true` nếu `level` ĐẠT TỪ `minimum` TRỞ LÊN theo thứ tự của chính mảng bậc truyền vào. */
export function isAtLeastLevel<T extends string>(levels: readonly T[], level: T | undefined, minimum: T): boolean {
  if (level === undefined) return false;
  return levels.indexOf(level) >= levels.indexOf(minimum);
}

export interface ApplicantProfile {
  graduationYear?: number;

  thpt?: {
    scores: Partial<Record<SubjectId, number>>;
  };

  transcript?: {
    /** TB CẢ NĂM theo từng lớp (Thông tư 22/2021, thường = (TB HK1 + 2×TB HK2)/3). Đây là đường đi
     * CHÍNH của học bạ và là field duy nhất mọi adapter cũ đọc — KHÔNG đổi ý nghĩa/tên. */
    grade10?: Partial<Record<SubjectId, number>>;
    grade11?: Partial<Record<SubjectId, number>>;
    grade12?: Partial<Record<SubjectId, number>>;
    /** OPT-IN, additive (batch "6 học kỳ"): TB TỪNG HỌC KỲ (6 học kỳ lớp 10/11/12). Chỉ dùng cho các
     * trường công bố công thức "trung bình cộng của 06 học kỳ" (VLU/HUTECH/HCMULAW) — KHÔNG suy được
     * từ `grade10`/`grade11`/`grade12` và ngược lại, nên 2 nhóm field tồn tại song song, độc lập.
     * Hồ sơ cũ không có field này; consumer phải coi "vắng mặt" là thiếu input, không fallback sang
     * TB năm. Xem `core/transcriptSemesters.ts`. */
    bySemester?: TranscriptBySemester;
  };

  exams?: {
    /** ĐGNL ĐHQG-HCM — 4 phần thi, không map theo SubjectId vì không phải môn học phổ thông. Xem
     * `core/vactProfile.ts` cho invariant/reconciliation policy giữa `total` và `components`
     * (batch 5) — KHÔNG tự gán 2 field này rời rạc ở nơi khác, luôn qua
     * `reconcileVactFromComponents`/`reconcileVactFromTotal`. */
    vact?: VactProfile;
  };

  certificates?: {
    ielts?: number;
    toeflIbt?: number;
    /**
     * OPT-IN, additive (batch "chứng chỉ PT2 HCMULAW"): NGÀY DỰ THI TOEFL iBT, dạng `YYYY-MM-DD`.
     *
     * Vì sao cần: ETS đổi thang điểm TOEFL iBT, và nguồn chính thức của HCMULAW quy đổi điểm khuyến
     * khích theo HAI BẢNG khác nhau tuỳ mốc 21/01/2026 ("Dự thi trước ngày 21/01/2026": 65-96+;
     * "Dự thi từ ngày 21/01/2026": 3.0-5.0+). Cùng một con số `toeflIbt` có thể rơi vào 2 mức
     * khuyến khích khác nhau, nên KHÔNG suy được thang từ riêng giá trị điểm.
     *
     * Vì sao là NGÀY chứ không phải enum thang điểm: mốc phân tách là quy định của TỪNG TRƯỜNG (ở
     * đây là 21/01/2026), không phải thuộc tính của hồ sơ thí sinh. Lưu ngày dự thi (dữ liệu factual
     * thí sinh đọc thẳng trên chứng chỉ) để trường nào đặt mốc khác vẫn dùng chung được field này;
     * lưu enum `'pre-2026' | 'post-2026'` sẽ đóng cứng mốc của một trường vào schema dùng chung.
     *
     * Thiếu field này KHÔNG tự động chặn kết quả: consumer chỉ báo thiếu khi 2 cách đọc thang cho ra
     * mức khuyến khích KHÁC nhau VÀ chênh lệch đó thật sự đổi kết quả (xem `schools/hcmulaw/bonus.ts`).
     */
    toeflIbtExamDate?: string;
    toeic?: number;
    sat?: number;
    act?: number;
    ib?: number;
    /**
     * OPT-IN, additive (batch "chứng chỉ PT2 HCMULAW"): chứng chỉ ngoại ngữ tính theo BẬC/TRÌNH ĐỘ
     * chứ không theo điểm số. Lưu đúng nhãn bậc mà thí sinh đọc được trên chứng chỉ (không quy về
     * số): DELF/TCF theo khung CEFR, JLPT theo N5-N1, HSK theo HSK1-HSK6.
     *
     * Hồ sơ cũ không có các field này — consumer coi "vắng mặt" là "không có chứng chỉ loại đó",
     * KHÔNG suy từ `ielts`/`toeflIbt`.
     */
    delf?: CefrLevel;
    tcf?: CefrLevel;
    jlpt?: JlptLevel;
    hsk?: HskLevel;
  };

  /** Chỉ lưu category/region dạng mã (vd 'KV1', 'UT1') — KHÔNG lưu lý do/hoàn cảnh cá nhân. */
  priority?: {
    region?: string;
    category?: string;
  };

  /** ID tổ hợp môn ưu tiên (vd 'A01', theo `COMMON_SUBJECT_COMBINATIONS`) — CHỈ để gợi ý nhanh
   * ở hồ sơ dùng chung, KHÔNG phải input trực tiếp cho bất kỳ school adapter nào (mỗi trường tự
   * có danh mục tổ hợp và ngữ cảnh riêng, chọn ở trang trường/Compare — xem
   * `schools/hcmut/applicantProfileAdapter.ts` comment ở đầu file). Không có consumer runtime nào
   * đọc field này để tính điểm; đổi giá trị này KHÔNG tự đổi kết quả tính ở bất kỳ trường nào. */
  preferredCombinationId?: string;
}
