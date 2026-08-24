import type { AdmissionSource } from '../../core/sourceRegistry';

export const vmuSources: Omit<AdmissionSource, 'schoolId'>[] = [
  {
    id: 'vmu-admission-2026',
    publisher: 'Trường Đại học Hàng hải Việt Nam',
    title: 'Thông báo tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.vimaru.edu.vn/tuyensinh/2026-thong-bao-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026.vmu',
    accessedAt: '2026-08-24',
    publishedAt: '2026-06-04',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
];

/**
 * Trường công bố 6 phương thức xét tuyển độc lập cho đợt 1 (PT1 THPT, PT2 kết hợp THPT + tiêu chí
 * khác, PT3 học bạ, PT4 ĐGNL/ĐGTD, PT5 chứng chỉ tiếng Anh quốc tế kết hợp học bạ, PT6 tuyển thẳng
 * theo quy định Bộ GDĐT). Ngưỡng đảm bảo chất lượng của PT1/PT2/PT3/PT5 quy về thang điểm tổ hợp
 * D01, chia theo 3 khối ngành: Kỹ thuật/Công nghệ 17/30, Kinh tế/Ngôn ngữ 19/30, Luật 20/30. Bảng
 * quy đổi tương đương chi tiết theo 55 chương trình/6 phương thức chưa trích xuất được đầy đủ nên
 * không đưa vào runtime.
 */
