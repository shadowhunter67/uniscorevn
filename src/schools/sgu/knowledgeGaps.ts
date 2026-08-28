import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const sguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'sgu-program-threshold-table-not-imported',
    label:
      'Bảng ngưỡng đầu vào 47 ngành/chương trình SGU 2026 ĐÃ nhập vào `thresholds.ts` và dùng cho nhánh exact (`sgu-thpt-exam-exact-2026`, phạm vi 29 mã ngoài sư phạm/Luật). Nhóm sư phạm (điều kiện phụ mục 2.1.b) và ngành Luật (điều kiện phụ mục 2.4) vẫn ngoài phạm vi — xem `thresholds.ts:SGU_EXACT_EXCLUDED_PROGRAM_CODES`.',
    status: 'official-but-unparsed',
    sourceId: 'sgu-quality-threshold-2026',
    scoreAffecting: false,
    knownData: ['Điểm sàn SGU 2026 dao động khoảng 16-23/30 theo ngành/chương trình'],
    impact: 'method-out-of-scope',
  },
  {
    id: 'sgu-conversion-and-bonus-appendices-not-imported',
    label:
      'Phụ lục quy đổi chứng chỉ tiếng Anh (mục 2.1.b), V-SAT/ĐGNL (mục 3.2) và bảng điểm cộng (ĐC, mục 4.3) SGU 2026 chưa nhập. Nhánh exact scope ĐC=0 (thí sinh không có điểm cộng khuyến khích/thưởng) và tổ hợp KHÔNG dùng quy đổi chứng chỉ — 2 trường hợp này vẫn ngoài phạm vi.',
    status: 'official-but-unparsed',
    sourceId: 'sgu-admission-info-2026',
    scoreAffecting: false,
    impact: 'method-out-of-scope',
  },
  {
    id: 'sgu-cutoff-image-not-imported',
    label: 'Thông báo điểm trúng tuyển SGU 2026 tồn tại dạng ảnh/file trên trang chính thức nhưng chưa nhập bảng điểm chuẩn.',
    status: 'official-but-unparsed',
    sourceId: 'sgu-quality-threshold-2026',
    scoreAffecting: false,
  },
];
