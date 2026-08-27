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
    'Tính đủ Điểm xét tuyển (exact) cho phương thức xét điểm thi TN THPT với tổ hợp có tiếng Anh hệ số 2: quy đổi tổng /40 về /30, cộng điểm ưu tiên KV/ĐT (KV1 0,75... UT1 2,0..., trần 3,0) và công thức giảm khi ≥ 22,5 — đều trích nguyên văn từ thông báo tuyển sinh chính thức; phương thức này không có điểm khuyến khích/thưởng. Ngưỡng đảm bảo chất lượng: 19/30 chương trình chuẩn, 15/30 chương trình liên kết quốc tế. Các nhánh còn lại vẫn partial: tổ hợp ngoại ngữ khác tiếng Anh (taxonomy chưa model), route HSA, route kết hợp chứng chỉ, route học bạ liên kết quốc tế.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
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
