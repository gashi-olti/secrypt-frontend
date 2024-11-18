// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

import MediaItem from "../MediaUpload/MediaItem";
import Form from "./Form";
import { ViewTypes } from "./Home";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

type Props = {
  file?: File;
  setFile?: React.Dispatch<React.SetStateAction<File | undefined>>;
  setView: React.Dispatch<React.SetStateAction<ViewTypes>>;
  children: React.ReactNode;
};

export default function FileUploadForm({
  file,
  setFile,
  setView,
  children,
}: Props) {
  return (
    <div tw="max-w-screen-md mx-auto h-full flex flex-row justify-between items-center p-4 -mt-8">
      <div tw="w-full grid grid-cols-12 md:(grid-cols-12) gap-4">
        <div tw="h-full col-span-12 md:(col-span-5)">
          <MediaItem file={file} setFile={setFile} setView={setView} />
        </div>
        <div tw="col-span-12 md:(col-span-7)">
          <div tw="w-full bg-gray-50 p-4 rounded-xl">
            <Tabs defaultValue="upload" tw="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-gray-100">
                <TabsTrigger
                  value="upload"
                  tw="bg-white! text-gray-600! shadow-xl"
                >
                  Upload
                </TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <div tw="grid grid-cols-12 gap-4">
                  <div tw="col-span-12">
                    <Form />
                  </div>
                  <div tw="col-span-12">{children}</div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
