/**
 * VWA 2026 (Học viện Phụ nữ Việt Nam) — ngưỡng đầu vào phương thức thi TN THPT theo mã xét tuyển.
 * Nguồn: Thông báo 96/TB-HVPNVN (07/07/2026) — `sources.ts:vwa-quality-threshold-2026`, đọc bằng
 * OCR (chrome-devtools + poppler) 2026-08-28. Bảng mục I/II (trang 2-3) liệt kê đủ mã xét tuyển +
 * tổ hợp môn + ngưỡng theo 4 phương thức; giá trị dùng ở đây là cột "Ngưỡng điểm xét tuyển điểm
 * thi tốt nghiệp THPT năm 2026".
 */
export interface VwaProgramThreshold {
  code: string;
  programId: string;
  name: string;
  threshold30: number;
  /** true nếu có điều kiện phụ ngoài ngưỡng chung, model được (Toán ≥ 6,0). */
  specialCondition?: 'math-min-6';
  /** true nếu ngành có điều kiện phụ KHÔNG model được (chứng chỉ ngoại ngữ) — ngoài phạm vi exact. */
  modellable: boolean;
}

export const VWA_PROGRAM_THRESHOLDS: readonly VwaProgramThreshold[] = [
  { code: '7340101', programId: 'quan-tri-kinh-doanh', name: 'Quản trị kinh doanh', threshold30: 18, modellable: true },
  { code: '7340101E', programId: 'quan-tri-kinh-doanh-clc', name: 'Quản trị kinh doanh (Chất lượng cao)', threshold30: 18, modellable: false },
  { code: '7480201', programId: 'cong-nghe-thong-tin', name: 'Công nghệ thông tin', threshold30: 16, specialCondition: 'math-min-6', modellable: true },
  { code: '74802011', programId: 'thiet-ke-phat-trien-game', name: 'Thiết kế và phát triển Game', threshold30: 16, specialCondition: 'math-min-6', modellable: true },
  { code: '7760101', programId: 'cong-tac-xa-hoi', name: 'Công tác xã hội', threshold30: 16, modellable: true },
  { code: '77601011', programId: 'phat-trien-quan-ly-dich-vu-xa-hoi', name: 'Phát triển và quản lý dịch vụ xã hội', threshold30: 16, modellable: true },
  { code: '7310399', programId: 'gioi-va-phat-trien', name: 'Giới và Phát triển', threshold30: 16, modellable: true },
  { code: '7810103', programId: 'qtdv-du-lich-lu-hanh-hn', name: 'Quản trị dịch vụ du lịch và lữ hành (Hà Nội)', threshold30: 18, modellable: true },
  { code: '7320104', programId: 'truyen-thong-da-phuong-tien', name: 'Truyền thông đa phương tiện', threshold30: 19, modellable: true },
  { code: '73201041', programId: 'truyen-thong-xa-hoi', name: 'Truyền thông xã hội', threshold30: 18, modellable: true },
  { code: '7310101', programId: 'kinh-te', name: 'Kinh tế', threshold30: 16, modellable: true },
  { code: '7310101E', programId: 'kinh-te-clc', name: 'Kinh tế (Chất lượng cao)', threshold30: 16, modellable: false },
  { code: '7310401', programId: 'tam-ly-hoc', name: 'Tâm lý học', threshold30: 18, modellable: true },
  { code: '7310109', programId: 'kinh-te-so', name: 'Kinh tế số', threshold30: 16, modellable: true },
  { code: '7340115', programId: 'marketing', name: 'Marketing', threshold30: 16, modellable: true },
  { code: '7760101-SPN', programId: 'cong-tac-xa-hoi-spn', name: 'Công tác xã hội (Phân hiệu TP.HCM)', threshold30: 16, modellable: true },
  { code: '7810103-SPN', programId: 'qtdv-du-lich-lu-hanh-spn', name: 'Quản trị dịch vụ du lịch và lữ hành (Phân hiệu TP.HCM)', threshold30: 16, modellable: true },
];

export const VWA_THRESHOLD_BY_CODE: ReadonlyMap<string, VwaProgramThreshold> = new Map(
  VWA_PROGRAM_THRESHOLDS.map((entry) => [entry.code, entry])
);
