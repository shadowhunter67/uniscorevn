import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { htuAdmissionMethods } from './methods';

export const htuModule: SchoolModule = {
  id: 'htu',
  name: 'Trường Đại học Hà Tĩnh',
  shortName: 'HTU',
  about: 'Trường đại học công lập trực thuộc UBND tỉnh Hà Tĩnh (mã trường HHT), đào tạo đa ngành: sư phạm, kinh tế, luật, kỹ thuật, nông lâm, ngoại ngữ.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'HTU 2025 (Phương thức 1 — xét kết quả thi TN THPT): điểm trúng tuyển CHÍNH THỨC theo 18/18 mã xét tuyển (15,00–26,35/30), nguồn CHÍNH CHỦ ts.htu.edu.vn cho cả điểm trúng tuyển (Thông báo 72/TB-HĐTSCQ, `sources.ts:htu-threshold-2025`) và công thức/tổ hợp (Thông tin tuyển sinh năm 2025, `sources.ts:htu-dean-2025`), cùng năm 2025. 17/18 ngành công bố MỘT mức điểm chung cho mọi tổ hợp; riêng ngành Giáo dục Tiểu học có mức khác nhau theo tổ hợp (D01: 25,85; B03/C04/C14/X01: 26,35). Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — xem `knowledgeGaps.ts`). Không có bảng điểm cộng riêng (trường dẫn chiếu hướng dẫn Bộ GD&ĐT, không mô hình hoá). Điều kiện phụ ngành Luật (Toán/Văn) được nêu khác nhau giữa 2 nguồn nên KHÔNG mô hình hoá. Các phương thức học bạ/IELTS/ĐGNL-ĐGTD/tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(htuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 72/TB-HĐTSCQ — Điểm trúng tuyển đại học hệ chính quy đợt 1, năm 2025',
      url: 'https://ts.htu.edu.vn/ts-dh/diem-trung-tuyen-dot-1-nam-2025',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông tin tuyển sinh năm 2025 (Hình thức đào tạo: Chính quy) — Trường Đại học Hà Tĩnh',
      url: 'https://ts.htu.edu.vn/images/Tuyensinh/Thong_tin_tuyen_sinh_2025_chinh_quy-update.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
