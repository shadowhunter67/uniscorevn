import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface TguSource {
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

export const tguSources: TguSource[] = [
  {
    id: 'tgu-admission-info-2026',
    publisher: 'Truong Dai hoc Tien Giang (Tien Giang University)',
    title: 'Diem chuan / Nguong dam bao chat luong dau vao Truong Dai hoc Tien Giang nam 2026',
    url: 'https://diemthi.tuyensinh247.com/diem-chuan/dai-hoc-tien-giang-TTG.html',
    accessedAt: '2026-08-24',
    publishedAt: '2026-08-10',
    sourceType: 'secondary',
    verification: 'cross-checked',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Tong hop diem chuan cong bo 10/08/2026 cua TGU (2045 chi tieu, 5 phuong thuc). Cong thuc nguong duoc trich dan nhat quan giua nhieu nguon doc lap (bao gom bao dia phuong nha nuoc baodongthap.vn): tong 3 mon thi TN THPT >= 15,0/30 (kem dieu kien mon Toan/Van >= 1/3 diem xet tuyen); rieng nganh Luat >= 18,0/30 (Toan hoac Van >= 6,0). Khong tim duoc trang tgu.edu.vn goc co van ban day du (chi co trang dieu huong chung); dung nguon thu cap doc lap, khop nhau nhieu lan lam can cu.',
  },
];
