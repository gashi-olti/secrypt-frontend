// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import { Download } from "lucide-react";

import { useFile } from "./FileProvier";
import { Button } from "../ui/button";
import FileCountdown from "./FileCountdown";
import { Separator } from "../ui/separator";
import FileHero from "./FileHero";
import FileDetails from "./FileDetails";

export default function SingleFile() {
  const { file } = useFile();

  return (
    <div tw="bg-gray-50 px-4 py-6 rounded-xl flex flex-col md:(flex-row p-10)">
      <div tw="w-full grid grid-cols-12 md:gap-8">
        <div tw="hidden md:(block col-span-4)">
          <FileHero />
        </div>
        <div tw="col-span-12 md:col-span-8">
          <div tw="grid grid-cols-12 space-y-8">
            <div tw="col-span-12">
              <h2 tw="text-2xl font-semibold text-gray-700 whitespace-normal break-words">
                {file?.fileName}
              </h2>
            </div>
            <div tw="col-span-12">
              <FileCountdown />
            </div>
            <div tw="col-span-12">
              <Separator tw="bg-gray-200" />
            </div>
            <div tw="col-span-12">
              <FileDetails />
            </div>
            <div tw="col-span-12">
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
    </div>
  );
}
