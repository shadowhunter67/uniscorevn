import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hanuAdmissionMethods } from './methods';

export const hanuModule: SchoolModule = {
  id: 'hanu',
  name: 'Trường Đại học Hà Nội',
  shortName: 'HANU',
  about: 'Trường đại học công lập trọng điểm đào tạo ngoại ngữ và các chuyên ngành giảng dạy bằng ngoại ngữ, 30 chương trình đào tạo chính quy.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'HANU 2026, thi TN THPT: Điểm xét tuyển = (Toán hoặc Văn ×2 + Ngoại ngữ ×2 + môn còn lại ×1) quy đổi thang 40 + điểm ưu tiên, so với điểm chuẩn thật theo 29/30 mã ngành (22,00-34,45/40), nguồn trang thông tin tuyển sinh chính chủ (công thức) + Quyết định 3222/QĐ-ĐHHN (điểm chuẩn), cùng năm 2026. Chỉ hỗ trợ tổ hợp dùng tiếng Anh làm Ngoại ngữ (taxonomy chưa có Nga/Pháp/Trung/Đức/Nhật/Hàn). Xét tuyển kết hợp chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(hanuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học hình thức chính quy năm 2026',
      url: 'https://hanu.vn/a/254611/Thong-tin-tuyen-sinh-dai-hoc-hinh-thuc-chinh-quy-nam-2026?c=6909',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Điểm trúng tuyển đại học hình thức chính quy năm 2026',
      url: 'https://hanu.vn/a/292793/Diem-trung-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026?c=6910',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
