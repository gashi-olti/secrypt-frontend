// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useMediaUpload from "@/hooks/useMediaUpload";

import FileUploadSuccess from "./FileUploadSuccess";
import schema, { MediaUploadType } from "../MediaUpload/schema";
import FileUpload from "./FileUpload";
import FileUploadForm from "./FileUploadForm";
import { Button } from "../ui/button";

export type ViewTypes = "upload" | "form" | "upload-success";

export default function Home() {
  const [view, setView] = React.useState<ViewTypes>("upload");
  const [file, setFile] = React.useState<File | undefined>(undefined);

  const defaultValues = React.useMemo<MediaUploadType>(
    () => ({
      fileType: undefined,
      maxDownloads: "1",
      ttl: "1 minute",
      password: "",
    }),
    []
  );

  const { uploadMedia, isLoading } = useMediaUpload();

  const { handleSubmit, getValues, reset, ...methods } =
    useForm<MediaUploadType>({
      mode: "onBlur",
      resolver: yupResolver(schema()) as any,
      defaultValues,
    });

  React.useEffect(() => {
    reset({ ...getValues(), ...defaultValues });
  }, [defaultValues, getValues, reset]);

  const submitForm = async (values: MediaUploadType) => {
    try {
      const response = await uploadMedia(values);
      console.log({ response });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      {(view === "upload" || view === "form") && (
        <FormProvider
          {...methods}
          getValues={getValues}
          reset={reset}
          handleSubmit={handleSubmit}
        >
          {/* <form onSubmit={handleSubmit(submitForm)}> */}
          {view === "upload" && (
            <FileUpload file={file} setFile={setFile} setView={setView} />
          )}
          {view === "form" && (
            <FileUploadForm file={file} setFile={setFile} setView={setView} />
          )}
          {/* </form> */}
          <Button
            type="submit"
            tw="w-full bg-sky-700 hover:bg-sky-900"
            onClick={handleSubmit(submitForm)}
          >
            Upload
          </Button>
        </FormProvider>
      )}
      {view === "upload-success" && <FileUploadSuccess />}
    </>
  );
}
