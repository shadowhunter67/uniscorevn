import { FIELDS } from '../taxonomy/fields';
import { getSchoolIdsForField } from '../taxonomy/taxonomyQueries';

interface FieldBrowsePageProps {
  onOpenField: (fieldId: string) => void;
  onBackHome: () => void;
}

/** "Tôi chưa biết nên chọn trường nào" — điểm vào luồng gợi ý theo lĩnh vực. Chỉ hiện field có
 * >=1 trường đã map dữ liệu ngành thật (không hứa hẹn cho field chưa có dữ liệu). */
export function FieldBrowsePage({ onOpenField, onBackHome }: FieldBrowsePageProps) {
  const fieldsWithData = FIELDS.map((field) => ({ field, schoolCount: getSchoolIdsForField(field.id).length })).filter(
    (entry) => entry.schoolCount > 0
  );

  return (
    <div className="min-h-svh bg-bg">
      <main className="mx-auto max-w-3xl px-4 py-8 sm:py-10">
        <button type="button" onClick={onBackHome} className="text-sm font-medium text-accent underline-offset-2 hover:underline">
          Về trang chủ
        </button>

        <h1 className="mt-5 text-2xl font-bold text-ink sm:text-3xl">Bạn quan tâm lĩnh vực nào?</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
          Chọn 1 lĩnh vực để xem các trường/ngành phù hợp với hồ sơ của bạn — dựa trên dữ liệu ngành và điểm chuẩn thật, không
          phải dự đoán khả năng trúng tuyển.
        </p>
        <p className="mt-2 text-sm text-muted">
          Hiện chỉ {fieldsWithData.length}/{FIELDS.length} lĩnh vực đã có dữ liệu ngành đối chiếu được (những lĩnh vực còn lại
          đang chờ bổ sung dữ liệu).
        </p>

        <ul className="mt-6 divide-y divide-border border-y border-border">
          {fieldsWithData.map(({ field, schoolCount }) => (
            <li key={field.id}>
              <button
                type="button"
                onClick={() => onOpenField(field.id)}
                className="flex min-h-[--ui-tap-min] w-full items-center justify-between gap-3 py-3.5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <span className="text-base font-medium text-ink">{field.name}</span>
                <span className="shrink-0 text-sm text-muted">{schoolCount} trường có dữ liệu →</span>
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
