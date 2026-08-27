import type { AdmissionSource } from '../../core/sourceRegistry';

export const utcSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'utc-quality-threshold-2026',
    publisher: 'Cổng thông tin tuyển sinh Đại học chính quy - Trường Đại học Giao thông vận tải',
    title: 'Ngưỡng đảm bảo chất lượng đầu vào xét tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.utc.edu.vn/?q=tin-tuyen-sinh%2Fng%C6%B0%E1%BB%A1ng-%C4%91%E1%BA%A3m-b%E1%BA%A3o-ch%E1%BA%A5t-l%C6%B0%E1%BB%A3ng-%C4%91%E1%BA%A7u-v%C3%A0o-x%C3%A9t-tuy%E1%BB%83n-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-ch%C3%ADnh-quy-n%C4%83m-2026',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo ngưỡng đảm bảo chất lượng đầu vào 2026 (07/7/2026). Trích nguyên văn bảng ngưỡng theo ngành (xem `thresholds.ts`): Cơ sở Hà Nội (GHA) 16-21/30 (nhóm 16: Kiến trúc/Xây dựng/Môi trường/QLXD/ATGT; nhóm 18: kinh tế + phần lớn kỹ thuật + Ngôn ngữ Anh; nhóm 20: KHMT/CNTT/AI/Ô tô/Robot; nhóm 21: Logistics/Cơ điện tử). Phân hiệu TP.HCM (GSA) 16-20/30.',
  },
  {
    id: 'utc-admission-info-2026',
    publisher: 'Cổng thông tin tuyển sinh Đại học chính quy - Trường Đại học Giao thông vận tải',
    title: 'Thông tin tuyển sinh đại học hệ chính quy 2026',
    url: 'https://tuyensinh.utc.edu.vn/?q=tin-tuyen-sinh%2Fth%C3%B4ng-tin-tuy%E1%BB%83n-sinh-%C4%91%E1%BA%A1i-h%E1%BB%8Dc-h%E1%BB%87-ch%C3%ADnh-quy-2026',
    accessedAt: '2026-08-27',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trích nguyên văn dùng cho nhánh exact: (1) Công thức phương thức xét thi TN THPT, thang 30 — các ngành (trừ Ngôn ngữ Anh): "(Điểm thi môn Toán x 2 + điểm thi hai môn còn lại trong tổ hợp) x 3/4 + điểm ưu tiên (nếu có) + điểm cộng (nếu có)"; ngành Ngôn ngữ Anh KHÔNG nhân hệ số: "(Điểm thi môn Toán + điểm thi hai môn còn lại trong tổ hợp) + điểm ưu tiên + điểm cộng". (2) Điểm cộng: giải nhất/nhì/ba HSG tỉnh = 1,00/0,75/0,50; IELTS 5.0/5.5/6.0/6.5/≥7.0 = 0,50/0,75/1,00/1,25/1,50. (3) Điểm ưu tiên: "theo quy chế tuyển sinh hiện hành" (không in bảng KV/ĐT). (4) Trần: ĐXT (gồm ưu tiên + điểm cộng) không vượt quá 30.',
  },
];
