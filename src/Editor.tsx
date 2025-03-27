import { useRef, useState, useEffect } from 'react';
import * as monaco from 'monaco-editor/esm/vs/editor/editor.api';

export const Editor = () => {
    const [editor, setEditor] = useState<monaco.editor.IStandaloneCodeEditor | null>(null);
    const monacoEl = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (monacoEl.current && !editor) {
            const ed = monaco.editor.create(monacoEl.current, {
                value: "hello",
                language: 'typescript',
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

    return <div className="h-full w-full" ref={monacoEl}></div>;
};