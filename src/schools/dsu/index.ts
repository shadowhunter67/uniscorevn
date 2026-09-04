import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { dsuAdmissionMethods } from './methods';

export const dsuModule: SchoolModule = {
  id: 'dsu',
  name: 'Trường Đại học Thể dục Thể thao Đà Nẵng',
  shortName: 'DSU',
  about: 'Trường đại học công lập trực thuộc Bộ Văn hoá, Thể thao và Du lịch tại Đà Nẵng (mã trường TTD), đào tạo khối ngành thể dục thể thao.',
  year: 2025,
  status: 'researching',
  ownership: 'public',
  region: 'other',
  vnuhcm: false,
  summary:
    'DSU 2025 (Phương thức mã 100 — xét kết quả điểm thi tốt nghiệp THPT, CHỈ ngành Quản lý TDTT 7810301): điểm trúng tuyển CHÍNH THỨC 21,50/30, nguồn CHÍNH CHỦ dsu.edu.vn — Quyết định 1088/QĐ-TDTTĐN-HĐTS (22/8/2025, PDF có chữ ký + con dấu, `sources.ts:dsu-qd1088-diemchuan-2025`) cho bảng điểm chuẩn, Thông báo 247/TB-TDTTĐN (07/3/2025) cho tổ hợp xét tuyển (B03: Toán–Văn–Sinh; C14: Toán–Văn–GDCD). Công thức = tổng thô 3 môn (thang 30, không hệ số) + điểm ưu tiên — suy luận có căn cứ từ cấu trúc tổ hợp cân bằng đã công bố (văn bản không nêu công thức bằng chữ, xem `knowledgeGaps.ts`). Điểm ưu tiên KV/ĐT lấy TRỰC TIẾP từ Điều 7 Quy chế tuyển sinh của trường (Quyết định 577/QĐ-TDTTĐN, 12/5/2025, có Phụ lục 1/2 riêng) — KHÔNG phải judgment call. 2 ngành còn lại (Huấn luyện thể thao, Giáo dục thể chất) và các phương thức 200/405/406/301/303 đều bắt buộc điểm thi năng khiếu TDTT hoặc không mô hình hoá — chưa hỗ trợ.',
  capabilities: {
    admissionInfo: true,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(dsuAdmissionMethods),
  },
  catalogSources: [
    {
      title: 'Quyết định số 1088/QĐ-TDTTĐN-HĐTS — Về việc phê duyệt mức điểm chuẩn trúng tuyển các ngành trình độ đại học hệ chính quy năm 2025',
      url: 'https://dsu.edu.vn/resources/1/VanBan/QD1088%20NGUONG%20DIEM%20CHUAN%20TRUNG%20TUYEN%202025.docx638915696831705549.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Thông báo số 247/TB-TDTTĐN — Tuyển sinh đại học chính quy năm 2025',
      url: 'https://dsu.edu.vn/resources/1014/File%20th%C3%B4ng%20b%C3%A1o%20tuy%E1%BB%83n%20sinh/THONG%20BAO%20TUYEN%20SINH%202025%20(ban%20hanh)638772823853145775.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
    {
      title: 'Quyết định số 577/QĐ-TDTTĐN — Quy chế tuyển sinh đại học của Trường Đại học Thể dục thể thao Đà Nẵng',
      url: 'https://dsu.edu.vn/resources/post_tailieu/371d39d5-a4df-4e0a-b430-64421a5662ba.pdf',
      type: 'official-institution',
      checkedAt: '2026-09-04',
    },
  ],
};
