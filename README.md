# Obsidian Auto Linker Plugin

内部リンクの挿入時に、自動的にエイリアス（表示名）を補完するObsidianプラグインです。

## 機能
- `[[ノート名]]` → 変更なし（Obsidian標準）
- `[[ノート名.canvas]]` → `[[ノート名.canvas|ノート名]]` に自動変換
- `[[ノート名#ヘッダー]]` → `[[ノート名#ヘッダー|ヘッダー]]` に自動変換

## インストール方法
1. Obsidianの保管庫（Vault）の `.obsidian/plugins/` ディレクトリに `obsidian-auto-linker` というフォルダを作成します。
2. そのフォルダの中に `manifest.json` と `main.js` を配置します。
3. Obsidianの設定 → 「コミュニティプラグイン」から「Auto Linker」を有効化します。
