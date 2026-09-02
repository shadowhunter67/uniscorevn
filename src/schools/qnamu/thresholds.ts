/**
 * Trường Đại học Quảng Nam (QNamU) 2025 — điểm chuẩn 8 ngành đại học chính quy (loại Giáo dục Mầm
 * non — tổ hợp năng khiếu chưa xác minh; loại Ngôn ngữ Anh/Việt Nam học/Quản trị kinh doanh/Công
 * nghệ thông tin/Bảo vệ thực vật — nguồn xác nhận số "14" ở các ngành này là MỨC NHẬN HỒ SƠ, không
 * phải điểm trúng tuyển), nhánh xét điểm thi TN THPT, công bố 22/08/2025. Nguồn chính: Trangedu.com
 * (`sources.ts:qnamu-threshold-2025`, bảng đầy đủ theo TỪNG NGÀNH x TỪNG TỔ HỢP), cross-check
 * TUYỆT ĐỐI qua Sforum/CellphoneS (`qnamu-threshold-secondary-2025`) cho toàn bộ 29 cặp ngành/tổ
 * hợp.
 *
 * GIỐNG QBU: QNamU công bố điểm chuẩn RIÊNG cho TỪNG TỔ HỢP trong cùng 1 ngành (không phải 1 mức
 * chung). Model dữ liệu bên dưới lưu threshold theo TỪNG (ngành, tổ hợp).
 *
 * QUAN TRỌNG — công thức xác nhận trực tiếp (`qnamu-formula-2025`, Vietjack.com trích đề án tuyển
 * sinh trường): "Điểm trúng tuyển là tổng điểm 3 môn theo tổ hợp xét tuyển (không nhân hệ số) và
 * điểm ưu tiên" — không nhân hệ số VÀ điểm chuẩn công bố ĐÃ bao hàm điểm ưu tiên (không cần
 * judgment call cho việc CÓ áp dụng, giống QNU). Công thức giảm dần điểm ưu tiên trích nguyên văn
 * khớp tuyệt đối khung quốc gia (`priority.ts`).
 *
 * Tổ hợp áp dụng CHỈ liệt kê phần tử ĐÃ XÁC MINH ĐỦ TIN CẬY (loại các mã tổ hợp riêng của trường
 * như D11/D13/X02/X17/X21/X25/X70/X74 — thành phần môn không xác minh được đủ tin cậy) — mỗi ngành
 * đã mô hình hoá vẫn còn ít nhất 2 tổ hợp chuẩn quốc gia hợp lệ để chọn.
 */
export interface QnamuCombinationThreshold {
  combinationId: string;
  /** Điểm chuẩn 2025 (thang 30, ĐÃ gồm điểm ưu tiên — theo công thức trường công bố). */
  threshold30: number;
}

export interface QnamuFieldThreshold {
  code: string;
  /** Tên ngành đúng nguyên văn bảng điểm chuẩn. */
  name: string;
  combinations: readonly QnamuCombinationThreshold[];
}

export const QNAMU_FIELD_THRESHOLDS_2025 = [
  {
    code: '7140202',
    name: 'Giáo dục Tiểu học',
    combinations: [
      { combinationId: 'D01', threshold30: 24.77 },
      { combinationId: 'A00', threshold30: 25.77 },
      { combinationId: 'C03', threshold30: 25.77 },
      { combinationId: 'X01', threshold30: 25.77 },
      { combinationId: 'C00', threshold30: 26.27 },
    ],
  },
  {
    code: '7140209',
    name: 'Sư phạm Toán học',
    combinations: [
      { combinationId: 'D07', threshold30: 23 },
      { combinationId: 'D01', threshold30: 23.5 },
      { combinationId: 'A01', threshold30: 23.75 },
      { combinationId: 'X01', threshold30: 24 },
      { combinationId: 'A00', threshold30: 24.75 },
    ],
  },
  {
    code: '7140211',
    name: 'Sư phạm Vật lý',
    combinations: [
      { combinationId: 'A01', threshold30: 24.2 },
      { combinationId: 'A00', threshold30: 24.95 },
      { combinationId: 'A02', threshold30: 25.2 },
    ],
  },
  {
    code: '7140213',
    name: 'Sư phạm Sinh học',
    combinations: [
      { combinationId: 'B00', threshold30: 23.25 },
      { combinationId: 'A02', threshold30: 23.75 },
      { combinationId: 'B08', threshold30: 24 },
    ],
  },
  {
    code: '7140217',
    name: 'Sư phạm Ngữ văn',
    combinations: [
      { combinationId: 'D01', threshold30: 24.2 },
      { combinationId: 'D14', threshold30: 25.2 },
      { combinationId: 'C00', threshold30: 25.7 },
    ],
  },
  {
    code: '7140231',
    name: 'Sư phạm Tiếng Anh',
    combinations: [
      { combinationId: 'D01', threshold30: 24.68 },
      { combinationId: 'A01', threshold30: 24.68 },
      { combinationId: 'D14', threshold30: 25.68 },
      { combinationId: 'D15', threshold30: 25.68 },
    ],
  },
  {
    code: '7140247',
    name: 'Sư phạm Khoa học tự nhiên',
    combinations: [
      { combinationId: 'D07', threshold30: 22.3 },
      { combinationId: 'B00', threshold30: 22.8 },
      { combinationId: 'A01', threshold30: 23.05 },
      { combinationId: 'A00', threshold30: 24.05 },
    ],
  },
  {
    code: '7229010',
    name: 'Lịch sử',
    combinations: [
      { combinationId: 'C00', threshold30: 24 },
      { combinationId: 'D14', threshold30: 24 },
    ],
  },
] as const satisfies readonly QnamuFieldThreshold[];

export type QnamuFieldCode = (typeof QNAMU_FIELD_THRESHOLDS_2025)[number]['code'];

export const QNAMU_FIELD_THRESHOLD_BY_CODE: ReadonlyMap<string, QnamuFieldThreshold> = new Map(
  QNAMU_FIELD_THRESHOLDS_2025.map((entry) => [entry.code, entry])
);
