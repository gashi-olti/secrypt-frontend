// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import {
  CalendarFold,
  Download,
  FileAxis3D,
  FileType,
  Hourglass,
} from "lucide-react";

import { useFile } from "./FileProvier";
import { formatReadableDateTime, toHours } from "@/utils/functions";
import { Button } from "../ui/button";
import FileCountdown from "./FileCountdown";
import { Separator } from "../ui/separator";
import FileHero from "./FileHero";

type FileDetailsType = {
  icon: React.ReactNode;
  text: string;
  value: any;
  type?: string | number | Date | "size" | "duration";
};

const FileDetails = ({ icon, text, value, type }: FileDetailsType) => {
  return (
    <div tw="grid grid-cols-12">
      <div tw="col-span-1">
        <div tw="h-full flex flex-row items-center text-gray-500">{icon}</div>
      </div>
      <div tw="col-span-5">
        <div tw="h-full flex flex-row items-center text-gray-500">
          <p tw="text-sm font-medium">{text}</p>
        </div>
      </div>
      <div tw="col-span-6">
        <span tw="text-sm text-gray-500 font-semibold">
          {type === "size"
            ? `${value} MB`
            : type === "duration"
            ? `${toHours({ milliseconds: value })} hours`
            : type === "Date"
            ? formatReadableDateTime(new Date(value))
            : value}
        </span>
      </div>
    </div>
  );
};

export default function SingleFile() {
  const { file } = useFile();

  return (
    <div tw="bg-gray-50 p-10 rounded-xl flex flex-col md:(flex-row)">
      <div tw="w-full grid grid-cols-12 md:gap-8">
        <div tw="hidden md:(block col-span-4)">
          <FileHero />
        </div>
        <div tw="col-span-12 md:col-span-8 space-y-8">
          <h2 tw="text-2xl font-semibold text-gray-700 whitespace-normal break-words">
            {file?.fileName}
          </h2>
          <FileCountdown />

          <Separator tw="bg-gray-200" />

          <div tw="grid grid-cols-12 text-gray-400 space-y-2">
            <div tw="col-span-12">
              <FileDetails
                icon={<FileAxis3D size={18} />}
                text="File Size"
                value={file?.fileSize}
                type="size"
              />
            </div>
            <div tw="col-span-12">
              <FileDetails
                icon={<FileType size={18} />}
                text="File Type"
                value={file?.fileType}
              />
            </div>
            <div tw="col-span-12">
              <FileDetails
                icon={<Download size={18} />}
                text="Downloads Allowed"
                value={file?.maxDownloads}
              />
            </div>
            <div tw="col-span-12">
              <FileDetails
                icon={<Download size={18} />}
                text="Downloads Left"
                value={file?.downloadCount}
              />
            </div>
            <div tw="col-span-12">
              <FileDetails
                icon={<Hourglass size={18} />}
                text="Duration"
                value={file?.ttl}
                type="duration"
              />
            </div>
            <div tw="col-span-12">
              <FileDetails
                icon={<CalendarFold size={18} />}
                text="Uploaded At"
                value={file?.uploadedAt}
                type="Date"
              />
            </div>
          </div>

          <div tw="w-full">
            <Button
              type="button"
              variant="secondary"
              disabled={file?.downloadCount === 0}
              tw="w-full uppercase"
            >
              <Download />
              Download
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
