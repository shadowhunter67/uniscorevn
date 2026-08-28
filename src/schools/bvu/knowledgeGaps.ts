import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bvuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bvu-program-threshold-table-not-imported',
    label:
      'BVU 2026 cong bo nguong theo 4 nhom nganh (Duoc hoc, Dieu duong, Luat, cac nganh khac — bang cap nhat 10/08/2026, thay so "du kien" truoc do) nhung chua nhap danh muc day du ~60 nganh/chuyen nganh -> to hop nao thuoc nhom nao (nguoi dung tu chon nhom).',
    status: 'official-but-unparsed',
    sourceId: 'bvu-diem-trung-tuyen-2026',
    scoreAffecting: false,
    knownData: [
      'Duoc hoc: 20,0/30 (hoc ba va thi THPT)',
      'Dieu duong: 18,0/30 (hoc ba va thi THPT)',
      'Luat: 20,0/30 (hoc ba va thi THPT)',
      'Cac nganh khac: 18,0/30 (hoc ba) / 15,0/30 (thi THPT)',
    ],
    impact: 'Nguoi dung phai tu chon nhom nganh dung thay vi he thong tu suy ra tu ten nganh.',
  },
  {
    id: 'bvu-other-methods-not-modeled',
    label:
      'BVU 2026 tuyen sinh qua 5 phuong thuc doc lap (xet tuyen thang va cac phuong thuc khac ngoai hoc ba/thi THPT); chi 2 phuong thuc hoc ba va thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'bvu-diem-trung-tuyen-2026',
  },
  {
    id: 'bvu-transcript-priority-unclear',
    label:
      'Bai dang 10/08/2026 xac nhan RO phuong thuc thi THPT KHONG cong diem uu tien khu vuc/doi tuong, nhung KHONG xac nhan lai quy tac nay cho phuong thuc hoc ba (trang cu mo ta cong thuc hoc ba co "+ diem uu tien" nhung trang do da 404) — phuong thuc hoc ba giu partial/unknown, khong nang exact vi thieu can cu hien tai cho ca 2 huong (co hoac khong cong uu tien).',
    status: 'incomplete',
    sourceId: 'bvu-diem-trung-tuyen-2026',
    scoreAffecting: true,
    impact: 'Phuong thuc hoc ba van chi kiem tra duoc nguong tho, khong tinh duoc diem xet tuyen cuoi cung.',
  },
];
