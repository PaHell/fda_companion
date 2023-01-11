#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{fs::File, io::Write};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn write_json_to_file(path: &str, json: &str) {
    //std::fs::remove_file(path).unwrap();
    let mut f = std::fs::OpenOptions::new()
        .read(true)
        .write(true)
        .create(true)
        .open(path)
        .unwrap();
    f.write_all(json.as_bytes()).expect("Unable to write data");
    f.flush().expect("Unable to flush data");
}

#[tauri::command]
fn read_json_from_file(path: &str) -> Result<String, String> {
    let file_exists = std::path::Path::new(path).exists();
    if file_exists{
        let json: String = std::fs::read_to_string(&path).unwrap();
        Ok(json.into())
    }
    else{
        Err("File not found".into())
    }
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, read_json_from_file, write_json_to_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
