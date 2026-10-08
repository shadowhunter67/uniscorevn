import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { napaAdmissionMethods } from './methods';

export const napaModule: SchoolModule = {
  id: 'napa',
  name: 'Học viện Hành chính và Quản trị công',
  shortName: 'NAPA',
  about:
    'Học viện Hành chính và Quản trị công (mã trường HCH), tuyển sinh tại Hà Nội, Đà Nẵng, TP.HCM và Đắk Lắk; kế thừa catalog NAPA cũ sau thay đổi tên gọi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'NAPA 2026: tinh nhanh phương thức xét kết quả thi tốt nghiệp THPT trong phạm vi tổ hợp gốc D01. Điểm trúng tuyển theo thông báo chính thức 10/8/2026 đã quy đổi về phương thức gốc, tổ hợp môn gốc D01, thang 30; áp dụng điểm ưu tiên KV/ĐT theo TT 06/2026. Chưa mô hình hóa quy đổi sang các tổ hợp khác D01.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(napaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm trúng tuyển đại học hình thức chính quy đợt 1 năm 2026',
      url: 'https://apaghcm.edu.vn/hoc-vien-hanh-chinh-va-quan-tri-cong-thong-bao-diem-chuan-dai-hoc-hinh-thuc-chinh-quy-va-thu-tuc-thoi-gian-xac-nhan-nhap-hoc-dot-1-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-09-26',
    },
  ],
};
