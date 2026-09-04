import type { SourcedRule } from '../../core/evidence';

export const dsuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (Phương thức mã 100 — xét kết quả điểm thi tốt nghiệp THPT, ngành Quản lý TDTT 7810301) = tổng thô điểm 3 môn thuộc tổ hợp xét tuyển (B03: Toán–Ngữ văn–Sinh học; C14: Toán–Ngữ văn–GDCD), thang 30, không hệ số + điểm ưu tiên khu vực/đối tượng theo Điều 7 Quy chế tuyển sinh (Quyết định 577/QĐ-TDTTĐN). Thông báo 247/TB-TDTTĐN không nêu công thức bằng chữ, nhưng phương thức 100 là xét tuyển thuần theo kết quả kỳ thi tốt nghiệp THPT quốc gia trên thang điểm 30 không kèm hệ số công bố cho môn nào — suy luận trực tiếp từ cấu trúc tổ hợp 3 môn cân bằng đã công bố (xem `sources.ts:dsu-tb247-tuyensinh-2025`).',
  evidence: [
    {
      sourceId: 'dsu-tb247-tuyensinh-2025',
      location: 'Thông báo 247/TB-TDTTĐN, mục 4 "Phương thức tuyển sinh" (mã 100) và mục 5 "Tổ hợp xét tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'dsu-quyche-577-2025',
      location: 'Quy chế tuyển sinh (QĐ 577/QĐ-TDTTĐN), Điều 7 "Chính sách ưu tiên trong tuyển sinh".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const dsuFieldThresholdEvidence = {
  ruleId: 'dsu-field-threshold-2025',
  evidence: [
    {
      sourceId: 'dsu-qd1088-diemchuan-2025',
      location: 'Quyết định 1088/QĐ-TDTTĐN-HĐTS, bảng "Mức điểm chuẩn trúng tuyển", ngành Quản lý TDTT (7810301), cột "Xét điểm thi THPT (mã 100)" = 21,50/30.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'dsu-tb247-tuyensinh-2025',
      location: 'Thông báo 247/TB-TDTTĐN, mục 5 "Tổ hợp xét tuyển" — tổ hợp B03/C14 cho phương thức 100 của ngành Quản lý TDTT.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-04',
    },
  ],
};
