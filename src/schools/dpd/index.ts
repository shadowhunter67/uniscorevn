import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dpdAdmissionMethods } from './methods';

export const dpdModule: SchoolModule = {
  id: 'dpd',
  name: 'Trường Đại học Phương Đông',
  shortName: 'DPD',
  about: 'Trường đại học tư thục thành lập 1994 tại Hà Nội, một trong những trường đại học dân lập đầu tiên của Việt Nam, thương hiệu hiện tại UPD, đào tạo 6 khoa với ~39 chương trình.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'DPD 2026 (thi TN THPT, mã 100/405): Điểm xét tuyển = tổng thô 3 môn (không nhân hệ số) + điểm ưu tiên, so với điểm chuẩn thật theo 14/39 chương trình đào tạo (15,0-17,0/30), nguồn giaoduc.net.vn đăng lại thông báo + infographic chính chủ (10/8/2026). Chưa có mã ngành công khai — dùng slug tên chương trình. Phương thức học bạ/ĐGNL/ĐGTD và 25/39 chương trình còn lại chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: true,
    ...aggregateSchoolCapabilities(dpdAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường ĐH Phương Đông thông báo điểm chuẩn năm 2026',
      url: 'https://giaoduc.net.vn/truong-dh-phuong-dong-thong-bao-diem-chuan-nam-2026-post262001.gd',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
