import React from "react";

import Api from "@/lib/api";
import { NanoModel } from "@/interfaces/nano.interface";

import { useToast } from "./use-toast";

export default function useFiles() {
  const [isLoading, setIsLoading] = React.useState(false);

  const { toast } = useToast();

  const searchFile = async (nanoId?: string) => {
    setIsLoading(true);

    try {
      const response: NanoModel = await Api.get(`files/nanoId/${nanoId}`);

      setIsLoading(false);

      return response;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const getFile = async (id: string, password = null) => {
    setIsLoading(true);

    try {
      const response = await Api.get(
        `files/request-file-access?fileId=${id}&password=${password}`
      );

      setIsLoading(false);
      toast({
        description: "Successfully retrieved the file.",
        type: "success",
      });

      return response;
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  };

  const downloadFile = async (id: string) => {
    setIsLoading(true);
    try {
      const { response, fileName } = await Api.download(`files/download/${id}`);

      const data = await response.blob();

      if (!(data instanceof Blob)) return;

      const link = document.createElement("a");
      link.href = window.URL.createObjectURL(data);
      link.download = fileName ? fileName : `export-${+new Date()}.doc`;
      link.click();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      throw error;
    }
  };

  return {
    searchFile,
    getFile,
    downloadFile,
    isLoading,
  };
}
