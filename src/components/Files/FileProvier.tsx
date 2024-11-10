import tw from "twin.macro";
import React from "react";

import { FileModel, FileStyle } from "@/interfaces/file.interface";
import { NanoModel } from "@/interfaces/nano.interface";

interface FileContextValue {
  nano?: NanoModel;
  setNano?: React.Dispatch<React.SetStateAction<NanoModel | undefined>>;
  file?: FileModel;
  setFile: React.Dispatch<React.SetStateAction<FileModel | undefined>>;
  passed?: boolean;
  setPassed?: React.Dispatch<React.SetStateAction<boolean>>;
  fileStyle?: FileStyle | undefined;
}

export const FileContext = React.createContext<FileContextValue>({
  fileStyle: undefined,
  setFile: () => {},
});

type FileProviderProps = {
  children: React.ReactNode;
};

export const useFile = () => React.useContext(FileContext);

export const FileProvider = ({ children }: FileProviderProps) => {
  const [nano, setNano] = React.useState<NanoModel>();
  const [file, setFile] = React.useState<FileModel>();
  const [passed, setPassed] = React.useState(false);

  const fileStyles: FileStyle[] = [
    {
      type: "PDF",
      backgroundColor: tw`bg-red-100`,
    },
    {
      type: "DOCUMENT",
      backgroundColor: tw`bg-blue-100`,
    },
    {
      type: "VIDEO",
      backgroundColor: tw`bg-green-100`,
    },
    {
      type: "IMAGE",
      backgroundColor: tw`bg-orange-100`,
    },
  ];

  const fileStyle = fileStyles?.find((item) => item.type === file?.fileType);

  const value = {
    nano,
    setNano,
    file,
    setFile,
    passed,
    setPassed,
    fileStyle,
  };

  return <FileContext.Provider value={value}>{children}</FileContext.Provider>;
};
