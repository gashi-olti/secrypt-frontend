// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import * as yup from "yup";
import { FormProvider, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import useFiles from "@/hooks/useFiles";
import { FileModel } from "@/interfaces/file.interface";

import { Button } from "../ui/button";
import { FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { useFile } from "./FileProvier";
import useFormErrors from "@/hooks/useFormErrors";

const schema = () =>
  yup.object().shape({
    password: yup
      .string()
      .required("This field is required")
      .min(8, "Minimum of 8 characters required")
      .max(255, "You can type up to 255 characters only"),
  });

interface Props {
  onCancel?: () => void;
  onFileAccess?: (file: FileModel) => void;
}

export default function PasswordForm({ onCancel, onFileAccess }: Props) {
  const defaultValues = React.useMemo(
    () => ({
      password: "",
    }),
    []
  );

  const { nano, setFile } = useFile();
  const { getFile, isLoading } = useFiles();

  const { handleSubmit, control, ...methods } = useForm<{ password: string }>({
    mode: "onBlur",
    resolver: yupResolver(schema()) as any,
    defaultValues,
  });

  const { handleErrors } = useFormErrors<{ password: string }>(
    methods.setError,
    "password"
  );

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    }
  };

  const submitForm = async (data: any) => {
    try {
      const response = await getFile(nano?.id as string, data?.password);

      if (response) {
        setFile(response);

        if (onFileAccess) {
          onFileAccess(response);
        }
      }
    } catch (error) {
      handleErrors(error);
    }
  };

  return (
    <FormProvider {...methods} control={control} handleSubmit={handleSubmit}>
      <div tw="grid grid-cols-12 gap-8">
        <div tw="col-span-12">
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <Input
                  placeholder="Password..."
                  disabled={isLoading}
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div tw="col-span-12 flex flex-row justify-end space-x-2">
          <Button variant="ghost" disabled={isLoading} onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={handleSubmit(submitForm)}
            disabled={isLoading}
          >
            Ok
          </Button>
        </div>
      </div>
    </FormProvider>
  );
}
