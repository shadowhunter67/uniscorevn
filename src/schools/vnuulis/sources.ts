import type { SourceLifecycle } from '../../core/freshness';
import type { SourceType } from '../../core/admissionHistory';
import type { VerificationLevel } from '../../core/trust';

export interface VnuulisSource {
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

export const vnuulisSources: VnuulisSource[] = [
  {
    id: 'vnuulis-admission-notice-2026',
    publisher: 'VNU University of Languages and International Studies (ULIS), Vietnam National University, Hanoi',
    title: 'Official 2026 undergraduate admission announcement',
    url: 'https://ulis.vnu.edu.vn/tbtsdh26/',
    accessedAt: '2026-08-24',
    publishedAt: '2026-04-15',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official ULIS 2026 announcement. Fetched and confirmed live 2026-08-24. States: "Điểm môn Ngoại ngữ (bao gồm cả điểm quy đổi từ chứng chỉ ngoại ngữ) tính hệ số 2" (foreign-language score, including converted certificate score, counts coefficient 2) and "Tổng điểm trên thang điểm 40 được quy đổi về điểm xét tuyển trên thang điểm 30, làm tròn đến hai chữ số thập phân" (total on scale 40 is converted to a /30 admission score, rounded to 2 decimals). Also references certificate-combined and HSA methods and a certificate-conversion appendix not yet normalized.',
  },
  {
    id: 'vnuulis-threshold-notice-2026',
    publisher: 'VNU University of Languages and International Studies (ULIS), Vietnam National University, Hanoi',
    title: 'Official 2026 quality-assurance input threshold notice',
    url: 'https://ulis.vnu.edu.vn/thong-bao-ve-nguong-dam-bao-chat-luong-dau-vao-tuyen-sinh-cac-nganh-dao-tao-dai-hoc-truong-dai-hoc-ngoai-ngu-dhqghn-nam-2026/',
    accessedAt: '2026-08-24',
    sourceType: 'official-admission',
    verification: 'verified',
    lifecycle: { effectiveYear: 2026, status: 'current' },
    note:
      'Official ULIS 2026 threshold notice. Fetched and confirmed live 2026-08-24. States regular programs: "Ngưỡng đảm bảo chất lượng đầu vào đối với phương thức sử dụng kết quả thi tốt nghiệp THPT năm 2026: 19 điểm (thang điểm 30)" applying to THPT exam, certificate-combined, and HSA methods. International-partnership programs: 15/30 (THPT exam, certificate-combined, HSA) and 18/30 for the transcript route ("xét trên tổng điểm trung bình các môn thuộc tổ hợp xét tuyển của ba năm THPT").',
  },
];
