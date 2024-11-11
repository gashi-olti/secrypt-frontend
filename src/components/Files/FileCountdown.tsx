// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React, { useEffect } from "react";

import { getRemainingTime } from "@/utils/functions";
import { useFile } from "./FileProvier";

type RemainingTime = {
  hours: string;
  minutes: string;
  seconds: string;
};

export default function FileCountdown() {
  const [remainingTime, setRemainingTime] = React.useState<RemainingTime>();

  const { file, fileStyle } = useFile();

  useEffect(() => {
    if (file) {
      const interval = setInterval(() => {
        const time = getRemainingTime({
          ms: file.ttl,
          createdAt: new Date(file.uploadedAt),
        });

        setRemainingTime(time ?? undefined);
      }, 1000);

      return () => clearInterval(interval); // Clean up the interval on component unmount
    }
  }, [file]);

  return (
    <>
      {remainingTime && (
        <div tw="w-full rounded-sm flex flex-row items-center gap-4">
          <div tw="w-full flex flex-row justify-center gap-6">
            <div tw="w-full flex flex-col items-center rounded-md bg-black/80 px-6 py-3">
              <span tw="text-3xl font-semibold">{remainingTime?.hours}</span>
              <span tw="text-sm">Hours</span>
            </div>
            <div
              tw="w-full flex flex-col items-center rounded-md  px-6 py-3"
              css={[fileStyle?.backgroundColor]}
            >
              <span tw="text-3xl font-semibold text-gray-700">
                {remainingTime?.minutes}
              </span>
              <span tw="text-gray-700 text-sm">Mins</span>
            </div>
            <div tw="w-full flex flex-col items-center rounded-md bg-black/80 px-6 py-3">
              <span tw="text-3xl font-semibold">{remainingTime?.seconds}</span>
              <span tw="text-sm">Sec</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
