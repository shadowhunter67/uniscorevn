import type { ApplicantProfile } from '../core/applicantProfile';
import type { ApplicantProfileSummary } from '../core/applicantProfileSummary';

/**
 * Tóm tắt hồ sơ điểm dạng bảng gọn để QUÉT NHANH, thay cho một dòng chữ nối bằng dấu chấm giữa
 * ("ĐGNL: 900 · THPT: 5 môn đã lưu · …") vốn phải đọc tuần tự mới biết thiếu gì.
 *
 * Mỗi mục nói rõ "đã có gì" hoặc "chưa nhập" — trạng thái truyền bằng CHỮ và ký hiệu ✓/·, không
 * chỉ bằng màu. Thuần trình bày: nhận `summary` đã tính sẵn từ `summarizeApplicantProfile`.
 */
export function ProfileSummary({ summary, profile }: { summary: ApplicantProfileSummary; profile: ApplicantProfile }) {
  const rows: { label: string; value?: string }[] = [
    { label: 'ĐGNL', value: summary.vactTotal !== undefined ? String(summary.vactTotal) : undefined },
    { label: 'Điểm THPT', value: summary.thptSubjectCount > 0 ? `${summary.thptSubjectCount} môn` : undefined },
    { label: 'Học bạ', value: summary.transcriptSubjectCount > 0 ? `${summary.transcriptSubjectCount} môn` : undefined },
    {
      label: 'Khu vực / ưu tiên',
      value: summary.hasPriority ? [profile.priority?.region, profile.priority?.category].filter(Boolean).join(' · ') : undefined,
    },
    { label: 'Chứng chỉ', value: summary.certificateCount > 0 ? `${summary.certificateCount} chứng chỉ` : undefined },
  ];

  return (
    <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-sm sm:grid-cols-[auto_1fr_auto_1fr] sm:gap-x-5">
      {rows.map((row) => (
        <div key={row.label} className="contents">
          <dt className="text-muted">{row.label}</dt>
          <dd className={row.value ? 'font-medium text-ink' : 'text-muted'}>
            <span aria-hidden="true" className="mr-1 text-muted">
              {row.value ? '✓' : '·'}
            </span>
            {row.value ?? 'chưa nhập'}
          </dd>
        </div>
      ))}
    </dl>
  );
}
