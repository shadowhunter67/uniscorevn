import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuulisAdmissionMethods } from './methods';

export const vnuulisModule: SchoolModule = {
  id: 'vnuulis',
  name: 'Truong Dai hoc Ngoai ngu - Dai hoc Quoc gia Ha Noi',
  shortName: 'VNU-ULIS',
  about: 'Public member school of Vietnam National University, Hanoi, specializing in foreign languages and international studies.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Official 2026 VNU-ULIS sources give a real conversion rule (foreign-language subject coefficient 2, /40 to /30 rescale) and published thresholds (19/30 regular, 15/30 international-partnership exam-route, 18/30 international-partnership transcript-route). Runtime support checks the THPT exam-route and international-partnership transcript-route thresholds for English-language combinations only; HSA-route and certificate-combined eligibility are not executable yet, and non-English language combinations are not modeled by the shared subject taxonomy.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    partialCalculator: true,
    ...aggregateSchoolCapabilities(vnuulisAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Official 2026 undergraduate admission announcement',
      url: 'https://ulis.vnu.edu.vn/tbtsdh26/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Official 2026 quality-assurance input threshold notice',
      url: 'https://ulis.vnu.edu.vn/thong-bao-ve-nguong-dam-bao-chat-luong-dau-vao-tuyen-sinh-cac-nganh-dao-tao-dai-hoc-truong-dai-hoc-ngoai-ngu-dhqghn-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
