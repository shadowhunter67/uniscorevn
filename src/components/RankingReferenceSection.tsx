import { resolveRankingsForSchool } from '../ranking/rankingEntities';
import { RANKING_SYSTEM_LABELS } from '../ranking/rankingTypes';

/**
 * "Xếp hạng tham khảo" — chỉ hiện khi CÓ record thật (không hiện khối rỗng "chưa có dữ liệu" gây
 * rối, xem docs/design-system.md "không nhồi thông tin"). Ranking hệ thống mẹ luôn hiện dưới tiêu
 * đề tách biệt rõ ràng — KHÔNG BAO GIỜ trộn vào phần "ranking của trường".
 */
export function RankingReferenceSection({ schoolId }: { schoolId: string }) {
  const { ownRecords, parentSystemRecords } = resolveRankingsForSchool(schoolId);
  if (ownRecords.length === 0 && parentSystemRecords.length === 0) return null;

  return (
    <section className="mt-5 rounded-card border border-ink/10 bg-surface p-4">
      <h2 className="text-sm font-semibold text-ink">Xếp hạng tham khảo</h2>
      <p className="mt-1 text-xs text-muted">Chỉ mang tính tham khảo — KHÔNG dùng để đánh giá khả năng trúng tuyển.</p>

      {ownRecords.length > 0 && (
        <ul className="mt-2 space-y-1 text-sm text-ink-soft">
          {ownRecords.map((record) => (
            <li key={`${record.system}-${record.edition}`}>
              {RANKING_SYSTEM_LABELS[record.system]} {record.edition}: {record.rankRangeLabel ?? (record.rank ? `#${record.rank}` : '—')}
            </li>
          ))}
        </ul>
      )}

      {parentSystemRecords.map(({ system, records }) => (
        <div key={system.entityId} className="mt-3 rounded-md border border-border bg-surface-soft px-3 py-2">
          <p className="text-xs font-medium text-ink">
            {system.displayName} có mặt trong xếp hạng sau (không phải xếp hạng riêng của trường này):
          </p>
          <ul className="mt-1 space-y-1 text-sm text-ink-soft">
            {records.map((record) => (
              <li key={`${record.system}-${record.edition}`}>
                {RANKING_SYSTEM_LABELS[record.system]} {record.edition}: {record.rankRangeLabel ?? (record.rank ? `#${record.rank}` : '—')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
}
