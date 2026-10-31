# Obsidian Auto Rename Linker Plugin

This plugin automatically appends aliases or sizes when inserting internal links or pasting images in Obsidian.

[日本語の解説は以下をご覧ください](#日本語による説明)

---

## Features
- `[[Note Name]]` → No change (Standard Obsidian behavior)
- `[[Note Name.canvas]]` → Automatically converts to `[[Note Name.canvas|Note Name]]`
- `[[Note Name.base]]` → Automatically converts to `[[Note Name.base|Note Name]]`
- `[[Note Name#Header]]` → Automatically converts to `[[Note Name#Header|Header]]`
- `![[Image.png]]` → Automatically appends image size dimensions like `![[Image.png|500]]`
  - Triggers automatically when an image is dragged-and-dropped or pasted from the clipboard.
  - Supported extensions: `png`, `jpg`, `jpeg`, `webp`, `gif`, `svg`

## Settings
You can configure the following options in the Obsidian settings under **Community Plugins** > **Auto Rename Linker**:
- **Default Image Size**: Set the default width (in pixels) for automatically inserted images (Default: `500`).

## Installation

### From within Obsidian (Community Plugins)
1. Open **Settings** > **Community plugins**.
2. Click **Browse** and search for `Auto Rename Linker`.
3. Click **Install**, then **Enable**.

### Manual Installation (For beta testing)
1. Download the latest release (`main.js`, `manifest.json`) from the [Releases](https://github.com/ssvp003/obsidian-auto-rename-linker/releases) page.
2. Create a folder named `obsidian-auto-rename-linker` under your vault's `.obsidian/plugins/` directory.
3. Move the downloaded files into that folder.
4. Reload plugins or restart Obsidian, then enable it in **Community plugins**.

## API Compliance & Security
- This plugin only operates within the active markdown editor via the `editor-change` workspace event.
- It does **not** access external networks, collect user data, or modify files outside the active editor context.

## License
This project is licensed under the MIT License. See the LICENSE file for details.

---

## 日本語による説明

Obsidian内のリンク挿入や画像貼り付け時に、自動的にエイリアス（表示名）やサイズ指定を補完するプラグインです。

### 機能
- `[[ノート名]]` → 変更なし（Obsidian 標準）
- `[[ノート名.canvas]]` → `[[ノート名.canvas|ノート名]]` に自動変換
- `[[ノート名.base]]` → `[[ノート名.base|ノート名]]` に自動変換
- `[[ノート名#ヘッダー]]` → `[[ノート名#ヘッダー|ヘッダー]]` に自動変換
- `![[画像.png]]` → `![[画像.png|500]]` などの画像サイズを自動補完
  - ドラッグ＆ドロップやクリップボードから画像を貼り付けた際に、設定された横幅（ピクセル）を自動挿入します。

### 設定項目
Obsidianの設定画面（コミュニティプラグイン ＞ Auto Rename Linker）から変更できます。
- **デフォルト画像サイズ**: 自動設定される横幅を指定できます（デフォルト: `500`）。
