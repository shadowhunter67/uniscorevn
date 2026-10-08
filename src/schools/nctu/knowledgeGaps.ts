import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const nctuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'nctu-program-threshold-table-not-imported',
    label: 'NCTU 2026 co bảng ngưỡng theo 48 ngành/phương thức (học bạ 18-23, V-SAT 225-290); chi mô hình hóa ngung chung 15/30 của phương thức thi TN THPT cho nhóm ngành không thuoc Sức khỏe/Luật.',
    status: 'official-but-unparsed',
    sourceId: 'nctu-threshold-notice-2026',
    scoreAffecting: true,
    knownData: [
      'Common baseline (THPT exam, non-Health/Law majors): 15.00/30',
      'Hoc ba (transcript) floor range: 18-23/30 tuy ngành',
      'V-SAT floor range: 225-290 tuy ngành',
    ],
    impact: 'Runtime chi loai được thí sinh dưới 15/30; không kết luận được cho nhom Sức khỏe/Luật (gate theo học lực lớp 12) hoặc cho thí sinh trong khoang 15-20/30 khi chưa chọn ngành cụ thể.',
  },
  {
    id: 'nctu-academic-rank-gate-not-modeled',
    label: 'Nhom Sức khỏe (Y khoa, RHM, Dược) va Luật/Luật Kinh tế yeu cau học lực lớp 12 xếp loại Tốt (tuong duong Giỏi trở lên); hồ sơ ứng viên hien không có trường học lực nen điều kiện nay không được kiểm tra.',
    status: 'incomplete',
    sourceId: 'nctu-threshold-notice-2026',
    scoreAffecting: true,
    impact: 'Thi sinh dat điểm nhung không đủ điều kiện học lực se không được runtime canh bao.',
  },
  {
    id: 'nctu-alternative-methods-not-modeled',
    label: 'Phương thức xét học bạ THPT va xét kết quả thi V-SAT chưa được mô hình hóa; chi phương thức xét kết quả thi TN THPT được kiểm tra.',
    status: 'official-but-unparsed',
    sourceId: 'nctu-threshold-notice-2026',
  },
];
