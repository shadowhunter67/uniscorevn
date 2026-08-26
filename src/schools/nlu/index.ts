import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { nluAdmissionMethods } from './methods';

export const nluModule: SchoolModule = {
  id: 'nlu',
  name: 'Trường Đại học Nông Lâm TP.HCM',
  shortName: 'NLU',
  about: 'Trường đại học công lập tại TP.HCM, đào tạo khối ngành nông lâm nghiệp, kỹ thuật, công nghệ và kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Đã xác minh ngưỡng đảm bảo chất lượng đầu vào 2026 của NLU qua báo chí nhà nước (Báo Tuổi Trẻ, 27/06/2026): thi TN THPT dao động 16-18/30 tuỳ ngành (đa số 16, ngành cạnh tranh cao — Ngôn ngữ Anh, CNTT, Hóa học, Thực phẩm, Thú y — 18). Giáo dục mầm non/Sư phạm kỹ thuật nông nghiệp loại trừ. Học bạ (18-20/30) và ĐGNL ĐHQG-HCM (601-650) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(nluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm sàn tuyển sinh Trường Đại học Nông Lâm TPHCM 2026 (Cổng thông tin Chính phủ)',
      url: 'https://xaydungchinhsach.chinhphu.vn/tuyen-sinh-2026-diem-san-truong-dai-hoc-nong-lam-tphcm-119260701215344015.htm',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
    {
      title: 'Trường đại học công lập đầu tiên tại TP.HCM công bố điểm sàn xét tuyển, nhiều ngành từ 16 điểm (Báo Tuổi Trẻ)',
      url: 'https://tuoitre.vn/truong-dai-hoc-cong-lap-dau-tien-tai-tphcm-cong-bo-diem-san-xet-tuyen-nhieu-nganh-tu-16-diem-100260627073516811.htm',
      type: 'official-institution',
      checkedAt: '2026-08-26',
    },
  ],
};
