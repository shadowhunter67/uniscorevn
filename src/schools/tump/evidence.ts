import type { SourcedRule } from '../../core/evidence';

export const tumpExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức xét kết quả thi TN THPT 2025, mã phương thức 100) = tổng thô 3 môn theo tổ hợp (thang 30, không hệ số) + điểm cộng (bảng riêng của trường, mục 4.2 — module chỉ mô hình hoá bậc IELTS) + điểm ưu tiên khu vực/đối tượng (khung quốc gia hiện hành). Nguồn chính thức "Thông tin tuyển sinh đại học năm 2025" (tuyensinh.tump.edu.vn) mục II.1.1.5 xác nhận công thức, và điểm trúng tuyển chính thức (`tump-threshold-2025`) đã bao gồm điểm cộng/ưu tiên, quy đổi tương đương giữa mọi phương thức/tổ hợp.',
  evidence: [
    {
      sourceId: 'tump-thongtin-2025',
      location: 'Thông tin tuyển sinh đại học năm 2025, mục II.1.1 (Xét kết quả thi TN THPT, PTXT 100), mục 4.2 (Điểm cộng) và mục 4.3 (Điểm ưu tiên) — tuyensinh.tump.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const tumpFieldThresholdEvidence = {
  ruleId: 'tump-field-threshold-2025',
  evidence: [
    {
      sourceId: 'tump-threshold-2025',
      location: 'Thông báo 996/TB-ĐHYD (22/8/2025), bảng "Điểm trúng tuyển đại học chính quy năm 2025" — tuyensinh.tump.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'tump-thongtin-2025',
      location: 'Thông tin tuyển sinh đại học năm 2025, mục 3 "Ngành tuyển sinh, chỉ tiêu tuyển sinh, phương thức tuyển sinh và tổ hợp xét tuyển" (bảng DTY101–DTY603) — tuyensinh.tump.edu.vn.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};
