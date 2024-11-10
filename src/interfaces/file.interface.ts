import { TwStyle } from "twin.macro";

export interface FileModel {
  fileId: string;
  fileName: string;
  fileSize: number;
  fileType: string;
  downloadCount: number;
  maxDownloads: number;
  ttl: number;
  uploadedAt: Date | string;
}

export interface FileStyle {
  type: string;
  backgroundColor: TwStyle;
}
