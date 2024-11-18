import React from "react";
import { useFormContext } from "react-hook-form";

import DropZone from "./DropZone";
import { ViewTypes } from "../Home/Home";
import { useToast } from "@/hooks/use-toast";
import { fileTypes } from "@/utils/fileFunctions";

type Props = {
  accept?: string;
  name: string;
  disabled?: boolean;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setView: React.Dispatch<React.SetStateAction<ViewTypes>>;
};

export default function MediaSingle({
  accept = `
  application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document,
  image/jpg,
  image/jpeg,
  image/png,
  image/gif,  
  application/zip,
  application/x-rar-compressed,
  application/pdf,
  video/mp4,
  audio/mpeg,
  video/quicktime,
  video/x-msvideo,
  video/x-matroska,
  application/vnd.openxmlformats-officedocument.presentationml.presentation,
  application/vnd.ms-excel`,
  name,
  disabled = false,
  setFile,
  setView,
}: Props) {
  const { setValue } = useFormContext<File>();

  const { toast } = useToast();

  const addFile = React.useCallback(
    async (files: FileList) => {
      if (files.length) {
        const file = files[0];
        const maxSize = 2 * 1024 * 1024 * 1024;

        if (!fileTypes.includes(file?.type)) {
          toast({ description: "File type not allowed!" });
          return;
        }

        if (file.size > maxSize) {
          toast({ description: "The file size should not exceed 1.5 GB." });
          return;
        }

        setValue(name as any, file);
        setFile(file);
        setView("form");
      } else {
        toast({ description: "Too many files selected" });
      }
    },
    [name, setFile, setValue, setView, toast]
  );

  return (
    <>
      <DropZone
        accept={accept}
        onChange={addFile}
        // loading={isLoading}
        loading={false}
        disabled={disabled}
      />
    </>
  );
}
