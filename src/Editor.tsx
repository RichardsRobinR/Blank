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
            'editor.foreground': '#D4D4D4',
            'editorCursor.foreground': '#FFFFFF',
            // 'editor.lineHighlightBackground': '#2F2F2F',
            'editorLineNumber.foreground': '#858585',
            'editor.selectionBackground': '#264F78',
            'editor.inactiveSelectionBackground': '#3A3D41',
            'editorIndentGuide.background': '#404040',
            'editorIndentGuide.activeBackground': '#707070',
            'editor.selectionHighlightBackground': '#ADD6FF26',
            'editorOverviewRuler.border': '#010101'
            
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

    return <div className="h-full w-full " ref={monacoEl}></div>;
};