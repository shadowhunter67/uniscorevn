import type { AdmissionSource } from '../../core/sourceRegistry';

export const uedudnSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'uedudn-udn-system-notice-2026',
    publisher: 'Đại học Đà Nẵng (ĐHĐN)',
    title: 'Thông báo tuyển sinh đại học chính quy năm 2026 của Đại học Đà Nẵng (đợt 1)',
    url: 'https://ts.udn.vn/DHCD/Chinhquy/DHTbao/19360',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-11',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo hệ thống ĐHĐN xác nhận UED là cơ sở đào tạo thành viên, liệt kê website tuyển sinh chính thức và nguyên tắc xét tuyển chung (điểm xét tuyển, điểm cộng, điểm ưu tiên do CSĐT quy định riêng); ngưỡng/phương thức chi tiết công bố tại trang của từng CSĐT.',
  },
  {
    id: 'uedudn-admission-info-2026',
    publisher: 'UED - Đại học Đà Nẵng',
    title: 'UED - Ngưỡng đảm bảo chất lượng đầu vào và quy tắc quy đổi điểm trúng tuyển năm 2026',
    url: 'https://tuyensinh.ued.udn.vn/index.php/2026/07/10/__trashed/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức ngày 2026-08-24: xác nhận UED (mã trường DDS) công bố ngưỡng đảm bảo chất lượng đầu vào dùng điểm thi TN THPT 2026, áp dụng phương pháp bách phân vị và nội suy tuyến tính để quy đổi điểm giữa các phương thức. Ảnh đính kèm "CONG-BO-DIEN-SAN-2026-scaled.png" (tuyensinh.ued.udn.vn/wp-content/uploads/2026/07/) tải trực tiếp qua curl và đọc qua vision 2026-08-28: bảng ĐẦY ĐỦ 37 ngành, 3 mức ngưỡng (20,00/17,00/15,50) cho 33 ngành công thức chuẩn (tổng 3 môn + điểm ưu tiên) + 4 ngành công thức riêng (GD Thể chất, SP Mỹ thuật, GD Mầm non, SP Âm nhạc: 1 môn + 1/3 điểm ưu tiên, có năng khiếu). Mục GHI CHÚ xác nhận NGUYÊN VĂN: "Ngưỡng đầu vào là tổng điểm 3 môn thi tốt nghiệp THPT theo tổ hợp xét tuyển cộng với điểm ưu tiên khu vực, đối tượng."',
  },
  {
    id: 'uedudn-quality-threshold-2026',
    publisher: 'Trang tuyển sinh VNUK - Đại học Đà Nẵng (tổng hợp liên trường)',
    title: 'Điểm sàn các trường đại học công lập tại Đà Nẵng năm 2026',
    url: 'https://tuyensinh.vnuk.udn.vn/diem-san-cac-truong-dai-hoc-cong-lap-tai-da-nang-nam-2026/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-13',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài tổng hợp trên trang tuyển sinh chính thức của VNUK (một CSĐT thành viên ĐHĐN) đối chiếu ngưỡng đảm bảo chất lượng đầu vào 2026 đã công bố của các CSĐT thành viên ĐHĐN, bao gồm UED. Dùng verification cross-checked vì đây là nguồn tổng hợp lại thông báo gốc của từng trường, không phải thông báo gốc trực tiếp của UED.',
  },
];
