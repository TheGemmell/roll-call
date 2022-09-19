#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

fn main() {
    use tauri::{AboutMetadata, CustomMenuItem, Menu, MenuItem, Submenu};
    use tauri::{Window, WindowBuilder, WindowUrl};
    let quit = CustomMenuItem::new("quit".to_string(), "Quit");
    let close = CustomMenuItem::new("close".to_string(), "Close");
    let about = CustomMenuItem::new("about".to_string(), "About");
    let submenu = Submenu::new("File", Menu::new().add_item(quit).add_item(close).add_item(about));

    let menu = Menu::new()
      .add_submenu(submenu)
      .add_native_item(MenuItem::About("roll_call".to_string(),
        AboutMetadata::new()
      ))
      .add_item(CustomMenuItem::new("hide", "Hide"));
    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
