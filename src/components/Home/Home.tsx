// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useMediaUpload from "@/hooks/useMediaUpload";

import FileUploadSuccess from "./FileUploadSuccess";
import schema, { MediaType, MediaUploadType } from "../MediaUpload/schema";
import FileUpload from "./FileUpload";
import FileUploadForm from "./FileUploadForm";
import { Button } from "../ui/button";
import Backdrop from "../Backdrop";

export type ViewTypes = "upload" | "form" | "upload-success";

export default function Home() {
  const [view, setView] = React.useState<ViewTypes>("upload");
  const [file, setFile] = React.useState<File | undefined>(undefined);
  const [nanoId, setNanoId] = React.useState<string>("");

  const defaultValues = React.useMemo<MediaUploadType>(
    () => ({
      file: undefined,
      fileType: MediaType.IMAGE,
      maxDownloads: "3",
      ttl: "2 minutes",
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

      if (response) {
        const nanoId = response?.substring(response.lastIndexOf("/") + 1);

        setNanoId(nanoId);
        setView("upload-success");
      }
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <Backdrop isLoading={isLoading} description="Your file is uploading...">
      {(view === "upload" || view === "form") && (
        <FormProvider
          {...methods}
          getValues={getValues}
          reset={reset}
          handleSubmit={handleSubmit}
        >
          {view === "upload" && (
            <FileUpload
              name="file"
              file={file}
              setFile={setFile}
              setView={setView}
            />
          )}
          {view === "form" && (
            <FileUploadForm file={file} setFile={setFile} setView={setView}>
              <Button
                type="submit"
                tw="w-full text-white bg-sky-700 hover:bg-sky-900"
                onClick={handleSubmit(submitForm)}
              >
                Upload
              </Button>
            </FileUploadForm>
          )}
        </FormProvider>
      )}
      {view === "upload-success" && <FileUploadSuccess nanoId={nanoId} />}
    </Backdrop>
  );
}
