import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { fbuAdmissionMethods } from './methods';

export const fbuModule: SchoolModule = {
  id: 'fbu',
  name: 'Trường Đại học Tài chính - Ngân hàng Hà Nội',
  shortName: 'FBU',
  about: 'Trường đại học tư thục tại Hà Nội, đào tạo các ngành tài chính, ngân hàng, kinh tế.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Calculator exact cho Phương thức 1 (mã 100, xét kết quả thi TN THPT, nhóm ngành chung trừ Luật kinh tế): ngưỡng 17,0/30, đọc trực tiếp Quyết định 99/QĐ-ĐHTNH (05/03/2026, PDF chính thức FBU) xác nhận công thức Điểm xét tuyển = [((Điểm môn 1 × 2) + Điểm môn 2 + Điểm môn 3)/4] × 3 + ĐKK + ĐXT + ĐƯT (tối đa 30). Mức điểm ưu tiên KV/ĐT cụ thể dùng chuẩn toàn quốc (judgment call, trường chỉ dẫn chiếu "Quy chế tuyển sinh của Bộ GD&ĐT và của Trường"). Điểm cộng model được nhánh IELTS (bảng cụ thể); TOEFL iBT/TOEIC/HSK và giải HSG cấp tỉnh/thành chưa model. Ngành Luật kinh tế có ngưỡng riêng (18,0/30 + điều kiện môn Toán) chưa mô hình hoá. Phương thức 2 (học bạ) và 3 (ĐGNL ĐHQGHN) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(fbuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo công bố thông tin tuyển sinh đại học chính quy năm 2026 (số 99/TB-ĐHTCNH)',
      url: 'https://vienngonngunuocngoai.fbu.edu.vn/thong-bao-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Dự báo điểm chuẩn và ngành hot ở Trường Đại học Tài chính - Ngân hàng Hà Nội 2026 (báo Dân Việt)',
      url: 'https://danviet.vn/lanh-dao-truong-dai-hoc-tai-chinh-ngan-hang-ha-noi-du-bao-diem-chuan-va-nganh-hot-nam-2026-d1440933.html',
      type: 'secondary',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Quyết định 99/QĐ-ĐHTNH (05/03/2026): Thông tin tuyển sinh đại học năm 2026',
      url: 'https://vienngonngunuocngoai.fbu.edu.vn/wp-content/uploads/2026/05/QD-so.-99.-Vv-Ban-hanh-Thong-tin-tuyen-sinh-trinh-do-dai-hoc-nam-2026-cua-truong-DH-Tai-chinh-Ngan-hang-Ha-Noi_0001-1.pdf',
      type: 'official-institution',
      checkedAt: '2026-08-28',
    },
  ],
};
