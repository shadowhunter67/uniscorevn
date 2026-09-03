import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { naemAdmissionMethods } from './methods';

export const naemModule: SchoolModule = {
  id: 'naem',
  name: 'Học viện Quản lý giáo dục',
  shortName: 'NAEM',
  about: 'Học viện công lập trực thuộc Bộ Giáo dục và Đào tạo tại Hà Nội, đào tạo khối ngành quản lý giáo dục, tâm lý học, ngoại ngữ, kinh tế và công nghệ thông tin.',
  year: 2025,
  entityLevel: 'academy',
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'NAEM 2025 (Phương thức xét kết quả thi TN THPT, mã phương thức 100): điểm trúng tuyển CHÍNH THỨC theo cả 7/7 ngành đại học chính quy (15,00–25,50/30), nguồn CHÍNH CHỦ naem.edu.vn cho cả điểm trúng tuyển (Thông báo 22/8/2025, `sources.ts:naem-threshold-2025`) và công thức/tổ hợp (Thông tin tuyển sinh 2025 + trang công thức riêng, `sources.ts:naem-thongtin-2025` / `naem-priority-formula-2025`) — trường tự công bố công thức "Điểm xét tuyển = M1+M2+M3+Điểm ưu tiên" và công thức giảm dần điểm ưu tiên theo tổng điểm. Cùng năm 2025. Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng mức riêng theo khu vực/đối tượng, judgment call — cùng tiền lệ DNU/TUEBA/PVU/HUST, xem `knowledgeGaps.ts`). Không có bảng điểm cộng riêng. Bảng quy đổi chứng chỉ ngoại ngữ quốc tế sang điểm môn Tiếng Anh KHÔNG mô hình hoá. Phương thức học bạ/tuyển thẳng/ĐGTD/ĐGNL/SPT chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(naemAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo Điểm trúng tuyển đại học chính quy năm 2025 vào Học viện Quản lý Giáo dục',
      url: 'https://naem.edu.vn/vi/tin-tuc/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-vao-hoc-vien-quan-ly-giao-duc',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông tin tuyển sinh đại học chính quy năm 2025',
      url: 'https://naem.edu.vn/vi/tin-tuc/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-1',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Xét tuyển sử dụng kết quả thi tốt nghiệp THPT (Phương thức 100)',
      url: 'https://naem.edu.vn/vi/tin-tuc/xet-tuyen-su-dung-ket-qua-thi-tot-nghiep-thpt-phuong-thuc-100',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
