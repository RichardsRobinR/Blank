import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useDebounce } from 'react-use';

export const Editor = () => {
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>('');
    const [debouncedValue, setDebouncedValue] = useState(value);


    const themeData = {
        base: 'vs-dark' as monaco.editor.BuiltinTheme, 
        inherit: true,
        rules: [],
        colors: {
            'editor.background': '#121212',
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

    useDebounce(
        () => {
            if (debouncedValue !== value) {
                setDebouncedValue(value);
                // Send message only when debounced value changes
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                (window as any).chrome.webview.postMessage(value);
                console.log('Sending message to webview:', value);
            }
        },
        600, // 300ms delay
        [value]
    );


    

    useEffect(() => {

        monaco.editor.defineTheme('myCoolTheme',themeData);

        if (monacoEl.current && !editor) {
            const ed = monaco.editor.create(monacoEl.current, {
                
                value: value,
                language: 'python',
                theme: 'myCoolTheme',
                automaticLayout: true,
                minimap: {
                    enabled: false
                },
                scrollBeyondLastLine: false,
                
            });

            const disposable = ed.getModel()?.onDidChangeContent(() => {
                const newValue = ed.getModel()?.getValue();
                if (newValue !== undefined) {
                    setValue(newValue);
                }
            });
            
            setEditor(ed);
            
            return () => {
                disposable?.dispose();
                ed.dispose();
            };
        }
    }, []);

    return <div className="h-full w-full pt-4" ref={monacoEl}></div>;
};