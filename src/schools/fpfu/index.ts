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
    'Calculator exact cho hệ dân sự (4 tổ hợp A00/A01/D07/D01): ngưỡng đảm bảo chất lượng đầu vào 15,00/30 điểm (thi TN THPT) + công thức Điểm xét tuyển = Môn1+Môn2+Môn3+điểm ưu tiên (Điều 7 Thông tư 06/2026/TT-BGDĐT), xác nhận qua 2 báo nhà nước độc lập (Dân Trí, VietNamNet) và 2 lượt tra cứu độc lập trang tuyển sinh chính thức. Trang gốc daihocpccc.bocongan.gov.vn không truy cập trực tiếp được (DNS bị chặn trong môi trường research). Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call). Điều kiện sức khỏe/lý lịch đặc thù ngành Công an chưa mô hình hoá.',
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
