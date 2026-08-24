import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const bvuKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'bvu-program-threshold-table-not-imported',
    label:
      'BVU 2026 cong bo nguong hoc ba rieng theo nganh (da so nganh 18,0/30; Duoc hoc 24,0/30 du kien; Dieu duong 19,5/30 du kien; chuong trinh Cu nhan tai nang loai tru khoi phuong phap nay); chua chon duoc nganh cu the de ap dung dung muc, va chua nhap danh muc ~60 nganh/chuyen nganh.',
    status: 'official-but-unparsed',
    sourceId: 'bvu-admission-2026',
    scoreAffecting: true,
    knownData: [
      'Da so nganh: >= 18,0/30 (hoc ba, TB lop 12 3 mon to hop)',
      'Duoc hoc: >= 24,0/30 (du kien)',
      'Dieu duong: >= 19,5/30 (du kien)',
      'Chuong trinh Cu nhan tai nang: >= 22,0/30 (du kien) — khong thuoc pham vi mo hinh hoa nay',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (18/30 = ineligible chac chan); tu 18/30 den 24/30 can chon nganh de ket luan chinh xac.',
  },
  {
    id: 'bvu-other-methods-not-modeled',
    label:
      'BVU 2026 tuyen sinh qua 5 phuong thuc doc lap (xet tuyen thang, ket qua thi TN THPT, va cac phuong thuc khac); chi phuong thuc hoc ba duoc mo hinh hoa vi day la phuong thuc duy nhat co so lieu ro rang trong nguon da fetch duoc.',
    status: 'official-but-unparsed',
    sourceId: 'bvu-admission-2026',
  },
  {
    id: 'bvu-bonus-priority-not-modeled',
    label: 'Diem uu tien khu vuc/doi tuong theo Thong tu 06 duoc de cap nhung chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'bvu-admission-2026',
    impact: 'Bo tinh diem chua tinh duoc diem xet tuyen cuoi cung, chi kiem tra nguong dau vao.',
  },
];
