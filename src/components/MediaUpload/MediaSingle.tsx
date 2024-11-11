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
    image/jpeg, 
    image/png,
    video/mp4,
    audio/mpeg,
    application/pdf,
    application/msword,
    application/vnd.openxmlformats-officedocument.wordprocessingml.document,
    application/vnd.ms-excel,
    application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,
    application/vnd.ms-powerpoint,
    application/vnd.openxmlformats-officedocument.presentationml.presentation,
    application/zip,
    application/x-7z-compressed,
    application/x-rar-compressed,
    application/x-tar,
    application/x-zip-compressed`,
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
        const maxSize = 1.5 * 1024 * 1024 * 1024;

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
