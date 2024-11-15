// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import {
  CalendarFold,
  Download,
  FileAxis3D,
  FileType,
  Hourglass,
} from "lucide-react";

import { formatReadableDateTime, msToTime } from "@/utils/functions";
import { useFile } from "./FileProvier";

type FileDetailsType = {
  icon: React.ReactNode;
  text: string;
  value: any;
  type?: string | number | Date | "size" | "duration";
};

const Details = ({ icon, text, value, type }: FileDetailsType) => {
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
            ? `${msToTime({ milliseconds: value })}`
            : type === "Date"
            ? formatReadableDateTime(new Date(value))
            : value}
        </span>
      </div>
    </div>
  );
};

export default function FileDetails() {
  const { file } = useFile();

  return (
    <div tw="grid grid-cols-12 text-gray-400 space-y-2">
      <div tw="col-span-12">
        <Details
          icon={<FileAxis3D size={18} />}
          text="File Size"
          value={file?.fileSize}
          type="size"
        />
      </div>
      <div tw="col-span-12">
        <Details
          icon={<FileType size={18} />}
          text="File Type"
          value={file?.fileType}
        />
      </div>
      <div tw="col-span-12">
        <Details
          icon={<Download size={18} />}
          text="Downloads Allowed"
          value={file?.maxDownloads}
        />
      </div>
      <div tw="col-span-12">
        <Details
          icon={<Download size={18} />}
          text="Downloads Left"
          value={file?.downloadCount}
        />
      </div>
      <div tw="col-span-12">
        <Details
          icon={<Hourglass size={18} />}
          text="Duration"
          value={file?.ttl}
          type="duration"
        />
      </div>
      <div tw="col-span-12">
        <Details
          icon={<CalendarFold size={18} />}
          text="Uploaded At"
          value={file?.uploadedAt}
          type="Date"
        />
      </div>
    </div>
  );
}
