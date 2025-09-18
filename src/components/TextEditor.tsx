import { useEffect, useRef } from "react";
import { EditorView } from "prosemirror-view";
import { EditorState } from "prosemirror-state";
import { schema } from "prosemirror-schema-basic";
import { keymap } from "prosemirror-keymap";
import { history, undo, redo } from "prosemirror-history";
import { baseKeymap } from "prosemirror-commands";

interface TextEditorProps {
  content: string;
  onContentChange: (content: string) => void;
  disabled?: boolean;
}

export function TextEditor({
  content,
  onContentChange,
  disabled = false,
}: TextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);
  const lastContentRef = useRef<string>("");

  useEffect(() => {
    if (!editorRef.current) return;

    const state = EditorState.create({
      doc: schema.nodes.doc.create({}, [
        schema.nodes.paragraph.create(
          {},
          content ? schema.text(content) : undefined
        ),
      ]),
      plugins: [
        history(),
        keymap({ "Mod-z": undo, "Mod-y": redo }),
        keymap(baseKeymap),
      ],
    });

    const view = new EditorView(editorRef.current, {
      state,
      dispatchTransaction(transaction) {
        const newState = view.state.apply(transaction);
        view.updateState(newState);

        // Extract text content and notify parent
        const textContent = newState.doc.textContent;
        if (textContent !== lastContentRef.current) {
          lastContentRef.current = textContent;
          onContentChange(textContent);
        }
      },
      editable: () => !disabled,
    });

    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
  }, []); 
  
  useEffect(() => {
    if (viewRef.current && content !== lastContentRef.current) {
      const view = viewRef.current;
      const currentText = view.state.doc.textContent;

      if (currentText !== content) {
        const tr = view.state.tr;
        tr.replaceWith(
          0,
          view.state.doc.content.size,
          content ? schema.text(content) : schema.nodes.paragraph.create()
        );
        view.dispatch(tr);
        lastContentRef.current = content;
      }
    }
  }, [content]);

  const editorClasses = `prose-editor min-h-[300px] border border-gray-600 rounded-lg p-6 
                  font-sans text-lg leading-relaxed transition-colors duration-200 text-white
                  ${
                    disabled
                      ? "bg-gray-700 opacity-60 cursor-not-allowed border-gray-700"
                      : "bg-gray-700 hover:border-gray-500 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50"
                  }`;

  return (
    <div
      ref={editorRef}
      className={editorClasses}
    />
  );
}
