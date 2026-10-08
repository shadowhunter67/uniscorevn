/** Đếm ô đã nhập (chuỗi không rỗng) trong object form lồng nhau — chỉ để hiện tiến độ, không dùng cho tính điểm. */
export function countFilledFields(values: unknown): { filled: number; total: number } {
  if (typeof values === 'string') return { filled: values.trim() === '' ? 0 : 1, total: 1 };
  if (values && typeof values === 'object') {
    return Object.values(values).reduce<{ filled: number; total: number }>(
      (acc, value) => {
        const next = countFilledFields(value);
        return { filled: acc.filled + next.filled, total: acc.total + next.total };
      },
      { filled: 0, total: 0 }
    );
  }
  return { filled: 0, total: 0 };
}
