// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogTitle,
} from "./ui/alert-dialog";

type Props = {
  isLoading?: boolean;
  description?: string;
  children: React.ReactNode;
};

export default function Backdrop({ isLoading, description, children }: Props) {
  return (
    <>
      <AlertDialog open={isLoading}>
        <AlertDialogTitle hidden></AlertDialogTitle>
        <AlertDialogContent tw="h-full bg-transparent border-none outline-none">
          <div tw="w-full h-full flex flex-col justify-center items-center space-y-4">
            <div tw="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-100"></div>
            <h3 tw="text-white">{description ?? "Loading..."}</h3>
          </div>
        </AlertDialogContent>
      </AlertDialog>

      {children}
    </>
  );
}
