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
    'Tinh chinh xac Diem xet tuyen NTU-HN 2026 (phuong thuc thi TN THPT): DXT = round2(tong tho 3 mon + diem uu tien KV/DT theo Dieu 7 TT 06/2026) — nguong 15/30 dong nhat ca 11 nganh, trich nguyen van Thong bao diem san chinh thuc 29/06/2026 (PDF Google Drive, doc bang OCR). Cong thuc tong tho + uu tien la judgment call vi thong bao khong in cong thuc tuong minh. Phuong thuc hoc ba (18/30) va cac phuong thuc ket hop diem nang khieu chua duoc mo hinh hoa.',
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
