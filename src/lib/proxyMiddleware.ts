import getConfig from "next/config";
import { createProxyMiddleware } from "http-proxy-middleware";

import middleware from "./middleware";

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

const proxyMiddleware = () =>
  middleware(
    createProxyMiddleware({
      pathRewrite: { [`^/api`]: "" },
      //   logger: process.env.NODE_ENV === "production" ? "debug" : "warn",
      target: baseUrl,
      changeOrigin: true,
      secure: false,
    })
  );

export default proxyMiddleware;
