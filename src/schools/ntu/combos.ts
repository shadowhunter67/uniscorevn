import type { SubjectId } from '../../core/subjects';

/**
 * Bảng 2 "Diễn giải các mã tổ hợp xét tuyển bằng điểm thi tốt nghiệp THPT năm 2026" của NTU
 * (`sources.ts:ntu-cutoff-2026`). Mỗi mã tổ hợp gồm 4 vị trí điểm (thang 40): môn có `weight: 2` được nhân đôi
 * ("Toán*2", "Ngữ văn*2", "Tiếng Anh*2"), tổ hợp "Toán, Ngữ văn, Tiếng Anh, Địa lý" là tổng 4 môn thường.
 * Điểm tổ hợp = tổng (điểm môn x hệ số), tối đa 40.
 */
export interface NtuComboSlot {
  subject: SubjectId;
  weight: 1 | 2;
}

export const NTU_COMBO_SLOTS: Readonly<Record<string, readonly NtuComboSlot[]>> = {
  T2VA: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }],
  T2VC: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'technology', weight: 1 }],
  T2VD: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'geography', weight: 1 }],
  T2VG: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'civic-economic-law', weight: 1 }],
  T2VH: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'chemistry', weight: 1 }],
  T2VL: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'physics', weight: 1 }],
  T2VSi: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'biology', weight: 1 }],
  T2VSu: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'history', weight: 1 }],
  T2VTi: [{ subject: 'math', weight: 2 }, { subject: 'literature', weight: 1 }, { subject: 'informatics', weight: 1 }],
  TV2A: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 2 }, { subject: 'english', weight: 1 }],
  TV2D: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 2 }, { subject: 'geography', weight: 1 }],
  TV2G: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 2 }, { subject: 'civic-economic-law', weight: 1 }],
  TV2Su: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 2 }, { subject: 'history', weight: 1 }],
  TVA2: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 2 }],
  TVAD: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'geography', weight: 1 }],
  TVAG: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'civic-economic-law', weight: 1 }],
  TVAH: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'chemistry', weight: 1 }],
  TVAL: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'physics', weight: 1 }],
  TVASi: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'biology', weight: 1 }],
  TVASu: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'english', weight: 1 }, { subject: 'history', weight: 1 }],
  TVLH: [{ subject: 'math', weight: 1 }, { subject: 'literature', weight: 1 }, { subject: 'physics', weight: 1 }, { subject: 'chemistry', weight: 1 }],
  V2SuD: [{ subject: 'literature', weight: 2 }, { subject: 'history', weight: 1 }, { subject: 'geography', weight: 1 }],
};

/** T2VN (Toán*2, Văn, Tiếng Nhật), T2VP (Toán*2, Văn, Tiếng Pháp): không có SubjectId — không tính được. */
export const NTU_UNMODELED_COMBO_CODES: readonly string[] = ['T2VN', 'T2VP'];

export const NTU_COMBO_LABELS: Readonly<Record<string, string>> = {
  T2VA: 'Toán*2, Ngữ văn, Tiếng Anh',
  T2VC: 'Toán*2, Ngữ văn, Công nghệ',
  T2VD: 'Toán*2, Ngữ văn, Địa lý',
  T2VG: 'Toán*2, Ngữ văn, Giáo dục kinh tế và pháp luật',
  T2VH: 'Toán*2, Ngữ văn, Hóa học',
  T2VL: 'Toán*2, Ngữ văn, Vật lý',
  T2VSi: 'Toán*2, Ngữ văn, Sinh học',
  T2VSu: 'Toán*2, Ngữ văn, Lịch sử',
  T2VTi: 'Toán*2, Ngữ văn, Tin học',
  TV2A: 'Toán, Ngữ văn*2, Tiếng Anh',
  TV2D: 'Toán, Ngữ văn*2, Địa lý',
  TV2G: 'Toán, Ngữ văn*2, Giáo dục kinh tế và pháp luật',
  TV2Su: 'Toán, Ngữ văn*2, Lịch sử',
  TVA2: 'Toán, Ngữ văn, Tiếng Anh*2',
  TVAD: 'Toán, Ngữ văn, Tiếng Anh, Địa lý',
  TVAG: 'Toán, Ngữ văn, Tiếng Anh, Giáo dục kinh tế và pháp luật',
  TVAH: 'Toán, Ngữ văn, Tiếng Anh, Hóa học',
  TVAL: 'Toán, Ngữ văn, Tiếng Anh, Vật lý',
  TVASi: 'Toán, Ngữ văn, Tiếng Anh, Sinh học',
  TVASu: 'Toán, Ngữ văn, Tiếng Anh, Lịch sử',
  TVLH: 'Toán, Ngữ văn, Vật lý, Hóa học',
  V2SuD: 'Ngữ văn*2, Lịch sử, Địa lý',
};
