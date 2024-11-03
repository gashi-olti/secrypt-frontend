import getConfig from "next/config";

import { fetchJson } from "@/lib/api";
import cors from "@/lib/corsMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("executedd======");
  await cors(req, res);

  if (req.method === "POST") {
    const body = await req.body;
    const url = `${baseUrl}/upload`;

    try {
      const data = await fetchJson(url, {
        body: JSON.stringify(body),
        method: "POST",
      });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      return res.status(response?.status || 500).json(error.data);
    }
  }
}
