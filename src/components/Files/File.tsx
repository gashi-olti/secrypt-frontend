// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

import FileSearch from "./FileSearch";
import PasswordDialog from "./PasswordDialog";
import { useFile } from "./FileProvier";
import SingleFile from "./SingleFile";

export default function File() {
  const { file } = useFile();

  return (
    <div tw="max-w-screen-md h-full flex flex-col items-center mx-auto p-2 md:p-4">
      <div tw="w-full grid grid-cols-12 m-auto">
        {!file && (
          <div tw="col-span-12">
            <FileSearch />
          </div>
        )}
        {file && (
          <div tw="col-span-12">
            <SingleFile />
          </div>
        )}
      </div>

      <PasswordDialog />
    </div>
  );
}
