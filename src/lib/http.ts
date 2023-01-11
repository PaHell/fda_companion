import { invoke } from "@tauri-apps/api/tauri";
import type { App } from "../app";

async function writeFile(path: string, json: any) {
    await invoke("write_json_to_file", {
      path,
      json: JSON.stringify(json, null, 2),
    });
}

export async function readFile<T>(path: string): Promise<JSON> {
    return JSON.parse(await invoke("read_json_from_file", { path })) as JSON;
}

const defaultOptions : RequestInit = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export async function http<T extends object>(
    method: RequestInit["method"],
    url: string,
    body: any = null,
    options?: RequestInit,
    ): Promise<T>  {
        const filename = url.replaceAll("/", "_").substring(1);
        const save = false && method === "GET";
        const sync = false && method === "POST";
        try {
            const resp = await fetch(import.meta.env.VITE_APP_URL_BACKEND + url, {
                ...defaultOptions,
                ...options,
                method,
                body: body ? JSON.stringify(body) : undefined
            });
            const data = resp.json() as (T | App.Models.RequestError);
            console.log('Success:', data);
            if (save) {
                const success = await writeFile('json/' + filename + '.json', data);
            }
            if (Object.hasOwn(data, "error")) throw data;
            return data as T;
        } catch (error: any) {
            if (save) readFile(filename + '.json')
                .then((res) => {
                    console.log("res", res);
                    return JSON.parse(res as unknown as string) as T;
                }).catch((err) => {
                    console.log("err", err);
                    throw err;
                });
            if (error.message.includes("fetch")) throw {
                error: "messages.errors.fetch",
            };
            else throw {
                error: error.message,
            };
        }
}
