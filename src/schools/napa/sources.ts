import type { AdmissionSource } from '../../core/sourceRegistry';

export const napaSources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [
  {
    id: 'napa-admission-info-2026',
    publisher: 'Hoc vien Hanh chinh va Quan tri cong',
    title: 'Thong tin tuyen sinh trinh do dai hoc hinh thuc chinh quy nam 2026 cua Hoc vien Hanh chinh va Quan tri cong',
    url: 'https://apaghcm.edu.vn/thong-tin-tuyen-sinh-trinh-do-dai-hoc-hinh-thuc-chinh-quy-nam-2026-cua-hoc-vien-hanh-chinh-va-quan-tri-cong',
    accessedAt: '2026-09-26',
    publishedAt: '2026-03-04',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chinh thuc xac nhan ma truong HCH, 4 dia diem tuyen sinh va phuong thuc "Xet tuyen theo ket qua thi tot nghiep THPT nam 2026"; ban infographic Phan hieu TP.HCM cung ghi phuong thuc 1 dua tren ket qua thi TN THPT.',
  },
  {
    id: 'napa-cutoff-2026',
    publisher: 'Hoi dong tuyen sinh dai hoc hinh thuc chinh quy nam 2026 - Hoc vien Hanh chinh va Quan tri cong',
    title: 'Thong bao diem trung tuyen dai hoc hinh thuc chinh quy va thu tuc, thoi gian xac nhan nhap hoc dot 1 nam 2026',
    url: 'https://apaghcm.edu.vn/hoc-vien-hanh-chinh-va-quan-tri-cong-thong-bao-diem-chuan-dai-hoc-hinh-thuc-chinh-quy-va-thu-tuc-thoi-gian-xac-nhan-nhap-hoc-dot-1-nam-2026',
    accessedAt: '2026-09-26',
    publishedAt: '2026-08-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thong bao so 1738-TB/HDTS ngay 10/8/2026, anh goc tren media.apag.edu.vn co chu ky va con dau. Bang diem trung tuyen da quy doi ve phuong thuc goc, to hop mon goc D01, thang 30, theo tung ma xet tuyen tai Ha Noi, Da Nang, TP.HCM va Dak Lak.',
  },
  {
    id: 'napa-law-floor-2026',
    publisher: 'Hoc vien Hanh chinh va Quan tri cong',
    title: 'Thong bao Nguong bao dam chat luong dau vao dai hoc hinh thuc chinh quy nam 2026 nganh Luat',
    url: 'https://apag.edu.vn/thong-bao-nguong-bao-dam-chat-luong-dau-vao-dai-hoc-hinh-thuc-chinh-quy-nam-2026-nganh-luat-bao-gom-chuyen-nganh-thanh-tra-thuoc-nganh-luat-cua-hoc-vien-hanh-chinh-va-quan-tri-cong-9156.htm',
    accessedAt: '2026-09-26',
    publishedAt: '2026-07-10',
    sourceType: 'official-school',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thong bao rieng cho nganh Luat va chuyen nganh Thanh tra thuoc nganh Luat; yeu cau tong diem toi thieu 60% thang 30 va diem mon Toan/Van theo thanh phan to hop toi thieu 60% thang 10.',
  },
  {
    id: 'moet-priority-2026',
    publisher: 'Bo Giao duc va Dao tao',
    title: 'Thong tu 06/2026/TT-BGDDT ban hanh Quy che tuyen sinh cac nganh dao tao trinh do dai hoc',
    url: 'https://tuyensinh.moet.gov.vn/ts/van-ban/thong-tu-06-2026-tt-bgddt-cua-bo-giao-duc-va-dao-tao-ban-hanh-quy-che-tuyen-sinh-cac-nganh-dao-tao-t--9483cd05-0038-4279-8fe7-ea36aa5e67ac',
    accessedAt: '2026-09-26',
    publishedAt: '2026-02-15',
    sourceType: 'government',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Dieu 7: diem uu tien KV/DT tren thang 30 va cong thuc giam diem uu tien khi tong diem tu 22,5 tro len.',
  },
];
