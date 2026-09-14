import { describe, expect, it } from 'vitest';
import type { ApplicantProfile } from './applicantProfile';
import { deriveSectionsWithData, parseStoredSections, PROFILE_SECTION_IDS, resolveVisibleSections } from './profileSections';

const EMPTY: ApplicantProfile = {};

describe('profileSections', () => {
  it('hồ sơ rỗng: không mục nào được bật sẵn (form không render ô nhập nào)', () => {
    expect(deriveSectionsWithData(EMPTY).size).toBe(0);
    expect(resolveVisibleSections(EMPTY, []).size).toBe(0);
  });

  it('mục đã có dữ liệu LUÔN hiện kể cả khi pref không chọn', () => {
    const profile: ApplicantProfile = { thpt: { scores: { math: 8.5 } } };
    expect(resolveVisibleSections(profile, []).has('thpt')).toBe(true);
  });

  it('pref người dùng mở thêm mục chưa có dữ liệu', () => {
    expect(resolveVisibleSections(EMPTY, ['vact']).has('vact')).toBe(true);
    expect(resolveVisibleSections(EMPTY, ['vact']).has('thpt')).toBe(false);
  });

  it('có điểm học kỳ thì mở kèm mục học bạ năm (mục học kỳ mượn danh sách môn từ đó)', () => {
    const profile: ApplicantProfile = { transcript: { bySemester: { grade10Sem1: { math: 8 } } } };
    const visible = deriveSectionsWithData(profile);
    expect(visible.has('semesters')).toBe(true);
    expect(visible.has('transcript')).toBe(true);
  });

  it('ngày thi TOEFL là metadata, không tính là "đã có chứng chỉ"', () => {
    const profile: ApplicantProfile = { certificates: { toeflIbtExamDate: '2026-01-01' } };
    expect(deriveSectionsWithData(profile).has('certificates')).toBe(false);
    expect(deriveSectionsWithData({ certificates: { ielts: 7 } }).has('certificates')).toBe(true);
  });

  it('parseStoredSections bỏ qua giá trị rác/không đúng enum', () => {
    expect(parseStoredSections(null)).toEqual([]);
    expect(parseStoredSections('không phải json')).toEqual([]);
    expect(parseStoredSections('{"a":1}')).toEqual([]);
    expect(parseStoredSections('["thpt","không-có-thật"]')).toEqual(['thpt']);
  });

  it('mọi id trong PROFILE_SECTION_IDS đều là duy nhất', () => {
    expect(new Set(PROFILE_SECTION_IDS).size).toBe(PROFILE_SECTION_IDS.length);
  });
});
