import type { AdmissionSource } from '../../core/sourceRegistry';

export const huafSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'huaf-official-admission-info-2026',
    publisher: 'Cổng thông tin tuyển sinh Trường Đại học Nông Lâm, Đại học Huế',
    title: 'Thông tin tuyển sinh đại học chính quy năm 2026 của Trường Đại học Nông Lâm, Đại học Huế',
    url: 'https://tuyensinh.huaf.edu.vn/thong-tin-tuyen-sinh-dai-hoc-chinh-quy-nam-2025-cua-truong-dai-hoc-nong-lam-dai-hoc-hue-chinh-thuc-2/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-05-22',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'huaf-hueu-threshold-appendix-2026',
    publisher: 'Đại học Huế (Hội đồng tuyển sinh)',
    title: 'Phụ lục 1 - Ngưỡng đảm bảo chất lượng đầu vào đối với các chương trình đào tạo đại học hệ chính quy của Đại học Huế năm 2026 (kèm Thông báo số 42/TB-HĐTSĐH ngày 10/7/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Download/10676',
    accessedAt: '2026-08-27',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note: 'Mục IV (mã trường DHL) — ngưỡng theo từng mã ngành: 15,00/30 (13 ngành), 16,00/30 (7510201, 7540101, 7620105), 17,00/30 (7520114, 7640101).',
  },
  {
    id: 'huaf-hueuni-ttts-2026',
    publisher: 'Đại học Huế',
    title: 'THÔNG TIN TUYỂN SINH ĐẠI HỌC HỆ CHÍNH QUY NĂM 2026 (77 trang, Quyết định 630/QĐ-HĐTSĐH ngày 29/04/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-tin-tuyen-sinh-dai-hoc-cao-dang-he-chinh-quy-nam-2026-cua-dai-hoc-hue_20260501150542',
    accessedAt: '2026-08-27',
    publishedAt: '2026-04-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Văn bản tuyển sinh chung toàn Đại học Huế. Trích cho nhánh exact: mục 2 phần Phương thức xét tuyển - công thức Điểm xét tuyển (áp dụng mọi ngành, tổ hợp DHL không hệ số); mục V.2.a + Bảng 1 - bảng điểm ưu tiên KV/ĐT + công thức giảm khi tổng ≥ 22,5; mục V.2.b - điểm cộng tối đa 3,0/30 theo Phụ lục 2 (chưa nhập bảng tra cứu).',
  },
];
