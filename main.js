const { Plugin } = require('obsidian');

module.exports = class AutoLinkerPlugin extends Plugin {
    async onload() {
        console.log('Loading Auto Linker Plugin');

        this.registerEvent(
            this.app.workspace.on('editor-change', (editor, changeObj) => {
                // This event fires on every change. We listen for the closing brackets ']]'
                // coordinates of the change
                const cursor = editor.getCursor();
                const lineText = editor.getLine(cursor.line);
                
                // We check if the user just completed a link.
                // To do this simply and reactively, we analyze the text before the cursor.
                // A basic check: see if the cursor is right after ']]'
                const beforeCursor = lineText.substring(0, cursor.ch);
                
                // Match standard wikilink [[...]] that doesn't already contain a pipe '|'
                // and ends with ']]'
                const linkRegex = /\[\[([^\|\]]+)\]\]$/;
                const match = beforeCursor.match(linkRegex);
                
                if (match) {
                    const linkContent = match[1]; // e.g., "Note.canvas" or "Note#Header"
                    const fullMatch = match[0];
                    
                    let alias = "";
                    
                    // Case 1: Canvas link -> [[Note.canvas]] -> [[Note.canvas|Note]]
                    if (linkContent.endsWith('.canvas')) {
                        const baseName = linkContent.slice(0, -7);
                        // Extract just the file name if there's a path
                        const parts = baseName.split('/');
                        alias = parts[parts.length - 1];
                    } 
                    // Case 2: Header link -> [[Note#Header]] -> [[Note#Header|Header]]
                    else if (linkContent.includes('#')) {
                        const parts = linkContent.split('#');
                        alias = parts[parts.length - 1];
                        // If it's just [[#Header]], alias is Header
                    }
                    
                    if (alias) {
                        const startCh = cursor.ch - fullMatch.length;
                        const replacement = `[[${linkContent}|${alias}]]`;
                        
                        // Temporarily turn off editor-change listener or use standard transaction to avoid infinite loop
                        // Since we change the text, it will trigger 'editor-change' again, but the regex won't match [[...]] anymore because of '|'
                        editor.replaceRange(replacement, { line: cursor.line, ch: startCh }, { line: cursor.line, ch: cursor.ch });
                        
                        // Move cursor back inside or after the bracket appropriately. 
                        // The replacement adds '|' and alias length. Total length changes by alias.length + 1.
                        // Let's place the cursor at the end of the new link.
                        editor.setCursor({ line: cursor.line, ch: startCh + replacement.length });
                    }
                }
            })
        );
    }

    onunload() {
        console.log('Unloading Auto Linker Plugin');
    }
};
