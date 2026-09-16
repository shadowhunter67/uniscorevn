import type { AdmissionSource } from '../../core/sourceRegistry';

export const siuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'siu-threshold-notice-2026',
    publisher: 'Trường Đại học Quốc tế Sài Gòn (SIU)',
    title: 'SIU công bố ngưỡng đảm bảo chất lượng đầu vào năm 2026',
    url: 'https://siu.edu.vn/siu-cong-bo-nguong-dam-bao-chat-luong-dau-vao-nam-2026/',
    accessedAt: '2026-09-16',
    publishedAt: '2026-07-01',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tải qua curl với User-Agent trình duyệt. Nguyên văn: "đối với phương thức xét tuyển bằng kết quả kỳ thi tốt nghiệp THPT năm 2026, thí sinh phải có tổng điểm 03 môn theo tổ hợp xét tuyển đạt tối thiểu 15 điểm (theo thang điểm 30)... áp dụng thống nhất đối với tất cả ngành và chuyên ngành đào tạo của SIU, NGOẠI TRỪ ngành Luật kinh tế áp dụng ngưỡng đầu vào theo quy định của Bộ GD&ĐT đối với nhóm ngành pháp luật" (số cụ thể không nêu — loại khỏi phạm vi). Không nói rõ ngưỡng đã gồm điểm ưu tiên hay chưa → so RAW (judgment call, tiền lệ TBDU/BAFU/DNTU khi im lặng).',
  },
];
