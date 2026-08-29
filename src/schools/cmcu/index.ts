import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { cmcuAdmissionMethods } from './methods';

export const cmcuModule: SchoolModule = {
  id: 'cmcu',
  name: 'Trường Đại học CMC',
  shortName: 'CMCU',
  about: 'Trường đại học tư thục tại Hà Nội, thuộc Tập đoàn Công nghệ CMC, đào tạo chuyên sâu công nghệ thông tin/AI.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'CMCU 2026 (phương thức xét kết quả thi TN THPT): thông báo chính thức cmcu.edu.vn (đọc trực tiếp qua curl 2026-08-30, bảng ngưỡng dạng ảnh WEBP, đọc bằng vision) công bố Điểm sàn nhận hồ sơ = môn chính (nhân hệ số 2) + 2 môn bất kỳ, thang 40, theo 9 lĩnh vực/ngành cụ thể: Điện tử-Viễn thông/Trí tuệ Nhân tạo/An ninh mạng = 22/40; Khoa học Máy tính/CNTT/Kỹ thuật Phần mềm/Logistics/Truyền thông Đa phương tiện = 21/40; các ngành còn lại = 20/40. Điểm ưu tiên dùng judgment call chuẩn quốc gia (nguồn im lặng), quy đổi ×4/3 sang thang 40. Các phương thức khác (học bạ THPT, kỳ thi ĐGNL CMC-TEST, xét tuyển thẳng) chưa chuẩn hoá vào runtime.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(cmcuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm sàn nộp hồ sơ xét tuyển Trường Đại học CMC và quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026',
      url: 'https://cmcu.edu.vn/thong-bao-diem-san-nop-ho-so-xet-tuyen-truong-dai-hoc-cmc-va-quy-doi-diem-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-30',
    },
  ],
};
