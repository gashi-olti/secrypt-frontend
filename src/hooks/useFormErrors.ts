import React from "react";
import { FieldValues, UseFormSetError } from "react-hook-form";

import { useToast } from "./use-toast";

export default function useFormErrors<TFieldValues extends FieldValues>(
  setError?: UseFormSetError<TFieldValues>,
  field?: string
) {
  const { toast } = useToast();

  const handleErrors = React.useCallback(
    (error: any) => {
      console.log({ error });
      if (setError && field) {
        setError(field as any, {
          type: "manual",
          message: error?.data?.message,
        });
      } else if (error?.data?.message) {
        toast({
          variant: "destructive",
          type: "error",
          description: error?.data?.message,
        });
      } else if (error.status === 404) {
        toast({
          variant: "destructive",
          type: "error",
          description: error?.data?.message,
        });
      } else {
        toast({
          variant: "destructive",
          type: "error",
          description: "Something went wrong. Please try again later.",
        });
      }
    },
    [field, setError, toast]
  );

  return {
    handleErrors,
  };
}
