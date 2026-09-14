import type { ApplicantProfile } from '../core/applicantProfile';
import { evaluateComparisonSelections } from './evaluateApplicantAcrossSchools';
import { universityCatalog } from './universityCatalog';
import type { ComparisonSelection } from './comparisonSelection';

/**
 * "Với hồ sơ hiện tại, UniScoreVN tính ra được điểm cho bao nhiêu ngành?" — phần thưởng sớm cho
 * việc nhập liệu, thay cho chuỗi "nhập → nhập → nhập → mới thấy kết quả".
 *
 * SỐ THẬT, không hardcode: chạy đúng evaluator thật của từng trường trên toàn bộ danh mục ngành
 * đã có (`universityCatalog`), rồi đếm những ngành RA ĐƯỢC ĐIỂM (`evaluation.score`). ~544 lựa
 * chọn, đo được ~2-5ms nên gọi lại mỗi lần hồ sơ đổi là chấp nhận được.
 *
 * VÌ SAO ĐẾM THEO "có score" chứ không theo confidence: thử đếm theo `partial` cho ra 162 trường
 * NGAY CẢ KHI hồ sơ rỗng — `partial` nghĩa là "trường này có sẵn một phần quy tắc", không nói gì
 * về việc dữ liệu của thí sinh đã dùng được hay chưa. Hiển thị con số đó sẽ là một lời khen sai.
 * "Có score" là điều kiện duy nhất thật sự phụ thuộc vào dữ liệu người dùng vừa nhập.
 *
 * Hệ quả phải chấp nhận: nhiều trường chỉ ra điểm khi đã chọn tổ hợp/ngữ cảnh riêng ở trang trường
 * (thứ hồ sơ dùng chung không mang theo), nên con số này là CẬN DƯỚI — UI phải nói "ít nhất", và
 * khi bằng 0 thì KHÔNG hiện lời khen nào.
 */
export interface ProfileReach {
  /** Số ngành tính ra được điểm xét tuyển với hồ sơ hiện tại. */
  programsWithScore: number;
  /** Số trường chứa các ngành đó. */
  schoolsWithScore: number;
  /** Tổng số ngành đã đem ra thử (mẫu số) — để UI không phải tự đoán. */
  programsConsidered: number;
}

function buildCatalogSelections(): ComparisonSelection[] {
  const selections: ComparisonSelection[] = [];
  for (const school of universityCatalog) {
    for (const program of school.programs) {
      selections.push({ id: `${school.schoolId}:${program.programId}`, schoolId: school.schoolId, programId: program.programId, context: {} });
    }
  }
  return selections;
}

const CATALOG_SELECTIONS = buildCatalogSelections();

export function measureProfileReach(profile: ApplicantProfile): ProfileReach {
  const summaries = evaluateComparisonSelections(profile, CATALOG_SELECTIONS);
  const scored = summaries.filter((summary) => summary.evaluation.score !== undefined);
  return {
    programsWithScore: scored.length,
    schoolsWithScore: new Set(scored.map((summary) => summary.schoolId)).size,
    programsConsidered: CATALOG_SELECTIONS.length,
  };
}
