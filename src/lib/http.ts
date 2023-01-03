import { invoke } from "@tauri-apps/api/tauri";

async function writeFile(path: string, json: any) {
    await invoke("write_json_to_file", {
      path,
      json: JSON.stringify(json, null, 2),
    });
}

async function readFile<T>(path: string): Promise<T> {
    return await invoke("read_json_from_file", { path }) as T;
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

export async function http<T>(
    method: RequestInit["method"],
    url: string,
    options: RequestInit = {},
    body?: any
    ): Promise<T> {
    return new Promise((resolve, reject) => {
        const filename = url.replaceAll("/", "_").substring(1)
        fetch(import.meta.env.VITE_APP_URL_BACKEND + url, {
            ...defaultOptions,
            ...options,
            method,
            body: body ? JSON.stringify(body) : undefined
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                writeFile(filename + '.json', data)
                    .then((res) => {
                        console.log("res", res);
                    }).catch((err) => {
                        console.log("err", err);
                    });
                resolve(data);
            })
            .catch(error => {
                console.error('Error:', error);
                readFile(filename + '.json')
                    .then((res) => {
                        console.log("res", res);
                        resolve(JSON.parse(res as string) as T);
                    }).catch((err) => {
                        console.log("err", err);
                        reject(error);
                    });
            });
    });
}
