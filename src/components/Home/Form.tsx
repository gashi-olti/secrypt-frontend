// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import { useFormContext } from "react-hook-form";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Button } from "../ui/button";

type TtlType = {
  value: string;
  label: string;
  type: "minute" | "minutes" | "hour" | "hours";
};

const ttlValues: TtlType[] = [
  { value: "1 minute", label: "1 minute", type: "minutes" },
  { value: "5 minutes", label: "5 minutes", type: "minutes" },
  { value: "30 minutes", label: "30 minutes", type: "minutes" },
  { value: "1 hour", label: "1 hour", type: "hours" },
  { value: "5 hours", label: "5 hours", type: "hours" },
  { value: "15 hours", label: "15 hours", type: "hours" },
  { value: "24 hours", label: "1 day", type: "hours" },
];

export default function Form() {
  const { control } = useFormContext();

  return (
    <div tw="w-full grid grid-cols-1 gap-4 mt-4">
      <div tw="col-span-full">
        <FormField
          control={control}
          name="maxDownloads"
          render={({ field }) => (
            <FormItem tw="space-y-0 text-slate-600">
              <FormLabel>Max. Downloads</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  required
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a number" />
                  </SelectTrigger>
                  <SelectContent>
                    {["1", "5", "10", "25", "50"].map((number) => (
                      <SelectItem value={number} key={number}>
                        {number}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div tw="col-span-full">
        <FormField
          control={control}
          name="ttl"
          render={({ field }) => (
            <FormItem tw="space-y-0 text-slate-600">
              <FormLabel>Expires After:</FormLabel>
              <FormControl>
                <Select
                  {...field}
                  required
                  value={field.value}
                  onValueChange={(value) => field.onChange(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a number" />
                  </SelectTrigger>
                  <SelectContent>
                    {ttlValues.map((item, i) => (
                      <SelectItem value={item.value} key={i}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div tw="col-span-full">
        <FormField
          control={control}
          name="password"
          render={({ field }) => (
            <FormItem tw="space-y-0 text-slate-600">
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="Password..." type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      {/* <div tw="col-span-full">
        <Button type="submit" tw="w-full bg-sky-700 hover:bg-sky-900">
          Send
        </Button>
      </div> */}
    </div>
  );
}