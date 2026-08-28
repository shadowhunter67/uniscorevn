import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tbuAdmissionMethods } from './methods';

export const tbuModule: SchoolModule = {
  id: 'tbu',
  name: 'Trường Đại học Thái Bình',
  shortName: 'TBU',
  about: 'Trường đại học công lập tại tỉnh Thái Bình, đào tạo đa ngành.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'Calculator exact cho phương thức PT1 (xét kết quả thi TN THPT, các ngành trừ Luật): ngưỡng 15,0/30, đọc trực tiếp Thông báo 565/TB-ĐHTB (19/3/2026, PDF chính thức TBU) xác nhận công thức Điểm xét tuyển = tổng 3 môn + điểm ưu tiên (theo Bộ GD&ĐT) + điểm cộng (bảng cụ thể mục 4.2, model được nhánh IELTS). Ngành Luật ở PT1 KHÔNG có ngưỡng cố định (do Bộ GD&ĐT phối hợp Bộ Tư pháp quyết định hàng năm — khác giả định 18,0 trước đây), chưa mô hình hoá. PT2-PT5 và giải HSG cấp tỉnh/thành (điểm cộng) cũng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Trường Đại học Thái Bình thông báo ngưỡng đảm bảo chất lượng đầu vào, điểm trúng tuyển và quy đổi tương đương giữa các phương thức xét tuyển đại học chính quy năm 2026',
      url: 'https://tbu.edu.vn/truong-dai-hoc-thai-binh-thong-bao-nguong-dam-bao-chat-luong-dau-vao-diem-trung-tuyen-va-quy-doi-tuong-duong-giua-cac-phuong-thuc-xet-tuyen-dai-hoc-ch.html',
      type: 'official-institution',
      checkedAt: '2026-08-25',
    },
    {
      title: 'Thông báo 565/TB-ĐHTB (19/3/2026): Thông tin tuyển sinh đại học chính quy năm 2026',
      url: 'https://media.tbu.edu.vn//Media/1_TH1062/FolderFunc/202603/Documents/thong-bao-so-565-20260324051114-e.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
