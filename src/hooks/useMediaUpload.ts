import React from "react";

import Api from "@/lib/api";
import { MediaUploadType } from "@/components/MediaUpload/schema";
import { toMilliseconds } from "@/utils/functions";

import { useToast } from "./use-toast";

export default function useMediaUpload() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

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
    if (body.fileType) {
      body.fileType = body.fileType.toString();
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
            formData.append("files", file);
          }
        } else {
          const typedKey = dataKey as keyof typeof transformedData;
          formData.append(dataKey, transformedData[typedKey] as string);
        }
      }

      const data: any = await Api.upload("files/upload", formData);

      toast({ description: "File successfully uploaded" });
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
