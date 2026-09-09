import type { SourcedRule } from '../../core/evidence';

export const huphThptExamFormulaEvidence = {
  value:
    'Thông tin tuyển sinh đại học chính quy năm 2026, mục 5.3.5: "Điểm xét tuyển được tính trên thang điểm 30"; "Điểm xét tuyển = [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] + Điểm ưu tiên (nếu có)"; "Khi [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] vượt qua 30 điểm sẽ quy về 30 điểm". Mục 5: "Trường Đại học Y tế công cộng không quy định chênh lệch điểm xét tuyển giữa các tổ hợp đối với các thí sinh đăng ký xét tuyển cùng một ngành học"; "Điểm xét tuyển được làm tròn đến 2 chữ số thập phân sau dấu phẩy".',
  evidence: [
    {
      sourceId: 'huph-thongtin-tuyensinh-314-2026',
      location: 'Thông tin tuyển sinh đại học chính quy năm 2026 (Quyết định 314/QĐ-ĐHYTCC), mục 5.3.5 và mục 5, trang 9-12.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const huphPriorityEvidence = {
  value:
    '"Điểm ưu tiên là điểm ưu tiên đối tượng, khu vực theo quy định của Bộ GDĐT, giảm dần khi [Điểm Môn 1 + Điểm Môn 2 + Điểm Môn 3 + Điểm khuyến khích (nếu có)] từ 22,5 điểm trở lên theo quy chế tuyển sinh trình độ đại học hiện hành của Bộ Giáo dục và Đào tạo" — mức áp dụng theo Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0).',
  evidence: [
    {
      sourceId: 'huph-thongtin-tuyensinh-314-2026',
      location: 'Thông tin tuyển sinh đại học chính quy năm 2026, mục 5.3.5 (gạch đầu dòng cuối).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'huph-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const huphThresholdEvidence = {
  ruleId: 'huph-final-threshold-2026',
  evidence: [
    {
      sourceId: 'huph-diemtrungtuyen-743-2026',
      location:
        'Thông báo số 743/TB-ĐHYTCC (09/8/2026) "Điểm trúng tuyển đại học chính quy năm 2026 đợt 1" — bảng 6 dòng: Công tác xã hội 7760101 = 22,90; Dinh dưỡng 7720401 = 22,00; Khoa học dữ liệu 7460108 = 18,80; Kỹ thuật phục hồi chức năng 7720603 = 22,00 (tiêu chí phụ TTNV<=2); Kỹ thuật xét nghiệm y học 7720601 = 20,25; Y tế công cộng 7720701 = 20,00.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'huph-thongtin-tuyensinh-314-2026',
      location: 'Bảng 1 "Số lượng tuyển sinh năm 2026" (trang 4-8) — tổ hợp môn xét tuyển theo từng ngành cho phương thức xét kết quả thi tốt nghiệp THPT 2026.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
};
