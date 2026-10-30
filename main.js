const { Plugin, PluginSettingTab, Setting } = require('obsidian');

// デフォルトの設定値
const DEFAULT_SETTINGS = {
    defaultImageSize: '500'
};

module.exports = class AutoLinkerPlugin extends Plugin {
    async onload() {
        console.log('Loading Auto Linker Plugin');

        // 設定のロード
        await this.loadSettings();

        // 設定画面の追加
        this.addSettingTab(new AutoLinkerSettingTab(this.app, this));

        this.registerEvent(
            this.app.workspace.on('editor-change', (editor, changeObj) => {
                const cursor = editor.getCursor();
                const lineText = editor.getLine(cursor.line);
                const beforeCursor = lineText.substring(0, cursor.ch);
                
                // 1. 画像の自動サイズ補完 (![[画像.png]] の検知)
                const imageRegex = /!\[\[([^\|\]]+\.(?:png|jpg|jpeg|webp|gif|svg))\]\]$/i;
                const imageMatch = beforeCursor.match(imageRegex);

                if (imageMatch) {
                    const imageContent = imageMatch[1];
                    const fullMatch = imageMatch[0];
                    
                    // 設定画面から取得したサイズを使用（空欄の場合は500）
                    const size = this.settings.defaultImageSize || '500';
                    
                    const startCh = cursor.ch - fullMatch.length;
                    const replacement = `![[${imageContent}|${size}]]`;
                    
                    editor.replaceRange(replacement, { line: cursor.line, ch: startCh }, { line: cursor.line, ch: cursor.ch });
                    editor.setCursor({ line: cursor.line, ch: startCh + replacement.length });
                    return;
                }

                // 2. 既存の通常リンク・Canvas・ヘッダーの自動エイリアス補完
                const linkRegex = /\[\[([^\|\]]+)\]\]$/;
                const match = beforeCursor.match(linkRegex);
                
                if (match) {
                    const linkContent = match[1];
                    const fullMatch = match[0];
                    let alias = "";
                    
                    if (linkContent.endsWith('.canvas')) {
                        const baseName = linkContent.slice(0, -7);
                        const parts = baseName.split('/');
                        alias = parts[parts.length - 1];
                    } 
                    else if (linkContent.endsWith('.base')) {
                        const baseName = linkContent.slice(0, -5);
                        const parts = baseName.split('/');
                        alias = parts[parts.length - 1];
                    } 
                    else if (linkContent.includes('#')) {
                        const parts = linkContent.split('#');
                        alias = parts[parts.length - 1];
                    }
                    
                    if (alias) {
                        const startCh = cursor.ch - fullMatch.length;
                        const replacement = `[[${linkContent}|${alias}]]`;
                        
                        editor.replaceRange(replacement, { line: cursor.line, ch: startCh }, { line: cursor.line, ch: cursor.ch });
                        editor.setCursor({ line: cursor.line, ch: startCh + replacement.length });
                    }
                }
            })
        );
    }

    onunload() {
        console.log('Unloading Auto Linker Plugin');
    }

    // 設定データを読み込む関数
    async loadSettings() {
        this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
    }

    // 設定データを保存する関数
    async saveSettings() {
        await this.saveData(this.settings);
    }
};

// 設定画面を構築するクラス
class AutoLinkerSettingTab extends PluginSettingTab {
    constructor(app, plugin) {
        super(app, plugin);
        this.plugin = plugin;
    }

    display() {
        const { containerEl } = this;

        containerEl.empty();
        containerEl.createEl('h2', { text: 'Auto Rename Linker 設定' });

        new Setting(containerEl)
            .setName('デフォルト画像サイズ')
            .setDesc('ノートに画像を貼り付けた際に自動設定される横幅（ピクセル）を入力してください。')
            .addText(text => text
                .setPlaceholder('500')
                .setValue(this.plugin.settings.defaultImageSize)
                .onChange(async (value) => {
                    this.plugin.settings.defaultImageSize = value;
                    await this.plugin.saveSettings();
                }));
    }
}
