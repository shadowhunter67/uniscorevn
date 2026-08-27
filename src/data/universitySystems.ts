/**
 * Các cụm đại học (đại học "mẹ" gồm nhiều trường/đơn vị thành viên) trong catalog. Chỉ nhóm những
 * cụm có ít nhất 2 entry trong `schoolRegistry`. Danh sách thành viên khai báo tường minh ở đây
 * (một nguồn sự thật duy nhất) thay vì gắn field vào từng `SchoolModule` — cùng pattern với
 * `deriveInstitutionSupportStatus`.
 *
 * Lưu ý phân biệt: Học viện Nông nghiệp Việt Nam (`vnua`), Trường ĐH Lâm nghiệp (`vnuf`), Trường
 * ĐH Mỹ thuật Việt Nam (`vnufa`) KHÔNG thuộc ĐHQG Hà Nội dù id có tiền tố "vnu". Trường ĐH Kỹ
 * thuật Y Dược Đà Nẵng (`dumtp`) thuộc Bộ Y tế, không thuộc Đại học Đà Nẵng. Học viện Âm nhạc Huế
 * (`ham`) thuộc Bộ VHTTDL, không thuộc Đại học Huế.
 */
export interface UniversitySystem {
  id: string;
  /** Tên đầy đủ. */
  name: string;
  /** Nhãn ngắn cho dropdown lọc. */
  shortLabel: string;
  /** id của các entry thành viên trong `schoolRegistry` (gồm cả entry đại học mẹ nếu có). */
  memberIds: readonly string[];
}

export const UNIVERSITY_SYSTEMS: readonly UniversitySystem[] = [
  {
    id: 'vnu-hcm',
    name: 'Đại học Quốc gia Thành phố Hồ Chí Minh',
    shortLabel: 'ĐHQG-HCM',
    memberIds: ['hcmut', 'hcmus', 'ussh', 'uel', 'uit', 'iu', 'uhs', 'agu'],
  },
  {
    id: 'vnu-hanoi',
    name: 'Đại học Quốc gia Hà Nội',
    shortLabel: 'ĐHQG Hà Nội',
    memberIds: [
      'vnuuet',
      'vnuhus',
      'vnussh',
      'vnueb',
      'vnued',
      'vnuulis',
      'vnulaw',
      'vnuump',
      'vnuhsb',
      'vnuis',
      'vnusis',
      'vnuvju',
    ],
  },
  {
    id: 'hue',
    name: 'Đại học Huế',
    shortLabel: 'Đại học Huế',
    memberIds: ['hueu', 'hul', 'hce', 'huaf', 'husc', 'hueedu', 'hufl', 'hump', 'hat'],
  },
  {
    id: 'da-nang',
    name: 'Đại học Đà Nẵng',
    shortLabel: 'Đại học Đà Nẵng',
    memberIds: ['udn', 'dut', 'dueudn', 'uedudn', 'uflsudn', 'uteudn', 'vku'],
  },
  {
    id: 'thai-nguyen',
    name: 'Đại học Thái Nguyên',
    shortLabel: 'Đại học Thái Nguyên',
    memberIds: ['tnu', 'tnue', 'tnufl', 'tnus', 'tnut', 'tuaf', 'tueba', 'tump', 'tnuis'],
  },
  {
    id: 'hust',
    name: 'Đại học Bách khoa Hà Nội',
    shortLabel: 'ĐHBK Hà Nội',
    memberIds: ['hust', 'soict', 'seee', 'sme', 'sms', 'semhust', 'scls'],
  },
  {
    id: 'neu',
    name: 'Đại học Kinh tế Quốc dân',
    shortLabel: 'ĐH Kinh tế Quốc dân',
    memberIds: ['neu', 'neucob', 'nctneu', 'ncepa'],
  },
];

const MEMBER_TO_SYSTEM = new Map<string, string>(
  UNIVERSITY_SYSTEMS.flatMap((system) => system.memberIds.map((memberId) => [memberId, system.id] as const))
);

const SYSTEM_BY_ID = new Map<string, UniversitySystem>(UNIVERSITY_SYSTEMS.map((system) => [system.id, system]));

/** Trả về id cụm đại học của một trường, hoặc `undefined` nếu trường không thuộc cụm nào. */
export function getUniversitySystemId(schoolId: string): string | undefined {
  return MEMBER_TO_SYSTEM.get(schoolId);
}

export function getUniversitySystem(systemId: string): UniversitySystem | undefined {
  return SYSTEM_BY_ID.get(systemId);
}
