import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hubtAdmissionMethods } from './methods';

export const hubtModule: SchoolModule = {
  id: 'hubt',
  name: 'Trường Đại học Kinh doanh và Công nghệ Hà Nội',
  shortName: 'HUBT',
  about: 'Trường đại học tư thục đa ngành tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh trang tuyển sinh chính thức HUBT 2026 (hubt.edu.vn/tuyen-sinh): công thức "ĐXT = Tổng điểm 3 môn tổ hợp + Điểm ưu tiên + Điểm cộng" (trích nguyên văn), ngưỡng 15,0/30 cho ngành đại trà. Có nhánh exact cho ngành đại trà (trừ nhóm sức khoẻ), scope không điểm cộng, điểm ưu tiên judgment call Điều 7 TT 06/2026. Nhóm ngành sức khoẻ (Y khoa/Dược/RHM/Điều dưỡng) có ngưỡng kép học lực + điểm cao hơn, chưa mô hình hoá; các phương thức khác (học bạ, TSA/HSA, năng khiếu), bảng điểm cộng và bảng mã ngành/tổ hợp cũng chưa được nhập.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hubtAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Tuyển sinh - Trường Đại học Kinh doanh và Công nghệ Hà Nội',
      url: 'https://hubt.edu.vn/tuyen-sinh',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
