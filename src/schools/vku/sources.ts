import type { AdmissionSource } from '../../core/sourceRegistry';

export const vkuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vku-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận VKU là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'vku-admission-info-2026',
    publisher: 'VKU - Đại học Đà Nẵng',
    title: 'VKU - Thông tin tuyển sinh năm 2026 (cập nhật 09/4/2026)',
    url: 'https://ts.udn.vn/files/2026/2026_4_10_48_48_174_3.vku_-_thong_tin_tuyen_sinh_cap_nhat_09.4.pdf',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã tải & đọc trực tiếp TOÀN VĂN (38 trang) file PDF chính thức — lần đầu 2026-08-24, đọc đầy đủ Phụ lục 2026-08-27. Trích nguyên văn dùng cho nhánh exact: (1) Mục 2.2.c — "Điểm xét tuyển = Điểm học bạ * 60% + Điểm thi TN THPT* 40% + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)"; điểm học bạ = tổng 3 môn TB cả năm lớp 10/11/12, điểm thi = tổng 3 môn, cả hai thang 30, không hệ số; ĐXT làm tròn 2 chữ số, kẹp trần 30. (2) Phụ lục II "Điểm khuyến khích": SAT ≥1200 / ACT ≥26 = 1,25; IELTS 5.0=0,5 / 5.5=0,75 / 6.0=1,0 / 6.5=1,25 / ≥7.0=1,5; trần tổng điểm cộng 3,0 (Mục 5.2). (3) Mục 5.2.b — "Điểm ưu tiên = [(30 - (Điểm quy đổi + Điểm cộng))/7,5] x Mức điểm ưu tiên theo quy định" khi tổng ≥ 22,50; mức KV/ĐT theo Thông tư 06/2026/TT-BGDĐT. CHƯA công bố: ngưỡng ĐBCL PT2 ("Trường sẽ công bố theo kế hoạch của Bộ GDĐT" - Mục 3.1); công thức quy đổi ĐGNL (PT3). Danh mục ngành/tổ hợp (D00/D09/X26/D10/X78/D66/C00; A00/A01/D01/D07/X06/C01) ở Mục 2.2.d.',
  },
  {
    id: 'vku-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm VKU. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của VKU.',
  },
];
