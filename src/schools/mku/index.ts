import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { mkuAdmissionMethods } from './methods';

export const mkuModule: SchoolModule = {
  id: 'mku',
  name: 'Trường Đại học Cửu Long',
  shortName: 'MKU',
  about: 'Trường đại học tư thục (mã trường DCL) tại Vĩnh Long, đào tạo 42 ngành đại học chính quy khối kinh tế, luật, kỹ thuật, công nghệ, nông nghiệp, khoa học xã hội và sức khỏe.',
  year: 2026,
  status: 'researching',
  ownership: 'private',
  region: 'other',
  vnuhcm: false,
  summary:
    'MKU 2026 (nhánh xét kết quả thi TN THPT, nguồn CHÍNH CHỦ tuyensinh.mku.edu.vn — PDF Quyết định 3018/QĐ-ĐHCL có text layer thật, `sources.ts:mku-cutoff-2026`): điểm chuẩn theo ngành, mô hình hoá 33/42 ngành KHÔNG thuộc khối sức khỏe (loại 9 ngành Y khoa/YHCT/RHM/Dược/KT hình ảnh y học/Hộ sinh/KT xét nghiệm y học/KT phục hồi chức năng/Điều dưỡng — threshold 18-22 kèm điều kiện phụ riêng theo Quyết định 1962/QĐ-BGDĐT, chưa đối chiếu). 30/33 ngành mô hình hoá FLAT 15,0/30; khối Luật (Luật, Luật kinh tế, Luật hiến pháp và luật hành chính) FLAT 20,0/30. Đối chiếu chéo với Thông báo điểm sàn 2613/TB-ĐHCL xác nhận điểm sàn = điểm chuẩn cho toàn bộ 33 ngành này (không cạnh tranh vượt sàn). Điểm ưu tiên dùng khung quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call, cùng tiền lệ DLA/BMTU).',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(mkuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định số 3018/QĐ-ĐHCL — Công bố điểm chuẩn trúng tuyển của các ngành hệ Đại học chính quy năm 2026, khóa 27',
      url: 'https://tuyensinh.mku.edu.vn/quyet-dinh-cong-bo-diem-chuan-trung-tuyen-cua-cac-nganh-he-dai-hoc-chinh-quy-nam-2026-khoa-27',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông báo số 2344/TB-ĐHCL — Tuyển sinh hệ Đại học chính quy năm 2026, khóa 27',
      url: 'https://tuyensinh.mku.edu.vn/thong-bao-tuyen-sinh-he-dai-hoc-chinh-quy-nam-2026-khoa-27',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
