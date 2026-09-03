import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ctuetAdmissionMethods } from './methods';

export const ctuetModule: SchoolModule = {
  id: 'ctuet',
  name: 'Trường Đại học Kỹ thuật - Công nghệ Cần Thơ',
  shortName: 'CTUET',
  about: 'Trường đại học công lập trực thuộc UBND thành phố Cần Thơ (mã trường KCC), đào tạo khối ngành kỹ thuật, công nghệ, kinh tế và luật.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'CTUET 2025 (Phương thức 1 — xét kết quả thi TN THPT, mã xét tuyển 100): điểm trúng tuyển CHÍNH THỨC theo 22 ngành (20,15–24,68/30), nguồn CHÍNH CHỦ ctuet.edu.vn cho cả công thức ("Điểm xét tuyển = tổng 3 môn + Điểm ưu tiên + điểm cộng", `sources.ts:ctuet-thongtin-2025`), điểm trúng tuyển ký tên đóng dấu (`sources.ts:ctuet-threshold-2025`), và mức điểm ưu tiên KV/ĐT CHÍNH CHỦ công bố theo Phụ lục II/III Quy chế tuyển sinh (`sources.ts:ctuet-quyche-2025`) — không phải judgment call. Quy chế còn xác nhận điểm dùng so ngưỡng đã tính cả điểm ưu tiên. Tất cả 3 nguồn cùng năm 2025. Điểm cộng thành tích đặc biệt không có bảng cụ thể — mặc định 0 (`knowledgeGaps.ts`). Phương thức học bạ/ĐGNL và 1 tổ hợp (X16, Công nghệ sinh học) chưa mô hình hoá.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(ctuetAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Thông báo số 79/TB-ĐHKTCN — Điểm trúng tuyển đại học chính quy năm 2025',
      url: 'https://tuyensinh.ctuet.edu.vn/tuyen-sinh-dai-hoc-2025/thong-bao-diem-trung-tuyen-dai-hoc-chinh-quy-nam-2025-2262.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
    {
      title: 'Quy chế tuyển sinh 2025 (Quyết định 396/QĐ-ĐHKTCN)',
      url: 'https://tuyensinh.ctuet.edu.vn/tuyen-sinh-dai-hoc-2025/quy-che-tuyen-sinh-2025-248.html',
      type: 'official-institution',
      checkedAt: '2026-09-03',
    },
  ],
};
