import type { AdmissionSource } from '../../core/sourceRegistry';

export const huscSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'husc-admission-methods-2026',
    publisher: 'Trang thông tin tuyển sinh Trường Đại học Khoa học, Đại học Huế',
    title: 'Các phương thức tuyển sinh đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.husc.edu.vn/baiviet.php?name=intro',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'husc-threshold-2026',
    publisher: 'Trường Đại học Khoa học, Đại học Huế',
    title: 'Ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) tuyển sinh đại học hệ chính quy năm 2026 (Thông báo số 42/TB-HĐTSĐH)',
    url: 'https://tuyensinh.husc.edu.vn/thongbao.php?id=77',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'husc-hueu-threshold-appendix-2026',
    publisher: 'Đại học Huế (Hội đồng tuyển sinh)',
    title: 'Phụ lục 1 - Ngưỡng đảm bảo chất lượng đầu vào đối với các chương trình đào tạo đại học hệ chính quy của Đại học Huế năm 2026 (kèm Thông báo số 42/TB-HĐTSĐH ngày 10/7/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Download/10676',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
  },
  {
    id: 'husc-hueuni-ttts-2026',
    publisher: 'Đại học Huế',
    title: 'THÔNG TIN TUYỂN SINH ĐẠI HỌC HỆ CHÍNH QUY NĂM 2026 (77 trang, Quyết định 630/QĐ-HĐTSĐH ngày 29/04/2026)',
    url: 'https://tuyensinh.hueuni.edu.vn/News/Detail/thong-tin-tuyen-sinh-dai-hoc-cao-dang-he-chinh-quy-nam-2026-cua-dai-hoc-hue_20260501150542',
    accessedAt: '2026-08-27',
    publishedAt: '2026-04-29',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Văn bản tuyển sinh chung cho toàn Đại học Huế (mọi trường thành viên, gồm Trường Đại học Khoa học - mã DHT). Trích cho nhánh exact: mục 2 phần Phương thức xét tuyển - công thức "Điểm xét tuyển = (M1×H1 + M2×H2 + M3×H3)/(H1+H2+H3) × 3 + Điểm cộng + Điểm ưu tiên" (tổ hợp DHT không hệ số); mục V.2.a + Bảng 1 - bảng điểm ưu tiên KV/ĐT tự công bố đầy đủ + công thức giảm khi tổng ≥ 22,5; mục V.2.b - điểm cộng tối đa 3,0/30 theo Phụ lục 2 (chưa nhập bảng tra cứu tự động).',
  },
];
