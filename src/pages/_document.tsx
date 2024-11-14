import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" className="dark">
      <Head />
      <body className="antialiased">
        <Main />
        <NextScript />
        <div id="backdrop-root"></div>
      </body>
    </Html>
  );
}
