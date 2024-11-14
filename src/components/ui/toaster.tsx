// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import { CircleCheckBig, CircleX, Info, TriangleAlert } from "lucide-react";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import React from "react";

const Icon: Record<string, React.ReactNode> = {
  success: <CircleCheckBig size={20} />,
  info: <Info size={20} />,
  warning: <TriangleAlert size={20} />,
  error: <CircleX size={20} />,
};

export function Toaster() {
  const { toasts } = useToast();

  return (
    <ToastProvider>
      {toasts.map(function ({
        id,
        title,
        description,
        action,
        type,
        ...props
      }) {
        return (
          <Toast key={id} {...props}>
            <div tw="w-full flex flex-row space-x-3">
              {type && <div tw="w-fit">{Icon[type]}</div>}
              <div tw="w-full">
                <div className="grid gap-1">
                  {title && <ToastTitle tw="uppercase">{title}</ToastTitle>}
                  {description && (
                    <ToastDescription>{description}</ToastDescription>
                  )}
                </div>
                {action}
              </div>
            </div>
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
