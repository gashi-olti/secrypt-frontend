// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import Image from "next/image";
import { CircleX } from "lucide-react";

import { humanFileSize, retrieveImage } from "@/utils/functions";
import { useToast } from "@/hooks/use-toast";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { ViewTypes } from "../Home/Home";
import { AspectRatio } from "../ui/aspect-ratio";
import { MediaType } from "./schema";

type Props = {
  file?: File;
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
  setView: React.Dispatch<React.SetStateAction<ViewTypes>>;
};

export default function MediaItem({ file, setFile, setView }: Props) {
  const { name, size = 0, type } = file ?? {};

  const { toast } = useToast();

  const onRemoveFile = () => {
    if (setFile) {
      setFile(undefined);
      setView("upload");
      toast({
        type: "success",
        description: "File successfully removed.",
      });
    }
  };

  return (
    <div tw="w-full h-full bg-gray-50 p-4 rounded-xl">
      <div tw="grid grid-cols-1 gap-4">
        <div tw="p-4 flex flex-row justify-between items-center border-b border-gray-200 shadow-sm rounded-lg">
          <h3 tw="text-2xl text-slate-700 font-semibold">1 file</h3>
          <div tw="w-9 h-9">
            <AspectRatio ratio={1 / 1}>
              <Image
                alt="image"
                fill
                src={retrieveImage({
                  type: (type as MediaType) ?? MediaType.DOC,
                })}
              />
            </AspectRatio>
          </div>
        </div>
        <div tw="flex flex-row justify-between space-x-2">
          <div tw="flex flex-col line-clamp-1">
            <h3 tw="text-slate-700 font-semibold">{name}</h3>
            <p tw="text-gray-500 text-xs">{humanFileSize(size, true)}</p>
          </div>
          <div>
            <AlertDialog>
              <AlertDialogTrigger tw="p-2 hover:(bg-gray-200 rounded-full)">
                <CircleX size={20} tw="text-red-500" />
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogTitle>Remove uploaded file?</AlertDialogTitle>
                <AlertDialogDescription>
                  Do you wish to remove uploaded file? If you remove it, you
                  will have to reupload it again.
                </AlertDialogDescription>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onRemoveFile}>
                    Ok
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  );
}
