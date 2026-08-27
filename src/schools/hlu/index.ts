import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hluAdmissionMethods } from './methods';

export const hluModule: SchoolModule = {
  id: 'hlu',
  name: 'Trường Đại học Luật Hà Nội',
  shortName: 'HLU',
  about: 'Trường đại học công lập tại Hà Nội, chuyên đào tạo các ngành thuộc lĩnh vực pháp luật.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính chính xác Điểm xét tuyển HLU 2026 (phương thức thi TN THPT, lĩnh vực pháp luật) cho tổ hợp D01/A00/A01/C00: ĐXT (quy về tổ hợp gốc D01) = min(30, tổng thô 3 môn − độ chênh tổ hợp + điểm ưu tiên); độ chênh tổ hợp (A00 +1,48 / A01 +0,26 / C00 0) trích Thông báo 1029, điểm ưu tiên trích nguyên văn Điều 7 Quy chế HLU (QĐ 633), ngưỡng ĐBCL 20,0/30 (KV3) trích Thông báo 1010 · Đối chiếu điểm trúng tuyển 2026 theo mã ngành (Luật 24,12 · Luật KT 25,95 · Luật TMQT 24,22 · Ngôn ngữ Anh 23,09 · Luật Đắk Lắk 20,00) · Ngoài phạm vi: tổ hợp ngoại ngữ D02-D06 và phương thức học bạ.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Cổng tuyển sinh đại học chính quy năm 2026 (Khóa 51)',
      url: 'https://tuyensinh.hlu.edu.vn/tsnews/details/30532',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo 1010/TB-ĐHLHN về ngưỡng bảo đảm chất lượng đầu vào 2026 (Khóa 51)',
      url: 'https://tuyensinh.hlu.edu.vn/Images/Post/files/TB1010_B%C4%90CL%C4%90V_K51_2026.pdf',
      type: 'official-document',
      checkedAt: '2026-08-24',
    },
  ],
};
