import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const uahKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'uah-program-threshold-table-not-imported',
    label: 'UAH 2026 cong bo nguong theo tung nganh cu the (Thong bao 975/TB-HDTS); da nhap tu bao chi (Tuoi Tre), chua doi chieu truc tiep voi ban PDF chinh thuc tren uah.edu.vn.',
    status: 'official-but-unparsed',
    sourceId: 'uah-floor-score-press-2026',
    scoreAffecting: true,
    knownData: [
      '21/30: thiet ke cong nghiep, thiet ke do hoa, thiet ke thoi trang (chuong trinh chuan va dinh huong quoc te)',
      '20/30: kien truc, thiet ke noi that (co so TPHCM, Can Tho, Da Lat, va chuong trinh dinh huong quoc te)',
      '18/30: quy hoach vung va do thi, kien truc canh quan, my thuat do thi',
      '17/30: ky thuat xay dung, quan ly xay dung',
      '16/30: ky thuat co so ha tang',
      '15/30: thiet ke do thi (chuong trinh tien tien, yeu cau tieng Anh)',
    ],
    impact: 'Runtime chi loai duoc ho so duoi 15/30 (chac chan khong dat) va xac nhan tren 21/30 (dat moi nganh); tu 15/30 den 21/30 can chon nganh de ket luan chinh xac.',
  },
  {
    id: 'uah-official-pdf-not-fetched',
    label: 'Trang uah.edu.vn xac nhan ton tai Thong bao 975/TB-HDTS (08/07/2026) va tai lieu quy tac quy doi tuong duong, nhung noi dung PDF khong doc duoc truc tiep qua fetch; so lieu duoc doi chieu qua bao Tuoi Tre.',
    status: 'official-but-unparsed',
    sourceId: 'uah-official-notice-2026',
    impact: 'So lieu da duoc doi chieu qua 1 nguon bao chi nha nuoc nhung chua xac minh truc tiep tu ban PDF goc.',
  },
  {
    id: 'uah-ability-assessment-not-modeled',
    label: 'UAH con xet tuyen theo ket qua ky thi danh gia nang luc DHQG TPHCM va cac phuong thuc khac; chi phuong thuc thi TN THPT duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'uah-official-notice-2026',
  },
];
