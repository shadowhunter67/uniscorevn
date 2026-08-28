import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vguKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vgu-program-threshold-table-not-imported',
    label: 'VGU cong bo diem san rieng theo tung nganh (17-22/30); da nhap tu bao chi (SGGP) vi ban cong bo chinh thuc (tuyensinh.vgu.edu.vn) chi hien anh bang diem, khong doc duoc van ban.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-floor-score-press-2026',
    scoreAffecting: true,
    knownData: [
      '22/30: Ky thuat co dien tu (Mechatronics Engineering)',
      '19/30: Quan tri kinh doanh, Tai chinh & Ke toan, Khoa hoc may tinh, Ky thuat co khi, Kinh te, Quan ly ky thuat so & Kinh doanh quoc te',
      '18,5/30: Ky thuat dien va May tinh',
      '18/30: Kien truc',
      '17/30: Ky thuat va Quan ly xay dung',
    ],
    impact: 'Runtime chi loai duoc ho so duoi 17/30 va xac nhan dat tren 22/30 (moi nganh); giua 17/30 va 22/30 can chon nganh de ket luan chinh xac.',
    attemptedSources: [
      '2026-08-28: WebFetch lai trang chinh thuc VGU (tuyensinh.vgu.edu.vn) — van chi co text tong hop "diem san dao dong 17-22 tuy nganh", bang so lieu tung nganh van chi la anh nhung, khong doc duoc text; khong tim thay ban cong bo moi hon 09/07/2026.',
    ],
  },
  {
    id: 'vgu-floor-includes-priority-points',
    label: 'VGU cong bo diem san "da bao gom diem uu tien va diem cong (neu co)" — khac voi cach cac truong khac cong bo diem san THPT thuan (chua cong diem uu tien). Bo tinh diem hien chi cong 3 mon THPT tho, chua cong diem uu tien/khu vuc, nen so sanh voi nguong VGU co the chua chinh xac tuyet doi cho thi sinh co diem uu tien.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-floor-score-press-2026',
    impact: 'Ket qua eligibility co the bi danh gia thap hon thuc te doi voi thi sinh co diem uu tien khu vuc/doi tuong.',
  },
  {
    id: 'vgu-english-score-condition-not-modeled',
    label: 'VGU yeu cau diem trung binh mon Tieng Anh 3 nam THPT >= 8,0/10 (hoac >=7,5 cho Ky thuat & Quan ly xay dung) ap dung cho phuong thuc 2 (hoc ba) va 5 (thi TN THPT); dieu kien nay chua duoc kiem tra trong bo tinh diem.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-admission-notice-2026',
  },
  {
    id: 'vgu-other-methods-not-modeled',
    label: 'VGU con 4 phuong thuc khac: TestAS (phuong thuc 1), hoc ba THPT (phuong thuc 2, GPA 7,3-8,45), chung chi THPT quoc te SAT/ACT/IB/A-Level/GED (phuong thuc 4: SAT>=1150, ACT>=23, IB>=28) va xet tuyen thang (phuong thuc 3); chi phuong thuc 5 (thi TN THPT) duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'vgu-admission-notice-2026',
  },
];
