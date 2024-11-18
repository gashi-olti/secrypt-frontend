// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";

import { getRemainingTime } from "@/utils/functions";

import { useFile } from "./FileProvier";
import { useRouter } from "next/router";

type RemainingTime = {
  hours: string;
  minutes: string;
  seconds: string;
};

export default function FileCountdown() {
  const [remainingTime, setRemainingTime] = React.useState<RemainingTime>();

  const router = useRouter();

  const { file, fileStyle } = useFile();

  React.useEffect(() => {
    if (file) {
      const time = getRemainingTime({
        ms: file.ttl,
        createdAt: new Date(file.uploadedAt),
      });
      setRemainingTime(time ?? undefined);

      const interval = setInterval(() => {
        const updatedTime = getRemainingTime({
          ms: file.ttl,
          createdAt: new Date(file.uploadedAt),
        });

        if (!updatedTime) {
          router.push("/");
        }
        setRemainingTime(updatedTime ?? undefined);
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [file, router]);

  return (
    <>
      {remainingTime && (
        <div tw="w-full rounded-sm flex flex-row items-center gap-4">
          <div tw="w-full flex flex-row justify-center gap-6">
            <div tw="w-full flex flex-col items-center rounded-md bg-black/80 px-6 py-4">
              <span tw="text-3xl font-semibold">{remainingTime?.hours}</span>
              <span tw="text-sm">Hours</span>
            </div>
            <div
              tw="w-full flex flex-col items-center rounded-md  px-6 py-4"
              css={[fileStyle?.backgroundColor]}
            >
              <span tw="text-3xl font-semibold text-gray-700">
                {remainingTime?.minutes}
              </span>
              <span tw="text-gray-700 text-sm">Mins</span>
            </div>
            <div tw="w-full flex flex-col items-center rounded-md bg-black/80 px-6 py-4">
              <span tw="text-3xl font-semibold">{remainingTime?.seconds}</span>
              <span tw="text-sm">Sec</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
