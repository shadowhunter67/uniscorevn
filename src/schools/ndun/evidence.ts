import type { SourcedRule } from '../../core/evidence';

export const ndunThptExamFormulaEvidence = {
  value:
    'Thông tin tuyển sinh đại học năm 2026 (Quyết định 1155/QĐ-ĐDN), mục 2.2.2 "Xác định điểm xét tuyển": "ĐXT = (ĐPT2 + KK) + UT", "(Điểm xét tuyển không vượt mức điểm tối đa của thang điểm xét)", "ĐPT2 = (M1 + M2 + M3)" với "M1, M2, M3 là kết quả điểm thi tốt nghiệp THPT năm 2026 của các môn thi trong tổ hợp xét tuyển" — thang 30, không hệ số môn.',
  evidence: [
    {
      sourceId: 'ndun-thongtin-tuyensinh-1155-2026',
      location: 'Thông tin tuyển sinh đại học năm 2026, mục 2.2 "Phương thức 2: Xét tuyển kết quả kỳ thi tốt nghiệp THPT năm 2026", tiểu mục 2.2.2, trang 2.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const ndunCombinationParityEvidence = {
  value:
    'Thông báo ngưỡng đảm bảo chất lượng 09/7/2026, mục 2 "Độ chênh lệch giữa các tổ hợp xét tuyển trong phương thức xét tuyển kết quả kỳ thi tốt nghiệp THPT năm 2026 (độ chênh của các tổ hợp so với tổ hợp B00 - tổ hợp gốc)": Điều dưỡng và Hộ sinh — B00, A00, A01, B03, B08, C02, D01, D07, độ chênh 0 cho tất cả; Dinh dưỡng — B00, A00, A01, B03, B04, B08, C02, C20, D01, D07, độ chênh 0 cho tất cả.',
  evidence: [
    {
      sourceId: 'ndun-nguong-dochenh-2026',
      location: 'Thông báo ngưỡng đảm bảo chất lượng / độ chênh tổ hợp / quy đổi điểm năm 2026, mục 2, trang 1.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const ndunPriorityEvidence = {
  value:
    '"UT: Điểm ưu tiên khu vực và điểm ưu tiên đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT" — mức áp dụng theo Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0), giảm dần từ mốc 22,50/30.',
  evidence: [
    {
      sourceId: 'ndun-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const ndunThresholdEvidence = {
  ruleId: 'ndun-final-threshold-2026',
  evidence: [
    {
      sourceId: 'ndun-diemchuan-2058-2026',
      location:
        'Thông báo số 2058/TB-ĐDN (10/8/2026), bảng "Điểm trúng tuyển (HSPT-KV3)", cột "Phương thức xét tuyển điểm thi TN THPT 2026": Điều dưỡng 7720301 = 21,10; Hộ sinh 7720302 = 18,30; Dinh dưỡng 7720401 = 16,25. Ghi chú: "Điểm trúng tuyển của các ngành đã bao gồm điểm cộng, điểm ưu tiên (nếu có)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
    {
      sourceId: 'ndun-nguong-dochenh-2026',
      location: 'Mục 1 "Ngưỡng đảm bảo chất lượng (điểm xét tối thiểu)" — phương thức điểm thi TN THPT: Điều dưỡng 18,0; Hộ sinh 18,0; Dinh dưỡng 15,0 (thang 30, không nhân hệ số, không tính điểm cộng).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
};
