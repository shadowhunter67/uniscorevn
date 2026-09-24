/**
 * PDU (Trường Đại học Phạm Văn Đồng) 2026 — điểm trúng tuyển thật theo MÃ NGÀNH, nhánh xét kết quả
 * thi TN THPT 2026 (Phương thức 1), 13/14 chương trình đại học chính quy (loại trừ Giáo dục Mầm non
 * — trình độ cao đẳng, tổ hợp năng khiếu M01/M09 không có SubjectId tương ứng). Điểm chuẩn từ Thông
 * báo Số 997/TB-ĐHPVĐ (`sources.ts:pdu-cutoff-2026`, PDF ký tên + đóng dấu), tổ hợp môn từ "Thông
 * tin tuyển sinh năm 2026" (`sources.ts:pdu-scheme-2026`, Quyết định 131/QĐ-ĐHPVĐ).
 */
export interface PduFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const PDU_FIELD_THRESHOLDS_2026: readonly PduFieldThreshold[] = [
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 22.3, combinationIds: ['A00', 'A01', 'C00', 'D01', 'X01'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 21.6, combinationIds: ['A00', 'A01', 'X05', 'D01', 'D07'] },
  { code: '7140210', name: 'Sư phạm Tin học', threshold30: 20, combinationIds: ['A00', 'A01', 'C01', 'D01', 'X05', 'X06'] },
  { code: '7140211', name: 'Sư phạm Vật lý', threshold30: 21.6, combinationIds: ['A00', 'A01', 'C01', 'X05'] },
  { code: '7140212', name: 'Sư phạm Hoá học', threshold30: 21.85, combinationIds: ['A00', 'B00', 'C02', 'D07', 'X09'] },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 22.1, combinationIds: ['C00', 'C03', 'X74', 'X70', 'X01', 'D14'] },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 21.3, combinationIds: ['D01', 'D14', 'D15', 'X25', 'X78'] },
  { code: '7140247', name: 'Sư phạm Khoa học Tự nhiên', threshold30: 21.8, combinationIds: ['A00', 'C01', 'C02', 'B00', 'B03'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: ['C03', 'X74', 'X01', 'D01'] },
  { code: '7340115', name: 'Marketing', threshold30: 15, combinationIds: ['C03', 'X74', 'X01', 'D01'] },
  { code: '7480201', name: 'Công nghệ thông tin', threshold30: 15, combinationIds: ['A00', 'X05', 'X06', 'D01'] },
  { code: '7510201', name: 'Công nghệ kỹ thuật cơ khí', threshold30: 15, combinationIds: ['A00', 'A01', 'X05', 'D01'] },
  { code: '7520114', name: 'Kỹ thuật cơ điện tử', threshold30: 15, combinationIds: ['A00', 'A01', 'X05', 'D01'] },
] as const;

export type PduFieldCode = (typeof PDU_FIELD_THRESHOLDS_2026)[number]['code'];

export const PDU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, PduFieldThreshold> = new Map(
  PDU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
