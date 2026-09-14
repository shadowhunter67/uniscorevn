/**
 * Scaffold khung `src/schools/<id>/` cho 1 trường mới — thuần thao tác file (không AI/không token),
 * tiếp nối tinh thần `uniscorevn-data/pipelines/research-fetch/fetchSchoolPacket.ts`: tách phần cơ
 * học (tạo boilerplate, wire registry đúng chỗ, tránh lỗi gõ tay copy-paste từ trường khác) khỏi
 * phần cần suy luận (research nguồn, viết công thức) — phần sau KHÔNG được script này làm thay.
 *
 * QUAN TRỌNG — đọc trước khi dùng: `pipelines/data-maintainer-guide.md` (repo uniscorevn-data) ghi
 * rõ "Không tạo module identity-only chỉ để tăng số trường đếm được". Script này CHỈ nên chạy khi
 * đã sẵn sàng research ngay (đã có `fetchSchoolPacket.ts` packet trong tay hoặc sắp fetch) — 4 file
 * sinh ra đều rỗng có TODO, KHÔNG được commit khi `sources.ts` còn mảng rỗng.
 *
 * Usage:
 *   npx jiti scripts/scaffold-school.ts <id> --name "..." --shortName "..." \
 *     --region hcm|hanoi|other --ownership public|private [--about "..."]
 */
import { existsSync, mkdirSync, writeFileSync, readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const SCHOOLS_DIR = join(process.cwd(), 'src', 'schools');
const GENERATED_DIR = join(process.cwd(), 'src', 'generated');
const REGISTRY_FILE = join(SCHOOLS_DIR, 'index.ts');

interface Args {
  id: string;
  name: string;
  shortName: string;
  region: 'hcm' | 'hanoi' | 'other';
  ownership: 'public' | 'private';
  about?: string;
}

function parseArgs(argv: string[]): Args {
  const [id, ...rest] = argv;
  if (!id) {
    usageAndExit('Thiếu <id>.');
  }
  const flags = new Map<string, string>();
  for (let i = 0; i < rest.length; i++) {
    const token = rest[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const value = rest[i + 1];
      if (value === undefined || value.startsWith('--')) usageAndExit(`Thiếu giá trị cho --${key}.`);
      flags.set(key, value);
      i++;
    }
  }
  const name = flags.get('name');
  const shortName = flags.get('shortName');
  const region = flags.get('region');
  const ownership = flags.get('ownership');
  const about = flags.get('about');

  if (!/^[a-z][a-z0-9]{1,19}$/.test(id)) {
    usageAndExit(`id "${id}" không hợp lệ — chỉ chữ thường + số, 2-20 ký tự, bắt đầu bằng chữ (theo convention các trường hiện có: utc, hnue, vinhuni...).`);
  }
  if (!name) usageAndExit('Thiếu --name (tên đầy đủ tiếng Việt).');
  if (!shortName) usageAndExit('Thiếu --shortName (viết tắt, vd "UTC").');
  if (region !== 'hcm' && region !== 'hanoi' && region !== 'other') {
    usageAndExit('--region phải là hcm | hanoi | other.');
  }
  if (ownership !== 'public' && ownership !== 'private') {
    usageAndExit('--ownership phải là public | private.');
  }

  return { id, name, shortName, region, ownership, about };
}

function usageAndExit(message: string): never {
  console.error(`[scaffold-school] ${message}`);
  console.error(
    '\nUsage: npx jiti scripts/scaffold-school.ts <id> --name "..." --shortName "..." --region hcm|hanoi|other --ownership public|private [--about "..."]',
  );
  process.exit(1);
}

function checkCollision(id: string): void {
  const folderPath = join(SCHOOLS_DIR, id);
  if (existsSync(folderPath)) {
    usageAndExit(`src/schools/${id}/ đã tồn tại — chọn id khác hoặc sửa trực tiếp trường đã có.`);
  }
  const registry = readFileSync(REGISTRY_FILE, 'utf8');
  if (new RegExp(`\\n\\s*${id}:\\s`).test(registry)) {
    usageAndExit(`id "${id}" đã là 1 key trong schoolRegistry (src/schools/index.ts) — trùng, chọn id khác.`);
  }
  // id namespace dùng chung với catalog sinh sẵn (southernCatalog/remainingCatalog/finalCatalog/
  // collegeCatalog — hàng trăm entry identity-only sinh từ danh mục MOET, không có thư mục riêng).
  if (existsSync(GENERATED_DIR)) {
    for (const file of readdirSync(GENERATED_DIR)) {
      if (!file.endsWith('.generated.ts')) continue;
      const content = readFileSync(join(GENERATED_DIR, file), 'utf8');
      if (content.includes(`id: '${id}'`)) {
        usageAndExit(`id "${id}" đã tồn tại trong catalog sinh sẵn (src/generated/${file}) — trường này đã có (dạng identity-only), đừng scaffold lại. Cân nhắc nâng cấp entry đó lên thư mục riêng thay vì tạo mới.`);
      }
    }
  }
}

function schoolModuleTemplate(a: Args): string {
  return `import type { SchoolModule } from '../../core/schoolModule';
import { aggregateSchoolCapabilities } from '../../core/admissionMethod';
import { ${a.id}AdmissionMethods } from './methods';

// TODO (scaffold — điền trước khi commit, xem pipelines/data-maintainer-guide.md):
// - about: 1-2 câu trung lập lấy từ Wikipedia/trang giới thiệu chính thức.
// - capabilities.admissionInfo: true khi sources.ts đã có nguồn tuyển sinh chính thức thật.
// - status: giữ 'researching' tới khi có method exact; xem SchoolStatus ở core/schoolModule.ts.
export const ${a.id}Module: SchoolModule = {
  id: '${a.id}',
  name: '${a.name}',
  shortName: '${a.shortName}',
  about: ${a.about ? `'${a.about.replace(/'/g, "\\'")}'` : "'TODO: giới thiệu ngắn (Wikipedia/trang chính thức)'"},
  year: 2026,
  status: 'researching',
  ownership: '${a.ownership}',
  region: '${a.region}',
  vnuhcm: false,
  capabilities: {
    admissionInfo: false,
    programs: false,
    cutoffs: false,
    ...aggregateSchoolCapabilities(${a.id}AdmissionMethods),
  },
};
`;
}

function sourcesTemplate(a: Args): string {
  return `import type { AdmissionSource } from '../../core/sourceRegistry';

// TODO: điền nguồn chính thức đã research (đọc pipelines/data-maintainer-guide.md mục "Quy trình
// research + implement 1 trường mới" — 12 bước inventory trước khi viết code). KHÔNG commit khi
// mảng này còn rỗng — 1 module không có nguồn thật là identity-only, bị cấm ở CLAUDE.private.md.
export const ${a.id}Sources: (Omit<AdmissionSource, 'schoolId'> & { note?: string })[] = [];
`;
}

function knowledgeGapsTemplate(a: Args): string {
  return `import type { KnowledgeGap } from '../../core/knowledgeStatus';

// TODO: ghi KnowledgeGap cho mọi phần đã research kỹ nhưng chưa đủ nguồn — không suy diễn công
// thức chỉ để tăng coverage (xem schools/utc/knowledgeGaps.ts làm mẫu).
export const ${a.id}KnowledgeGaps: KnowledgeGap[] = [];
`;
}

function methodsTemplate(a: Args): string {
  return `import type { AdmissionMethodDescriptor } from '../../core/admissionMethod';
// TODO: bỏ comment dòng import dưới đây khi gắn knowledgeGaps thật vào 1 descriptor bên dưới.
// import { ${a.id}KnowledgeGaps } from './knowledgeGaps';

// TODO: thêm từng AdmissionMethodDescriptor sau khi đã inventory đủ phương thức xét tuyển. Mẫu
// (xem schools/utc/methods.ts): 1 descriptor 'researching' rộng phạm vi (chỉ eligibility) + 1
// descriptor 'exact' HẸP phạm vi khi công thức/bảng đã verified. Không gắn knowledgeGaps vào
// descriptor có exactCalculator: true (auditMethods coi đó là lỗi).
export const ${a.id}AdmissionMethods: AdmissionMethodDescriptor[] = [];
`;
}

function patchRegistry(a: Args): void {
  let registry = readFileSync(REGISTRY_FILE, 'utf8');

  const importMarker = `import { southernCatalogModules } from './southernCatalog';`;
  if (!registry.includes(importMarker)) {
    usageAndExit('Không tìm thấy điểm chèn import trong src/schools/index.ts (marker đã đổi?) — chèn tay theo hướng dẫn cuối script.');
  }
  registry = registry.replace(importMarker, `import { ${a.id}Module } from './${a.id}';\n${importMarker}`);

  const lastBrace = registry.lastIndexOf('\n};');
  if (lastBrace === -1) {
    usageAndExit('Không tìm thấy điểm chèn registry key trong src/schools/index.ts (marker đã đổi?) — chèn tay theo hướng dẫn cuối script.');
  }
  registry = `${registry.slice(0, lastBrace)}\n  ${a.id}: ${a.id}Module,${registry.slice(lastBrace)}`;

  writeFileSync(REGISTRY_FILE, registry, 'utf8');
}

function main(): void {
  const args = parseArgs(process.argv.slice(2));
  checkCollision(args.id);

  const dir = join(SCHOOLS_DIR, args.id);
  mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.ts'), schoolModuleTemplate(args), 'utf8');
  writeFileSync(join(dir, 'sources.ts'), sourcesTemplate(args), 'utf8');
  writeFileSync(join(dir, 'knowledgeGaps.ts'), knowledgeGapsTemplate(args), 'utf8');
  writeFileSync(join(dir, 'methods.ts'), methodsTemplate(args), 'utf8');
  patchRegistry(args);

  console.log(`[scaffold-school] Đã tạo src/schools/${args.id}/ + đăng ký vào schoolRegistry.`);
  console.log('\nViệc tiếp theo (KHÔNG tự động — cần research thật):');
  console.log(`  1. Research theo 12 bước ở pipelines/data-maintainer-guide.md (repo uniscorevn-data).`);
  console.log(`  2. Có thể dùng fetchSchoolPacket.ts để gom nguyên liệu thô trước, SAU KHI sources.ts có ít nhất URL nháp.`);
  console.log(`  3. Điền sources.ts với nguồn thật, knowledgeGaps.ts với gap thật, methods.ts với descriptor thật.`);
  console.log(`  4. Xoá mọi TODO comment sau khi điền xong.`);
  console.log(`  5. npm run audit:data && npm run lint && npm run test && npm run build`);
  console.log(`  6. KHÔNG commit nếu sources.ts vẫn là mảng rỗng.`);
}

main();
