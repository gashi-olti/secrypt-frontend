// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import ReactDOM from "react-dom";

type Props = {
  isLoading?: boolean;
  description?: string;
  children: React.ReactNode;
};

export default function Backdrop({ isLoading, description, children }: Props) {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      {children}
      {isLoading &&
        ReactDOM.createPortal(
          <div
            tw="fixed inset-0 bg-black/80 flex flex-col justify-center items-center gap-6 backdrop-blur-xs"
            css={[{ zIndex: 999 }]}
          >
            <div tw="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-gray-100"></div>
            <h3 tw="text-white text-lg">{description ?? "Loading..."}</h3>
          </div>,
          document.getElementById("backdrop-root") as HTMLElement
        )}
    </>
  );
}
