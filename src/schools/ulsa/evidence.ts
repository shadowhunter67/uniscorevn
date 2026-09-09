import type { SourcedRule } from '../../core/evidence';

export const ulsaThptExamFormulaEvidence = {
  value:
    'Phương thức 100 (Thông tin tuyển sinh năm 2026, mục 4.1.3 "Điểm xét tuyển"): "Từ tổng điểm cao đến thấp, bao gồm cả điểm ưu tiên (nếu có) cho đến khi đủ số lượng tuyển sinh cho từng tổ hợp môn xét tuyển và theo từng ngành đào tạo" — Điểm xét tuyển = tổng điểm 3 môn theo tổ hợp + điểm ưu tiên KV/ĐT. Thang điểm 30, không hệ số môn: Thông báo 2752/TB-HĐTSĐH2026 gán nhãn cột điểm chuẩn nguyên văn "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)".',
  evidence: [
    {
      sourceId: 'ulsa-thongtin-tuyensinh-2026',
      location: 'Trang "Trường Đại học Lao động - Xã hội tuyển sinh đại học chính quy năm 2026", mục 4.1 "Phương thức 1: Xét tuyển dựa trên kết quả kỳ thi tốt nghiệp trung học phổ thông năm 2026 (Mã xét tuyển 100)", tiểu mục 4.1.3.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'ulsa-diemtrungtuyen-2752-2026',
      location: 'Thông báo số 2752/TB-HĐTSĐH2026 (11/8/2026), tiêu đề cột "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const ulsaPriorityEvidence = {
  value:
    'Điểm ưu tiên khu vực/đối tượng theo Quy chế tuyển sinh trình độ đại học ban hành tại Quyết định số 783/QĐ-ĐHLĐXH ngày 11/4/2025 của Hiệu trưởng — quy chế nội bộ triển khai khung của Bộ GD&ĐT; mức áp dụng lấy theo Điều 7 Thông tư 06/2026/TT-BGDĐT (KV1 0,75 / KV2-NT 0,5 / KV2 0,25 / KV3 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0), giảm dần từ mốc 22,50/30.',
  evidence: [
    {
      sourceId: 'ulsa-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'ulsa-thongtin-tuyensinh-2026',
      location: 'Trang tuyển sinh 2026, mục 3 — "Các chính sách ưu tiên trong tuyển sinh thực hiện theo Quy chế tuyển sinh trình độ đại học ban hành tại Quyết định số 783/QĐ-ĐHLĐXH ngày 11/4/2025".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const ulsaThresholdEvidence = {
  ruleId: 'ulsa-final-threshold-2026',
  evidence: [
    {
      sourceId: 'ulsa-diemtrungtuyen-2752-2026',
      location:
        'Thông báo số 2752/TB-HĐTSĐH2026 (11/8/2026), mục 1.1 "Địa điểm đào tạo Trụ sở chính Hà Nội (DLX)" (28 chương trình, 16,50-24,78/30) và mục 1.2 "Địa điểm đào tạo Cơ sở II - Tp. Hồ Chí Minh (DLS)" (14 chương trình, 16,00-25,05/30), cột "Điểm chuẩn Thi TN THPT (PT 100, PT gốc, thang 30)" kèm cột "Tổ hợp xét" theo từng cụm mã ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'ulsa-thongtin-tuyensinh-2026',
      location: 'Ảnh bảng "Chương trình đào tạo, ngành đào tạo, mã xét tuyển, tổ hợp môn xét tuyển và chỉ tiêu tuyển sinh" — đối chiếu chéo tổ hợp theo tên môn kèm mã, và xác nhận chương trình nào có chỉ tiêu tại Cơ sở II.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
};
