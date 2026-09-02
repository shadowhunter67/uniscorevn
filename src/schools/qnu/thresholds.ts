/**
 * Trường Đại học Quy Nhơn (QNU) 2025 — điểm chuẩn 10/52 ngành đại học chính quy (KHỐI SƯ PHẠM/
 * GIÁO DỤC), nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: trangedu.com
 * (`sources.ts:qnu-threshold-2025`, bảng đầy đủ 52 ngành + mã ngành + tổ hợp), cross-check qua
 * Sforum/CellphoneS (`qnu-threshold-secondary-2025`) — CẢ 2 khớp số liệu cho 9/10 ngành (Sư phạm
 * Lịch sử cross-check thêm qua Báo Gia Lai `qnu-threshold-tertiary-2025`).
 *
 * QUAN TRỌNG: Sforum ghi chú "Các ngành có nhân hệ số môn chính được quy đổi về thang 30 trước
 * xét tuyển" — MỘT SỐ ngành QNU (khối Kinh tế/Kỹ thuật, vd Kinh tế/Công nghệ thông tin) dùng hệ số
 * môn chính khiến số liệu 2 nguồn LỆCH NHAU (Kinh tế: trangedu 21,4 vs Sforum 22,15; CNTT:
 * trangedu 21,5 vs Sforum 21,85) — các ngành đó CHƯA mô hình hoá. Batch này CHỈ mô hình hoá 10
 * ngành sư phạm/giáo dục KHÔNG có nhân hệ số, nơi 2 nguồn khớp số liệu tuyệt đối.
 *
 * Sforum trích nguyên văn công thức: "ĐXT = (Điểm môn 1) + (Điểm môn 2) + (Điểm môn 3) + (Điểm ưu
 * tiên)" — điểm chuẩn công bố là mức ĐXT tối thiểu trúng tuyển, nên ĐÃ bao hàm điểm ưu tiên theo
 * định nghĩa công thức (không cần judgment call cho việc CÓ áp dụng). Mức điểm ưu tiên cụ thể
 * không được trường công bố riêng — dùng khung quốc gia hiện hành làm judgment call cho giá trị
 * bảng.
 *
 * Tổ hợp áp dụng CHỈ liệt kê phần tử ĐÃ XÁC MINH ĐỦ TIN CẬY (loại các mã tổ hợp riêng của trường
 * như X01/X05/X17/X21/X25/X70/X74/X26 — thành phần môn không xác minh được đủ tin cậy trong lần
 * research này) — 9/10 ngành vẫn còn ít nhất 1 tổ hợp chuẩn quốc gia hợp lệ để chọn.
 */
export interface QnuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  /** Điểm chuẩn 2025 (thang 30, ĐÃ gồm điểm ưu tiên) — nhánh thi TN THPT. */
  threshold30: number;
  /** Tổ hợp môn xét tuyển áp dụng cho ngành này (chỉ liệt kê tổ hợp đã xác minh). */
  combinationIds: readonly string[];
}

export const QNU_FIELD_THRESHOLDS_2025 = [
  { code: '7140218', name: 'Sư phạm Lịch sử', threshold30: 27.21, combinationIds: ['C03', 'D09', 'D14'] },
  { code: '7140202', name: 'Giáo dục Tiểu học', threshold30: 26.9, combinationIds: ['A00', 'C00', 'D01'] },
  { code: '7140217', name: 'Sư phạm Ngữ văn', threshold30: 26.85, combinationIds: ['C00', 'D01', 'D14', 'D15'] },
  { code: '7140219', name: 'Sư phạm Địa lý', threshold30: 26.74, combinationIds: ['C04', 'D10', 'D15'] },
  { code: '7140205', name: 'Giáo dục chính trị', threshold30: 26.65, combinationIds: ['C00', 'D01', 'D14'] },
  { code: '7140209', name: 'Sư phạm Toán học', threshold30: 25.85, combinationIds: ['A00', 'A01', 'D07'] },
  { code: '7140212', name: 'Sư phạm Hóa học', threshold30: 25.3, combinationIds: ['A00', 'B00', 'C02', 'D07'] },
  { code: '7140114', name: 'Quản lý Giáo dục', threshold30: 25.1, combinationIds: ['A00', 'A01', 'C00', 'C03', 'C04', 'D01'] },
  { code: '7140211', name: 'Sư phạm Vật lý', threshold30: 24.4, combinationIds: ['A00', 'A01', 'A02'] },
  { code: '7140231', name: 'Sư phạm Tiếng Anh', threshold30: 23.59, combinationIds: ['D01'] },
] as const satisfies readonly QnuFieldThreshold[];

export type QnuFieldCode = (typeof QNU_FIELD_THRESHOLDS_2025)[number]['code'];

export const QNU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, QnuFieldThreshold> = new Map(
  QNU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
