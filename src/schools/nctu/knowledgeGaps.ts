import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const nctuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'nctu-program-threshold-table-not-imported',
    label: 'NCTU 2026 co bang nguong theo 48 nganh/phuong thuc (hoc ba 18-23, V-SAT 225-290); chi mo hinh hoa ngung chung 15/30 cua phuong thuc thi TN THPT cho nhom nganh khong thuoc Suc khoe/Luat.',
    status: 'official-but-unparsed',
    sourceId: 'nctu-threshold-notice-2026',
    scoreAffecting: true,
    knownData: [
      'Common baseline (THPT exam, non-Health/Law majors): 15.00/30',
      'Hoc ba (transcript) floor range: 18-23/30 tuy nganh',
      'V-SAT floor range: 225-290 tuy nganh',
    ],
    impact: 'Runtime chi loai duoc thi sinh duoi 15/30; khong ket luan duoc cho nhom Suc khoe/Luat (gate theo hoc luc lop 12) hoac cho thi sinh trong khoang 15-20/30 khi chua chon nganh cu the.',
  },
  {
    id: 'nctu-academic-rank-gate-not-modeled',
    label: 'Nhom Suc khoe (Y khoa, RHM, Duoc) va Luat/Luat Kinh te yeu cau hoc luc lop 12 xep loai Tot (tuong duong Gioi tro len); ho so ung vien hien khong co truong hoc luc nen dieu kien nay khong duoc kiem tra.',
    status: 'incomplete',
    sourceId: 'nctu-threshold-notice-2026',
    scoreAffecting: true,
    impact: 'Thi sinh dat diem nhung khong du dieu kien hoc luc se khong duoc runtime canh bao.',
  },
  {
    id: 'nctu-alternative-methods-not-modeled',
    label: 'Phuong thuc xet hoc ba THPT va xet ket qua thi V-SAT chua duoc mo hinh hoa; chi phuong thuc xet ket qua thi TN THPT duoc kiem tra.',
    status: 'official-but-unparsed',
    sourceId: 'nctu-threshold-notice-2026',
  },
];
