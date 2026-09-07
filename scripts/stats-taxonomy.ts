import { getField, type FieldId } from '../src/taxonomy/fields';
import { MAJOR_OFFERINGS } from '../src/taxonomy/majorOfferings';
import { getUnmappedMajorOfferings } from '../src/taxonomy/taxonomyQueries';

const total = MAJOR_OFFERINGS.length;
const unmapped = getUnmappedMajorOfferings();
const mapped = total - unmapped.length;

console.log('=== UniScoreVN Taxonomy Coverage ===');
console.log('');
console.log(`Tổng ngành đã có trong programCatalogBySchool: ${total}`);
console.log(`Đã map được >=1 field:                        ${mapped}`);
console.log(`Chưa map field nào:                            ${unmapped.length}`);
console.log('');
console.log('Số ngành theo field:');
const bySchoolField = new Map<string, number>();
for (const offering of MAJOR_OFFERINGS) {
  for (const fieldId of offering.fieldIds) {
    bySchoolField.set(fieldId, (bySchoolField.get(fieldId) ?? 0) + 1);
  }
}
for (const [fieldId, count] of [...bySchoolField.entries()].sort((a, b) => b[1] - a[1])) {
  console.log(`  ${getField(fieldId as FieldId)?.shortName ?? fieldId}: ${count}`);
}
console.log('');
console.log(`Ngành CHƯA map field nào (backlog research, tối đa 20 dòng đầu):`);
for (const offering of unmapped.slice(0, 20)) {
  console.log(`  ${offering.schoolId}:${offering.programId}`);
}
if (unmapped.length > 20) console.log(`  ... còn ${unmapped.length - 20} ngành khác`);
