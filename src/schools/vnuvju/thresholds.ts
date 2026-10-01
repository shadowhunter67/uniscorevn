/**
 * VJU (Trường Đại học Việt Nhật - Đại học Quốc gia Hà Nội) 2026 — điểm trúng tuyển 9/9 chương trình
 * đại học chính quy, nhánh Phương thức 100 (xét kết quả thi TN THPT 2026), thang 30. Nguồn điểm
 * trúng tuyển: thông báo tổng hợp CHÍNH THỨC của ĐHQGHN (`sources.ts:vnuvju-cutoff-vnu-2026`), mục
 * "Trường Đại học Việt Nhật", ghi rõ điểm "đã bao gồm điểm ưu tiên theo khu vực, đối tượng và
 * khuyến khích (nếu có)". Tổ hợp xét tuyển lấy từ "Thông tin tuyển sinh đại học chính quy năm 2026"
 * của chính VJU (`vnuvju-notice-2026`, mục 3.5): mỗi chương trình có bộ tổ hợp riêng, mục 3.3.3 xác
 * nhận "không có độ chênh lệch điểm chuẩn giữa các tổ hợp" ở phương thức thi TN THPT, không có
 * hệ số môn.
 *
 * Mã xét tuyển (code) dùng mã chính thức của VJU (VJU1..VJU9), không dùng mã ngành đào tạo vì mã ngành
 * trên thông báo của VJU (VD 7480204, 7540118QTD) khác mã in trên bảng tổng hợp của ĐHQGHN (7480101,
 * 7540101) — ghép chương trình theo TÊN, xem `sources.ts`.
 *
 * Tổ hợp có môn Tiếng Nhật (D06, D28, D23, D33, D18, D43, D53, D63, X98) KHÔNG có SubjectId tương ứng
 * trong hệ thống UniscoreVN — loại khỏi combinationIds (xem knowledgeGaps.ts); các tổ hợp còn lại của
 * mỗi chương trình vẫn tính bình thường.
 */
export interface VnuvjuFieldThreshold {
  /** Mã xét tuyển chính thức của VJU. */
  code: string;
  /** Tên chương trình đúng nguyên văn thông báo. */
  name: string;
  threshold30: number;
  combinationIds: readonly string[];
}

export const VNUVJU_FIELD_THRESHOLDS_2026: readonly VnuvjuFieldThreshold[] = [
  { code: 'VJU1', name: 'Nhật Bản học', threshold30: 21, combinationIds: ['C00', 'D01', 'D11', 'D14', 'D15', 'X78'] },
  { code: 'VJU2', name: 'Khoa học và Kỹ thuật máy tính', threshold30: 20.75, combinationIds: ['A00', 'A01', 'C01', 'C02', 'D01', 'D07'] },
  { code: 'VJU3', name: 'Cơ điện tử thông minh và Sản xuất theo phương thức Nhật Bản', threshold30: 20.5, combinationIds: ['A00', 'A01', 'C01', 'C02', 'D01', 'D07'] },
  { code: 'VJU4', name: 'Công nghệ thực phẩm và Sức khỏe', threshold30: 20, combinationIds: ['A00', 'A01', 'B00', 'C02', 'D01', 'D07', 'D08'] },
  { code: 'VJU5', name: 'Nông nghiệp thông minh và Bền vững', threshold30: 20, combinationIds: ['A00', 'A01', 'B00', 'C02', 'D01', 'D07', 'D08', 'D10'] },
  { code: 'VJU6', name: 'Kỹ thuật Xây dựng', threshold30: 20, combinationIds: ['A00', 'A01', 'C01', 'C02', 'D01', 'D07'] },
  { code: 'VJU7', name: 'Đổi mới và Phát triển toàn cầu', threshold30: 20, combinationIds: ['D01', 'D11', 'D12', 'D14', 'D15', 'X78'] },
  { code: 'VJU8', name: 'Công nghệ kỹ thuật Chip bán dẫn', threshold30: 21.25, combinationIds: ['A00', 'A01', 'A02', 'C01', 'C02', 'D07'] },
  { code: 'VJU9', name: 'Điều khiển thông minh và Tự động hóa', threshold30: 20.25, combinationIds: ['A00', 'A01', 'C01', 'C02', 'D01', 'D07'] },
];

export const VNUVJU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, VnuvjuFieldThreshold> = new Map(
  VNUVJU_FIELD_THRESHOLDS_2026.map((entry) => [entry.code, entry])
);
