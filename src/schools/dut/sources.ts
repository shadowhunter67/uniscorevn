import type { AdmissionSource } from '../../core/sourceRegistry';

export const dutSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dut-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận DUT là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'dut-admission-info-2026',
    publisher: 'DUT - Đại học Đà Nẵng',
    title: 'DUT - Phương thức tuyển sinh 2026',
    url: 'https://tuyensinh.dut.udn.vn/phuong-thuc-tuyen-sinh',
    accessedAt: '2026-08-24',
    
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang phương thức tuyển sinh chính thức của DUT ngày 2026-08-24: xác nhận các phương thức xét tuyển thẳng theo quy chế Bộ GDĐT, xét kết quả thi Đánh giá tư duy 2026 của Đại học Bách khoa Hà Nội, xét kết quả thi tốt nghiệp THPT 2026, điểm thưởng/điểm khuyến khích, và quy đổi chứng chỉ ngoại ngữ. Trang không lộ số ngưỡng cụ thể trong phần text đã đọc được.',
  },
  {
    id: 'dut-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'superseded', supersededBy: 'dut-cutoff-2026' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm DUT. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của DUT. Bị thay thế bởi điểm chuẩn trúng tuyển chính thức theo NGÀNH `dut-cutoff-2026` — giữ lại làm nguồn lịch sử điểm sàn (trước kỳ thi).',
  },
  {
    id: 'dut-cutoff-2026',
    publisher: 'Đại học Đà Nẵng (Ban Đào tạo & Đảm bảo chất lượng giáo dục)',
    title: 'Điểm chuẩn vào các cơ sở đào tạo thuộc Đại học Đà Nẵng năm 2026',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/diemchuan/19567',
    accessedAt: '2026-09-16',
    publishedAt: '2026-08-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính chủ hệ thống Đại học Đà Nẵng (ts.udn.vn) — bảng HTML text thật (đọc trực tiếp được, không cần vision), gộp điểm chuẩn trúng tuyển 2026 của TẤT CẢ cơ sở đào tạo thành viên/trực thuộc ĐHĐN trong 1 trang, có cột mã ngành, tên ngành/chuyên ngành, điểm trúng tuyển (đã quy về thang 30, theo ghi chú cuối bảng), và phương thức tuyển sinh tương ứng. Mục I (mã trường DDK) = TRƯỜNG ĐẠI HỌC BÁCH KHOA (DUT), 49 ngành/chuyên ngành, TẤT CẢ đều ghi phương thức "Xét điểm thi THPT" (không phải phương thức kết hợp) — module này dùng nguyên bảng con DUT. KHÔNG có cột tổ hợp môn xét tuyển — người dùng tự chọn tổ hợp, xem `knowledgeGaps.ts`.',
  },
];
