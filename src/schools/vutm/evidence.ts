import type { SourcedRule } from '../../core/evidence';

export const vutmThptExamFormulaEvidence = {
  value:
    'Thông báo số 3036/TB-HVYDCT (10/8/2026), đoạn ngay dưới bảng "I. Điểm chuẩn": "Điểm xét tuyển của thí sinh là tổng điểm các bài thi/môn thi theo thang điểm 10 đối với từng bài thi/môn thi của tổ hợp xét tuyển cộng với điểm cộng, điểm ưu tiên đối tượng, khu vực theo quy định hiện hành và được làm tròn đến hai chữ số thập phân." — thang 30 tổng, không hệ số môn.',
  evidence: [
    {
      sourceId: 'vutm-diemchuan-3036-2026',
      location: 'Thông báo số 3036/TB-HVYDCT (10/8/2026), mục I "Điểm chuẩn", đoạn văn ngay dưới bảng, trang 1.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const vutmPriorityEvidence = {
  value:
    '"điểm ưu tiên đối tượng, khu vực theo quy định hiện hành" — mức áp dụng theo Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0), giảm dần từ mốc 22,50/30.',
  evidence: [
    {
      sourceId: 'vutm-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const vutmThresholdEvidence = {
  ruleId: 'vutm-final-threshold-2026',
  evidence: [
    {
      sourceId: 'vutm-diemchuan-3036-2026',
      location:
        'Thông báo số 3036/TB-HVYDCT (10/8/2026), bảng "I. Điểm chuẩn" — Y khoa (7720101, tổ hợp B00/B03/A02/D08/X14) = 24,50; Y học cổ truyền (7720115, tổ hợp B00/B03/A02/D08/D35/X14) = 22,30; Dược học (7720201, tổ hợp A00/B00/D07/C02/X10) = 22,00, cột "Điểm chuẩn Phương thức xét kết quả thi tốt nghiệp THPT năm 2026".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
};
