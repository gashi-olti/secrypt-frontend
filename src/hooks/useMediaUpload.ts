import React from "react";
import CryptoJS from "crypto-js";

import Api from "@/lib/api";
import { MediaType, MediaUploadType } from "@/components/MediaUpload/schema";
import { toMilliseconds } from "@/utils/functions";

import { useToast } from "./use-toast";

const encryptionKey = process.env.ENCRYPTION_KEY ?? "";

export default function useMediaUpload() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const encryptFile = async (file: File) => {
    const arrayBuffer = await file.arrayBuffer();
    const wordArray = CryptoJS.lib.WordArray.create(arrayBuffer);
    const encrypted = CryptoJS.AES.encrypt(wordArray, encryptionKey).toString();

    // Convert encrypted data back to Blob
    return new Blob([encrypted], { type: file.type });
  };

  const transformBody = (body: MediaUploadType) => {
    if (body.maxDownloads) {
      body.maxDownloads = Number(body.maxDownloads);
    }
    if (body.ttl) {
      const [value, type] = (body.ttl as string)?.split(" ");
      body.ttl = toMilliseconds({
        value: Number(value),
        type: type as any,
      });
    }
    if (body.fileType && body.file) {
      if (body.file.type.includes("image")) {
        body.fileType = MediaType.IMAGE;
      }
      if (
        body.file.type.includes("audio") ||
        body.file.type.includes("video")
      ) {
        body.fileType = MediaType.VIDEO;
      }
      if (body.file.type.includes("application")) {
        body.fileType = MediaType.DOCUMENT;
      }
      if (body.file.type.includes("pdf")) {
        body.fileType = MediaType.PDF;
      }
    }

    return body;
  };

  const uploadMedia = async (body: MediaUploadType) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const transformedData = { ...transformBody(body) };

      for (const dataKey in transformedData) {
        if (dataKey === "file") {
          const file = transformedData.file;
          if (file) {
            const encryptedFile = await encryptFile(file);
            formData.append("files", encryptedFile, file.name);
          }
        } else {
          const typedKey = dataKey as keyof typeof transformedData;
          formData.append(dataKey, transformedData[typedKey] as string);
        }
      }

      const data: any = await Api.upload("files/upload", formData);

      toast({ type: "success", description: "File successfully uploaded." });
      setIsLoading(false);

      return data;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  return {
    uploadMedia,
    isLoading,
  };
}
