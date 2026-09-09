import type { SourcedRule } from '../../core/evidence';

export const epuThptExamFormulaEvidence = {
  value:
    'Phương thức 3 (Thông báo 466/TB-ĐHĐL, mục II.2.3, trang 3): "Cách thức xét tuyển: Sử dụng kết quả điểm trong kỳ thi tốt nghiệp THPT năm 2026 của 3 môn theo tổ hợp xét tuyển và điểm ưu tiên (nếu có)". Thang 30, không hệ số môn chính. Mục 3 cùng văn bản: "Điểm xét tuyển các phương thức được quy đổi về thang điểm 30".',
  evidence: [
    {
      sourceId: 'epu-thongtin-tuyensinh-466-2026',
      location: 'Thông báo số 466/TB-ĐHĐL (26/02/2026), mục II.2.3 "Phương thức 3: Xét tuyển dựa vào kết quả của thí sinh trong kỳ thi tốt nghiệp THPT năm 2026 do Bộ Giáo dục và Đào tạo tổ chức", trang 3.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const epuPriorityEvidence = {
  value:
    'Thông báo 466/TB-ĐHĐL: "(Đối tượng ưu tiên và khu vực ưu tiên áp dụng theo Quy chế tuyển sinh trình độ đại học hiện hành của Bộ GD&ĐT; Các thí sinh đã tốt nghiệp từ năm 2024 trở về trước không được cộng điểm ưu tiên)" — trường không tự công bố bảng mức riêng, dùng Điều 7 Thông tư 06/2026/TT-BGDĐT.',
  evidence: [
    {
      sourceId: 'epu-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const epuThresholdEvidence = {
  ruleId: 'epu-final-threshold-2026',
  evidence: [
    {
      sourceId: 'epu-diemtrungtuyen-3020-2026',
      location:
        'Thông báo số 3020/TB-ĐHĐL (09/8/2026) "V/v điểm trúng tuyển đại học chính quy năm 2026", mục 1 — bảng STT 1-38 (Mã xét tuyển / Tên ngành / Điểm trúng tuyển) cho phương thức xét tuyển dựa trên điểm thi tốt nghiệp THPT năm 2026, từ 16,00 (7340120 Kinh doanh quốc tế, 7480102 Mạng máy tính và truyền thông dữ liệu) đến 24,60 (7510303 Công nghệ kỹ thuật điều khiển và tự động hoá).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'epu-thongtin-tuyensinh-466-2026',
      location: 'Thông báo số 466/TB-ĐHĐL (26/02/2026), mục II.4.1 "Số lượng tuyển sinh (dự kiến)", trang 4-5 — tổ hợp xét tuyển (THXT) của nhánh "Xét tuyển kết quả thi tốt nghiệp THPT" theo từng khối ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
};
