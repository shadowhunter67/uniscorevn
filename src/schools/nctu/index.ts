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
    'Tinh chinh xac diem xet tuyen NCTU 2026 theo thi TN THPT cho nhom nganh ngoai Suc khoe/Luat (nguong 15/30, khong he so mon, cong diem uu tien theo Dieu 7 — bai huong dan tu dang tren tuyensinh.nctu.edu.vn). Nhom Suc khoe/Luat gate theo hoc luc lop 12 (chua co truong ho so tuong ung) va bang nguong theo hoc ba/V-SAT van chi o muc kiem tra nguong.',
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
    {
      title: 'Đối tượng ưu tiên, điểm ưu tiên theo quy chế tuyển sinh đại học năm 2026',
      url: 'https://tuyensinh.nctu.edu.vn/news/2026/doi-tuong-uu-tien-diem-uu-tien-theo-quy-che-tuyen-sinh-dai-hoc-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
