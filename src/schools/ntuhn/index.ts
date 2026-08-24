import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ntuhnAdmissionMethods } from './methods';

export const ntuhnModule: SchoolModule = {
  id: 'ntuhn',
  name: 'Truong Dai hoc Nguyen Trai',
  shortName: 'NTU-HN',
  about: 'Truong dai hoc tu thuc tai Ha Noi, dao tao 11 nganh trinh do dai hoc chinh quy.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Da xac minh diem trung tuyen dot 1 nam 2026 cua NTU-HN qua bao chi nha nuoc (Bao Dau tu): nguong dong nhat 15/30 (thi TN THPT) cho ca 11 nganh, khong phan biet nganh. Phuong thuc hoc ba (18/30) va cac phuong thuc ket hop diem nang khieu chua duoc mo hinh hoa.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ntuhnAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Diem chuan He dai hoc Chinh quy Truong Dai hoc Nguyen Trai 2026',
      url: 'https://daihocnguyentrai.edu.vn/diem-chuan-he-dai-hoc-chinh-quy-truong-dai-hoc-nguyen-trai-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Dai hoc Nguyen Trai cong bo diem chuan 2026: Xet diem thi tu 15, hoc ba tu 18 diem (Bao Dau tu)',
      url: 'https://baodautu.vn/dai-hoc-nguyen-trai-cong-bo-diem-chuan-2026-xet-diem-thi-tu-15-hoc-ba-tu-18-diem-d668518.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
