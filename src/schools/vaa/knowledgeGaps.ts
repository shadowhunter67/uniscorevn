import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vaaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vaa-hocba-passing-range-not-modeled',
    label:
      'VAA cong bo diem chuan xet hoc ba THPT dao dong 18-27/30 tuy nganh nam 2026, nhung bang diem chuan theo tung nganh chua duoc trich xuat co cau truc; runtime chi kiem tra dieu kien san chung 15/30, khong ket luan duoc trung tuyen cuoi cung.',
    status: 'official-but-unparsed',
    sourceId: 'vaa-hocba-notice-2026',
    scoreAffecting: true,
    impact: 'Runtime chi loai duoc ho so duoi 15/30; tren muc do van chua ket luan duoc dau vao/truot theo tung nganh.',
  },
  {
    id: 'vaa-other-methods-not-modeled',
    label: 'VAA con xet tuyen thang, DGNL DHQG Ha Noi/TP.HCM, va chung chi quoc te (SAT/ACT/IB); chi phuong thuc dieu kien san THPT duoc mo hinh hoa.',
    status: 'incomplete',
    sourceId: 'vaa-admission-notice-2026',
  },
  {
    id: 'vaa-bonus-priority-not-modeled',
    label: 'Quy dinh cong diem uu tien khu vuc/doi tuong chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'vaa-admission-notice-2026',
  },
];
