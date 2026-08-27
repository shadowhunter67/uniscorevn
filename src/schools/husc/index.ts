import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huscAdmissionMethods } from './methods';

export const huscModule: SchoolModule = {
  id: 'husc',
  name: 'Trường Đại học Khoa học, Đại học Huế',
  shortName: 'HUSC',
  about: 'Trường đại học công lập thành viên Đại học Huế, đào tạo các ngành khoa học tự nhiên, khoa học xã hội, kỹ thuật và công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HUSC 2026 theo thi TN THPT cho 26 mã ngành Trường Đại học Khoa học (mã DHT) có ngưỡng 15,00/30: tổng thô 3 môn (không hệ số) + điểm cộng (tùy chọn) + điểm ưu tiên theo Bảng 1 của Đại học Huế (công thức giảm khi tổng ≥ 22,5) — công thức và bảng ưu tiên trích nguyên văn từ Thông tin tuyển sinh 2026 của Đại học Huế (PDF 77 trang), ngưỡng từ Phụ lục 1 Thông báo 42/TB-HĐTSĐH. Ngoài phạm vi: 3 chương trình vi mạch bán dẫn / Kiến trúc có điều kiện phụ, các phương thức khác (tuyển thẳng, học bạ, ĐGNL, kết hợp).',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(huscAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.husc.edu.vn/baiviet.php?name=intro',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học hệ chính quy năm 2026',
      url: 'https://tuyensinh.husc.edu.vn/thongbao.php?id=77',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
