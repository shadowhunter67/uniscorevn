import type { AdmissionSource } from '../../core/sourceRegistry';

export const uttSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'utt-threshold-2026',
    publisher: 'Trường Đại học Công nghệ Giao thông vận tải',
    title: 'Thông báo điểm sàn đăng ký xét tuyển giữa các phương thức xét tuyển năm 2026',
    url: 'https://utt.edu.vn/vn/tuyensinh/tuyen-sinh/dai-hoc-chinh-quy/thong-bao-diem-san-dang-ky-xet-tuyen-giua-cac-phuong-thuc-xet-tuyen-nam-2026-a17263.html',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-07',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Đã fetch trực tiếp trang chính thức (curl 2026-08-29, HTTP 200, User-Agent trình duyệt thật). Bảng đầy đủ 75 mã xét tuyển (7 mục: I. Chuẩn Hà Nội 48 mã; II. Đường sắt tốc độ cao/đô thị 4 mã; III. Tài năng 5 mã; IV. Tăng cường tiếng Anh 8 mã; V. Định hướng Nhật Bản 3 mã; VI. Liên kết quốc tế 2 mã; VII. Phú Thọ 5 mã), cột "Điểm thi THPT 2026" là ngưỡng đảm bảo chất lượng đầu vào phương thức thi TN THPT — đã nhập đủ vào `thresholds.ts`. Công thức công bố TRỰC TIẾP: "Điểm xét tuyển theo phương thức xét tuyển bằng kết quả thi THPT năm 2026 = Tổng điểm 03 môn thi theo tổ hợp xét tuyển + Điểm Ưu tiên (Khu vực, Đối tượng)"; ghi chú "Điểm sàn nêu trên đã bao gồm cả điểm thưởng (nếu có) và điểm ưu tiên khu vực, đối tượng (nếu có)" — nghĩa là ngưỡng SO VỚI tổng đã cộng ưu tiên (không cần judgment call cho vế so sánh, khác CTU/UTM). Nguồn KHÔNG in bảng mức điểm KV/ĐT cụ thể — áp judgment call chuẩn quốc gia cho GIÁ TRỊ bảng ưu tiên (`priority.ts`). Ngành Vi mạch bán dẫn/Luật/Đường sắt có thêm ghi chú "phải đảm bảo mức điểm và các điều kiện bổ sung (nếu có) theo quy định của Bộ GD&ĐT" — không nêu chi tiết, không rõ có ảnh hưởng điểm hay chỉ điều kiện phụ (sức khoẻ/chứng chỉ), ghi nhận là knowledge gap không chặn tính điểm. Trường KHÔNG công bố tổ hợp môn cụ thể theo từng mã trong chính thông báo này — nhánh exact không validate tổ hợp theo mã ngành.',
  },
];
