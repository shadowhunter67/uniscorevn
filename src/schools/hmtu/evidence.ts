import type { SourcedRule } from '../../core/evidence';

export const hmtuThptExamFormulaEvidence = {
  value:
    'Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026, mục II.2.2 "Phương thức 2": "Điểm xét tuyển được tính từ tổng điểm thi 3 môn tốt nghiệp THPT theo tổ hợp các môn xét tuyển cộng điểm ưu tiên, khuyến khích (nếu có)"; "Điểm xét tuyển = (2*Điểm A + Điểm B + Điểm C)*3/4 + ƯT + KK" với "Điểm A: Kết quả điểm môn Toán học", "Điểm B: Kết quả điểm môn thứ 2 trong tổ hợp xét tuyển", "Điểm C: Kết quả điểm môn thứ 3 trong tổ hợp xét tuyển". Mục II.2 "Nguyên tắc xét tuyển": "Điểm xét tuyển được tính theo thang điểm 30 (bao gồm điểm ưu tiên, điểm cộng theo quy định nếu có) ... tổng điểm xét tuyển không vượt quá 30 điểm" và điểm xét tuyển "không phụ thuộc vào tổ hợp môn xét tuyển".',
  evidence: [
    {
      sourceId: 'hmtu-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh trình độ Đại học (Chính quy) năm 2026, mục II.2 "Nguyên tắc xét tuyển" và mục II.2.2 "Phương thức 2", trang 2.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const hmtuPriorityEvidence = {
  value:
    '"ƯT: Điểm ưu tiên (nếu có)" theo Quy chế tuyển sinh hiện hành của Bộ GD&ĐT — mức áp dụng theo Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0), giảm dần từ mốc 22,50/30 và trần tổng 30.',
  evidence: [
    {
      sourceId: 'hmtu-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
    {
      sourceId: 'hmtu-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh 2026, mục II.2.2 (định nghĩa thành phần ƯT) và mục II.2 (trần 30, đã gồm điểm ưu tiên).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
} satisfies SourcedRule<string>;

export const hmtuThresholdEvidence = {
  ruleId: 'hmtu-final-threshold-2026',
  evidence: [
    {
      sourceId: 'hmtu-diemtrungtuyen-706-2026',
      location:
        'Thông báo số 706/TB-ĐHKTYTHD (10/8/2026) "Điểm trúng tuyển đại học chính quy năm 2026" — cột "THPT" của bảng 5 dòng: Y khoa 7720101 = 25.00; Điều dưỡng 7720301 = 22.50; Kỹ thuật Xét nghiệm y học 7720601 = 23.00; Kỹ thuật Hình ảnh y học 7720602 = 23.20; Kỹ thuật Phục hồi chức năng 7720603 = 24.00.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
    {
      sourceId: 'hmtu-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh 2026, mục II.2.2 (danh mục tổ hợp dùng chung B00/A00/D07/B08-D08) và mục II.4 "Số lượng tuyển sinh" (5 mã xét tuyển).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-11',
    },
  ],
};
