// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

// import { useToast } from "@/hooks/use-toast";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import PasswordForm from "./PasswordForm";
import { useFile } from "./FileProvier";

export default function PasswordDialog() {
  const [open, setOpen] = React.useState(false);

  const { nano, file } = useFile();
  // const { toast } = useToast();

  const handleCancel = () => {
    setOpen(false);
  };

  const handleFileAccessSuccess = (response: any) => {
    if (response) {
      // toast({ description: "Successfully retrieved the file" });
      setOpen(false);
    }
  };

  React.useEffect(() => {
    if (nano) {
      const isOpen = (nano && nano?.hasPassword && !file) ?? false;
      setOpen(isOpen);
    }
  }, [nano, file]);

  return (
    <Dialog open={open}>
      {/* <DialogTrigger>Open</DialogTrigger> */}
      <DialogContent hideCloseButton>
        <DialogHeader>
          <DialogTitle>Protected File</DialogTitle>
          <DialogDescription>
            This is a protected file. Please type password to retrieve the file.
          </DialogDescription>

          <div tw="mt-4!">
            <PasswordForm
              onCancel={handleCancel}
              onFileAccess={(response) => handleFileAccessSuccess(response)}
            />
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
