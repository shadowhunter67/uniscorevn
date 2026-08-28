import type { AdmissionSource } from '../../core/sourceRegistry';

export const hauSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hau-quality-threshold-2026',
    publisher: 'Trường Đại học Kiến trúc Hà Nội - Hội đồng tuyển sinh',
    title:
      'Quyết định 406/QĐ-ĐHKT-ĐT: Công bố mức điểm nhận hồ sơ xét tuyển đại học hình thức chính quy năm 2026 (phương thức thi TN THPT và phương thức thi tuyển kết hợp với xét tuyển) + Phụ lục',
    url: 'https://hau.edu.vn/Quyet-dinh-ve-viec-cong-bo-muc-diem-nhan-ho-so-xet-tuyen-dai-hoc-hinh-thuc-chinh-quy-nam-2026-doi-voi-phuong-thuc-xet-tuyen-dua-vao-ket-qua-thi-tot-nghiep-THPT-nam-2026-va-phuong-thuc-thi-tuyen-ket-hop-voi-xet-tuyen_n4749.html',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng nhúng PDF Quyết định 406 qua Google Drive (drive.google.com/file/d/1_qpS2loAQNNmkV2kEU2zz8loXkcK3bAT), tải trực tiếp 2026-08-28 (3 trang, có text layer). Điều 1: "mức điểm nhận hồ sơ xét tuyển là tổng điểm các môn trong tổ hợp xét tuyển, điểm ưu tiên và điểm cộng (nếu có)". Phụ lục: bảng đầy đủ 22 nhóm ngành/ngành, mã ngành, tổ hợp, mức điểm. 9 mã dùng tổ hợp văn hóa chuẩn (A00/A01/C01/C02/D01): Kỹ thuật hạ tầng đô thị/môi trường đô thị/cơ điện công trình (7580210, _1, _2), Giao thông đô thị/Đường sắt (7580205, _1), Kỹ thuật cấp thoát nước (7580213) — 15,0; Xây dựng dân dụng/công trình ngầm/quản lý dự án (7580201, _1, _2), Công nghệ vật liệu XD (7510105), Kinh tế Xây dựng (7580301), Quản lý xây dựng/BĐS/logistics (7580302, _1, _2), Kinh tế đầu tư (7310104), Kinh tế phát triển (7310105), CNTT/đa phương tiện/game (7480201, _1, _2) — 18,0. 13 mã còn lại dùng tổ hợp có môn năng khiếu (Vẽ mỹ thuật/HHMT/BCTT màu, một số nhân hệ số) — ngoài phạm vi.',
  },
];
