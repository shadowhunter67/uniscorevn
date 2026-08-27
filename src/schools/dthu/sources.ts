import type { AdmissionSource } from '../../core/sourceRegistry';

export const dthuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'dthu-quality-threshold-2026',
    publisher: 'Trường Đại học Đồng Tháp - Hội đồng tuyển sinh',
    title: 'Thông báo ngưỡng bảo đảm chất lượng đầu vào đại học, cao đẳng chính quy theo phương thức kết quả thi tốt nghiệp THPT năm 2026 và các điều kiện đăng ký xét tuyển (kèm Phụ lục I)',
    url: 'https://tuyensinh.dthu.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-cao-dang-chinh-quy-theo-phuong-thuc-ket-qua-thi-tot-nghiep-thpt-nam-2026-va-cac-dieu-kien-dang-ky-072818.html',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-09',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'File PDF đính kèm 16 trang (có text layer), tải trực tiếp từ media.dthu.edu.vn. Mục 1.3 công thức NĐV nguyên văn: "NĐV = (Điểm môn 1 + Điểm môn 2 + Điểm Môn 3) + điểm ưu tiên (KV + đối tượng)", làm tròn 2 chữ số thập phân. Điểm ưu tiên theo Điều 7 Thông tư 06/2026/TT-BGDĐT, công thức giảm ≥ 22,5 nguyên văn. Mục 1.1: ngưỡng đào tạo giáo viên (đại học) 20,0/30; mục 1.2: ngành không sư phạm 15,0/30; lĩnh vực pháp luật 20,0/30 (đều KV3, không tính điểm cộng). Ngành có môn năng khiếu (GDMN/GDTC/SP Âm nhạc/SP Mỹ thuật/Huấn luyện Thể thao): công thức 2 môn + ưu tiên×2/3 hoặc 1 môn + ưu tiên/3 — ngoài phạm vi.',
  },
];
