// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw, { styled } from "twin.macro";
import React from "react";
import { CircleArrowUp } from "lucide-react";

import { Button } from "@/components/ui/button";

type StyledElement = {
  hover?: boolean;
  disabled?: boolean;
};

const DropArea = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "hover",
})<StyledElement>(({ hover, disabled }) => [
  tw`relative w-full flex flex-col items-center justify-center`,
  tw`w-full h-full p-4 rounded-2xl border-gray-300 border-4 border-dashed transition ease-in-out delay-100 duration-300`,
  hover ? tw`-translate-y-1 scale-105` : tw`scale-100`,

  disabled && tw`opacity-50`,
]);

const DropAreaInner = styled("div").withConfig({
  shouldForwardProp: (prop) => prop !== "hover",
})<StyledElement>(({ hover }) => [
  tw`bg-slate-50 relative w-full m-auto flex flex-col items-center justify-center space-y-4 text-center`,
  tw`w-full h-full p-20 rounded-2xl transition ease-in-out delay-100 duration-300`,
  hover ? tw`-translate-y-1 scale-105 ` : tw`scale-100`,
]);

type Props = {
  accept?: string;
  loading?: boolean;
  disabled?: boolean;
  onChange: (files: FileList) => void;
};

export default function DropZone({
  accept,
  loading = false,
  disabled = false,
  onChange,
}: Props) {
  const [dropzoneHover, setDropzoneHover] = React.useState(false);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const disableDropZone = disabled || loading;

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    const { files } = event.dataTransfer;

    if (files.length) {
      onChange(files);
    }

    setDropzoneHover(false);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    const { files } = event.target;
    if (files) {
      onChange(files);
    }
  };

  const handleInputClick = (event: React.ChangeEvent<any>) => {
    event.target.value = null;
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    setDropzoneHover(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();

    if (disableDropZone) return;

    setDropzoneHover(false);
  };

  const openFileSelection = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <DropArea
      hover={dropzoneHover}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      disabled={disableDropZone}
    >
      <DropAreaInner hover={dropzoneHover}>
        <Button
          variant="outline"
          size="icon"
          tw="w-16 h-16 bg-gray-200 rounded-full border-none shadow-lg text-gray-600 hover:(bg-gray-300 text-gray-600)"
          onClick={openFileSelection}
          disabled={disableDropZone}
        >
          <CircleArrowUp />
        </Button>
        <h2 tw="text-3xl font-semibold text-slate-700">{`Drop like it's hot!`}</h2>
        <p tw="text-gray-500">Up to 1.5GB</p>
      </DropAreaInner>
      <input
        accept={accept}
        type="file"
        ref={fileInputRef}
        onChange={handleInputChange}
        onClick={handleInputClick}
        tw="hidden"
      />
    </DropArea>
  );
}
