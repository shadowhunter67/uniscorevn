import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { fpfuAdmissionMethods } from './methods';

export const fpfuModule: SchoolModule = {
  id: 'fpfu',
  name: 'Trường Đại học Phòng cháy Chữa cháy',
  shortName: 'FPFU',
  about: 'Trường đại học công lập thuộc Bộ Công an tại Hà Nội, tuyển sinh hệ dân sự (ngoài ngành Công an) ngành Phòng cháy chữa cháy và Cứu nạn cứu hộ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Đã xác minh (qua 2 báo nhà nước độc lập, Dân Trí và VietNamNet) ngưỡng đảm bảo chất lượng đầu vào hệ dân sự FPFU 2026 là 15,00/30 điểm thi TN THPT, 4 tổ hợp A00/A01/D07/D01, chỉ tiêu 250. Trang gốc daihocpccc.bocongan.gov.vn không truy cập trực tiếp được trong lượt research này. Module chỉ kiểm tra ngưỡng điểm; điều kiện sức khỏe/lý lịch đặc thù ngành Công an chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(fpfuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh năm 2026 đại học ngoài ngành Công an (hệ dân sự) - Trường Đại học Phòng cháy Chữa cháy',
      url: 'https://daihocpccc.bocongan.gov.vn/?p=210262',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Một trường Công an lấy 15 điểm hệ dân sự, tuyển 250 chỉ tiêu (báo Dân Trí)',
      url: 'https://dantri.com.vn/giao-duc/mot-truong-cong-an-lay-15-diem-he-dan-su-tuyen-250-chi-tieu-20260811130931364.htm',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
  ],
};
