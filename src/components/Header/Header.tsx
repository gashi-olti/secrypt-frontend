// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import { CloudUpload } from "lucide-react";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <div tw="m-4 md:(mx-8 my-6) flex flex-row items-center gap-x-12">
      <div tw="w-fit">
        <Link href="/">
          <div tw="w-fit flex flex-row items-center gap-2">
            <CloudUpload size={30} />
            <span tw="text-xl font-semibold uppercase">secrypt</span>
          </div>
        </Link>
      </div>
      <div tw="w-fit">
        <Navigation />
      </div>
    </div>
  );
}
