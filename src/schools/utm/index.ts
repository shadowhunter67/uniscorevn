import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { utmAdmissionMethods } from './methods';

export const utmModule: SchoolModule = {
  id: 'utm',
  name: 'Trường Đại học Công nghệ và Quản lý hữu nghị',
  shortName: 'UTM',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo công nghệ và quản lý.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Nguồn tuyển sinh UTM 2026 (utm.edu.vn, đã index qua tìm kiếm, WebFetch trực tiếp bị chặn 403) xác nhận điểm sàn xét tuyển bằng kết quả thi TN THPT là 15/30 cho các ngành thường; ngành Luật/Luật kinh tế có ngưỡng riêng theo Bộ GD&ĐT, chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(utmAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Công nghệ và Quản lý Hữu Nghị công bố ngưỡng đảm bảo chất lượng đầu vào đại học chính quy năm 2026',
      url: 'https://utm.edu.vn/truong-dai-hoc-cong-nghe-va-quan-ly-huu-nghi-cong-bo-nguong-dam-bao-chat-luong-dau-vao-dai-hoc-chinh-quy-nam-2026-1132.html',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
