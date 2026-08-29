import type { SourcedRule } from '../../core/evidence';

export const uttThptExamThresholdEvidence = {
  ruleId: 'utt-thpt-exam-threshold-2026',
  evidence: [
    {
      sourceId: 'utt-threshold-2026',
      location:
        'utt.edu.vn, "Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026" (07-07-2026), bảng ngưỡng theo mã xét tuyển',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};

export const uttThptExactFormulaEvidence = {
  value:
    'Điểm xét tuyển (phương thức thi TN THPT) = tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển (thang 30, không nhân hệ số) + điểm ưu tiên khu vực/đối tượng. Ngưỡng đảm bảo chất lượng đầu vào ĐÃ BAO GỒM điểm ưu tiên (nguồn xác nhận trực tiếp).',
  evidence: [
    {
      sourceId: 'utt-threshold-2026',
      location:
        'utt.edu.vn, "Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026": "Điểm xét tuyển theo phương thức xét tuyển bằng kết quả thi THPT năm 2026 = Tổng điểm 03 môn thi theo tổ hợp xét tuyển + Điểm Ưu tiên (Khu vực, Đối tượng)"; ghi chú "Điểm sàn nêu trên đã bao gồm cả điểm thưởng (nếu có) và điểm ưu tiên khu vực, đối tượng (nếu có)".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const uttPerMajorThresholdEvidence = {
  ruleId: 'utt-per-major-threshold-2026',
  evidence: [
    {
      sourceId: 'utt-threshold-2026',
      location:
        'Bảng ngưỡng theo mã xét tuyển (7 mục: chuẩn Hà Nội 48 mã, đường sắt tốc độ cao/đô thị 4 mã, tài năng 5 mã, tăng cường tiếng Anh 8 mã, định hướng Nhật Bản 3 mã, liên kết quốc tế 2 mã, Phú Thọ 5 mã) — cột "Điểm thi THPT 2026": phần lớn 15/30, một số ngành 18/30 hoặc 20/30.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
