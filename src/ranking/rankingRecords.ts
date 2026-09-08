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

export const RANKING_RECORDS: readonly RankingRecord[] = [
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
