import { Images } from "@/components/Icons/Images";
import { MediaType } from "@/components/MediaUpload/schema";

/**
 * Format bytes as human-readable text.
 *
 * @param bytes Number of bytes.
 * @param si True to use metric (SI) units, aka powers of 1000. False to use
 *           binary (IEC), aka powers of 1024.
 * @param dp Number of decimal places to display.
 *
 * @return Formatted string.
 */
export function humanFileSize(bytes: number, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

export function toMilliseconds({
  value,
  type,
}: {
  value: number;
  type: "minute" | "minutes" | "hour" | "hours";
}) {
  if (type === "minute" || type === "minutes") {
    return value * 60 * 1000;
  }
  if (type === "hour" || type === "hours") {
    return value * 60 * 60 * 1000;
  }

  return 0;
}

export function toHours({ milliseconds = 0 }: { milliseconds: number }) {
  return milliseconds / 3600000;
}

export function formatReadableDateTime(date: Date) {
  return date.toLocaleString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

export function getRemainingTime({
  ms,
  createdAt,
}: {
  ms: number;
  createdAt: Date;
}) {
  const createdAtTime = new Date(createdAt).getTime();
  const currentTime = Date.now();
  const timeElapsed = currentTime - createdAtTime;
  const timeRemaining = ms - timeElapsed;

  if (timeRemaining <= 0) {
    return null;
  }

  const hours = String(Math.floor(timeRemaining / (1000 * 60 * 60))).padStart(
    2,
    "0"
  );
  const minutes = String(
    Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60))
  ).padStart(2, "0");
  const seconds = String(
    Math.floor((timeRemaining % (1000 * 60)) / 1000)
  ).padStart(2, "0");

  return {
    hours,
    minutes,
    seconds,
  };
}

export function retrieveImage({ type }: { type: MediaType }) {
  let image = null;

  switch (type) {
    case MediaType.IMAGE:
      image = Images.ImageIcon;
      break;
    case MediaType.DOCUMENT:
      image = Images.DocIcon;
      break;
    case MediaType.VIDEO:
      image = Images.VideoIcon;
      break;
    case MediaType.PDF:
      image = Images.PdfIcon;
      break;
    default:
      image = Images.DocIcon;
  }

  return image;
}
