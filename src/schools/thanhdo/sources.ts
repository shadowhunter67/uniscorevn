import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface ThanhdoSource {
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

export const thanhdoSources: ThanhdoSource[] = [
  {
    id: 'thanhdo-cutoff-2026',
    publisher: 'Trường Đại học Thành Đô (Thanh Do University)',
    title: 'Trường Đại học Thành Đô chính thức công bố điểm chuẩn trúng tuyển đại học chính quy năm 2026',
    url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-chinh-thuc-cong-bo-diem-chuan-trung-tuyen-dai-hoc-chinh-quy-nam-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức thanhdo.edu.vn công bố điểm chuẩn 2026 theo 4 phương thức: thi TN THPT (16,0-20,0/30 tuy ngành, 14 ngành), học bạ (18,0/30 cho 13 ngành, 20,0 Dược học), danh gia năng lực/tư duy (HSA >=75/150, TSA >=50/100), va chương trình liên kết quốc tế. Xac nhan lai 2026-08-28 (WebFetch): trích nguyên văn "Mức điểm trúng tuyển áp dụng đối với thí sinh thuoc Khu vực 3, được xác định theo tổng điểm của 03 bai thi/môn thi trong tổ hợp xét tuyển, theo thang điểm 30, không nhân hệ số, không tính điểm cộng" — CHI loai tru điểm cộng (bonus), KHONG để cap điểm ưu tiên khu vực/đối tượng (xem priority.ts cho judgment call). Bang điểm chuẩn day du 14/14 ngành (6 mức: 16,0/16,5/17,0/17,5/18,0/20,0) xác nhận khớp knowledgeGaps đã ghi truoc do.',
  },
  {
    id: 'thanhdo-admission-info-2026',
    publisher: 'Trường Đại học Thành Đô (Thanh Do University)',
    title: 'Trường Đại học Thành Đô công bố thông tin tuyen sinh đại học chính quy 2026',
    url: 'https://thanhdo.edu.vn/truong-dai-hoc-thanh-do-cong-bo-thong-tin-tuyen-sinh-dai-hoc-chinh-quy-2026',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Trang chính thức liet ke tổ hợp môn xét tuyển theo nhóm ngành (Công nghệ, Kinh tế-Luật, Sức khỏe, Ngon ngu-Xã hội) nhung không nêu lai mức điểm chuẩn cụ thể (xem thanhdo-cutoff-2026 cho mức điểm).',
  },
];
