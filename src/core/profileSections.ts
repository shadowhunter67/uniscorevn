import type { ApplicantProfile } from './applicantProfile';
import { hasAnySemesterScore } from './transcriptSemesters';
import { safeGetItem, safeSetItem } from './safeStorage';

/**
 * "Hồ sơ của bạn có những loại điểm nào?" — thuần logic, KHÔNG import React.
 *
 * Lý do tồn tại: form hồ sơ trước đây render đồng thời mọi nhóm dữ liệu (ĐGNL + THPT + học bạ 3 năm
 * + học bạ 6 học kỳ + 10 loại chứng chỉ), nên thí sinh chỉ có mỗi điểm THPT vẫn phải lướt qua toàn
 * bộ. Nay người dùng tự chọn nhóm mình có, chỉ nhóm được chọn mới render.
 *
 * KHÔNG đụng tới `ApplicantProfile` (schema dữ liệu điểm giữ nguyên) — đây chỉ là pref hiển thị,
 * lưu riêng ở localStorage. Mất pref này thì cũng không mất điểm: `deriveSectionsWithData` luôn bật
 * lại mọi nhóm ĐÃ CÓ dữ liệu, nên dữ liệu đã nhập không bao giờ bị ẩn mất.
 */
export type ProfileSectionId = 'vact' | 'thpt' | 'transcript' | 'semesters' | 'certificates';

export const PROFILE_SECTION_IDS: readonly ProfileSectionId[] = ['thpt', 'transcript', 'vact', 'certificates', 'semesters'];

export interface ProfileSectionMeta {
  id: ProfileSectionId;
  /** Câu hỏi theo ngôn ngữ thí sinh, KHÔNG dùng tên field nội bộ. */
  label: string;
  /** Khi nào cần nhóm này — hiện ngay dưới checkbox để không phải đoán. */
  hint: string;
  /** Nhóm nâng cao xếp sau + ghi rõ "không bắt buộc". */
  advanced?: boolean;
}

export const PROFILE_SECTION_META: Record<ProfileSectionId, ProfileSectionMeta> = {
  thpt: {
    id: 'thpt',
    label: 'Điểm thi tốt nghiệp THPT',
    hint: 'Phương thức phổ biến nhất — hầu hết trường đều xét.',
  },
  transcript: {
    id: 'transcript',
    label: 'Điểm học bạ (trung bình cả năm)',
    hint: 'Điểm trung bình môn lớp 10, 11, 12 ghi trong học bạ.',
  },
  vact: {
    id: 'vact',
    label: 'Điểm Đánh giá năng lực (ĐGNL)',
    hint: 'Kỳ thi riêng của ĐHQG TP.HCM / ĐHQG Hà Nội và một số trường.',
  },
  certificates: {
    id: 'certificates',
    label: 'Chứng chỉ quốc tế (IELTS, SAT, HSK…)',
    hint: 'Không bắt buộc. Chỉ dùng khi trường có quy đổi điểm thưởng/khuyến khích.',
    advanced: true,
  },
  semesters: {
    id: 'semesters',
    label: 'Điểm học bạ từng học kỳ (6 học kỳ)',
    hint: 'Không bắt buộc. Chỉ cần nếu bạn xét trường tính trung bình 6 học kỳ (VLU, HUTECH, ĐH Luật TP.HCM…).',
    advanced: true,
  },
};

/** Nhóm nào ĐANG CÓ dữ liệu thật trong hồ sơ — luôn phải hiện, bất kể pref đã lưu là gì. */
export function deriveSectionsWithData(profile: ApplicantProfile): Set<ProfileSectionId> {
  const active = new Set<ProfileSectionId>();
  if (profile.exams?.vact?.total !== undefined) active.add('vact');
  if (Object.values(profile.thpt?.scores ?? {}).some((value) => value !== undefined)) active.add('thpt');
  for (const year of [profile.transcript?.grade10, profile.transcript?.grade11, profile.transcript?.grade12]) {
    if (year && Object.values(year).some((value) => value !== undefined)) active.add('transcript');
  }
  if (hasAnySemesterScore(profile)) {
    active.add('semesters');
    // Mục học kỳ dùng lại danh sách môn của mục học bạ năm nên phải mở kèm, nếu không các ô học kỳ
    // đã nhập sẽ không có môn nào để hiện.
    active.add('transcript');
  }
  const { toeflIbtExamDate: _examDate, ...countable } = profile.certificates ?? {};
  if (Object.values(countable).some((value) => value !== undefined)) active.add('certificates');
  return active;
}

/** Hợp nhất pref người dùng chọn với nhóm đã có dữ liệu — dữ liệu thật luôn thắng. */
export function resolveVisibleSections(profile: ApplicantProfile, chosen: readonly ProfileSectionId[]): Set<ProfileSectionId> {
  const visible = deriveSectionsWithData(profile);
  for (const id of chosen) visible.add(id);
  return visible;
}

const STORAGE_KEY = 'uniscorevn.profile-sections.v1';

export function parseStoredSections(raw: string | null): ProfileSectionId[] {
  if (!raw) return [];
  try {
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((value): value is ProfileSectionId => PROFILE_SECTION_IDS.includes(value as ProfileSectionId));
  } catch {
    return [];
  }
}

export function loadStoredProfileSections(): ProfileSectionId[] {
  return parseStoredSections(safeGetItem(STORAGE_KEY));
}

export function saveStoredProfileSections(sections: readonly ProfileSectionId[]): void {
  safeSetItem(STORAGE_KEY, JSON.stringify([...sections]));
}
