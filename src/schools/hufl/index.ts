import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { huflAdmissionMethods } from './methods';

export const huflModule: SchoolModule = {
  id: 'hufl',
  name: 'Trường Đại học Ngoại ngữ, Đại học Huế',
  shortName: 'HUFL',
  about: 'Trường thành viên Đại học Huế (thương hiệu HUFLIS), đào tạo 13 ngành: sư phạm ngoại ngữ Anh/Pháp/Trung, ngôn ngữ Anh/Nga/Pháp/Trung/Nhật/Hàn, Việt Nam học, Quốc tế học, Hoa Kỳ học, Truyền thông quốc tế.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HUFL 2026 (thi TN THPT, Phương thức 1): Điểm xét tuyển = tổng thô 3 môn (không nhân hệ số) + điểm ưu tiên, so với điểm chuẩn thật theo 13/13 ngành (15,0-27,77/30), nguồn tuyensinh.huflis.edu.vn (đề án + infographic điểm chuẩn đợt 1, 9/8/2026). Chỉ hỗ trợ tổ hợp dùng môn đã có trong hệ thống (D01/D14/D15/C00/X78) — nhiều tổ hợp dùng ngoại ngữ Pháp/Trung/Nhật/Nga/Hàn làm môn thi chưa mô hình hoá được. Điểm cộng thành tích chưa tính (app chưa thu thập input này). Phương thức học bạ/xét thẳng/kết hợp chứng chỉ chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(huflAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'TRƯỜNG ĐẠI HỌC NGOẠI NGỮ, ĐẠI HỌC HUẾ CÔNG BỐ ĐIỂM CHUẨN ĐẠI HỌC CHÍNH QUY 2026 (ĐỢT 1)',
      url: 'https://tuyensinh.huflis.edu.vn/tin-tuc/truong-dai-hoc-ngoai-ngu-dai-hoc-hue-cong-bo-diem-chuan-dai-hoc-chinh-quy-2026-dot-1_20260809093857',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
