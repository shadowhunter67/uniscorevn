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
    'Tính chính xác Điểm xét tuyển NLU 2026 (thi TN THPT) theo 53 mã xét tuyển: ĐXT = round2(tổng thô 3 môn + điểm ưu tiên KV/ĐT theo Điều 7 TT 06/2026); đủ điều kiện xét tuyển khi tổng thô ≥ ngưỡng theo mã ngành (đa số 16/30, nhóm cạnh tranh cao — Ngôn ngữ Anh, CNTT, CNKT Hóa học, Công nghệ thực phẩm, Thú y — 18/30) — bảng ngưỡng đọc trực tiếp từ ảnh gốc trên ts.hcmuaf.edu.vn (qua chrome-devtools). Giáo dục mầm non/Sư phạm kỹ thuật nông nghiệp (ngưỡng riêng Bộ GD&ĐT) và phương thức học bạ/ĐGNL chưa mô hình hoá.',
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
