import type { AdmissionSource } from '../../core/sourceRegistry';

export const mtuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'mtu-admission-info-2026',
    publisher: 'Trường Đại học Xây dựng Miền Tây (MTU)',
    title: 'Thông tin tuyển sinh năm 2026',
    url: 'http://tuyensinh.mtu.edu.vn/Thongtintuyensinh.aspx',
    accessedAt: '2026-09-16',
    publishedAt: '2026-01-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt (trang aspx, không phải HTML tĩnh index). Điều kiện chuẩn (giống văn bản mẫu chung nhiều trường, ví dụ HVTA): "Thí sinh có tổng điểm 03 môn thi kỳ thi tốt nghiệp THPT... đạt tối thiểu 15,00 điểm theo thang điểm 30, áp dụng đối với thí sinh thi tốt nghiệp năm 2026" — đồng nhất cả 28 ngành, không phân nhóm. Công thức PT1 (mã 100) NGUYÊN VĂN (PDF "Phương thức tuyển sinh năm 2026", tuyensinh.mtu.edu.vn): "Điểm xét tuyển = Điểm thi THPT môn 1 + Điểm thi THPT môn 2 + Điểm thi THPT môn 3 + Điểm ưu tiên (nếu có) + Điểm cộng (nếu có)". Điều kiện tổ hợp: bắt buộc có môn Toán, trọng số tối thiểu 1/3. Ngưỡng 15,00 là điều kiện RIÊNG (điều kiện chuẩn boilerplate, không phải công thức ĐXT) — không nói rõ đã gồm ưu tiên hay chưa → so RAW (judgment call, tiền lệ HVTA/TBDU), ĐXT (gồm ưu tiên+điểm cộng) vẫn trả về `score` để tham khảo.',
  },
];
