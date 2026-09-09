import type { SourcedRule } from '../../core/evidence';

export const unetiThptExamFormulaEvidence = {
  value:
    'Phương thức 2 (Thông tin tuyển sinh năm 2026, mục II.2.2.2): "ĐXT = (ĐPT2 + KK) + UT" với "ĐPT2 = (M1 x 4.5 + M2 x 3.5 + M3 x 2) x 3/10", trong đó M1/M2/M3 là điểm thi TN THPT 2026 của 3 môn trong tổ hợp xét tuyển THEO ĐÚNG THỨ TỰ trường công bố, KK là điểm xét thưởng/khuyến khích và UT là điểm ưu tiên khu vực/đối tượng; "(Điểm xét tuyển không vượt mức điểm tối đa của thang điểm xét)" = trần 30.',
  evidence: [
    {
      sourceId: 'uneti-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh năm 2026 (Trường Đại học Kinh tế - Kỹ thuật Công nghiệp), mục II.2.2 "Phương thức 2: Xét tuyển kết quả kỳ thi tốt nghiệp THPT năm 2026", tiểu mục 2.2.2 "Xác định điểm xét tuyển".',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'uneti-tohop-dkxt-2026',
      location: 'dkxt.uneti.edu.vn/tinh-diem — `window.groups` (4 nhóm tổ hợp kèm thứ tự môn) và hàm `calculateScores()` (`raw = (subjects[m[0]]*4.5 + subjects[m[1]]*3.5 + subjects[m[2]]*2) * 0.3`).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const unetiPriorityEvidence = {
  value:
    'UT = điểm ưu tiên khu vực + đối tượng theo Quy chế tuyển sinh của Bộ GD&ĐT; mức và công thức giảm dần được chính công cụ tính điểm của trường cài đặt: KV1 = 0,75; KV2-NT = 0,5; KV2 = 0,25; KV3 = 0; nhóm đối tượng 1 = 2,0; nhóm đối tượng 2 = 1,0; khi điểm tổ hợp (đã nhân hệ số) vượt 22,50/30 thì "utBonus = ((30 − preUT)/7,5) × totalUT".',
  evidence: [
    {
      sourceId: 'uneti-tohop-dkxt-2026',
      location: 'dkxt.uneti.edu.vn/tinh-diem — hàm `calculateScores()`, các hằng `areaVal`/`dtVal` và nhánh `preUT > 22.5 ? ((30 - preUT) / 7.5) * totalUT : totalUT`, trần `Math.min(30, preUT + utBonus)`.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'uneti-priority-national-2026',
      location: 'Thông tư 06/2026/TT-BGDĐT, Điều 7 (Chính sách ưu tiên trong tuyển sinh), khoản 1-4.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;

export const unetiThresholdEvidence = {
  ruleId: 'uneti-final-threshold-2026',
  evidence: [
    {
      sourceId: 'uneti-diemtrungtuyen-826-2026',
      location:
        'Thông báo số 826/TB-ĐHKTKTCN (09/8/2026) "Điểm trúng tuyển đại học hệ chính quy năm 2026" — cột "KQ thi TN THPT" (thang 30) của bảng I "Cơ sở Hà Nội" (27 mã xét tuyển, 20,00-24,50) và bảng II "Cơ sở Ninh Bình" (22 mã xét tuyển, 19,00-21,00).',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
    {
      sourceId: 'uneti-thongtin-tuyensinh-capnhat-2026',
      location: 'Thông tin tuyển sinh năm 2026 CẬP NHẬT, mục II — ánh xạ mã xét tuyển -> nhóm tổ hợp xét tuyển (nhóm 1-4) cho 27 mã cơ sở Hà Nội và 22 mã cơ sở Ninh Bình.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
};

export const unetiEnglishMajorConditionEvidence = {
  value: 'Ngành Ngôn ngữ Anh: "điểm môn tiếng Anh trong tổ hợp xét tuyển tối thiểu đạt từ 6,00 điểm trở lên" (phương thức xét kết quả thi TN THPT).',
  evidence: [
    {
      sourceId: 'uneti-thongtin-tuyensinh-2026',
      location: 'Thông tin tuyển sinh năm 2026, mục II.2.2.1 "Đối tượng và điều kiện xét tuyển" của Phương thức 2.',
      verification: 'verified' as const,
      effectiveYear: 2026,
      verifiedAt: '2026-09-09',
    },
  ],
} satisfies SourcedRule<string>;
