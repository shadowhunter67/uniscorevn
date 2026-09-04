import type { SourcedRule } from '../../core/evidence';

export const pxuThptExamFormulaEvidence = {
  value:
    'Phương thức 1 (Số 041/TB-PXU, mục 3.1, trang 2): "Điểm xét tuyển = (T1 + T2 + T3) + điểm ưu tiên (nếu có) + điểm cộng (nếu có)", trong đó T1/T2/T3 là điểm thi TN THPT của 3 môn trong tổ hợp xét tuyển (thang 30, không hệ số). Ngưỡng đầu vào: "Tổng điểm 3 môn của tổ hợp môn xét tuyển cộng điểm ưu tiên và điểm cộng (nếu có) từ 15 điểm trở lên".',
  evidence: [
    {
      sourceId: 'pxu-thongbao-041-2026',
      location: 'Số 041/TB-PXU, mục II.3.1 "Phương thức 1: Xét tuyển dựa trên kết quả thi tốt nghiệp THPT", trang 2.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const pxuTranscriptFormulaEvidence = {
  value:
    'Phương thức 2 (Số 041/TB-PXU, mục 3.2, trang 3): "Điểm xét tuyển = (H1 + H2 + H3) + điểm ưu tiên (nếu có) + điểm cộng (nếu có)", trong đó H1/H2/H3 là điểm trung bình chung kết quả học tập cả năm các lớp 10, 11, 12 của 3 môn phù hợp với tổ hợp xét tuyển (mỗi môn thang 10, tổng 3 môn thang 30). Ngưỡng đầu vào công bố: "đạt từ 16 điểm trở lên" (thang 30, đã gồm điểm ưu tiên/điểm cộng).',
  evidence: [
    {
      sourceId: 'pxu-thongbao-041-2026',
      location: 'Số 041/TB-PXU, mục II.3.2 "Phương thức 2: Xét tuyển dựa trên kết quả học tập bậc THPT (học bạ)", trang 2-3.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
} satisfies SourcedRule<string>;

export const pxuThresholdEvidence = {
  ruleId: 'pxu-final-threshold-2026',
  evidence: [
    {
      sourceId: 'pxu-diemtrungtuyen-2026',
      location:
        'Ảnh "THÔNG BÁO ĐIỂM TRÚNG TUYỂN ĐẠI HỌC CHÍNH QUY NĂM 2026" đính kèm bài đăng 16/8/2026 — bảng 9 dòng (TT 1-9), cột "Điểm thi tốt nghiệp THPT" = 15 và cột "Điểm kết quả học tập bậc THPT" = 18 cho TOÀN BỘ 9 ngành/chuyên ngành (không phân biệt).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
    {
      sourceId: 'pxu-thongbao-041-2026',
      location: 'Số 041/TB-PXU, mục II.4 "Số lượng tuyển sinh" (trang 5-6) — danh sách 9 ngành/chuyên ngành, mã ngành, tổ hợp môn xét tuyển tương ứng.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-04',
    },
  ],
};
