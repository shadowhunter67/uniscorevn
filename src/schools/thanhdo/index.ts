import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { thanhdoAdmissionMethods } from './methods';

export const thanhdoModule: SchoolModule = {
  id: 'thanhdo',
  name: 'Truong Dai hoc Thanh Do',
  shortName: 'ThanhDo',
  about: 'Private multidisciplinary university based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức thi TN THPT: trang chính thức thanhdo.edu.vn xác nhận công thức điểm trúng tuyển (tổng 3 môn, không nhân hệ số, không tính điểm cộng) và bảng ngưỡng đầy đủ theo 14/14 ngành (6 mức: 16,0/16,5/17,0/17,5/18,0/20,0). Điểm ưu tiên KV/ĐT dùng mức chuẩn toàn quốc (judgment call — nguồn chỉ loại trừ điểm cộng, im lặng về điểm ưu tiên). Cần chọn đúng nhóm ngành/tổ hợp môn; phương thức học bạ và thi đánh giá năng lực/tư duy chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(thanhdoAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Truong Dai hoc Thanh Do chinh thuc cong bo diem chuan trung tuyen dai hoc chinh quy nam 2026',
      url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-chinh-thuc-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
