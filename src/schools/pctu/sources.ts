import type { AdmissionSource } from '../../core/sourceRegistry';

export const pctuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'pctu-admission-info-2025',
    publisher: 'Trường Đại học Phan Châu Trinh (pctu.edu.vn, tên miền chính chủ)',
    title: 'Thông tin tuyển sinh đại học năm 2025',
    url: 'https://pctu.edu.vn/vn/thong-tin-tuyen-sinh-dai-hoc-nam-2025.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-07-01',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Trang chính thức đọc trực tiếp được (text, không phải ảnh/SPA). Liệt kê 6 ngành đại học chính quy (Y khoa 7720101, Răng-Hàm-Mặt 7720501, Điều dưỡng đa khoa 7720301A, Điều dưỡng Nha khoa 7720301B, Kỹ thuật xét nghiệm y học 7720601, Quản trị bệnh viện 7340101) cùng tổ hợp xét tuyển (A00/A01/B00/B08/D07, riêng Quản trị bệnh viện dùng A00/A01/D01/D07) và trích nguyên văn công thức Phương thức 2 (PT2, xét điểm thi TN THPT 2025): "Điểm xét tuyển = ĐM1 + ĐM2 + ĐM3 + Điểm ƯT", trong đó "Điểm ƯT: là điểm ưu tiên khu vực và ưu tiên đối tượng, được xác định theo Quy chế tuyển sinh hiện hành". Tổ hợp có điểm cao nhất trong số tổ hợp quy định cho từng ngành được tự động chọn để xét.',
  },
  {
    id: 'pctu-threshold-2025',
    publisher: 'Trường Đại học Phan Châu Trinh (pctu.edu.vn, tên miền chính chủ)',
    title: 'Điểm chuẩn trúng tuyển đại học hệ chính quy năm 2025',
    url: 'https://pctu.edu.vn/vn/diem-chuan-trung-tuyen-dai-hoc-he-chinh-quy-nam-2025.html',
    accessedAt: '2026-09-03',
    publishedAt: '2025-08-20',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2025, status: 'current' },
    note:
      'Bảng điểm chuẩn trúng tuyển 2025 đăng dưới dạng ẢNH (DIEM_CHUAN_TRUNG_TUYEN_06.png) trên trang chính thức — đọc bằng vision (Read tool) vì không có text layer. Cột "ĐIỂM THI THPT (PT2, PT4)" cho từng ngành (thang 30): Y khoa 21,5; Răng-Hàm-Mặt 21,75; Điều dưỡng đa khoa 17; Điều dưỡng Nha khoa 17; Kỹ thuật xét nghiệm y học 17; Quản trị bệnh viện 15. Điểm chuẩn công bố CHUNG cho tất cả tổ hợp của từng ngành (không tách theo tổ hợp riêng như HUC). Cùng năm 2025 với `pctu-admission-info-2025` (formula) — không lệch năm.',
  },
];
