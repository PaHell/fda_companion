#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use serde_json::{Number, Value};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn write_json_to_file(_json: String, _path: String){
    std::fs::write(
        _path,
        _json,
    )
    .unwrap();
}

#[tauri::command]
fn read_json_from_file(_path: String) -> String {
    let _json = std::fs::read_to_string(&_path).unwrap();
    _json.into();
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
