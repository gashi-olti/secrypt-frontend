// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";

export default function MediaHeader() {
  return (
    <div tw="text-center flex flex-col space-y-4">
      <h1 tw="text-4xl font-semibold md:(text-6xl font-bold)">
        Send super big files
      </h1>
      <h3 tw="text-xl font-medium md:(text-3xl font-medium)">
        Simple. Fast. Beautiful.
      </h3>
    </div>
  );
}
