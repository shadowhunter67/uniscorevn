import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnuumpKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnuump-hsa-method-not-modeled',
    label:
      'VNU-UMP con xet tuyen bang ket qua thi Danh gia nang luc (HSA) cua DHQGHN voi dieu kien rieng: Y khoa/Rang Ham Mat can diem trung binh 3 nam mon Hoa/Sinh >=8,0 va tong diem thi TN THPT >=20,00/30; cac nganh HSA khac can diem trung binh mon lien quan >=7,0 va tong THPT >=16,50/30. Runtime chua mo hinh hoa phuong thuc nay.',
    status: 'official-but-unparsed',
    sourceId: 'vnuump-admission-notice-2026',
  },
  {
    id: 'vnuump-straight-admission-not-modeled',
    label:
      'VNU-UMP danh 2% chi tieu cho xet tuyen thang/uu tien theo quy che Bo GDDT va 2% cho he du bi dan toc; runtime chi mo hinh hoa phuong thuc thi TN THPT (96% chi tieu).',
    status: 'incomplete',
    sourceId: 'vnuump-admission-notice-2026',
  },
  {
    id: 'vnuump-bonus-priority-formula-not-modeled',
    label:
      'Cong thuc diem xet tuyen chinh thuc: Tong diem 3 mon thi + diem cong (neu co) + diem uu tien khu vuc/doi tuong (neu co), toi da 30 diem. Runtime chua cong diem cong/uu tien vao tong diem.',
    status: 'official-but-unparsed',
    sourceId: 'vnuump-admission-notice-2026',
    scoreAffecting: true,
    impact: 'Ket qua eligibility chi dua tren tong 3 mon THPT tho, chua cong diem uu tien khu vuc/doi tuong (neu co) cua thi sinh.',
  },
];
