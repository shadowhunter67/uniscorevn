import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { vnuumpAdmissionMethods } from './methods';

export const vnuumpModule: SchoolModule = {
  id: 'vnuump',
  name: 'Trường Đại học Y Dược - Đại học Quốc gia Hà Nội',
  shortName: 'VNU-UMP',
  about: 'Public medicine and pharmacy school under Vietnam National University, Hanoi (VNU-UMP), based in Hanoi.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  entityLevel: 'school',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức thi TN THPT (96% chỉ tiêu), theo từng ngành: Y khoa/Răng-Hàm-Mặt 22,0/30, Dược học 20,0/30, Kỹ thuật xét nghiệm/Kỹ thuật hình ảnh/Điều dưỡng 19,0/30 - doc truc tiep Thông báo 2468/TB-DHYD (08/07/2026, PDF chính thức VNU-UMP, đọc qua vision). Trang tuyen sinh chính thức xác nhận công thức CONG điểm ưu tiên khu vực/đối tượng theo Điều 7 Quy chế tuyen sinh của Bộ GD&ĐT vao tổng truoc khi so ngưỡng (không tính điểm cộng vao ngưỡng). Mức điểm ưu tiên KV/ĐT cụ thể dung chuẩn toan quoc (judgment call). Phương thức HSA, xét tuyển thẳng, du bi dan toc, va điểm cộng thanh tich chưa được mô hình hóa.',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(vnuumpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2026 - VNU-UMP',
      url: 'https://ump.vnu.edu.vn/article-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026-(hinh-thuc-dao-tao-chinh-quy)-19647-3439.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
    {
      title: 'Thông báo 2468/TB-DHYD (08/07/2026): Ve ngưỡng đảm bảo chất lượng đầu vào va quy đối tượng duong 2026',
      url: 'https://ump.vnu.edu.vn/article-thong-bao-ve-nguong-bao-dam-chat-luong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-chinh-quy-nam-2026-19782-3490.html',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
