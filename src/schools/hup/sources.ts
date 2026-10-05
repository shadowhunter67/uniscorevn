import type { AdmissionSource } from '../../core/sourceRegistry';

export const hupSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hup-decision-352-2026',
    publisher: 'Trường Đại học Dược Hà Nội',
    title: 'Quyết định 352/QĐ-ĐHN ban hành Thông tin tuyển sinh đại học năm 2026 (PDF đính kèm)',
    url: 'https://www.hup.edu.vn/thong-bao/ban-hanh-thong-tin-tuyen-sinh-dai-hoc-nam-2026-cua-truong-dai-hoc-duoc-ha-noi-6500',
    accessedAt: '2026-10-05',
    publishedAt: '2026-04-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Nguồn dự phòng trên domain chính hup.edu.vn khi cổng tuyensinh.hup.edu.vn trả 503 (2026-10-05). PDF scan 14 trang đọc bằng vision: bảng điểm cộng IELTS (5.5=0,25 ... >=8=1,50), giải HSG, trần cộng 03 điểm khớp `bonus.ts`. PT4 ngành Dược học có thêm điều kiện học bạ (Toán và 2 trong 3 môn Lý/Hóa/Sinh từng năm >= 7,0) và điểm cộng giải KH-KT/ISEF chưa mô hình hoá — xem knowledgeGaps.',
  },
  {
    id: 'hup-admission-2026',
    publisher: 'Trường Đại học Dược Hà Nội',
    title: 'Phương thức tuyển sinh đại học dự kiến năm 2026',
    url: 'https://tuyensinh.hup.edu.vn/noidung/1250/THONG-TIN-TUYEN-SINH-DAI-HOC-NAM-2026-HINH-THUC-CHINH-QUY',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-03',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức nêu đủ 6 phương thức (PT1-PT4), 4 ngành + chỉ tiêu + tổ hợp. Trích nguyên văn cho nhánh exact: công thức PT4 "ĐXT = M1 + M2 + M3 + ĐKK (nếu có) + ĐƯT quy đổi (nếu có)" (không hệ số); bảng ĐKK — IELTS 5.5/6.0/6.5/7.0/7.5/≥8.0 → 0,25/0,50/0,75/1,00/1,25/1,50; giải HSG tỉnh Ba/Nhì/Nhất 0,5/1,0/1,25, QG khuyến khích 1,5; "tối đa 03 (ba) điểm cộng khuyến khích"; ĐƯT "quy đổi theo quy định của Bộ GDĐT". Không công bố ngưỡng điểm ở trang này.',
  },
  {
    id: 'hup-threshold-notice-2026',
    publisher: 'Trường Đại học Dược Hà Nội',
    title: 'Thông báo Ngưỡng đầu vào và quy đổi tương đương điểm trúng tuyển giữa các phương thức xét tuyển đại học chính quy năm 2026',
    url: 'https://tuyensinh.hup.edu.vn/noidung/1258/Thong-bao-Nguong-dau-vao-va-quy-doi-tuong-duong-diem-trung-tuyen-giua-',
    accessedAt: '2026-08-24',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo chính thức công bố ngưỡng đầu vào theo từng phương thức và từng ngành (khu vực 3, không cộng điểm). PT4 (thi TN THPT, thang 30): Dược học 22.00, Hoá dược 20.00, Hoá học 19.00, Công nghệ sinh học 19.00. Cũng có công thức quy đổi tương đương giữa các phương thức (chưa nhập vào runtime).',
  },
];
