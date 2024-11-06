// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import { CircleCheckBig, Copy } from "lucide-react";

import { useToast } from "@/hooks/use-toast";

import { Button } from "../ui/button";
import CustomTooltip from "../Common/CustomTooltip";

interface Props {
  nanoId?: string;
}

export default function FileUploadSuccess({ nanoId }: Props) {
  const [copied, setCopied] = React.useState(false);

  const { toast } = useToast();

  const handleCopyToClipboard = async () => {
    await navigator.clipboard.writeText(`/${nanoId}` as any);

    setCopied(true);
    toast({ description: "Copied to clipboard!" });
  };

  React.useEffect(() => {
    const handleBeforeUnload = (event: any) => {
      if (!copied) {
        event.preventDefault();
        event.returnValue = "";
      }
    };

    if (!copied) {
      window.addEventListener("beforeunload", handleBeforeUnload);
    }

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [copied]);

  return (
    <div tw="max-w-80 mx-auto mt-20">
      <div tw="bg-gray-50 p-4 rounded-lg flex flex-col justify-center items-center space-y-6 text-center">
        <CircleCheckBig size={92} tw="text-green-500 mt-14" />
        <h1 tw="text-3xl font-semibold text-slate-700">Done!</h1>
        <p tw="text-slate-800">
          Your transfer has been created and ready to be shared however you
          like.
        </p>
        <div tw="w-full flex flex-row justify-between items-center space-x-2 bg-blue-100 rounded-md p-2">
          <span tw="ml-2 text-gray-800 line-clamp-1">{`secrypt/${nanoId}`}</span>

          <CustomTooltip title="Copy to clipboard">
            <Button
              variant="ghost"
              size="icon"
              tw="rounded-full text-blue-600"
              onClick={handleCopyToClipboard}
            >
              <Copy />
            </Button>
          </CustomTooltip>
        </div>
        <span tw="text-xs text-gray-500">{`Don't forget to copy the link!`}</span>
      </div>
    </div>
  );
}
