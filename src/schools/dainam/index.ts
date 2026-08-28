import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dainamAdmissionMethods } from './methods';

export const dainamModule: SchoolModule = {
  id: 'dainam',
  name: 'Trường Đại học Đại Nam',
  shortName: 'DNU-HN',
  about: 'Trường đại học tư thục đa ngành tại Hà Nội.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức thi TN THPT (ngành ngoài lĩnh vực Sức khoẻ/Pháp luật): thông báo chính thức tuyensinh.dainam.edu.vn "công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026" (đọc trực tiếp qua curl 2026-08-28) xác nhận TRỰC TIẾP ngưỡng 15,0/30 (không nhân hệ số, KHÔNG bao gồm điểm cộng, điểm ưu tiên khu vực/đối tượng). Nhóm ngành Luật/Luật kinh tế (>=18,00 hoặc điểm xét tốt nghiệp THPT >=8,50 + học lực Giỏi), Y khoa/Dược học (>=20,00 hoặc >=8,50 + học lực Giỏi), Điều dưỡng (>=16,50 hoặc >=6,50 + học lực Khá) có ngưỡng riêng theo học lực/điểm xét tốt nghiệp THPT, chưa mô hình hoá; các phương thức khác (học bạ, HSA, xét tuyển thẳng) và bảng mã ngành/tổ hợp cũng chưa được nhập.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dainamAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Đại Nam công bố ngưỡng đảm bảo chất lượng đầu vào hệ đại học chính quy năm 2026',
      url: 'https://tuyensinh.dainam.edu.vn/vi/tin-tuc/truong-dai-hoc-dai-nam-cong-bo-nguong-dam-bao-chat-luong-dau-vao-he-dai-hoc-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
    {
      title: 'Thông tin tuyển sinh đại học hệ chính quy năm 2026 - Trường Đại học Đại Nam',
      url: 'https://dainam.edu.vn/vi/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-he-chinh-quy-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
