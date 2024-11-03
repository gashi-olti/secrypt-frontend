// eslint-disable-next-line @typescript-eslint/no-unused-vars
import tw from "twin.macro";

import Header from "./Header";
import { Toaster } from "./ui/sonner";
// import Footer from "./Footer";

type Props = {
  children: NonNullable<React.ReactNode>;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl" | false;
};

export default function Layout({ children }: Props) {
  return (
    <div tw="flex flex-col h-screen">
      <Header />
      <div tw="grow">{children}</div>
      <Toaster />
      {/* <Footer /> */}
    </div>
  );
}
