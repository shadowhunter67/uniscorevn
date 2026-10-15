import { useMemo, useState } from 'react';
import { FIELDS } from '../taxonomy/fields';
import { getSchoolIdsForField } from '../taxonomy/taxonomyQueries';

interface FieldBrowsePageProps {
  onOpenField: (fieldId: string) => void;
  onBackHome: () => void;
}

/** "Tôi chưa biết nên chọn trường nào" — điểm vào luồng gợi ý theo lĩnh vực. Chỉ hiện field có
 * >=1 trường đã map dữ liệu ngành thật (không hứa hẹn cho field chưa có dữ liệu).
 *
 * Cố ý giữ dạng DANH SÁCH: mỗi lĩnh vực là một dòng bấm được, tách rõ tên + số trường + hướng đi tiếp. */
export function FieldBrowsePage({ onOpenField, onBackHome }: FieldBrowsePageProps) {
  const [query, setQuery] = useState('');
  const fieldsWithData = useMemo(
    () => FIELDS.map((field) => ({ field, schoolCount: getSchoolIdsForField(field.id).length })).filter((entry) => entry.schoolCount > 0),
    []
  );
  const normalizedQuery = query.trim().toLowerCase();
  const visibleFields = normalizedQuery
    ? fieldsWithData.filter(
        ({ field }) => field.name.toLowerCase().includes(normalizedQuery) || (field.shortName ?? '').toLowerCase().includes(normalizedQuery)
      )
    : fieldsWithData;

  return (
    <div className="min-h-svh bg-bg">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-10">
        <button
          type="button"
          onClick={onBackHome}
          className="-ml-1.5 inline-flex min-h-9 cursor-pointer items-center rounded-md px-1.5 text-sm font-medium text-accent underline-offset-2 transition-colors duration-150 hover:bg-accent/10 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        >
          ← Về trang chủ
        </button>

        <h1 className="mt-4 max-w-3xl text-3xl font-extrabold text-ink sm:text-4xl">Bạn quan tâm lĩnh vực nào?</h1>
        <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted">
          Chọn 1 lĩnh vực để xem các trường/ngành phù hợp với hồ sơ của bạn — dựa trên dữ liệu ngành và điểm chuẩn thật, không
          phải dự đoán khả năng trúng tuyển.
        </p>
        <p className="mt-2 text-sm font-medium text-ink-soft">
          {fieldsWithData.length}/{FIELDS.length} lĩnh vực có dữ liệu ngành đối chiếu; phần còn lại đang chờ bổ sung.
        </p>

        <div className="mt-6 max-w-3xl">
          <label htmlFor="field-search" className="text-sm font-medium text-ink">
            Tìm lĩnh vực theo tên
          </label>
          <input
            id="field-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ví dụ: Công nghệ thông tin, Kinh tế, Luật..."
            className="mt-1.5 min-h-(--ui-tap-min) w-full rounded-lg border border-border bg-surface px-4 text-base text-ink transition-colors duration-150 placeholder:text-muted hover:border-border-strong focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25"
          />
        </div>

        <p className="mt-4 text-sm text-muted" aria-live="polite">
          {visibleFields.length} lĩnh vực
        </p>

        {visibleFields.length === 0 ? (
          <p className="mt-3 rounded-md border border-border bg-surface p-5 text-center text-sm text-muted">
            Không có lĩnh vực nào khớp "{query}". Thử từ khóa ngắn hơn.
          </p>
        ) : (
          <ul className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {visibleFields.map(({ field, schoolCount }) => (
              <li key={field.id}>
                <button
                  type="button"
                  onClick={() => onOpenField(field.id)}
                  className="card flex min-h-(--ui-tap-min) w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left transition-shadow duration-150 hover:shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
                >
                  <span className="min-w-0 text-base font-bold text-ink">{field.name}</span>
                  <span className="flex shrink-0 items-center gap-3 text-right text-sm text-muted">
                    <span>
                      <span className="font-display text-xl font-bold leading-none text-accent">{schoolCount}</span>{' '}
                      trường
                    </span>
                    <span aria-hidden="true" className="text-base text-accent">
                      →
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
