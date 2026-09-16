import type { AdmissionSource } from '../../core/sourceRegistry';

export const thuvSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'thuv-admission-info-2026',
    publisher: 'Trường Đại học Y khoa Tokyo Việt Nam (THUV)',
    title: 'Quyết định số 260306/001/QĐ-THUV về việc ban hành Thông tin tuyển sinh trình độ Đại học năm 2026',
    url: 'https://tokyo-human.edu.vn/wp-content/uploads/2026/03/THU-Thong-tin-tuyen-sinh-2026-QD.pdf',
    accessedAt: '2026-09-16',
    publishedAt: '2026-03-06',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF scan 13 trang, đọc bằng vision (poppler/Read tool). Mục 2.2 (Phương thức 2 — thi TN THPT 2026): "Điểm xét tuyển (ĐXT) = Đ1 + Đ2 + Đ3 + ƯT + KK" (Đ1-3 = 3 môn thi thô, ƯT = điểm ưu tiên khu vực/đối tượng theo Bộ GD&ĐT — không in bảng riêng, judgment call Điều 7 TT06/2026, KK = điểm khuyến khích JLPT). 4 ngành + tổ hợp (mục 2.2 bảng): Điều dưỡng 7720301 (A00/A01/A02/B00/B08/D07/D23/D28/D33), Kỹ thuật xét nghiệm y học 7720601 (A00/A01/A02/B00/B08/C08/D07/D23/D33/X10/X14/X26), Kỹ thuật hình ảnh y học 7720602 (A00/A01/A02/B00/B03/B08/D07/D23/D28/X10/X26), Kỹ thuật phục hồi chức năng 7720603 (A00/A01/A02/B00/B08/D07/D23/D28/D33). Mục 5.b: điểm cộng KK chỉ áp dụng chứng chỉ JLPT (N5 +0,5/N4 +1/N3-N2-N1 +1,5). Mục II.3: "Mức điểm sàn (ngưỡng đầu vào) sẽ được thông báo sau khi có kết quả thi tốt nghiệp THPT... và tuân thủ theo ngưỡng đảm bảo chất lượng đầu vào do Bộ GD&ĐT quy định" — không có số cụ thể tại thời điểm này (số cụ thể lấy từ nguồn `thuv-cutoff-notice-2026` bên dưới).',
  },
  {
    id: 'thuv-cutoff-notice-2026',
    publisher: 'Trường Đại học Y khoa Tokyo Việt Nam (THUV)',
    title: 'Thông báo số 260809/001/TB-THUV về điểm trúng tuyển và hướng dẫn thủ tục nhập học hệ Đại học chính quy năm 2026',
    url: 'https://tokyo-human.edu.vn/wp-content/uploads/2026/08/TB-diem-trung-tuyen-huong-dan-thu-tuc-nhap-hoc-2026.pdf',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF scan 2 trang, đọc bằng vision. Bảng điểm chuẩn trúng tuyển hệ ĐH chính quy 2026, phương thức "Xét điểm thi tốt nghiệp THPT 2026" = 18,0/30 ĐỒNG NHẤT cho cả 4 ngành (Điều dưỡng/KT phục hồi chức năng/KT xét nghiệm y học/KT hình ảnh y học) — đây là điểm chuẩn TRÚNG TUYỂN thật (đã tuyển xong, mùa 2026 đã kết thúc), không phải điểm sàn nhận hồ sơ; theo mục 2 của `thuv-admission-info-2026`, ĐXT đã bao gồm ưu tiên + điểm cộng nên so trực tiếp ĐXT với 18,0 là đúng. Nguồn tìm qua trang công bố kết quả (tokyo-human.edu.vn/cong-bo-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2026), quét toàn bộ href tìm ra link PDF trực tiếp.',
  },
];
