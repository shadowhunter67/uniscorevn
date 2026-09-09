import type { RankingRecord } from './rankingTypes';

/**
 * Research 2026-09-08: đã thử trực tiếp QS (topuniversities.com → HTTP 403, kể cả các trang
 * institution-detail), THE (timeshighereducation.com → trang search chỉ render bảng qua JS, fetch
 * tĩnh không thấy số liệu; trang institution riêng lẻ như /world-university-rankings/vinuniversity
 * cũng không lộ rank/band trong HTML tĩnh), CWUR (cwur.org, kể cả trang institution riêng như
 * /2025/vietnam-national-university,-hanoi.php → HTTP 403), ARWU (shanghairanking.com/rankings/arwu/2024
 * → fetch được nhưng bảng hiển thị chỉ top 30 toàn cầu, không có trường VN nào trong phạm vi đó).
 * chrome-devtools MCP (để login/render JS như trình duyệt thật cho QS/THE) KHÔNG dùng được trong
 * phiên này — browser instance bị khoá bởi 1 phiên Claude khác đang chạy cùng profile
 * (`chrome-devtools-mcp` báo "browser is already running"), không an toàn để kill vì có thể phá
 * phiên khác. => QS/THE/CWUR/ARWU vẫn để trống, đúng tinh thần "KHÔNG bịa số hạng" của file này.
 *
 * VNUR (vnur.vn) thì fetch trực tiếp được — không bị chặn, không cần JS render, dữ liệu tĩnh trong
 * HTML. Đã lấy `https://vnur.vn/bang-xep-hang-top-100-truong-dai-hoc-viet-nam-nam-2026/` (ấn bản
 * VNUR-2026, công bố 2026), top 10 trường xác nhận khớp với tường thuật độc lập từ báo chí
 * (daibieunhandan.vn, giaoduc.net.vn) — không thêm quá top 10 vì phần còn lại của bảng chỉ render
 * dần qua JS/pagination, không lấy được nguyên văn để trích dẫn chắc chắn theo từng hạng cụ thể.
 * 1 tên trong top 10 (Trường ĐH Khoa học và Công nghệ Hà Nội — USTH, hạng 7) không có trong
 * `schoolRegistry` hiện tại nên KHÔNG thêm record (không có entityId hợp lệ để gắn).
 */
const VNUR_2026_SOURCE = {
  sourceUrl: 'https://vnur.vn/bang-xep-hang-top-100-truong-dai-hoc-viet-nam-nam-2026/',
  sourceTitle: 'BẢNG XẾP HẠNG TOP 100 TRƯỜNG ĐẠI HỌC VIỆT NAM NĂM 2026 (VNUR-2026) — VNUR.VN',
  retrievedAt: '2026-09-08',
} as const;

/**
 * Research 2026-09-09: chrome-devtools MCP dùng được (không còn bị khoá profile như phiên trước).
 * Lấy trực tiếp từ QS (topuniversities.com) và THE (timeshighereducation.com) — cả 2 site render
 * bảng qua JS (React), phải chờ DOM render rồi đọc live qua `evaluate_script` (không phải fetch
 * tĩnh). QS: filter `?countries=vn` trên trang world/asia-university-rankings liệt kê TOÀN BỘ
 * trường Việt Nam có mặt trong bảng (xác nhận qua "X of X" pagination). THE: trang không có filter
 * quốc gia thao tác được qua DOM (dropdown React không mở được bằng dispatch event), dùng ô "Search
 * by university name" tra từng tên; test các từ khoá con (ví dụ "Economics", "Industrial") xác
 * nhận những trường KHÔNG lộ ra ở THE thật sự vắng mặt trong bảng (không phải lỗi tên gọi khác).
 * Toàn bộ record dưới đây là số liệu đọc trực tiếp từ trang publisher — không qua báo chí trung
 * gian, cursor lấy từ khi tab QS/THE mở trong phiên này.
 */
const QS_WORLD_2027_SOURCE = {
  sourceUrl: 'https://www.topuniversities.com/world-university-rankings?countries=vn',
  sourceTitle: 'QS World University Rankings 2027: Top Global Universities | TopUniversities (lọc Country=Vietnam)',
  retrievedAt: '2026-09-09',
} as const;

const QS_ASIA_2026_SOURCE = {
  sourceUrl: 'https://www.topuniversities.com/asia-university-rankings?countries=vn',
  sourceTitle: 'QS University Rankings for Asian 2026 | TopUniversities (lọc Country=Vietnam)',
  retrievedAt: '2026-09-09',
} as const;

const THE_WORLD_2026_SOURCE = {
  sourceUrl: 'https://www.timeshighereducation.com/world-university-rankings/latest/world-ranking',
  sourceTitle: 'World University Rankings 2026 | Times Higher Education (THE) (tra từng tên trường)',
  retrievedAt: '2026-09-09',
} as const;

const THE_ASIA_2026_SOURCE = {
  sourceUrl: 'https://www.timeshighereducation.com/world-university-rankings/2026/regional-ranking',
  sourceTitle: 'Asia University Rankings 2026 | Best Universities in Asia | Times Higher Education (THE) (tra từng tên trường)',
  retrievedAt: '2026-09-09',
} as const;

const SYSTEM_NOTE_VNU_HANOI =
  'Ranking hệ thống ĐHQG Hà Nội — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).';
const SYSTEM_NOTE_VNU_HCM =
  'Ranking hệ thống ĐHQG TP.HCM — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).';
const SYSTEM_NOTE_DA_NANG =
  'Ranking hệ thống Đại học Đà Nẵng — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).';
const SYSTEM_NOTE_HUE =
  'Ranking hệ thống Đại học Huế — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).';

const QS_WORLD_2027_RECORDS: readonly RankingRecord[] = [
  { entityId: 'dtu', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rank: 504, ...QS_WORLD_2027_SOURCE, note: 'Đồng hạng (=504) trong bảng gốc.' },
  { entityId: 'system:vnu-hanoi', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '751-760', ...QS_WORLD_2027_SOURCE, note: SYSTEM_NOTE_VNU_HANOI },
  { entityId: 'tdtu', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '801-850', ...QS_WORLD_2027_SOURCE },
  { entityId: 'system:vnu-hcm', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '801-850', ...QS_WORLD_2027_SOURCE, note: SYSTEM_NOTE_VNU_HCM },
  { entityId: 'hust', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '1001-1200', ...QS_WORLD_2027_SOURCE },
  { entityId: 'vlu', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '1001-1200', ...QS_WORLD_2027_SOURCE },
  { entityId: 'ctu', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '1401+', ...QS_WORLD_2027_SOURCE },
  { entityId: 'hutech', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '1401+', ...QS_WORLD_2027_SOURCE },
  { entityId: 'iuh', system: 'qs-world', edition: 'QS World 2027', kind: 'overall', rankRangeLabel: '1401+', ...QS_WORLD_2027_SOURCE },
];

const QS_ASIA_2026_RECORDS: readonly RankingRecord[] = [
  { entityId: 'system:vnu-hanoi', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 158, ...QS_ASIA_2026_SOURCE, note: SYSTEM_NOTE_VNU_HANOI },
  { entityId: 'dtu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 165, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=165) trong bảng gốc.' },
  { entityId: 'system:vnu-hcm', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 175, ...QS_ASIA_2026_SOURCE, note: SYSTEM_NOTE_VNU_HCM },
  { entityId: 'tdtu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 231, ...QS_ASIA_2026_SOURCE },
  { entityId: 'vlu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 251, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=251) trong bảng gốc.' },
  { entityId: 'hutech', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 287, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=287) trong bảng gốc.' },
  { entityId: 'hust', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 315, ...QS_ASIA_2026_SOURCE },
  { entityId: 'ueh', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 318, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=318) trong bảng gốc.' },
  { entityId: 'iuh', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 355, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=355) trong bảng gốc.' },
  { entityId: 'nttu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 437, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=437) trong bảng gốc.' },
  { entityId: 'system:da-nang', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 439, ...QS_ASIA_2026_SOURCE, note: `${SYSTEM_NOTE_DA_NANG} Đồng hạng (=439) trong bảng gốc.` },
  { entityId: 'system:hue', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 450, ...QS_ASIA_2026_SOURCE, note: `${SYSTEM_NOTE_HUE} Đồng hạng (=450) trong bảng gốc.` },
  { entityId: 'ctu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 493, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=493) trong bảng gốc.' },
  { entityId: 'ftu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 580, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=580) trong bảng gốc.' },
  { entityId: 'utc', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rank: 607, ...QS_ASIA_2026_SOURCE, note: 'Đồng hạng (=607) trong bảng gốc.' },
  { entityId: 'ou', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '721-730', ...QS_ASIA_2026_SOURCE },
  { entityId: 'vnua', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '781-790', ...QS_ASIA_2026_SOURCE },
  { entityId: 'hnue', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '801-850', ...QS_ASIA_2026_SOURCE },
  { entityId: 'hcmute', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '901-950', ...QS_ASIA_2026_SOURCE },
  { entityId: 'nlu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '951-1000', ...QS_ASIA_2026_SOURCE },
  { entityId: 'phenikaa', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '951-1000', ...QS_ASIA_2026_SOURCE },
  { entityId: 'tlu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '1001-1100', ...QS_ASIA_2026_SOURCE },
  { entityId: 'tmu', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '1101-1200', ...QS_ASIA_2026_SOURCE },
  { entityId: 'bav', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '1201-1300', ...QS_ASIA_2026_SOURCE },
  { entityId: 'vinhuni', system: 'qs-asia', edition: 'QS Asia 2026', kind: 'overall', rankRangeLabel: '1201-1300', ...QS_ASIA_2026_SOURCE },
];

const THE_WORLD_2026_RECORDS: readonly RankingRecord[] = [
  { entityId: 'system:vnu-hanoi', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1201-1500', ...THE_WORLD_2026_SOURCE, note: SYSTEM_NOTE_VNU_HANOI },
  { entityId: 'system:vnu-hcm', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1501+', ...THE_WORLD_2026_SOURCE, note: SYSTEM_NOTE_VNU_HCM },
  { entityId: 'hust', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1501+', ...THE_WORLD_2026_SOURCE },
  { entityId: 'tdtu', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '601-800', ...THE_WORLD_2026_SOURCE },
  { entityId: 'nttu', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1001-1200', ...THE_WORLD_2026_SOURCE },
  { entityId: 'system:da-nang', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1501+', ...THE_WORLD_2026_SOURCE, note: SYSTEM_NOTE_DA_NANG },
  { entityId: 'system:hue', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1501+', ...THE_WORLD_2026_SOURCE, note: SYSTEM_NOTE_HUE },
  { entityId: 'ou', system: 'the-world', edition: 'THE World 2026', kind: 'overall', rankRangeLabel: '1201-1500', ...THE_WORLD_2026_SOURCE },
];

const THE_ASIA_2026_RECORDS: readonly RankingRecord[] = [
  { entityId: 'system:vnu-hanoi', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '601-800', ...THE_ASIA_2026_SOURCE, note: SYSTEM_NOTE_VNU_HANOI },
  { entityId: 'system:vnu-hcm', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '601-800', ...THE_ASIA_2026_SOURCE, note: SYSTEM_NOTE_VNU_HCM },
  { entityId: 'tdtu', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '251-300', ...THE_ASIA_2026_SOURCE },
  { entityId: 'dtu', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '251-300', ...THE_ASIA_2026_SOURCE },
  { entityId: 'hust', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '601-800', ...THE_ASIA_2026_SOURCE },
  { entityId: 'nttu', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '501-600', ...THE_ASIA_2026_SOURCE },
  { entityId: 'system:da-nang', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '801+', ...THE_ASIA_2026_SOURCE, note: SYSTEM_NOTE_DA_NANG },
  { entityId: 'system:hue', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '801+', ...THE_ASIA_2026_SOURCE, note: SYSTEM_NOTE_HUE },
  { entityId: 'ou', system: 'the-asia', edition: 'THE Asia 2026', kind: 'overall', rankRangeLabel: '601-800', ...THE_ASIA_2026_SOURCE },
];

export const RANKING_RECORDS: readonly RankingRecord[] = [
  ...QS_WORLD_2027_RECORDS,
  ...QS_ASIA_2026_RECORDS,
  ...THE_WORLD_2026_RECORDS,
  ...THE_ASIA_2026_RECORDS,
  {
    entityId: 'system:vnu-hanoi',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 1,
    ...VNUR_2026_SOURCE,
    note: 'Ranking hệ thống ĐHQG Hà Nội — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).',
  },
  {
    entityId: 'system:vnu-hcm',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 2,
    ...VNUR_2026_SOURCE,
    note: 'Ranking hệ thống ĐHQG TP.HCM — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).',
  },
  {
    entityId: 'hust',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 3,
    ...VNUR_2026_SOURCE,
  },
  {
    entityId: 'ueh',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 4,
    ...VNUR_2026_SOURCE,
  },
  {
    entityId: 'tdtu',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 5,
    ...VNUR_2026_SOURCE,
  },
  {
    entityId: 'dtu',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 6,
    ...VNUR_2026_SOURCE,
  },
  {
    entityId: 'hnue',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 8,
    ...VNUR_2026_SOURCE,
  },
  {
    entityId: 'system:da-nang',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 9,
    ...VNUR_2026_SOURCE,
    note: 'Ranking hệ thống Đại học Đà Nẵng — KHÔNG tự gán cho các trường thành viên (xem rankingIsolation.test.ts).',
  },
  {
    entityId: 'ctu',
    system: 'vnur',
    edition: 'VNUR-2026',
    kind: 'overall',
    rank: 10,
    ...VNUR_2026_SOURCE,
  },
];
