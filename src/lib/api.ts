export async function fetchJson(
  ...args: [input: RequestInfo, init?: RequestInit | undefined]
) {
  try {
    const headers: HeadersInit = new Headers(args[1]?.headers);
    headers.set("Content-Type", "application/json");

    const init = {
      ...(args[1] && { ...args[1] }),
      headers,
    };

    const response = await fetch(args[0], init);
    const data = await response.json();

    if (response.ok) {
      return data;
    }

    const error: any = new Error(response.statusText);
    error.response = response;
    error.data = data;
    error.status = response.status;

    throw error;
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

export async function fetchFormData(
  url: string,
  body: FormData,
  headers?: any
) {
  console.log({ url, body, headers });
  try {
    const response = await fetch(`/api/${url}`, {
      body,
      method: "POST",
      headers,
    });

    console.log({ response });

    const contentType = response.headers.get("content-type");

    let data;

    if (contentType && contentType.includes("application/json")) {
      data = await response.json();
    } else if (contentType && contentType.includes("text/plain")) {
      data = await response.text();
    } else if (contentType && contentType.includes("text/html")) {
      data = await response.text();
    } else {
      throw new Error("Unsupported response format");
    }

    if (response.ok) {
      return data;
    }

    const error: any = new Error(response.statusText);
    error.response = response;
    error.data = data;
    error.status = response.status;

    throw error;
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

const getFilename = (response: Response): string => {
  let filename = "";

  const disposition = response.headers.get("content-disposition");

  if (disposition && disposition.indexOf("attachment") !== -1) {
    const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;

    const matches = filenameRegex.exec(disposition);

    if (matches != null && matches[1]) {
      filename = matches[1].replace(/['"]/g, "");
    }
  }

  return filename;
};

export async function fetchFile(
  ...args: [input: RequestInfo, init?: RequestInit]
) {
  try {
    const headers: HeadersInit = new Headers(args[1]?.headers);

    const init = {
      ...(args[1] && { ...args[1] }),
      headers,
    };

    console.log({ init });

    const response = await fetch(args[0], init);

    if (!response.ok) {
      const error: any = new Error(response.statusText);
      error.response = response;
      error.status = response.status;

      throw error;
    }

    return response;
  } catch (error: any) {
    if (!error.data) {
      error.data = { message: error.message };
    }
    throw error;
  }
}

export default class Api {
  public static async get(url: string) {
    return fetchJson(`/api/${url}`);
  }

  public static async post(url: string, body: any, headers?: any) {
    return fetchJson(`/api/${url}`, {
      body: JSON.stringify(body),
      method: "POST",
      headers,
    });
  }

  public static async upload(url: string, body: FormData, headers?: Headers) {
    return fetchFormData(url, body, headers);
  }

  public static async download(url: string) {
    const response = await fetchFile(`/api/${url}`);
    return { response, fileName: getFilename(response) };
  }
}
