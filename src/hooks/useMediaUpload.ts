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
      body.ttl = toMilliseconds({ value: Number(value), type: type as any });
    }

    return body;
  };

  const uploadMedia = async (body: MediaUploadType) => {
    setIsLoading(true);

    try {
      const formData = new FormData();
      const transformedData = { ...transformBody(body) };

      Object.keys(transformedData).forEach((key) => {
        const typedKey = key as keyof typeof transformedData;
        if (key === "fileType") {
          const file = transformedData.fileType;
          if (file) {
            formData.append("fileType", file, file?.name);
          }
        }

        formData.append(key, transformedData[typedKey] as string);
        return;
      });

      const data: any = await Api.post("files/upload", formData);

      toast({ description: "File successfully uploaded" });
      setIsLoading(false);

      return data;
    } catch (err) {
      setIsLoading(false);
      console.log({ errrrrrrrrrrrrr: err });
      throw err;
    }
  };

  return {
    uploadMedia,
    isLoading,
  };
}
