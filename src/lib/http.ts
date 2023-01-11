import { invoke } from "@tauri-apps/api/tauri";
import type { App } from "../app";
import { homeDir } from '@tauri-apps/api/path';
import { createDir, removeFile } from '@tauri-apps/api/fs';

export async function writeFile(path: string, json: any) {
    const dir = await homeDir();
    const folder = dir + "fda_companion";
    await createDir(folder);
    const _path = folder + path.replaceAll("/", "\\");
    await invoke("write_json_to_file", {
      path: _path,
      json: JSON.stringify(json, null, 2),
    });
}

export async function readFile<T>(path: string): Promise<T> {
    const dir = await homeDir();
    const folder = dir + "fda_companion";
    await createDir(folder);
    return JSON.parse(await invoke("read_json_from_file", { path })) as T;
}

const defaultOptions : RequestInit = {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'include', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
};

export function setHeaders(headers: {[key: string]: any}) {
    defaultOptions.headers = {
        ...defaultOptions.headers,
        ...headers
    };
}

export async function http<T extends object>(
    method: RequestInit["method"],
    url: string,
    body: any = null,
    options?: RequestInit,
    ): Promise<T>  {
        const filename = url.replaceAll("/", "_").substring(1);
        try {
            const resp = await fetch(import.meta.env.VITE_URL_BACKEND + url, {
                ...defaultOptions,
                ...options,
                method,
                body: body ? JSON.stringify(body) : undefined
            });
            const data = resp.json() as (T | App.Models.RequestError);
            console.log('Success:', data);
            if (Object.hasOwn(data, "error")) throw data;
            return data as T;
        } catch (error: any) {
            if (error.message.includes("fetch")) throw {
                error: "messages.errors.fetch",
            };
            else throw {
                error: error.message,
            };
        }
}
