import type { SourcedRule } from '../../core/evidence';

export const hcaExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức 100 — xét kết quả thi TN THPT) = M1 + M2 + M3 (tổng thô 3 môn theo tổ hợp, thang 30, không hệ số) + Điểm cộng Khuyến khích (nếu có) + Điểm ưu tiên (nếu có). "Điểm chênh lệch giữa các tổ hợp: bằng 0" (không quy đổi tương đương giữa các tổ hợp trong cùng ngành). Nguồn: mục 6.1.6 phần II, Thông tin tuyển sinh 639-QĐ/HVCB.',
  evidence: [
    {
      sourceId: 'hca-de-an-2026',
      location: 'Mục 6.1.6 phần II "Cách tính điểm xét tuyển" (phương thức 100).',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;

export const hcaCombinationEvidence = {
  ruleId: 'hca-combination-2025',
  evidence: [
    {
      sourceId: 'hca-notice-09-2025',
      location: 'Mục 3 "Các ngành học và chỉ tiêu xét tuyển" — bảng mã tổ hợp môn xét tuyển 2025 theo từng ngành.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};

export const hcaThresholdEvidence = {
  ruleId: 'hca-threshold-2025',
  evidence: [
    {
      sourceId: 'hca-de-an-2026',
      location: 'Mục 11 "Thông tin về tuyển sinh chính quy của năm 2024 và năm 2025" — cột năm 2025, phương thức 100.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
    {
      sourceId: 'hca-threshold-2025',
      location: 'Điểm chuẩn Học viện Cán bộ TPHCM 2025 (Cổng TTĐT Chính phủ, 23/8/2025) — cross-checked, khớp mục 11 nói trên.',
      verification: 'cross-checked' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};

export const hcaPriorityEvidence = {
  ruleId: 'hca-priority-2025',
  evidence: [
    {
      sourceId: 'hca-de-an-2026',
      location: 'Phụ lục 4 "Cách tính điểm ưu tiên".',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
};

export const hcaBonusEvidence = {
  value: 'Nhóm 1 (giải HSG/KHKT quốc gia hoặc tỉnh/thành): Khuyến khích quốc gia +1,5; Nhất tỉnh +1,0; Nhì tỉnh +0,8; Ba tỉnh +0,6; KK tỉnh +0,4. Nhóm 2 (chứng chỉ ngoại ngữ Anh, khung 6 bậc): Bậc 6 +1,5; Bậc 5 +1,0; Bậc 4 +0,8; Bậc 3 +0,6. Tổng không vượt quá 3,0/30.',
  evidence: [
    {
      sourceId: 'hca-de-an-2026',
      location: 'Phụ lục 3 "Cách tính điểm cộng khuyến khích", mục IV bảng quy đổi.',
      verification: 'verified' as const,
      effectiveYear: 2025,
      verifiedAt: '2026-09-03',
    },
  ],
} satisfies SourcedRule<string>;
