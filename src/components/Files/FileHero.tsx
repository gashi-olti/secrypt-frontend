// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import Image from "next/image";

import { useFile } from "./FileProvier";
import { AspectRatio } from "../ui/aspect-ratio";
import { retrieveImage } from "@/utils/functions";
import { MediaType } from "../MediaUpload/schema";

export default function FileHero() {
  const { file, fileStyle } = useFile();

  return (
    <div tw="p-12 rounded-full" css={[fileStyle?.backgroundColor]}>
      <AspectRatio ratio={1 / 1}>
        <Image
          alt="image"
          fill
          src={retrieveImage({
            type: (file?.fileType as MediaType) ?? MediaType.DOCUMENT,
          })}
        />
      </AspectRatio>
    </div>
  );
}
