import type { NextApiRequest, NextApiResponse } from "next";

import cors from "@/lib/corsMiddleware";
import proxyMiddleware from "@/lib/proxyMiddleware";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  await proxyMiddleware()(req, res);
}

export const config = {
  api: {
    externalResolver: true,
    responseLimit: false,
  },
};
