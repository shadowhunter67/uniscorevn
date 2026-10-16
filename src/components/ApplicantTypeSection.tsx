import { Users } from 'lucide-react';
import {
  APPLICANT_TYPE_INFO,
  HCMUT_APPLICANT_TYPES,
  SUPPORTED_APPLICANT_TYPES,
  type HcmutApplicantType,
} from '../schools/hcmut/types/applicantType';

interface ApplicantTypeSectionProps {
  value: HcmutApplicantType;
  onChange: (type: HcmutApplicantType) => void;
}

export function ApplicantTypeSection({ value, onChange }: ApplicantTypeSectionProps) {
  const isSupported = SUPPORTED_APPLICANT_TYPES.includes(value);

  return (
    <section className="card p-6 sm:p-7">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="flex h-11 w-11 items-center justify-center rounded-xl bg-accent/10 text-accent">
          <Users size={22} />
        </span>
        <h2 className="text-xl font-bold text-ink">Bạn thuộc nhóm nào?</h2>
      </div>
      <p className="mt-1 text-sm text-muted sm:pl-14">
        HCMUT xét tuyển tổng hợp cho nhiều nhóm thí sinh khác nhau — chọn đúng nhóm để tính điểm chính xác.
      </p>

      <div role="radiogroup" aria-label="Nhóm thí sinh" className="mt-4 flex flex-col gap-2">
        {HCMUT_APPLICANT_TYPES.map((type) => {
          const info = APPLICANT_TYPE_INFO[type];
          const selected = value === type;
          return (
            <button
              key={type}
              type="button"
              role="radio"
              aria-checked={selected}
              onClick={() => onChange(type)}
              className={`flex items-start gap-3 rounded-xl border p-3.5 text-left text-sm transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 ${
                selected ? 'border-accent bg-accent/10' : 'border-border bg-surface hover:bg-surface-soft'
              }`}
            >
              <span
                aria-hidden="true"
                className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${selected ? 'border-accent' : 'border-border-strong'}`}
              >
                {selected && <span className="h-2.5 w-2.5 rounded-full bg-accent" />}
              </span>
              <span className="min-w-0">
                <span className={`block text-base font-semibold ${selected ? 'text-accent' : 'text-ink'}`}>{info.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{info.description}</span>
              </span>
            </button>
          );
        })}
      </div>

      {!isSupported && (
        <p className="mt-4 rounded-lg bg-warning/10 p-3 text-xs leading-relaxed text-warning">
          Nhóm này chưa có công thức đủ rõ từ nguồn chính thức HCMUT 2026 nên UniscoreVN chưa tính điểm được — tránh
          hiển thị kết quả sai. Xem chi tiết research tại{' '}
          <a
            href="https://github.com/shadowhunter67/uniscorevn/blob/main/docs/data-methodology.md"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2"
          >
            docs/data-methodology.md
          </a>
          .
        </p>
      )}
    </section>
  );
}
