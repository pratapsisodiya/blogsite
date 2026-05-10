"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { 
  Bold, 
  Italic, 
  List, 
  Heading2, 
  Quote
} from "lucide-react";
import React from "react";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
}

const MenuBar = ({ editor }: { editor: any }) => {
  if (!editor) return null;

  return (
    <div className="flex items-center space-x-4 mb-6 border-b border-gray-100 pb-4">
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`text-sm font-bold transition-colors ${editor.isActive("bold") ? "text-black" : "text-gray-300"}`}
      >
        <Bold size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`text-sm transition-colors ${editor.isActive("italic") ? "text-black italic" : "text-gray-300"}`}
      >
        <Italic size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`text-sm font-bold transition-colors ${editor.isActive("heading", { level: 2 }) ? "text-black" : "text-gray-300"}`}
      >
        <Heading2 size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`transition-colors ${editor.isActive("bulletList") ? "text-black" : "text-gray-300"}`}
      >
        <List size={16} />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className={`transition-colors ${editor.isActive("blockquote") ? "text-black" : "text-gray-300"}`}
      >
        <Quote size={16} />
      </button>
    </div>
  );
};

const RichTextEditor = ({ content, onChange }: RichTextEditorProps) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({
        placeholder: "Write your story here...",
      }),
      Link.configure({
        openOnClick: false,
      }),
    ],
    content,
    immediatelyRender: false,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-lg max-w-none font-serif focus:outline-none min-h-[400px] leading-relaxed text-gray-800",
      },
    },
  });

  return (
    <div className="w-full">
      <MenuBar editor={editor} />
      <EditorContent editor={editor} />
    </div>
  );
};

export default RichTextEditor;
