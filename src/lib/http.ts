import { invoke } from "@tauri-apps/api/tauri";

async function writeFile(path: string, json: string) {
    await invoke("write_json_to_file", {
      path,
      json: JSON.stringify(json, null, 2),
    });
}

async function readFile<T>(path: string): Promise<T> {
    await invoke("read_json_from_file", { path }) as T;
}

const options : RequestInit = {
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

export async function get<T>(url: string): Promise<T> {
    const response = await fetch(url, options);
    return response.json();
}
