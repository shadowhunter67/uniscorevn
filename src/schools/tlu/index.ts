import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { tluAdmissionMethods } from './methods';

export const tluModule: SchoolModule = {
  id: 'tlu',
  name: 'Trường Đại học Thủy lợi',
  shortName: 'TLU',
  about: 'Trường đại học công lập tại Hà Nội, đào tạo đa ngành về kỹ thuật xây dựng, tài nguyên nước, công nghệ thông tin, cơ khí, kinh tế và luật.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'hanoi',
  vnuhcm: false,
  summary:
    'TLU 2025 (PT1 — xét kết quả thi TN THPT): điểm chuẩn chính thức theo ngành đăng lại nguyên văn trên Cổng TTĐT Chính phủ (`sources.ts:tlu-threshold-2025`) — ĐÂY LÀ ĐIỂM CHUẨN TRÚNG TUYỂN THỰC TẾ (không phải điểm sàn). Điểm xét = tổng thô 3 môn (không hệ số) + điểm ưu tiên KV/ĐT (judgment call chuẩn quốc gia, trường không tự công bố mức cụ thể và không phủ nhận việc điểm chuẩn đã gồm ưu tiên). Mô hình hoá 43/43 ngành đại học chính quy hệ tiêu chuẩn, điểm chuẩn PT1 từ 17,00 đến 25,50/30 — mỗi ngành dùng tập con tổ hợp có đủ môn trong SubjectId (loại trừ tổ hợp riêng dùng Tiếng Trung, Tin học/Công nghệ, khối năng khiếu — xem `sources.ts:tlu-scheme-2025`). Tiêu chí phụ (thứ tự nguyện vọng TTNV, điều kiện môn phụ Luật/Luật kinh tế) và PT2 (học bạ)/PT3 (đánh giá tư duy) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(tluAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Điểm chuẩn Trường Đại học Thủy lợi 2025',
      url: 'https://xaydungchinhsach.chinhphu.vn/diem-chuan-truong-dai-hoc-thuy-loi-2025-119250823164239007.htm',
      type: 'official-document',
      checkedAt: '2026-09-02',
    },
    {
      title: 'Đề án tuyển sinh Trường Đại Học Thủy Lợi — tổ hợp xét tuyển theo ngành',
      url: 'https://diemthi.tuyensinh247.com/de-an-tuyen-sinh/dai-hoc-thuy-loi-co-so-1-TLA.html',
      type: 'secondary',
      checkedAt: '2026-09-02',
    },
  ],
};
