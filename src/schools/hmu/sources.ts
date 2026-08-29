import type { AdmissionSource } from '../../core/sourceRegistry';

export const hmuSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'hmu-threshold-2026',
    publisher: 'Trường Đại học Y Hà Nội (HMU)',
    title: 'Thông báo số 3142/TB-ĐHYHN về ngưỡng đảm bảo chất lượng đầu vào (điểm sàn) trình độ đại học hệ chính quy năm 2026',
    url: 'https://daibieunhandan.vn/truong-dai-hoc-y-ha-noi-thong-bao-diem-san-va-cac-moc-quy-doi-diem-nam-2026-10423254.html',
    accessedAt: '2026-08-29',
    publishedAt: '2026-07-10',
    sourceType: 'official-admission',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Không tìm được bản PDF/trang gốc hmu.edu.vn hoặc tuyensinh.hmu.edu.vn đăng trực tiếp văn bản số 3142/TB-ĐHYHN (10/07/2026) tại thời điểm research (2026-08-29) — trang tuyensinh.hmu.edu.vn không có link công khai tới văn bản số hoá. Số liệu được đối chiếu khớp tuyệt đối giữa NHIỀU báo chí chính thống trích dẫn trực tiếp số hiệu và ngày ban hành văn bản (suckhoedoisong.vn, daibieunhandan.vn, bnews.vn, giadinh.suckhoedoisong.vn, thi.tuyensinh247.com) — đủ 20 mã ngành (15 ngành cơ sở Hà Nội + 5 ngành/chương trình Phân hiệu Thanh Hoá), điểm sàn 17,0-24,0/30. Nguồn xác nhận rõ: ngưỡng là TỔNG ĐIỂM 3 MÔN THI KHÔNG NHÂN HỆ SỐ, KHÔNG TÍNH ĐIỂM CỘNG (áp dụng thí sinh khu vực 3) — nghĩa là điểm ưu tiên khu vực/đối tượng và điểm khuyến khích chứng chỉ ngoại ngữ KHÔNG được cộng vào khi so với ngưỡng này (khác điểm chuẩn trúng tuyển thực tế, vốn có cộng ưu tiên/điểm thưởng và cao hơn sàn). `verification: cross-checked` vì chưa đọc được văn bản gốc dạng PDF/ảnh — chỉ có nhiều nguồn thứ cấp độc lập đồng thuận tuyệt đối, không phải trực tiếp tải/đọc văn bản chính thức.',
  },
];
