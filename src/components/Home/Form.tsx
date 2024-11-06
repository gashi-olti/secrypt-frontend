// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";

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
import CustomTooltip from "../Common/CustomTooltip";

type TtlType = {
  value: string;
  label: string;
  type: "minute" | "minutes" | "hour" | "hours";
};

const ttlValues: TtlType[] = [
  { value: "2 minutes", label: "2 minutes", type: "minutes" },
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
            <FormItem tw="space-y-1 text-slate-600">
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
                    {["3", "10", "20", "30", "50"].map((number) => (
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
            <FormItem tw="space-y-1 text-slate-600">
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
            <FormItem tw="space-y-1 text-slate-600">
              <FormLabel>
                <div tw="w-full flex flex-row justify-between items-center pr-1">
                  Password
                  <CustomTooltip
                    title="Protect your sharing with a password"
                    delayDuration={200}
                  >
                    <Info size={16} />
                  </CustomTooltip>
                </div>
              </FormLabel>
              <FormControl>
                <Input placeholder="Password..." type="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
