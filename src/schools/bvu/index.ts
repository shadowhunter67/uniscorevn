import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { bvuAdmissionMethods } from './methods';

export const bvuModule: SchoolModule = {
  id: 'bvu',
  name: 'Truong Dai hoc Ba Ria - Vung Tau',
  shortName: 'BVU',
  about: 'Private multidisciplinary university headquartered in Ba Ria - Vung Tau.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức xét điểm thi TN THPT: đọc trực tiếp bài đăng chính thức BVU (10/08/2026, công bố điểm trúng tuyển) xác nhận ngưỡng theo 4 nhóm ngành (Dược học 20,0/30; Điều dưỡng 18,0/30; Luật 20,0/30; các ngành khác 15,0/30) và KHÔNG cộng điểm ưu tiên khu vực/đối tượng cho phương thức này. Phương thức học bạ vẫn partial (ngưỡng theo nhóm ngành đã cập nhật 18,0/20,0/18,0/20,0, nhưng chưa rõ có cộng điểm ưu tiên hay không do trang mô tả công thức cũ đã 404). Xét tuyển thẳng và các phương thức khác chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(bvuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Phuong thuc tuyen sinh - Thong tin tuyen sinh Truong Dai hoc Ba Ria - Vung Tau 2026',
      url: 'https://tuyensinh.bvu.edu.vn/phuong-thuc-tuyen-sinh/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Trường Đại học Bà Rịa - Vũng Tàu công bố điểm trúng tuyển đại học chính quy và xét tuyển bổ sung năm 2026',
      url: 'https://bvu.edu.vn/truong-dai-hoc-ba-ria-vung-tau-cong-bo-diem-trung-tuyen-dai-hoc-chinh-quy-va-xet-tuyen-bo-sung-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
