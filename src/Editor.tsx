import { useRef, useState, useEffect, useCallback } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';
import { useDebounce } from 'react-use';



// Retrieve the computed styles of the root element
const rootStyles = getComputedStyle(document.documentElement);

// Define a function to get CSS variable values
const getCssVariable = (variable: string) => rootStyles.getPropertyValue(variable).trim();


const themeData = {
    base: 'vs-dark' as monaco.editor.BuiltinTheme, 
    inherit: true,
    rules: [],
    colors: {
        'editor.background': getCssVariable('--color-editor-bg'),
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

const Editor = () => {
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);
    const [value, setValue] = useState<string>('');
    // const [counts, setCounts] = useState({ lines: 0, words: 0, chars: 0 });


    const sendMessage = useCallback((content: string) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).chrome.webview.postMessage(content);
    }, []);
    

    useDebounce(
        () => {
            if (value) {
                sendMessage(value);
            }
        },
        500,
        [value]
    );


    // const updateCounts = useCallback(() => {    
    //     if (editor) {
    //         const model = editor.getModel();
    //         if (model) {
    //             const text = model.getValue();
    //             const lines = model.getLineCount();
    //             const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    //             const chars = text.length;
                
    //             setCounts({
    //                 lines,
    //                 words,
    //                 chars
    //             });
    //         }
    //     }
    // }
    // , [editor]);



    

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
                fontFamily: 'Poppins',
                fontSize: 18,
                fontLigatures: true,
                contextmenu: false,
                
            });

            const disposable = ed.getModel()?.onDidChangeContent(() => {
                const newValue = ed.getModel()?.getValue();
                if (newValue !== undefined) {
                    setValue(newValue);
                    // updateCounts();
                }
            });
            
            setEditor(ed);
            
            return () => {
                disposable?.dispose();
                ed.dispose();
            };
        }
    }, []);

    return <div className="h-full w-full " ref={monacoEl}></div>;
};

export default Editor;