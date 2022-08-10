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
    let mut auths = Vec::new();
    auths.push("Chris".to_string());
    let ctx = tauri::generate_context!();
    let name = &ctx.package_info().name;
    let menu = Menu::new().add_submenu(Submenu::new(
        name,
        Menu::new()
            .add_native_item(MenuItem::About(
                name.to_string(),
                AboutMetadata::new().authors(auths),
            ))
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Hide)
            .add_native_item(MenuItem::HideOthers)
            .add_native_item(MenuItem::ShowAll)
            .add_native_item(MenuItem::Separator)
            .add_native_item(MenuItem::Quit),
    ));
    tauri::Builder::default()
        .menu(menu)
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
