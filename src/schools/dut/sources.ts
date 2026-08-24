import type { AdmissionSource } from '../../core/sourceRegistry';

export const dutSources: Omit<AdmissionSource, 'schoolId'>[] = [
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
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm DUT. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của DUT.',
  },
];
