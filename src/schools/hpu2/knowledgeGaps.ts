import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const hpu2KnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'hpu2-program-threshold-table-not-imported',
    label: 'HPU2 2026 phan biet nguong theo nhom nganh su pham va ngoai su pham; chua chon duoc nganh cu the de ap dung dung muc.',
    status: 'official-but-unparsed',
    sourceId: 'hpu2-admission-info-2026',
    scoreAffecting: true,
    knownData: [
      'Nganh dao tao giao vien (Toan, Ly, Hoa, Sinh, Van, Su, GDCD, Tieng Anh, Khoa hoc tu nhien, Giao duc tieu hoc, GD Quoc phong An ninh...): >= 18,0/30 (thi TN THPT) hoac hoc luc lop 12 >= 8,5/10',
      'Cac nganh khac (Ngon ngu Anh, Ngon ngu Trung, Tam ly giao duc, Viet Nam hoc, Cong nghe sinh hoc, Khoa hoc vat lieu, Cong nghe ky thuat hoa hoc, CNTT, Toan ung dung): >= 15,0/30',
      'Giao duc the chat: to hop 2 mon (khong tinh nang khieu) >= 11,0/30 hoac >= 6,5/10, hoc luc xep loai kha tro len',
      'Giao duc mam non: to hop 2 mon (khong tinh nang khieu) >= 12,0/30',
      'Quan ly the thao: >= 10,0/30 (khong tinh nang khieu)',
    ],
    impact: 'Runtime chi loai duoc ho so duoi 15/30 (chac chan khong dat cac nganh 3-mon chuan) va xac nhan dat tren 18/30 (dat moi nhom); giua 15/30 va 18/30 can chon nhom nganh de ket luan chinh xac. Giao duc the chat/mam non/Quan ly the thao dung to hop 2-mon rieng, khong duoc mo hinh boi bo tinh 3-mon nay.',
  },
  {
    id: 'hpu2-other-methods-not-modeled',
    label: 'HPU2 con xet tuyen thang/uu tien, hoc ba (mot so nganh), danh gia nang luc SP2E (truong tu to chuc) hoac H-SCA (DH Su pham TPHCM), va ket hop thi nang khieu; chi phuong thuc thi TN THPT 3-mon duoc mo hinh hoa.',
    status: 'official-but-unparsed',
    sourceId: 'hpu2-admission-info-2026',
  },
  {
    id: 'hpu2-bonus-priority-not-modeled',
    label: 'Diem uu tien toi da 10% thang diem, va thu tu uu tien khi xet tuyen (diem uu tien thap hon, nguyen vong cao hon, diem mon cot loi cao hon) duoc cong bo nhung chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'hpu2-admission-info-2026',
  },
];
