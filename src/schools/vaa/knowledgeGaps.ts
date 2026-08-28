import type { KnowledgeGap } from '../../core/knowledgeStatus';

export const vaaKnowledgeGaps: KnowledgeGap[] = [
  {
    id: 'vaa-hocba-passing-range-not-modeled',
    label:
      'VAA cong bo diem chuan xet hoc ba THPT dao dong 18-27/30 tuy nganh nam 2026, nhung bang diem chuan theo tung nganh chua duoc trich xuat co cau truc; runtime chi kiem tra dieu kien san chung 15/30, khong ket luan duoc trung tuyen cuoi cung.',
    status: 'official-but-unparsed',
    sourceId: 'vaa-hocba-notice-2026',
    scoreAffecting: true,
    impact: 'Runtime chi loai duoc ho so duoi 15/30; tren muc do van chua ket luan duoc dau vao/truot theo tung nganh.',
  },
  {
    id: 'vaa-other-methods-not-modeled',
    label: 'VAA con xet tuyen thang, DGNL DHQG Ha Noi/TP.HCM, va chung chi quoc te (SAT/ACT/IB); chi phuong thuc dieu kien san THPT duoc mo hinh hoa.',
    status: 'incomplete',
    sourceId: 'vaa-admission-notice-2026',
  },
  {
    id: 'vaa-bonus-priority-not-modeled',
    label: 'Quy dinh cong diem uu tien khu vuc/doi tuong chua duoc trien khai trong bo tinh diem.',
    status: 'incomplete',
    sourceId: 'vaa-admission-notice-2026',
  },
  {
    id: 'vaa-recheck-2026-08-28',
    label:
      'Recheck 2026-08-28 (WebSearch + WebFetch trực tiếp vaa-hocba-notice-2026): trang không còn (hoặc chưa từng có, tuỳ lần crawl) bảng điểm sàn học bạ theo từng ngành ở dạng đọc được — chỉ có điều kiện sàn chung "tổng 3 môn thi TN THPT >= 15 điểm" và mô tả quy trình đăng ký nguyện vọng. Báo chí (vietnamnet/dantri/vnexpress, công bố 09/08/2026) chỉ có ĐIỂM CHUẨN (kết quả trúng tuyển cuối, 18-27.5/30) theo ngành cho phương thức tổng hợp — đây là kết quả trúng tuyển sau cùng, KHÔNG phải ngưỡng sàn xét học bạ theo từng ngành mà knowledge gap này cần; không dùng thay thế được vì 2 khái niệm khác nhau (điểm chuẩn phụ thuộc số lượng thí sinh đăng ký năm đó, không tính lại được từ công thức). Giữ nguyên gap.',
    status: 'incomplete',
    sourceId: 'vaa-hocba-notice-2026',
    scoreAffecting: true,
    impact: 'Không có thay đổi so với đợt research trước; VAA tiếp tục ở mức eligibility-only.',
  },
];
