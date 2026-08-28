import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pntuAdmissionMethods } from './methods';

export const pntuModule: SchoolModule = {
  id: 'pntu',
  name: 'Trường Đại học Y khoa Phạm Ngọc Thạch',
  shortName: 'PNTU',
  about: 'Trường đại học công lập tại TP.HCM, đào tạo khối ngành sức khoẻ (Y, Răng-Hàm-Mặt, Điều dưỡng, Tâm lý học, ...).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hcm',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức xét kết quả thi TN THPT (mã 100), toàn bộ 14 ngành: ngưỡng đảm bảo chất lượng đầu vào 2026 (10/07/2026, khu vực 3, dải 15,5-22,5/30) đối chiếu chéo ĐỘC LẬP 2 nguồn báo chí (VnExpress + Giáo dục & Thời đại, khớp tuyệt đối), cộng điểm ưu tiên khu vực/đối tượng theo đúng công thức giảm dần trích nguyên văn từ Quyết định 671/QĐ-TĐHYKPNT (mục 5.2, mục 6 xác nhận điểm ưu tiên CỘNG vào tổng trước khi so ngưỡng). Trường xác nhận KHÔNG áp dụng điểm cộng/điểm thưởng năm 2026. Phương thức xét tuyển thẳng (mã 301) ngoài phạm vi.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pntuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định 671/QĐ-TĐHYKPNT: Thông tin tuyển sinh đại học năm 2026',
      url: 'https://pnt.edu.vn/Resources/Docs/SubDomain/pqldt/Tuyen%20sinh%20Dai%20hoc/TS2026/QD_BanHanh_ThongTin_TuyenSinh_DHCQ_TS2026(Full)-PDFs.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
    {
      title: 'Thông báo ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học chính quy năm 2026',
      url: 'https://pqldt.pnt.edu.vn/vi/tuyen-sinh-dai-hoc',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
