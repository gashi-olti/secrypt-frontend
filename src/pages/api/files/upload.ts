import getConfig from "next/config";

import { fetchFormData } from "@/lib/api";
import cors from "@/lib/corsMiddleware";
import { NextApiRequest, NextApiResponse } from "next";

const { serverRuntimeConfig } = getConfig();
const baseUrl = serverRuntimeConfig.backendUrl;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await cors(req, res);

  if (req.method === "POST") {
    const body = await req.body;
    const url = `${baseUrl}/files/upload`;

    try {
      const data = await fetchFormData(url, body);

      console.log({ data });

      return res.json(data);
    } catch (error: any) {
      const { response } = error;
      console.log({ response, error });
      return res.status(response?.status || 500).json(error.data);
    }
  }
}
