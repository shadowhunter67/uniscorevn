import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VyaSource {
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
 * Học viện Thanh thiếu niên Việt Nam (VYA, mã trường HTN, trực thuộc Trung ương Đoàn TNCS Hồ Chí
 * Minh, trụ sở Chùa Láng, Hà Nội + Phân hiệu TP.HCM — KHÔNG mô hình hoá phân hiệu, xem
 * knowledgeGaps.ts). Cổng tuyensinh.vya.edu.vn đăng đầy đủ PDF gốc có chữ ký/con dấu (không phải
 * ảnh/preview) cho cả công thức, tổ hợp môn, bảng ưu tiên VÀ điểm trúng tuyển CHÍNH THỨC — hiếm
 * khi cần vision/chrome-devtools cho trường này (chỉ 1 ảnh bìa bài viết không chứa số liệu).
 */
export const vyaSources: VyaSource[] = [
  {
    id: 'vya-thong-tin-tuyen-sinh-2026',
    publisher: 'Học viện Thanh thiếu niên Việt Nam — Phó Giám đốc phụ trách Hoàng Minh Tuấn',
    title: 'Quyết định 218/QĐ-HVTTNVN — Thông tin tuyển sinh năm 2026',
    url: 'https://tuyensinh.vya.edu.vn/thong-tin-tuyen-sinh-vya-2026',
    accessedAt: '2026-09-04',
    publishedAt: '2026-06-11',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tin đăng trực tiếp link PDF gốc (16 trang, có chữ ký + dấu đỏ) — tải trực tiếp và đọc đầy đủ bằng vision. Mục 2 "Mô tả phương thức tuyển sinh" nêu nguyên văn 2 công thức dùng trong module này: Phương thức 2 (Mã 200, xét học bạ lớp 10/11/12) "Điểm xét tuyển = (ĐTB Môn 1 + ĐTB Môn 2 + ĐTB Môn 3) + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)", trong đó "ĐTB môn = (Điểm cả năm lớp 10 + Điểm cả năm lớp 11 + Điểm cả năm lớp 12)/3"; Phương thức 3 (Mã 100, xét kết quả thi TN THPT 2026) "Điểm xét tuyển = (Môn thi 1 + Môn thi 2 + Môn thi 3) + Điểm cộng (nếu có) + Điểm ưu tiên (nếu có)", cả 2 đều thang điểm 30, làm tròn 2 chữ số thập phân. Mục 4.1 liệt kê đầy đủ 9 mã xét tuyển/ngành 2026 (Công tác Thanh thiếu niên 7760102, Công tác Xã hội 7760101, Luật 7380101, Quan hệ Công chúng 7320108, Quản lý Nhà nước 7310205, Tâm lý học 7310401, Xây dựng Đảng và Chính quyền Nhà nước 7310202, Công nghệ thông tin 7480201, Kinh tế 7310101) kèm tổ hợp xét tuyển (mục 4.2: C00/X74/D01/X21/D10 cho 7 ngành khối xã hội, D01/A00/X21/D10/A04 cho Công nghệ thông tin/Kinh tế). Mục 5.2 nêu điểm cộng gồm 5.2.1 Điểm thưởng (xét tuyển thẳng không dùng quyền, 3,00 điểm cố định — không có field điều kiện trong hồ sơ dùng chung, KHÔNG mô hình hoá) và 5.2.2 Điểm khuyến khích (bảng IELTS cụ thể: 7.0+ =1,50; 6.5=1,25; 6.0=1,00; 5.5=0,75; 5.0=0,50 điểm, thang 30 — CÓ mô hình hoá qua `bonus.ts`), trần tổng điểm cộng 3,0/30 (10% thang điểm). Điểm ưu tiên dẫn chiếu Điều 7 Quy chế tuyển sinh của Học viện (`vya-quy-che-tuyen-sinh-2026`).',
  },
  {
    id: 'vya-quy-che-tuyen-sinh-2026',
    publisher: 'Học viện Thanh thiếu niên Việt Nam — Phó Giám đốc phụ trách Hoàng Minh Tuấn',
    title: 'Quyết định 261/QĐ-HVTTNVN (30/3/2026) — Quy chế tuyển sinh năm 2026 của Học viện Thanh thiếu niên Việt Nam',
    url: 'https://tuyensinh.vya.edu.vn/quy-che-tuyen-sinh-vya-2026',
    accessedAt: '2026-09-04',
    publishedAt: '2026-03-30',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 19 trang có chữ ký + dấu đỏ, tải trực tiếp. Điều 7 "Chính sách ưu tiên trong tuyển sinh" TỰ TRÍCH NGUYÊN VĂN (không chỉ dẫn chiếu) toàn bộ bảng mức điểm ưu tiên: khoản 1 (KV1=0,75; KV2-NT=0,5; KV2=0,25; KV3=0, thang 30 không hệ số); khoản 2 (UT1 gồm đối tượng 01-03 = 2,00 điểm; UT2 gồm đối tượng 04-06 = 1,00 điểm, dẫn Phụ lục II); khoản 4 công thức giảm khi tổng điểm đạt từ 22,50/30 trở lên: "Điểm ưu tiên = [(30 - Tổng điểm đạt được)/7,50] x Mức điểm ưu tiên quy định". Văn bản căn cứ Thông tư 06/2026/TT-BGDĐT (15/02/2026) — giá trị/công thức GIỐNG HỆT Thông tư 06/2025 đã dùng cho nhiều trường khác trong campaign (Điều 7 không đổi giữa 2 năm). VYA đưa nguyên văn bảng này vào chính Quy chế của trường (không chỉ dẫn chiếu suông) — cùng tiền lệ VHS, không phải judgment call khung quốc gia thay thế.',
  },
  {
    id: 'vya-cutoff-2026',
    publisher: 'Học viện Thanh thiếu niên Việt Nam — Phó Giám đốc phụ trách Hoàng Minh Tuấn',
    title: 'Thông báo 162/TB-HVTTNVN (19/8/2026) — Điểm trúng tuyển vào các ngành hệ đại học chính quy năm 2026',
    url: 'https://tuyensinh.vya.edu.vn/diem-trung-tuyen-cac-nganh-dai-hoc-vya-2026',
    accessedAt: '2026-09-04',
    publishedAt: '2026-08-19',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'PDF gốc 3 trang có chữ ký + dấu đỏ (Phó Giám đốc phụ trách Hoàng Minh Tuấn), tải trực tiếp — công bố SAU kỳ thi TN THPT 2026, là điểm trúng tuyển CHÍNH THỨC (không phải ngưỡng đầu vào dự kiến). Bảng "Tại Hà Nội" (9/9 ngành, mục 1) cho cả điểm trúng tuyển phương thức 100 (thi TN THPT) và phương thức 200 (học bạ): Kinh tế 18.5/19; Xây dựng Đảng và Chính quyền nhà nước 21/23; Quản lý nhà nước 21/23; Tâm lý học 22/23.7; Quan hệ công chúng 20/"Không xét"; Luật 20/"Không xét"; Công nghệ thông tin 17/18; Công tác xã hội 21/23; Công tác Thanh thiếu niên 20/21.5. Bảng "Phân hiệu tại TP.HCM" (mục 1, 3 ngành: Xây dựng Đảng 17/18, Luật 20/21.5, Công tác Thanh thiếu niên 17/18) KHÔNG mô hình hoá (campus riêng, chỉ tiêu/ngưỡng khác — xem knowledgeGaps.ts). Luật và Quan hệ công chúng ghi rõ "Không xét" cho phương thức 200 — 2 ngành này CHỈ mô hình hoá ở phương thức 100.',
  },
];
