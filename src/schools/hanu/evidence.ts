/** HANU 2026 — công thức (trang thông tin tuyển sinh chính chủ: Toán/Ngữ văn + Ngoại ngữ nhân hệ
 * số 2, tổng tối đa 50 điểm quy đổi về thang 40) + bảng điểm chuẩn thật theo mã ngành, Quyết định
 * 3222/QĐ-ĐHHN (10/8/2026). */
export const hanuThptExamExactEvidence = {
  ruleId: 'hanu-thpt-exam-exact-2026',
  evidence: [
    {
      sourceId: 'hanu-scheme-2026',
      location:
        'Mục 3 (Quy tắc quy đổi): "Môn Ngoại ngữ nhân hệ số 2; tùy từng ngành đào tạo, môn Toán hoặc môn Ngữ văn nhân hệ số 2... Tổng điểm 03 môn thi sau khi nhân hệ số (tối đa 50 điểm) sẽ được quy đổi về thang điểm 40." Mục 4: bảng "Môn nhân hệ số 2" theo từng mã ngành.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
    {
      sourceId: 'hanu-cutoff-2026',
      location:
        'Điểm trúng tuyển đại học hình thức chính quy năm 2026 (Quyết định 3222/QĐ-ĐHHN, 10/8/2026), bảng 29 mã ngành, thang 40. Ghi chú: "Điểm trúng tuyển được xác định theo thang điểm 40, đã bao gồm điểm cộng (nếu có), điểm ưu tiên khu vực và đối tượng theo quy định hiện hành."',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-22',
    },
  ],
};
