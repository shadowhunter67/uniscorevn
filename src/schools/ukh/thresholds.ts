/**
 * UKH (Trường Đại học Khánh Hòa) 2026 — điểm trúng tuyển thật theo MÃ XÉT TUYỂN, nhánh xét kết quả
 * thi TN THPT 2026 (cột "Điểm thi tốt nghiệp THPT năm 2026"), đủ 21/21 mã xét tuyển đại học chính
 * quy. Điểm chuẩn từ Thông báo Số 07/TB-HĐTS (`sources.ts:ukh-cutoff-2026`, PDF ký tên + đóng dấu),
 * tổ hợp môn từ "Thông tin tuyển sinh năm 2026 (cập nhật)" (`sources.ts:ukh-scheme-2026`). 3 tổ hợp
 * D04/D45/D65 (môn Tiếng Trung) không có SubjectId tương ứng — loại khỏi danh sách tổ hợp của các
 * ngành có dùng (xem `knowledgeGaps.ts`).
 */
export interface UkhFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const UKH_FIELD_THRESHOLDS_2026: readonly UkhFieldThreshold[] = [
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 24.17, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D14', 'D15'] },
  { code: '7140249', name: 'Sư phạm Lịch sử - Địa lý', threshold30: 24.73, combinationIds: ['A07', 'C00', 'C03', 'C04', 'D09', 'D10', 'D14', 'D15'] },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 24.38, combinationIds: ['D01', 'D14', 'D15', 'D09', 'D10', 'X79'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 24.88, combinationIds: ['A00', 'A01', 'X06', 'B00', 'D07', 'X26'] },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 24.61, combinationIds: ['A00', 'A01', 'B03', 'C00', 'C01', 'C02', 'C03', 'C04', 'D01'] },
  { code: '7140211', name: 'Sư phạm Vật lý', threshold30: 23.25, combinationIds: ['A00', 'A01', 'A02', 'C01', 'C05', 'C06', 'X06'] },
  { code: '7140247', name: 'Sư phạm Khoa học tự nhiên', threshold30: 22.99, combinationIds: ['A00', 'A01', 'A02', 'X06', 'B00', 'D07', 'D08'] },
  { code: '7420203', name: 'Sinh học ứng dụng', threshold30: 15, combinationIds: ['B00', 'B02', 'B03', 'A02', 'B08', 'X14', 'X15'] },
  { code: '7440112', name: 'Hóa học', threshold30: 15, combinationIds: ['B00', 'A00', 'A06', 'D07', 'X10', 'X11', 'C02'] },
  { code: '7340101', name: 'Quản trị kinh doanh', threshold30: 15, combinationIds: ['A01', 'D01', 'D07', 'D08', 'D09', 'D10', 'X25', 'X26'] },
  { code: '7810201', name: 'Quản trị khách sạn', threshold30: 15, combinationIds: ['D01', 'D14', 'D15', 'D11', 'D12', 'D13'] },
  { code: '7810101', name: 'Du lịch', threshold30: 15, combinationIds: ['D01', 'D14', 'D15', 'D11', 'D12', 'D13'] },
  { code: '7810103', name: 'Quản trị dịch vụ du lịch và lữ hành', threshold30: 15, combinationIds: ['D01', 'D14', 'D15', 'D11', 'D12', 'D13'] },
  // 7310630/7229030/7229040/7229020 — tổ hợp D65 (Ngữ văn - Lịch sử - Tiếng Trung) KHÔNG có SubjectId
  // tương ứng, loại khỏi danh sách (còn 8/9 tổ hợp mỗi ngành).
  { code: '7310630', name: 'Việt Nam học (Văn hóa Du lịch)', threshold30: 15, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X70', 'X74', 'X78'] },
  { code: '7229030', name: 'Văn học (Báo chí - Truyền thông)', threshold30: 18.8, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X70', 'X74', 'X78'] },
  { code: '7229040', name: 'Văn hóa học (Văn hóa - Truyền thông)', threshold30: 15, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X70', 'X74', 'X78'] },
  { code: '7220201', name: 'Ngôn ngữ Anh', threshold30: 15, combinationIds: ['D01', 'D14', 'D15', 'D09', 'D10', 'X79', 'D11', 'D12', 'D13'] },
  { code: '7229020', name: 'Ngôn ngữ học (Ngôn ngữ học ứng dụng)', threshold30: 15, combinationIds: ['C00', 'C03', 'C04', 'D01', 'D09', 'D10', 'D14', 'D15', 'X70', 'X74', 'X78'] },
  // 7220204 — tổ hợp D04/D45/D65 (có môn Tiếng Trung) KHÔNG có SubjectId tương ứng, loại khỏi danh
  // sách (còn 4/7 tổ hợp: D01/D14/D15/X79).
  { code: '7220204', name: 'Ngôn ngữ Trung Quốc', threshold30: 18.25, combinationIds: ['D01', 'D14', 'D15', 'X79'] },
  { code: '7320104', name: 'Truyền thông đa phương tiện', threshold30: 19.02, combinationIds: ['D01', 'D14', 'C03', 'C04', 'D09', 'D10', 'A01', 'X26', 'X18', 'X02', 'X71', 'X79'] },
  { code: '7340115', name: 'Marketing', threshold30: 15, combinationIds: ['A01', 'D01', 'D07', 'D08', 'D09', 'D10', 'X25', 'X26'] },
] as const;

export type UkhFieldCode = (typeof UKH_FIELD_THRESHOLDS_2026)[number]['code'];

export const UKH_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, UkhFieldThreshold> = new Map(
  UKH_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
