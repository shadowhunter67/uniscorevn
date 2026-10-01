import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface NtuSource {
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

export const ntuSources: NtuSource[] = [
  {
    id: 'ntu-cutoff-2026',
    publisher: 'Trường Đại học Nha Trang',
    title: 'Thông báo điểm chuẩn trúng tuyển năm 2026',
    url: 'https://tuyensinh.ntu.edu.vn/thong-bao/thong-bao-diem-chuan-trung-tuyen-nam-2026',
    accessedAt: '2026-10-01',
    publishedAt: '2026-08-12',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang tuyển sinh chính thức của NTU, bảng HTML đọc trực tiếp. Bảng 1: 53 chương trình (đặc biệt và chuẩn), mỗi chương trình có điểm trúng tuyển THPT RIÊNG cho từng mã tổ hợp (4-6 tổ hợp, 19,62-27,66), kèm điểm ĐGNL ĐHQG-HCM/HN và điều kiện tiếng Anh. Bảng 2 diễn giải 24 mã tổ hợp: "Toán*2, Ngữ văn, Tiếng Anh" (T2VA)... "Toán, Ngữ văn, Tiếng Anh, Địa lý" (TVAD)... Hai dòng 7520320 và 7620301 gộp ô "TVAH TVLH" cùng điểm 20,93.',
  },
  {
    id: 'ntu-equivalence-2026',
    publisher: 'Trường Đại học Nha Trang',
    title: 'Bảng quy đổi điểm tương đương giữa các phương thức xét tuyển năm 2026 (30/07/2026)',
    url: 'https://tuyensinh.ntu.edu.vn/thong-bao/quy-doi-diem-tuong-duong',
    accessedAt: '2026-10-01',
    publishedAt: '2026-07-30',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Thông báo của Chủ tịch HĐTS: bảng quy đổi tương đương giữa ĐGNL ĐHQG-HCM (thang 1.200), ĐGNL ĐHQG-HN (thang 150) và "điểm thi TN THPT (thang điểm 40)" năm 2026. Xác nhận thang điểm THPT của NTU năm 2026 là thang 40. Trang Đề án tuyển sinh ghi phương thức THPT là "tổ hợp 4 môn, thang điểm 40".',
  },
];
