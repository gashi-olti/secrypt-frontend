// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import React from "react";
import { Search } from "lucide-react";

import useFiles from "@/hooks/useFiles";

import { Input } from "../ui/input";
import { Button } from "../ui/button";
import Backdrop from "../Backdrop";
import { useFile } from "./FileProvier";

export default function FileSearch() {
  const [link, setLink] = React.useState("");

  const { setNano, setFile } = useFile();
  const { searchFile, getFile, isLoading } = useFiles();

  const onChange = (e: any) => {
    setLink(e.target.value);
  };

  const submit = async () => {
    const nano = await searchFile(link);

    if (nano && setNano) {
      setNano(nano);

      if (!nano.hasPassword) {
        const file = await getFile(nano.id as string);

        if (file) {
          setFile(file);
        }
      }
    }
  };

  return (
    <Backdrop isLoading={isLoading} description="Retrieving the file...">
      <div tw="w-full flex flex-row space-x-2 bg-slate-700 rounded-md">
        <Input
          type="text"
          placeholder="Paste link here..."
          tw="h-16 pl-4 text-xl text-gray-200 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-slate-400"
          onChange={onChange}
        />
        <Button
          size="lg"
          tw="h-16 text-gray-200 bg-blue-600 rounded-tl-none rounded-bl-none hover:(bg-blue-700)"
          onClick={submit}
        >
          <Search />
        </Button>
      </div>
    </Backdrop>
  );
}
