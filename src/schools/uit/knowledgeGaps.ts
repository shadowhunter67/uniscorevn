import type { KnowledgeGap } from '../../core/knowledgeStatus';

/** 4 khoảng trống chặn exact calculator UIT — trước đây hard-code trong `UitInfoPage.tsx`,
 * chuyển thành data để domain layer là nguồn sự thật duy nhất (UI chỉ render, không tự liệt kê
 * lại). Tất cả đều 'official-but-unparsed' (nguồn tồn tại dạng ảnh/PDF, chưa đọc được text) —
 * KHÔNG phải 'incomplete' (không có nguồn) hay 'provisional' (trường tự ghi dự kiến). */
export const uitKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uit-percentile-conversion',
    label: 'Chưa tính được phần quy đổi bách phân vị giữa điểm thi TN THPT và ĐGNL trong Xét tuyển Tổng hợp của UIT. ĐHQG-HCM có bảng dùng chung ngày 01/07/2026 cho A00/A01/B00/C00/D01, nhưng chưa xác nhận UIT dùng bảng này hay quy tắc riêng.',
    status: 'official-but-unparsed',
    attemptedSources: [
      '2026-08-28: ĐHQG-HCM đã công bố bách phân vị/bảng quy đổi ĐGNL<->THPT 2026 dùng chung cho các trường thành viên (01/07/2026, 5 tổ hợp A00/A01/B00/C00/D01), nhưng chưa xác nhận được UIT dùng ĐÚNG bảng chung này cho phương thức Xét tuyển Tổng hợp (khác cơ chế trọng số 47,5%-47,5%-5% của UIT) hay có quy tắc quy đổi riêng — trang tuyensinh.uit.edu.vn chưa đăng bảng/công thức percentile riêng.',
    ],
  },
  {
    id: 'uit-transcript-formula',
    label: 'Chưa có đủ công thức chính thức để tính điểm Học bạ của UIT.',
    status: 'official-but-unparsed',
  },
  {
    id: 'uit-sat-act-conversion',
    label: 'Chưa có đủ bảng hoặc công thức chính thức để quy đổi SAT/ACT sang phần điểm ĐGNL của UIT.',
    status: 'official-but-unparsed',
  },
  {
    id: 'uit-ib-alevel-conversion',
    label: 'Chưa có đủ bảng hoặc công thức chính thức để quy đổi IB/A-Level sang phần điểm thi TN THPT của UIT.',
    status: 'official-but-unparsed',
  },
];
