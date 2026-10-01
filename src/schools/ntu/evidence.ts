import type { SourcedRule } from '../../core/evidence';

export const ntuExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (xét điểm thi TN THPT 2026) = tổng điểm 4 vị trí của mã tổ hợp, thang 40 (môn "*2" nhân đôi: T2VA = Toán*2 + Ngữ văn + Tiếng Anh; TVAH = Toán + Ngữ văn + Tiếng Anh + Hóa học), + điểm ưu tiên khu vực/đối tượng quy sang thang 40 (khung quốc gia x 4/3, judgment call). So với điểm trúng tuyển RIÊNG của chương trình ở mã tổ hợp đó.',
  evidence: [
    {
      sourceId: 'ntu-cutoff-2026',
      location: 'Trường Đại học Nha Trang — Thông báo điểm chuẩn trúng tuyển năm 2026, Bảng 2 "Diễn giải các mã tổ hợp xét tuyển bằng điểm thi tốt nghiệp THPT năm 2026".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
    {
      sourceId: 'ntu-equivalence-2026',
      location: 'Trường Đại học Nha Trang — Bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026 (30/07/2026), cột "Khoảng điểm thi TN THPT (thang điểm 40)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
} satisfies SourcedRule<string>;

export const ntuProgramThresholdEvidence = {
  ruleId: 'ntu-program-threshold-2026',
  evidence: [
    {
      sourceId: 'ntu-cutoff-2026',
      location: 'Trường Đại học Nha Trang — Thông báo điểm chuẩn trúng tuyển năm 2026, Bảng 1 "Điểm chuẩn trúng tuyển theo các phương thức và tổ hợp xét tuyển" (đăng 12/08/2026).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-10-01',
    },
  ],
};
