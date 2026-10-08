export type VnuaProgramGroupId =
  | 'HVN01'
  | 'HVN02'
  | 'HVN03'
  | 'HVN04'
  | 'HVN05'
  | 'HVN06'
  | 'HVN07'
  | 'HVN08'
  | 'HVN09'
  | 'HVN10'
  | 'HVN11'
  | 'HVN12'
  | 'HVN13'
  | 'HVN14'
  | 'HVN15'
  | 'HVN16'
  | 'HVN17'
  | 'HVN18'
  | 'HVN19'
  | 'HVN20'
  | 'HVN21'
  | 'HVN22'
  | 'HVN23';

export interface VnuaProgramGroupThreshold {
  groupId: VnuaProgramGroupId;
  groupName: string;
  thptMin30?: number;
  transcriptMin30?: number;
  governedByMinistry?: true;
  sourceId: 'vnua-threshold-notice-2026';
  imageUrl: string;
}

const thresholdImageUrl = 'https://file.vnua.edu.vn/data/0/images/2026/07/08/host/tb1.jpg?w=680';

export const VNUA_PROGRAM_GROUP_THRESHOLDS_2026: readonly VnuaProgramGroupThreshold[] = [
  { groupId: 'HVN01', groupName: 'Thú y', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN02', groupName: 'Chăn nuôi thú y - Thủy sản', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN03', groupName: 'Nông nghiệp và cảnh quan', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN04', groupName: 'Công nghệ kỹ thuật ô tô và Cơ điện tử', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN05', groupName: 'Kỹ thuật cơ khí', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN06', groupName: 'Kỹ thuật điện, Điện tử và Tự động hóa', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN07', groupName: 'Logistics và Quản lý chuỗi cung ứng', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN08', groupName: 'Kế toán, Quản trị kinh doanh và Thương mại', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN09', groupName: 'Công nghệ sinh học và Công nghệ dược liệu', thptMin30: 17, transcriptMin30: 20, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN10', groupName: 'Công nghệ thực phẩm và Chế biến', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN11', groupName: 'Kinh tế và Quản lý', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN12', groupName: 'Xã hội học', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN13', groupName: 'Luật', governedByMinistry: true, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN14', groupName: 'Công nghệ thông tin và Kỹ thuật số', thptMin30: 17, transcriptMin30: 20, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN15', groupName: 'Quản lý đất đai, Bất động sản và Môi trường', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN16', groupName: 'Khoa học môi trường', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN17', groupName: 'Ngôn ngữ Anh', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN18', groupName: 'Ngôn ngữ Trung Quốc', thptMin30: 20, transcriptMin30: 23, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN19', groupName: 'Sư phạm công nghệ', governedByMinistry: true, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN20', groupName: 'Du lịch', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN21', groupName: 'Quản lý và phát triển du lịch', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN22', groupName: 'Quy hoạch vùng và Đô thị', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
  { groupId: 'HVN23', groupName: 'Di sản học', thptMin30: 16, transcriptMin30: 19, sourceId: 'vnua-threshold-notice-2026', imageUrl: thresholdImageUrl },
];

export function getVnuaProgramGroupThreshold(groupId?: string): VnuaProgramGroupThreshold | undefined {
  return VNUA_PROGRAM_GROUP_THRESHOLDS_2026.find((threshold) => threshold.groupId === groupId);
}
