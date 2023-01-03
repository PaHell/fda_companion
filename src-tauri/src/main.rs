#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use std::{fs::File, io::Write};
use std::io::Read;
use serde_json::{Number, Value, json};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn write_json_to_file(path: &str, json: &str) {
    let mut f = File::create(path).expect("Unable to create file");
    f.write_all(json.as_bytes()).expect("Unable to write data");
}

#[tauri::command]
fn read_json_from_file(path: &str) -> String {
    let json: String = std::fs::read_to_string(&path).unwrap();
    json.into()
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, read_json_from_file, write_json_to_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
