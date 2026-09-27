import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { napaAdmissionMethods } from './methods';

export const napaModule: SchoolModule = {
  id: 'napa',
  name: 'Hoc vien Hanh chinh va Quan tri cong',
  shortName: 'NAPA',
  about:
    'Hoc vien Hanh chinh va Quan tri cong (ma truong HCH), tuyen sinh tai Ha Noi, Da Nang, TP.HCM va Dak Lak; ke thua catalog NAPA cu sau thay doi ten goi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'NAPA 2026: tinh nhanh phuong thuc xet ket qua thi tot nghiep THPT trong pham vi to hop goc D01. Diem trung tuyen theo thong bao chinh thuc 10/8/2026 da quy doi ve phuong thuc goc, to hop mon goc D01, thang 30; ap dung diem uu tien KV/DT theo TT 06/2026. Chua mo hinh hoa quy doi sang cac to hop khac D01.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(napaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thong bao diem trung tuyen dai hoc hinh thuc chinh quy dot 1 nam 2026',
      url: 'https://apaghcm.edu.vn/hoc-vien-hanh-chinh-va-quan-tri-cong-thong-bao-diem-chuan-dai-hoc-hinh-thuc-chinh-quy-va-thu-tuc-thoi-gian-xac-nhan-nhap-hoc-dot-1-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
  ],
};
