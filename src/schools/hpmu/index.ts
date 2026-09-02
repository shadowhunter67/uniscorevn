import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { hpmuAdmissionMethods } from './methods';

export const hpmuModule: SchoolModule = {
  id: 'hpmu',
  name: 'Trường Đại học Y Dược Hải Phòng',
  shortName: 'HPMU',
  about: 'Trường đại học công lập tại Hải Phòng, đào tạo khối ngành sức khỏe: Y khoa, Răng-Hàm-Mặt, Dược học, Điều dưỡng, Y học cổ truyền, Y học dự phòng, Kỹ thuật xét nghiệm y học.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HPMU 2025 (nhánh xét kết quả thi TN THPT): điểm chuẩn theo ngành cross-check qua 2 báo độc lập (VietNamNet, Công lý — `sources.ts:hpmu-threshold-2025`/`hpmu-threshold-secondary-2025`, khớp số liệu; nguồn gốc chính thức trên Cổng TTĐT Chính phủ chỉ đăng dạng ảnh SPA, không đọc trực tiếp được). Xác nhận TRỰC TIẾP điểm chuẩn "đã bao gồm điểm ưu tiên khu vực, ưu tiên đối tượng và điểm thưởng" — không cần judgment call cho việc CÓ cộng ưu tiên. Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia cho GIÁ TRỊ, trường không tự công bố mức cụ thể). Mô hình hoá 7/7 ngành đại học chính quy, điểm chuẩn từ 19,35 đến 25,33/30, cả 7 ngành dùng chung 5 tổ hợp A00/A01/B00/D07/D08. LƯU Ý: điểm chuẩn công bố là số đã quy đổi tương đương giữa nhánh thi THPT và nhánh học bạ — chỉ mô hình hoá nhánh thi THPT (thang điểm trùng khớp, không cần quy đổi thêm). Tiêu chí phụ khi bằng điểm (ưu tiên điểm Toán rồi điểm Hóa) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(hpmuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại học Y Dược Hải Phòng năm 2025',
      url: 'https://vietnamnet.vn/diem-chuan-truong-dai-hoc-y-duoc-hai-phong-nam-2025-2435066.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Đề án tuyển sinh Trường Đại Học Y Dược Hải Phòng — tổ hợp xét tuyển theo ngành',
      url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-y-duoc-hai-phong-YPB.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
