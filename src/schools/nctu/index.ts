import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { nctuAdmissionMethods } from './methods';

export const nctuModule: SchoolModule = {
  id: 'nctu',
  name: 'Truong Dai hoc Nam Can Tho',
  shortName: 'NCTU',
  about: 'Truong dai hoc tu thuc da nganh tai Can Tho, dao tao 48 nganh trinh do dai hoc chinh quy.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Da xac minh Thong bao nguong dam bao chat luong dau vao 2026 cua NCTU: nguong chung 15/30 (thi TN THPT) ap dung cho da so 48 nganh, mo hinh hoa duoc; nhom Suc khoe/Luat gate theo hoc luc lop 12 (chua co truong ho so tuong ung) va bang nguong theo hoc ba/V-SAT chua duoc nhap.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(nctuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong bao nguong dam bao chat luong dau vao (diem san) xet tuyen dai hoc chinh quy nam 2026',
      url: 'https://nctu.edu.vn/truong-dai-hoc-nam-can-tho-cong-bo-diem-san-xet-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
