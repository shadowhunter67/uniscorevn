import type { AdmissionSource } from '../../core/sourceRegistry';

export const napaSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'napa-admission-info-2026',
    publisher: 'Học viện Hành chính và Quản trị công',
    title: 'Thông tin tuyen sinh trình độ đại học hinh thuc chính quy năm 2026 của Hoc vien Hanh chinh va Quan tri cong',
    url: 'https://apaghcm.edu.vn/thong-tin-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-chinh-quy-nam-2026-cua-hoc-vien-hanh-chinh-va-quan-tri-cong',
    accessedAt: '2026-09-26',
    publishedAt: '2026-03-04',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức xác nhận mã trường HCH, 4 dia điểm từyen sinh va phương thức "Xet tuyen theo kết quả thi tốt nghiệp THPT năm 2026"; ban infographic Phân hiệu TP.HCM cung ghi phương thức 1 dua tren kết quả thi TN THPT.',
  },
  {
    id: 'napa-cutoff-2026',
    publisher: 'Hoi dong tuyen sinh đại học hinh thuc chính quy năm 2026 - Hoc vien Hanh chinh va Quan tri cong',
    title: 'Thông báo điểm trúng tuyển đại học hinh thuc chính quy va thu tuc, thoi gian xác nhận nhap hoc dot 1 năm 2026',
    url: 'https://apaghcm.edu.vn/hoc-vien-hanh-chinh-va-quan-tri-cong-thong-bao-diem-chuan-dai-hoc-hinh-thuc-chinh-quy-va-thu-tuc-thoi-gian-xac-nhan-nhap-hoc-dot-1-nam-2026',
    accessedAt: '2026-09-26',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo so 1738-TB/HDTS ngay 10/8/2026, ảnh gốc tren media.apag.edu.vn co chu ky va con dau. Bang điểm trúng tuyển đã quy đổi về phương thức gốc, tổ hợp môn gốc D01, thang 30, theo tung ma xét tuyển tai Hà Nội, Đà Nẵng, TP.HCM va Đắk Lắk.',
  },
  {
    id: 'napa-law-floor-2026',
    publisher: 'Học viện Hành chính và Quản trị công',
    title: 'Thông báo Nguong bao dam chất lượng đầu vào đại học hinh thuc chính quy năm 2026 ngành Luật',
    url: 'https://apag.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-hinh-thuc-chinh-quy-nam-2026-nganh-luat-bao-gom-chuyen-nganh-thanh-tra-thuoc-nganh-luat-cua-hoc-vien-hanh-chinh-va-quan-tri-cong-9156.htm',
    accessedAt: '2026-09-26',
    publishedAt: '2026-07-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo riêng cho ngành Luật va chuyen ngành Thanh tra thuoc ngành Luật; yeu cau tổng điểm tối thiểu 60% thang 30 va điểm môn Toán/Văn theo thanh phan tổ hợp tối thiểu 60% thang 10.',
  },
  {
    id: 'moet-priority-2026',
    publisher: 'Bo Giao duc va Dao tao',
    title: 'Thong tu 06/2026/TT-BGDĐT ban hanh Quy chế tuyen sinh các ngành đào tạo trình độ đại học',
    url: 'https://tuyensinh.moet.gov.vn/ts/van-ban/thong-tu-06-2026-tt-bgddt-cua-bo-giao-duc-va-dao-tao-ban-hanh-quy-che-tuyen-sinh-cac-nganh-dao-tao-t--9483cd05-0038-4279-8fe7-ea36aa5e67ac',
    accessedAt: '2026-09-26',
    publishedAt: '2026-02-15',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Điều 7: điểm ưu tiên KV/ĐT tren thang 30 và công thức giam điểm ưu tiên khi tổng điểm từ 22,5 trở lên.',
  },
];
