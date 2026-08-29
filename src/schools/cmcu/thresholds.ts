import type { SubjectId } from '../../core/subjects';

/**
 * Trường Đại học CMC (CMCU) 2026 — "Thông báo điểm sàn nộp hồ sơ xét tuyển Trường Đại học CMC và
 * quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026" (`sources.ts:cmcu-threshold-
 * 2026`, cmcu.edu.vn, đọc trực tiếp qua curl 2026-08-30, HTTP 200 — bảng ngưỡng dạng ảnh WEBP nhúng
 * trong bài, đọc bằng vision, chữ rõ không cần OCR). Cột "Điểm sàn 2026 đối với Điểm thi tốt nghiệp
 * THPT (thang điểm 40)" công bố ngưỡng theo LĨNH VỰC/NGÀNH cụ thể (nêu đích danh). Tổ hợp: TOÀN BỘ
 * 9 dòng đều theo dạng "môn chính × 2 + 2 môn bất kỳ" (thang tối đa 40 = 2×10 + 10 + 10) — môn
 * chính là Toán cho 8/9 dòng, riêng "Truyền thông Đa phương tiện" cho phép chọn Toán HOẶC Ngữ văn
 * làm môn chính. Danh sách môn bất kỳ hợp lệ (nguyên văn): "Toán, Ngữ văn, Vật lí, Hoá học, Sinh
 * học, Ngoại ngữ, Địa lí, Lịch sử, Giáo dục kinh tế - pháp luật, Tin học, Công nghệ".
 */
export type CmcuFieldId =
  | 'electronics-telecom'
  | 'ai'
  | 'cybersecurity'
  | 'computer-science'
  | 'information-technology'
  | 'software-engineering'
  | 'logistics'
  | 'multimedia-communication'
  | 'other';

export interface CmcuFieldThreshold {
  fieldId: CmcuFieldId;
  /** Tên lĩnh vực/ngành đúng nguyên văn bảng công bố. */
  fieldName: string;
  /** Ngưỡng điểm sàn nhận hồ sơ — thang 40, tổng thô (môn chính x2 + 2 môn bất kỳ). */
  threshold40: number;
  /** Môn chính (nhân hệ số 2) được phép chọn cho ngành này. */
  allowedMainSubjects: readonly SubjectId[];
}

export const CMCU_FIELD_THRESHOLDS_2026: readonly CmcuFieldThreshold[] = [
  { fieldId: 'electronics-telecom', fieldName: 'Công nghệ Kỹ thuật Điện tử - Viễn thông (Thiết kế vi mạch bán dẫn)', threshold40: 22, allowedMainSubjects: ['math'] },
  { fieldId: 'ai', fieldName: 'Trí tuệ Nhân tạo', threshold40: 22, allowedMainSubjects: ['math'] },
  { fieldId: 'cybersecurity', fieldName: 'An ninh mạng', threshold40: 22, allowedMainSubjects: ['math'] },
  { fieldId: 'computer-science', fieldName: 'Khoa học Máy tính', threshold40: 21, allowedMainSubjects: ['math'] },
  { fieldId: 'information-technology', fieldName: 'Công nghệ Thông tin', threshold40: 21, allowedMainSubjects: ['math'] },
  { fieldId: 'software-engineering', fieldName: 'Kỹ thuật Phần mềm', threshold40: 21, allowedMainSubjects: ['math'] },
  { fieldId: 'logistics', fieldName: 'Logistics và Quản lý chuỗi cung ứng', threshold40: 21, allowedMainSubjects: ['math'] },
  { fieldId: 'multimedia-communication', fieldName: 'Truyền thông Đa phương tiện', threshold40: 21, allowedMainSubjects: ['math', 'literature'] },
  { fieldId: 'other', fieldName: 'Các ngành còn lại', threshold40: 20, allowedMainSubjects: ['math'] },
];

export const CMCU_FIELD_THRESHOLD_BY_ID: ReadonlyMap<CmcuFieldId, CmcuFieldThreshold> = new Map(
  CMCU_FIELD_THRESHOLDS_2026.map((entry) => [entry.fieldId, entry])
);
