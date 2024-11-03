import * as yup from "yup";

export interface MediaUploadType {
  fileType?: File | undefined;
  maxDownloads?: number | string;
  ttl?: number | string;
  password?: string;
}

const schema = () =>
  yup.object().shape({
    fileType: yup.array().max(1, "Only one file upload is allowed"),
    maxDownloads: yup.string(),
    // .number()
    // .min(1, "You can select min of 3 downloads")
    // .max(50, "You can select up to 50 downloads"),
    ttl: yup.string(),
    // ttl: yup.number().min(1).max(60),
    password: yup.string().notRequired().max(255),
  });

export default schema;
