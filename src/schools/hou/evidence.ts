import type { SourcedRule } from '../../core/evidence';

export const houExactFormulaEvidence = {
  value:
    'Điểm xét (phương thức xét kết quả thi TN THPT 2026) = tổng điểm thô 3 môn theo tổ hợp xét tuyển đã chọn (KHÔNG nhân hệ số — 16/22 ngành mô hình hoá trong batch này đều dùng tổ hợp chuẩn không hệ số) + điểm ưu tiên khu vực/đối tượng — nguồn xác nhận TRỰC TIẾP điểm ưu tiên được CỘNG vào tổng trước khi so với ngưỡng bảo đảm chất lượng đầu vào theo từng ngành. Mức điểm ưu tiên cụ thể không được công bố — dùng khung quốc gia hiện hành làm judgment call cho giá trị bảng.',
  evidence: [
    {
      sourceId: 'hou-threshold-2026',
      location: 'hou.edu.vn, bảng "Ngưỡng bảo đảm chất lượng đầu vào Đại học chính quy năm 2026" (ảnh Anh-1-1.png, Anh-2-9.7.png), cột "Điểm thi tốt nghiệp THPT/Kết hợp năng khiếu vẽ (thang 30)"',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
} satisfies SourcedRule<string>;

export const houFieldThresholdEvidence = {
  ruleId: 'hou-field-threshold-2026',
  evidence: [
    {
      sourceId: 'hou-threshold-2026',
      location: 'Bảng ngưỡng bảo đảm chất lượng đầu vào theo ngành, cột thi TN THPT 2026 (thang 30).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-08-29',
    },
  ],
};
