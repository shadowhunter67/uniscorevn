import type { AdmissionSource } from '../../core/sourceRegistry';

export const huflSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hufl-identity-2026',
    publisher: 'Trường Đại học Ngoại ngữ, Đại học Huế (HUFLIS)',
    title: 'Trang tuyển sinh chính thức Trường Đại học Ngoại ngữ, Đại học Huế',
    url: 'https://tuyensinh.huflis.edu.vn/',
    accessedAt: '2026-09-22',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Xác nhận danh tính: trường thành viên Đại học Huế, thương hiệu HUFLIS, trụ sở 57 Nguyễn Khoa Chiêm, An Cựu, Huế. Đào tạo 13 ngành (sư phạm ngoại ngữ Anh/Pháp/Trung + ngôn ngữ Anh/Nga/Pháp/Trung/Nhật/Hàn + Việt Nam học/Quốc tế học/Hoa Kỳ học/Truyền thông quốc tế).',
  },
  {
    id: 'hufl-admission-info-2026',
    publisher: 'Trường Đại học Ngoại ngữ, Đại học Huế (HUFLIS)',
    title: 'THÔNG TIN TUYỂN SINH ĐẠI HỌC CHÍNH QUY NĂM 2026',
    url: 'https://tuyensinh.huflis.edu.vn/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026_20251231114356',
    accessedAt: '2026-09-22',
    publishedAt: '2026-03-28',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đề án tuyển sinh chính chủ. Mục III "CÔNG THỨC TÍNH ĐIỂM XÉT TUYỂN" — 3.1 (Phương thức 1: xét kết quả thi TN THPT): "Điểm ưu tiên: áp dụng theo quy chế tuyển sinh năm của Bộ GD&ĐT" + "Điểm cộng: bao gồm điểm thưởng, điểm xét thưởng và điểm khuyến khích" (Bảng 2-5, tối đa 3,0/30, KHÔNG mô hình hoá trong batch này vì app không thu thập input thành tích). Mục V "CHỈ TIÊU TUYỂN SINH" (ảnh chụp màn hình đính kèm bài viết, đọc bằng vision) liệt kê đủ 13 mã xét tuyển + tổ hợp môn cho từng ngành (mỗi ngành 3-6 tổ hợp khả dụng qua PT1/2/4/5). Phương thức 2 (học bạ) công thức tương tự dùng ĐTB thay điểm thi — KHÔNG mô hình hoá trong batch này (chỉ scope PT1 thi TN THPT).',
  },
  {
    id: 'hufl-cutoff-2026',
    publisher: 'Trường Đại học Ngoại ngữ, Đại học Huế (HUFLIS)',
    title: 'TRƯỜNG ĐẠI HỌC NGOẠI NGỮ, ĐẠI HỌC HUẾ CÔNG BỐ ĐIỂM CHUẨN ĐẠI HỌC CHÍNH QUY 2026 (ĐỢT 1)',
    url: 'https://tuyensinh.huflis.edu.vn/tin-tuc/truong-dai-hoc-ngoai-ngu-dai-hoc-hue-cong-bo-diem-chuan-dai-hoc-chinh-quy-2026-dot-1_20260809093857',
    accessedAt: '2026-09-22',
    publishedAt: '2026-08-09',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Ảnh infographic chính chủ "DIEM CHUAN 2026 CHOT.jpg" đính kèm bài (đọc bằng vision) — bảng "ĐIỂM CHUẨN ĐẠI HỌC CHÍNH QUY (ĐỢT 1) NĂM 2026" liệt kê đủ 13/13 ngành, mã ngành, điểm chuẩn quy đổi thang 30 cho cả 2 cột phương thức THPT và Học bạ. Batch này chỉ dùng cột THPT. Có thông báo "ĐIỂM CHUẨN ... (BỔ SUNG ĐỢT 1)" ngày 10/9/2026 cho các chỉ tiêu còn thiếu — chưa đọc/dùng trong batch này, điểm đợt 1 vẫn là điểm trúng tuyển chính thức đợt đầu.',
  },
];
