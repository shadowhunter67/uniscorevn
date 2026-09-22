import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { neuAdmissionMethods } from './methods';

export const neuModule: SchoolModule = {
  id: 'neu',
  name: 'Trường Đại học Kinh tế Quốc dân',
  shortName: 'NEU',
  about: 'Đại học công lập trọng điểm tại Hà Nội, đào tạo kinh tế, kinh doanh, quản lý, tài chính, luật và các ngành hướng dữ liệu.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'NEU 2026, PTXT5 (thi TN THPT thuần): Điểm xét tuyển = tổng thô 3 môn (A00/A01/D01/D07, hệ số 1) + điểm ưu tiên (công thức chính chủ, không judgment call), so với điểm chuẩn thật theo 42/88 mã ngành CHUẨN (Thông báo 1890/TB-ĐHKTQD, 09/8/2026). Loại chương trình tiên tiến/chất lượng cao/POHE/xét kết hợp riêng (EPxx). Thông báo 1613/TB-ĐHKTQD công bố thêm bảng quy đổi tương đương HSA/SAT/V-ACT/TSA — chưa mô hình hoá chi tiết trong khoảng.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(neuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo 1890/TB-ĐHKTQD: Điểm chuẩn trúng tuyển đại học chính quy năm 2026',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-trung-tuyen-dai-hoc-kinh-te-quoc-dan-2026-119260809120816394.htm',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};

