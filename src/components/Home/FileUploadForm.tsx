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
};

export default function FileUploadForm({ file, setFile, setView }: Props) {
  return (
    <div tw="max-w-screen-md mx-auto p-4 mt-12">
      <div tw="grid grid-cols-12 md:(grid-cols-12) gap-4">
        <div tw="h-full col-span-12 md:(col-span-5)">
          <MediaItem file={file} setFile={setFile} setView={setView} />
        </div>
        <div tw="col-span-12 md:(col-span-7)">
          <div tw="w-full bg-gray-50 p-4 rounded-xl">
            <Tabs defaultValue="upload" tw="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="upload">Upload</TabsTrigger>
              </TabsList>
              <TabsContent value="upload">
                <Form />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
