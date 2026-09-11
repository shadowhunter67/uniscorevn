import type { SourcedRule } from '../../core/evidence';

export const vmuvinhThptExamFormulaEvidence = {
  value:
    'Thông tin tuyển sinh đại học năm 2026, mục IV.4.1.a "Quy định về điểm xét tuyển": "Điểm xét tuyển đối với phương thức xét kết quả kỳ thi tốt nghiệp THPT năm 2026: là tổng điểm thi tốt nghiệp THPT năm 2026 của các môn theo tổ hợp môn đăng ký xét tuyển cộng với điểm ưu tiên, điểm cộng (nếu có) và được làm tròn đến 2 chữ số thập phân"; "Điểm xét tuyển tối đa là 30 điểm, các môn trong tổ hợp môn xét tuyển có trọng số ngang nhau. Không quy định điểm chênh lệch giữa các tổ hợp môn xét tuyển và giữa các năm tốt nghiệp THPT".',
  evidence: [
    {
      sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh đại học năm 2026 (Trường Đại học Y khoa Vinh), mục IV.4.1.a, trang 5.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const vmuvinhPriorityEvidence = {
  value:
    'Thành phần "điểm ưu tiên" trong quy định về điểm xét tuyển, áp dụng theo Quy chế tuyển sinh (Thông tư 06/2026/TT-BGDĐT) — mức: KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0; giảm dần từ mốc 22,50/30.',
  evidence: [
    {
      sourceId: 'vmuvinh-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const vmuvinhThresholdEvidence = {
  ruleId: 'vmuvinh-final-threshold-2026',
  evidence: [
    {
      sourceId: 'vmuvinh-diemtrungtuyen-809-2026',
      location:
        'Thông báo số 809/TB-ĐHYKV (10/8/2026) "Điểm trúng tuyển hệ đại học đợt 1 năm 2026", mục I — cột "Phương thức xét kết quả thi THPT" kèm cột "Tổ hợp xét tuyển": Y khoa 7720101 (A00, B00) = 23,50; Dược học 7720201 (A00, B00, D07) = 20,00; Y học dự phòng 7720110 (A00, B00, D07) = 18,00; Điều dưỡng 7720301 (A00, B00, D07) = 19,00; Kỹ thuật xét nghiệm y học 7720601 (A00, B00, D07) = 23,25.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
    {
      sourceId: 'vmuvinh-thongtin-tuyensinh-2026',
      location: 'Mục III.3.1 "Ngành và chỉ tiêu tuyển sinh" và mục III.3.2 (chú giải tổ hợp A00/B00/D07) — khớp tuyệt đối với bảng tổ hợp của Thông báo 809.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
};
