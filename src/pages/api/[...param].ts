import type { NextApiRequest, NextApiResponse } from "next";
import getConfig from "next/config";

import cors from "@/lib/corsMiddleware";
import proxyMiddleware from "@/lib/proxyMiddleware";

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

console.log("[...param]");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  console.log({ baseUrl });
  // console.log({ req, res });

  await proxyMiddleware()(req, res);
}

export const config = {
  api: {
    externalResolver: true,
    // bodyParser: false,
  },
};
