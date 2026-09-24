import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { pduAdmissionMethods } from './methods';

export const pduModule: SchoolModule = {
  id: 'pdu',
  name: 'Trường Đại học Phạm Văn Đồng',
  shortName: 'PDU',
  about: 'Trường đại học công lập tại Quảng Ngãi (mã trường DPQ), đào tạo khối ngành sư phạm (Giáo dục Tiểu học, Sư phạm Toán/Tin/Vật lý/Hoá học/Ngữ văn/Tiếng Anh/Khoa học Tự nhiên, Giáo dục Mầm non) và ngoài sư phạm (Quản trị kinh doanh, Marketing, Công nghệ thông tin, Công nghệ kỹ thuật cơ khí, Kỹ thuật cơ điện tử).',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'PDU 2026 (Phương thức 1 — xét kết quả thi TN THPT): điểm trúng tuyển đợt 1 theo ngành, nguồn CHÍNH CHỦ tuyensinh.pdu.edu.vn — PDF "Thông báo điểm trúng tuyển đợt 1" ký tên Hiệu trưởng + đóng dấu đỏ (Số 997/TB-ĐHPVĐ, 10/8/2026, `sources.ts:pdu-cutoff-2026`) + PDF "Thông tin tuyển sinh năm 2026" (Quyết định 131/QĐ-ĐHPVĐ, công thức Tổng điểm xét tuyển = M1+M2+M3+điểm ưu tiên + bảng tổ hợp môn theo ngành, `pdu-scheme-2026`). Mô hình hoá 13/14 chương trình đại học chính quy, điểm trúng tuyển từ 15,00 đến 22,30/30 (loại trừ Giáo dục Mầm non — trình độ cao đẳng khác cấp, tổ hợp năng khiếu M01/M09 không có SubjectId). Chỉ tính Phương thức 1 — PDU còn Phương thức 2 (học bạ), 3 (ĐGNL ĐHQG-HCM), 4 (dự bị đại học), chưa mô hình hoá (xem knowledgeGaps.ts).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(pduAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo điểm trúng tuyển đợt 1, Kỳ tuyển sinh năm 2026 — Trường Đại học Phạm Văn Đồng',
      url: 'https://tuyensinh.pdu.edu.vn/thong-bao-diem-trung-tuyen-dot-1-ky-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
    {
      title: 'Thông tin tuyển sinh năm 2026 (Chính quy) — Trường Đại học Phạm Văn Đồng',
      url: 'https://tuyensinh.pdu.edu.vn/thong-tin-tuyen-sinh-nam-2026/',
      type: 'official-institution',
      checkedAt: '2026-09-22',
    },
  ],
};
