import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { phenikaaAdmissionMethods } from './methods';

export const phenikaaModule: SchoolModule = {
  id: 'phenikaa',
  name: 'Trường Đại học Phenikaa',
  shortName: 'Phenikaa',
  about: 'Trường đại học tư thục đa ngành tại Hà Nội, thuộc Tập đoàn Phenikaa, đầu tư mạnh cho các CTĐT tài năng công nghệ.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Phenikaa 2026 (phương thức xét kết quả thi TN THPT): thông báo chính thức phenikaa-uni.edu.vn (đọc trực tiếp qua curl 2026-08-29, bảng ngưỡng dạng ảnh đọc bằng vision) công bố Điểm xét = tổng thô 3 môn, KHÔNG nhân hệ số, KHÔNG điểm cộng, theo 7 nhóm lĩnh vực/ngành cụ thể: 2 CTĐT tài năng (Khoa học máy tính, Khoa học và công nghệ bán dẫn) 24/30 (loại trừ tuyệt đối điểm ưu tiên); Pháp luật 20/30; Sức khỏe Y khoa/Răng Hàm Mặt 22/30; Sức khỏe Y học cổ truyền/Dược 20/30; Sức khỏe Điều dưỡng/Hộ sinh/Kỹ thuật y học 18/30; các ngành/CTĐT khác 15/30. Điểm ưu tiên cho các ngành ngoài 2 CTĐT tài năng dùng judgment call chuẩn quốc gia (nguồn im lặng). Các phương thức khác (học bạ THPT, ĐGTD/TSA, ĐGNL/HSA, kỳ thi SPT, V-SAT) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(phenikaaAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Đại học Phenikaa công bố ngưỡng điểm nhận hồ sơ xét tuyển đại học hệ chính quy đợt 1 năm 2026',
      url: 'https://phenikaa-uni.edu.vn/vi/post/tuyen-sinh/tin-tuyen-sinh/dai-hoc-phenikaa-cong-bo-nguong-diem-nhan-ho-so-xet-tuyen-dai-hoc-he-chinh-quy-dot-1-nam-2026',
      type: 'official-institution',
      checkedAt: '2026-08-29',
    },
  ],
};
