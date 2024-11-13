/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React from "react";
import { FieldValues, UseFormSetError } from "react-hook-form";

import { toast } from "sonner";

export default function useFormErrors<TFieldValues extends FieldValues>(
  setError?: UseFormSetError<TFieldValues>,
  field?: string
) {
  const handleErrors = React.useCallback(
    (error: any) => {
      if (setError && field) {
        setError(field as any, error?.data?.message, {
          shouldFocus: true,
        });
      } else if (error?.data?.message) {
        toast.error(error?.data?.message);
      } else if (error.status === 404) {
        // toast({ description: error?.data?.message });
        toast.error(error?.data?.message);
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    },
    [field, setError]
  );

  return {
    handleErrors,
  };
}
