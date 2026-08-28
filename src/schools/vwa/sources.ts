import type { AdmissionSource } from '../../core/sourceRegistry';

export const vwaSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'vwa-quality-threshold-2026',
    publisher: 'Học viện Phụ nữ Việt Nam',
    title: 'Thông báo 96/TB-HVPNVN: Học viện Phụ nữ Việt Nam công bố ngưỡng điểm xét tuyển đại học năm 2026',
    url: 'https://tuyensinh.hvpnvn.edu.vn/thong-bao/tuyen-sinh-dai-hoc/hoc-vien-phu-nu-viet-nam-cong-bo-nguong-diem-xet-tuyen-dai-hoc-nam-2026-phu-hop-pho-diem-mo-rong-co-hoi-cho-thi-sinh/',
    accessedAt: '2026-08-28',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Bài đăng dẫn PDF chính thức (hvpnvn.edu.vn/wp-content/uploads/sites/63/2026/07/96TB-NguongDamBaoChatLuongDauVaoDaiHoc-070726.pdf, 6 trang scan), tải qua chrome-devtools + OCR 2026-08-28. Mục I: bảng đầy đủ 19 mã xét tuyển (17 HN + 2 Phân hiệu TP.HCM) — mã ngành, tổ hợp môn, ngưỡng theo 4 phương thức (THPT/học bạ/HSA/SPT). Luật + Luật Kinh tế: "theo quy định và thông báo của Bộ GD&ĐT" — chưa có số, ngoài phạm vi. Điều kiện phụ: QTKD CLC/Kinh tế CLC cần chứng chỉ tiếng Anh Bậc 3 hoặc điểm Anh ĐKXT ≥5,0 (không model — ngoài phạm vi); CNTT/Thiết kế phát triển Game cần Toán THPT ≥6,0 (model được). Mục II: độ chênh điểm CUTOFF giữa tổ hợp (D01 vs C00 +1, D01 vs nhóm khác +0,5) — chỉ áp cho điểm chuẩn trúng tuyển, KHÔNG áp cho ngưỡng đầu vào (mục I là 1 số cố định/mã, không phân biệt tổ hợp) nên không cần cho nhánh exact. Không tìm thấy công thức ĐXT hay bảng ưu tiên KV/ĐT tường minh trong toàn văn bản.',
  },
];
