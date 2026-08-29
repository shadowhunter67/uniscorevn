import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { aofAdmissionMethods } from './methods';

export const aofModule: SchoolModule = {
  id: 'aof',
  name: 'Học viện Tài chính',
  shortName: 'AOF',
  about: 'Học viện công lập trực thuộc Bộ Tài chính, đào tạo khối ngành tài chính - kế toán - kinh tế tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'AOF 2026 (phương thức 3 - thi TN THPT) ngưỡng đảm bảo chất lượng đầu vào công bố theo cơ sở/loại chương trình (thang 30, đọc từ PDF chính thức "Thông tin tuyển sinh đại học năm 2026" hvtc.edu.vn, curl 2026-08-29): Phân hiệu TP.HCM và Hưng Yên >= 16; chương trình LKT với ĐH Toulon (Hà Nội) >= 17; chương trình chuẩn/LKT DDP (Hà Nội) >= 19; chương trình chất lượng cao chứng chỉ quốc tế (Hà Nội) >= 20. Bảng ánh xạ từng mã ngành cụ thể -> nhóm cơ sở/loại chương trình chưa trích xuất đầy đủ, nên chỉ mô hình hoá được dạng dải ngưỡng (eligibility-only, không có exact calculator). Riêng ngành Luật/Luật kinh doanh có thêm điều kiện Toán >= 6, chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(aofAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học năm 2026 (Quyết định số 695/QĐ-HVTC ngày 29/05/2026)',
      url: 'https://hvtc.edu.vn/Uploads/files/T6-2026/3_TTTS%20DHCQ%20NAM%202026%20-%20BAN%20CAP%20NHAT.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
