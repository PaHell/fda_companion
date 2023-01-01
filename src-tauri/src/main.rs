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
fn write_json_to_file(json: String, path: String){
    std::fs::write(
        path,
        json,
    )
    .unwrap();
}

#[tauri::command]
fn read_json_from_file(path: String) -> String {
    let json: String = std::fs::read_to_string(&path).unwrap();
    json.into()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet])
        .invoke_handler(tauri::generate_handler![write_json_to_file])
        .invoke_handler(tauri::generate_handler![read_json_from_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
