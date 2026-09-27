import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { mduAdmissionMethods } from './methods';

export const mduModule: SchoolModule = {
  id: 'mdu',
  name: 'Truong Dai hoc Cong nghe Mien Dong',
  shortName: 'MDU/MIT',
  about: 'Truong dai hoc tu thuc tai Dong Nai, legacy catalog id MDU, hien su dung thuong hieu MIT Uni.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'MDU/MIT 2026 (thi TN THPT): trang chinh chu MIT xac nhan to hop 3 mon phai co Toan hoac Van va tong diem tu 15/30. Bang diem chuan 2026 cross-check cho 19 dong THPT; module exact chi mo hinh hoa 17 nganh nguong 15/30, loai Duoc hoc (19) va Luat kinh te (18) vi co rui ro nguong/ dieu kien theo khoi suc khoe-phap luat. Nguon khong noi ro diem uu tien trong diem chuan, nen so tong tho va hien thi uu tien chi de tham khao.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(mduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Cong nghe Mien Dong cong bo cac phuong thuc xet tuyen nam 2026',
      url: 'https://mit.vn/cong-bo-cac-phuong-thuc-xet-tuyen-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
    {
      title: 'Diem chuan Truong Dai hoc Cong nghe Mien Dong 2026',
      url: 'https://dulieuphapluat.vn/cong-cu/diem-chuan-dai-hoc/dai-hoc-cong-nghe-mien-dong-mit.html',
      type: 'secondary',
      checkedAt: '2026-09-26',
    },
  ],
};
