import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const apdKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'apd-program-threshold-table-not-imported',
    label:
      'APD 2026 cong bo nguong dam bao chat luong dau vao rieng theo tung co so dao tao (Tru so chinh Ha Noi 19,0/30; Phan hieu Bac Ninh va Phan hieu Da Nang 16,0/30), khong phan biet theo nganh/chuong trinh trong pham vi da fetch duoc; chua chon duoc co so cu the de ap dung dung muc.',
    status: 'official-but-unparsed',
    sourceId: 'apd-admission-2026',
    scoreAffecting: true,
    knownData: [
      'Tru so chinh (Ha Noi): >= 19,0/30 (thi TN THPT)',
      'Phan hieu Bac Ninh: >= 16,0/30 (thi TN THPT)',
      'Phan hieu Da Nang: >= 16,0/30 (thi TN THPT)',
    ],
    impact: 'Runtime chi kiem tra duoc ngoai le duoi nguong thap nhat (16/30 = ineligible chac chan); tu 16/30 den 19/30 can chon co so dao tao de ket luan chinh xac.',
  },
  {
    id: 'apd-other-methods-not-modeled',
    label:
      'APD 2026 con co phuong thuc xet hoc ba THPT va cac phuong thuc khac (5 phuong thuc tong cong tai phan hieu theo nguon thu cap); chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'apd-admission-2026',
  },
  {
    id: 'apd-bonus-priority-not-modeled',
    label: 'Diem uu tien khu vuc/doi tuong theo Thong tu 06 duoc de cap nhung chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'apd-admission-2026',
    impact: 'Bo tinh diem chua tinh duoc diem xet tuyen cuoi cung, chi kiem tra nguong dau vao.',
  },
];
