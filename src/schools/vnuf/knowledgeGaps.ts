import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnufKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuf-program-threshold-table-not-imported',
    label: 'VNUF 2026 chi cong bo 1 nguong THPT chung (15,0/30); chua tim thay bang nguong rieng theo tung nganh/chuong trinh dao tao trong nguon da fetch duoc.',
    status: 'official-but-unparsed',
    sourceId: 'vnuf-admission-scheme-2026',
    impact: 'Runtime co the loai cac ho so duoi 15/30, nhung khong the phan biet nganh nao co the co dieu kien rieng (neu co) ngoai nguong chung.',
  },
  {
    id: 'vnuf-transcript-ability-methods-not-modeled',
    label: 'VNUF 2026 con co phuong thuc 200 (hoc ba, tong 3 mon >= 18,0/30), 402 (danh gia nang luc/tu duy: DHQG Ha Noi >=35, DH Bach Khoa Ha Noi >=35, DHQG TPHCM >=600) va 301 (xet tuyen thang); chi phuong thuc 100 (thi TN THPT) duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'vnuf-admission-scheme-2026',
    knownData: [
      'Phuong thuc 200 (hoc ba): tong 3 mon >= 18,0/30 (chuong trinh chinh quy tap trung); 15,0/30 (vua lam vua hoc/lien thong)',
      'Phuong thuc 402 (danh gia nang luc): DHQG Ha Noi >= 35 diem; DH Bach Khoa Ha Noi >= 35 diem; DHQG TPHCM >= 600 diem',
    ],
  },
  {
    id: 'vnuf-bonus-priority-not-modeled',
    label: 'Diem uu tien khu vuc/doi tuong theo Thong tu 06 duoc de cap nhung chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'vnuf-admission-scheme-2026',
    impact: 'Bo tinh diem chua tinh duoc diem xet tuyen cuoi cung, chi kiem tra nguong dau vao.',
  },
];
