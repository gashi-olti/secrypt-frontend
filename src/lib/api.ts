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
  try {
    const response = await fetch(`/api/${url}`, {
      body,
      method: "POST",
      headers,
    });

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
}
