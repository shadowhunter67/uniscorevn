import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface HcmunreSource {
  id: string;
  publisher: string;
  title: string;
  url: string;
  accessedAt: string;
  publishedAt?: string;
  sourceType?: SourceType;
  verification: VerificationLevel;
  lifecycle?: SourceLifecycle;
  note?: string;
}

/**
 * Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh (HCMUNRE, mã trường DTM) — cổng tuyển sinh
 * chính thức tuyensinh.hcmunre.edu.vn. LƯU Ý: có một trường tên rất giống ở Hà Nội (`hunre.edu.vn`,
 * schoolId khác trong hệ thống UniscoreVN) — hai trường HOÀN TOÀN KHÁC NHAU, batch trước từng nhầm
 * lẫn số liệu, batch này đã đối chiếu lại đúng domain `hcmunre.edu.vn`/`tuyensinh.hcmunre.edu.vn`,
 * xác nhận qua tiêu đề trang ghi rõ "TP. Hồ Chí Minh" và Phương thức 3 dùng kỳ thi ĐGNL ĐHQG-HCM
 * (chỉ trường phía Nam mới có phương thức này).
 */
export const hcmunreSources: HcmunreSource[] = [
  {
    id: 'hcmunre-cutoff-decision-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
    title: 'Quyết định về điểm trúng tuyển đại học chính quy đợt 1 năm 2026',
    url: 'https://tuyensinh.hcmunre.edu.vn/quyet-dinh-ve-diem-trung-tuyen-dai-hoc-chinh-quy-dot-1-nam-2026.html',
    accessedAt: '2026-09-27',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Điều 1 công bố điểm chuẩn theo 3 phương thức (PT1: thi TN THPT thang 30; PT2: học bạ thang 30; PT3: ĐGNL ĐHQG-HCM thang 1200), ghi rõ "Điểm ưu tiên được xác định theo từng trường hợp cụ thể theo quy chế tuyển sinh hiện hành". Bảng chi tiết nằm ở 3 file đính kèm PT1.pdf/PT2.pdf/PT3.pdf — module này chỉ dùng PT1.pdf.',
  },
  {
    id: 'hcmunre-cutoff-pt1-2026',
    publisher: 'Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
    title: 'PT1.pdf — Điểm chuẩn xét tuyển theo Phương thức 1 căn cứ kết quả điểm thi tốt nghiệp THPT năm 2026 (thang điểm 30)',
    url: 'https://tuyensinh.hcmunre.edu.vn/wp-content/uploads/2026/08/PT1.pdf',
    accessedAt: '2026-09-27',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'File PDF gốc, đọc trực tiếp bằng vision (không qua OCR bên thứ ba). Bảng 20 ngành, mã ngành theo mã quốc gia, tổ hợp xét tuyển liệt kê đủ theo từng ngành, điểm chuẩn từ 15,00 (nhiều ngành) đến 21,00 (Logictics và quản lý chuỗi cung ứng).',
  },
  {
    id: 'hcmunre-floor-formula-2026',
    publisher: 'Hội đồng tuyển sinh Trường Đại học Tài nguyên và Môi trường TP. Hồ Chí Minh',
    title: 'Thông báo ngưỡng chất lượng đầu vào đối với các phương thức xét tuyển đại học hệ chính quy năm 2026',
    url: 'https://tuyensinh.hcmunre.edu.vn/tb-nguong-chat-luong-dau-vao-doi-voi-cac-phuong-thuc-xet-tuyen-dhcq-nam-2026.html',
    accessedAt: '2026-09-27',
    publishedAt: '2026-07-06',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Mục 3.1 công bố nguyên văn: "Phương thức 1: Xét tuyển dựa vào kết quả thi THPT. Điểm xét tuyển là tổng điểm 3 môn thi của tổ hợp môn phù hợp với ngành đào tạo xét tuyển theo kết quả thi tốt nghiệp THPT 2026, cộng với điểm ưu tiên đối tượng, khu vực (nếu có)." — xác nhận điểm chuẩn PT1.pdf so sánh với Điểm xét tuyển ĐÃ cộng ưu tiên (không phải điểm thô). Mục riêng "Ngưỡng xét tuyển" (điểm sàn nộp hồ sơ, khác điểm chuẩn trúng tuyển) ghi KHÔNG gồm ưu tiên — không dùng cho threshold runtime. Không công bố bảng mức điểm ưu tiên cụ thể theo khu vực/đối tượng — dùng khung quốc gia hiện hành (`priority.ts`).',
  },
];
