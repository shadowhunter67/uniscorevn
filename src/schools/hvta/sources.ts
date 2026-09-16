import type { AdmissionSource } from '../../core/sourceRegistry';

export const hvtaSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hvta-admission-info-2026',
    publisher: 'Học viện Tòa án (HTA)',
    title: 'Thông tin tuyển sinh năm 2026 (Hình thức đào tạo: Chính quy)',
    url: 'https://cdn.tuyensinh247.com/picture/2026/0615/thong-tin-tuyen-sinh-hoc-vien-toa-an-2026.pdf',
    accessedAt: '2026-09-16',
    publishedAt: '2026-06-15',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF scan 14 trang, đọc bằng vision (poppler/Read tool, trang 1-7). Chỉ tuyển 1 ngành Luật (7380101), 360 chỉ tiêu, 4 tổ hợp A00/A01/C00/D01. Mục II.1 điều kiện dự tuyển: (1) đã "Đạt sơ tuyển" tại TAND nơi hộ khẩu/tạm trú hoặc tại Học viện (điều kiện KHÔNG model — pass/fail ngoài phạm vi điểm số); (2) Chuẩn chương trình đào tạo lĩnh vực Pháp luật (QĐ 678/QĐ-BGDĐT 14/3/2025, áp dụng MỌI trường ngành Luật toàn quốc, không riêng HVTA): tổng điểm xét tuyển tối thiểu 60% thang điểm (=18,00/30 cho phương thức thi THPT) + điểm Toán/Ngữ văn (môn nào có trong tổ hợp) tối thiểu 6/10; (3) riêng phương thức thi TN THPT: tổng 3 môn tối thiểu 15,00/30 (thấp hơn (2), không phải điều kiện binding do phải thỏa mãn ĐỒNG THỜI cả (2) và (3) → ngưỡng thực tế = 18,00). Mục 5.a: tiêu chí phụ khi hòa điểm (ưu tiên 1: tổng theo tổ hợp không tính ưu tiên cao hơn; ưu tiên 2: điểm môn chính Toán/Văn cao hơn). Mục 5.b: điểm cộng (ưu tiên KV/ĐT + chứng chỉ tiếng Anh IELTS/TOEFL/TOEIC, bảng quy đổi) — tổng điểm cộng+ưu tiên+khuyến khích KHÔNG vượt quá 10% thang điểm (tối đa 3,0/30). Không có công thức ĐXT tường minh (không nói rõ ngưỡng đã gồm ưu tiên hay chưa) → so RAW (judgment call, cùng tiền lệ TBDU/CTU). Không tuyển theo khu vực/giới tính riêng trong bảng chỉ tiêu chính thức này (chỉ 1 dòng mã xét tuyển duy nhất cho cả 3 phương thức) — khác với mô tả "4 mã theo khu vực/giới tính" của 1 nguồn thứ cấp (tuyensinh247 đề án tóm tắt), ưu tiên đọc PDF gốc.',
  },
];
