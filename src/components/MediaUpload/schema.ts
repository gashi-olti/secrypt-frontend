import * as yup from "yup";

export enum MediaType {
  DOC = "application/msword",
  DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  JPG = "image/jpg",
  JPEG = "image/jpeg",
  PNG = "image/png",
  GIF = "image/gif",
  ZIP = "application/zip",
  RAR = "application/x-rar-compressed",
  PDF = "application/pdf",
  MP4 = "video/mp4",
  MP3 = "audio/mpeg",
  MOV = "video/quicktime",
  AVI = "video/x-msvideo",
  MKV = "video/x-matroska",
  PPTX = "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  XLSX = "application/vnd.ms-excel",
}

export interface MediaUploadType {
  file?: File | undefined;
  fileType: MediaType | string;
  maxDownloads?: number | string;
  ttl?: number | string;
  password?: string;
}

const schema = () =>
  yup.object().shape({
    file: yup.mixed<File>().optional(),
    // fileType: yup
    //   .mixed<MediaType>()
    //   .oneOf(Object.values(MediaType), "Invalid file type")
    //   .required("File type is required"),
    maxDownloads: yup.string(),
    // .number()
    // .min(1, "You can select min of 3 downloads")
    // .max(50, "You can select up to 50 downloads"),
    ttl: yup.string(),
    // ttl: yup.number().min(1).max(60),
    password: yup.string().notRequired().max(255),
  });

export default schema;
