import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vnulawKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vnulaw-bonus-priority-formula-not-modeled',
    label:
      'VNU-Luat cong bo cong thuc diem uu tien khu vuc/doi tuong ap dung cho thi sinh dat tu 22,5/30: Diem uu tien = [(30 - Tong diem dat duoc)/7.5] x Muc diem uu tien (theo quy che chung cua Bo GDDT). Runtime chua tinh cong thuc nay.',
    status: 'official-but-unparsed',
    sourceId: 'vnulaw-admission-notice-2026',
    scoreAffecting: true,
    impact: 'Ket qua eligibility chi dua tren tong 3 mon THPT tho, chua cong diem uu tien khu vuc/doi tuong (neu co) cua thi sinh.',
  },
  {
    id: 'vnulaw-other-methods-not-modeled',
    label:
      'VNU-Luat con 3 phuong thuc khac: xet tuyen thang/uu tien theo quy che Bo GDDT (ma 301), xet ket qua thi Danh gia nang luc HSA cua DHQGHN (ma 401), va xet tuyen du bi dai hoc (ma 500); chi phuong thuc thi TN THPT (ma 100) duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'vnulaw-admission-notice-2026',
  },
  {
    id: 'vnulaw-certificate-combined-not-modeled',
    label:
      'Phuong thuc 100 cho phep quy doi chung chi tieng Anh quoc te (IELTS >=5.5, TOEFL iBT >=72) thay diem thi TN THPT mon Tieng Anh; runtime chi tinh tren diem thi THPT tho, chua ho tro quy doi chung chi.',
    status: 'official-but-unparsed',
    sourceId: 'vnulaw-admission-notice-2026',
  },
  {
    id: 'vnulaw-clc-selection-not-modeled',
    label:
      'Chuong trinh chat luong cao nganh Luat duoc chon sau nhap hoc tu chinh thi sinh trung tuyen nganh Luat chuan (khong phai 1 nganh xet tuyen doc lap); runtime hien chi coi 3 nganh (Luat, Luat Thuong mai quoc te, Luat Kinh doanh) la doc lap, chua mo hinh hoa buoc chon CLC.',
    status: 'incomplete',
    sourceId: 'vnulaw-admission-notice-2026',
  },
];
