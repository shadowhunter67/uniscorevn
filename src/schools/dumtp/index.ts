import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dumtpAdmissionMethods } from './methods';

export const dumtpModule: SchoolModule = {
  id: 'dumtp',
  name: 'Trường Đại học Kỹ thuật Y Dược Đà Nẵng',
  shortName: 'DUMTP',
  about: 'Trường đại học công lập trực thuộc Bộ Y tế (mã trường YDN), đào tạo khối ngành sức khỏe: Y khoa, Dược học, Điều dưỡng, Kỹ thuật xét nghiệm/hình ảnh y học, Phục hồi chức năng, Y tế công cộng.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'DUMTP 2025 (Phương thức 1 — xét kết quả thi TN THPT, mã 100): điểm trúng tuyển CHÍNH THỨC theo 9/9 mã ngành/chuyên ngành (15,00–22,85/30), nguồn CHÍNH CHỦ ydn.edu.vn cho cả điểm trúng tuyển (Quyết định 625/QĐ-ĐHKTYDĐN, `sources.ts:dumtp-threshold-2025`) và công thức/tổ hợp (Thông tin tuyển sinh đại học năm 2025, `sources.ts:dumtp-dean-2025`), cùng năm 2025. Trường dùng ĐỒNG NHẤT 4 tổ hợp (A00/B00/B08/D07) cho mọi ngành, điểm trúng tuyển áp dụng như nhau cho cả 4 tổ hợp. Điểm ưu tiên dùng khung điểm ưu tiên quốc gia hiện hành (trường không tự công bố bảng riêng, judgment call — xem `knowledgeGaps.ts`). Không có bảng điểm cộng riêng (trường tuyên bố "ngoài điểm ưu tiên, không tính điểm cộng"). Tiêu chí phụ khi bằng điểm (Toán, thứ tự nguyện vọng) KHÔNG mô hình hoá. Các phương thức IELTS/học bạ/tuyển thẳng chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dumtpAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định số 625/QĐ-ĐHKTYDĐN — Về việc công bố điểm trúng tuyển vào đại học chính quy năm 2025',
      url: 'https://ydn.edu.vn/news-posts/dumpt-admission/dai-hoc-081c/quyet-dinh-ve-viec-cong-bo-diem-trung-tuyen-vao-dai-hoc-chinh-quy-nam-2025-a6fe',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Thông tin tuyển sinh đại học năm 2025 — Trường Đại học Kỹ thuật Y - Dược Đà Nẵng',
      url: 'https://ydn.edu.vn/news-posts/dumpt-admission/dai-hoc-081c/thong-tin-tuyen-sinh-dai-hoc-2025--tuong-ung-voi-de-an-tuyen-sinh-cua-cac-nam--bf6e',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
