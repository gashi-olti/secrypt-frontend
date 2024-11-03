// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";
import { CircleCheckBig } from "lucide-react";

export default function FileUploadSuccess() {
  return (
    <div tw="max-w-80 mx-auto mt-20">
      <div tw="bg-gray-50 p-4 rounded-lg flex flex-col justify-center items-center space-y-6 text-center">
        <CircleCheckBig size={92} tw="text-green-500 mt-14" />
        <h1 tw="text-3xl font-semibold text-slate-700">Done!</h1>
        <p tw="text-slate-800">
          Your transfer has been created and ready to be shared however you
          like.
        </p>
      </div>
    </div>
  );
}
