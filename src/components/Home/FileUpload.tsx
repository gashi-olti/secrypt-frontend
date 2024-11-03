// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

import MediaSingle from "../MediaUpload/MediaSingle";
import { ViewTypes } from "./Home";

type Props = {
  file?: File;
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>;
  setView: React.Dispatch<React.SetStateAction<ViewTypes>>;
};

export default function FileUpload({ setFile, setView }: Props) {
  return (
    <div tw="h-full max-w-screen-md mx-auto p-4 flex flex-col items-center">
      <div tw="grid grid-cols-1 gap-12 md:(gap-16) my-auto">
        <div tw="col-span-full">
          <div tw="text-center flex flex-col space-y-4">
            <h1 tw="text-4xl font-semibold md:(text-6xl font-bold)">
              Send super big files
            </h1>
            <h3 tw="text-xl font-medium md:(text-3xl font-medium)">
              Simple. Fast. Beautiful.
            </h3>
          </div>
        </div>
        <div tw="col-span-full">
          <MediaSingle name="fileUpload" setFile={setFile} setView={setView} />
        </div>
      </div>
    </div>
  );
}
