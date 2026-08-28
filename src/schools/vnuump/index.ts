import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuumpAdmissionMethods } from './methods';

export const vnuumpModule: SchoolModule = {
  id: 'vnuump',
  name: 'Truong Dai hoc Y Duoc - Dai hoc Quoc gia Ha Noi',
  shortName: 'VNU-UMP',
  about: 'Public medicine and pharmacy school under Vietnam National University, Hanoi (VNU-UMP), based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'school',
  vnuhcm: false,
  summary:
    'Calculator exact cho phuong thuc thi TN THPT (96% chi tieu), theo tung nganh: Y khoa/Rang-Ham-Mat 22,0/30, Duoc hoc 20,0/30, Ky thuat xet nghiem/Ky thuat hinh anh/Dieu duong 19,0/30 - doc truc tiep Thong bao 2468/TB-DHYD (08/07/2026, PDF chinh thuc VNU-UMP, doc qua vision). Trang tuyen sinh chinh thuc xac nhan cong thuc CONG diem uu tien khu vuc/doi tuong theo Dieu 7 Quy che tuyen sinh cua Bo GD&DT vao tong truoc khi so nguong (khong tinh diem cong vao nguong). Muc diem uu tien KV/DT cu the dung chuan toan quoc (judgment call). Phuong thuc HSA, xet tuyen thang, du bi dan toc, va diem cong thanh tich chua duoc mo hinh hoa.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuumpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong tin tuyen sinh dai hoc chinh quy nam 2026 - VNU-UMP',
      url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
    {
      title: 'Thong bao 2468/TB-DHYD (08/07/2026): Ve nguong dam bao chat luong dau vao va quy doi tuong duong 2026',
      url: 'https://ump.vnu.edu.vn/article-thong-bao-ve-nguong-bao-dam-chat-luong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-19782-3490.html',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
