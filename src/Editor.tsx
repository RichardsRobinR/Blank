import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const Editor = () => {
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);

    const themeData = {
        base: 'vs-dark' as monaco.editor.BuiltinTheme, 
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#000000',
            'editor.foreground': '#ffffff',
            'editorCursor.foreground': '#8B0000',
            'editor.lineHighlightBackground': '#0000FF20',
            'editorLineNumber.foreground': '#008800',
            'editor.selectionBackground': '#88000030',
            'editor.inactiveSelectionBackground': '#88000015',
            
        }
    }

    monaco.editor.defineTheme('myCoolTheme',themeData);

    useEffect(() => {
        if (monacoEl.current && !editor) {
            const ed = monaco.editor.create(monacoEl.current, {
                value: "hello",
                language: 'typescript',
                theme: 'myCoolTheme',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false,
                
            });
            
            setEditor(ed);
            
            return () => {
                ed.dispose();
            };
        }
    }, []);

    return <div className="h-full w-full bg-transparent" ref={monacoEl}></div>;
};