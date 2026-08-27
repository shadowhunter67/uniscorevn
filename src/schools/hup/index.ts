import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hupAdmissionMethods } from './methods';

export const hupModule: SchoolModule = {
  id: 'hup',
  name: 'Trường Đại học Dược Hà Nội',
  shortName: 'HUP',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo Dược học và các ngành hoá - sinh liên quan.',
  year: 2026,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'Tính đủ Điểm xét tuyển (exact) cho Phương thức 4 (xét thi TN THPT): ĐXT = M1 + M2 + M3 + điểm cộng IELTS + điểm ưu tiên KV/ĐT (công thức giảm khi ≥ 22,5), so với ngưỡng PT4 theo ngành (Dược học 22 / Hoá dược 20 / Hoá học 19 / CNSH 19, thang 30) — công thức, bảng ĐKK và ngưỡng đều trích nguyên văn từ nguồn chính thức 2026 · Chưa mô hình hoá: PT1-PT3, quy đổi tương đương giữa các phương thức, điểm cộng giải HSG (không có field trong hồ sơ dùng chung).',
  capabilities: {
    admissionInfo: true,
    programs: true,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hupAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Phương thức tuyển sinh đại học dự kiến năm 2026',
      url: 'https://tuyensinh.hup.edu.vn/noidung/1250/THONG-TIN-TUYEN-SINH-DAI-HOC-NAM-2026-HINH-THUC-CHINH-QUY',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
    {
      title: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026',
      url: 'https://tuyensinh.hup.edu.vn/noidung/1258/Thong-bao-Nguong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-',
      type: 'official-institution',
      checkedAt: '2026-08-24',
    },
  ],
};
