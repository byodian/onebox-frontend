import { useState, useCallback } from 'react';
import {
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';

import {
  Button,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { clearEditorContent, setEditorContent } from 'utils/auth';

function TextEditor({
  onSubmit, initialContent, folders, initialFolderId, handleError,
}) {
  const editor = useEditor({
    extensions: [
      StarterKit, Link, Highlight, Image,
    ],
    content: initialContent || '',
    editorProps: {
      attributes: {
        class: 'prose focus:outline-none',
      },
    },
    onUpdate: (props) => {
      const text = props.editor.getHTML();
      setEditorContent(text);
    },
  });
  const [folderId, setFolderId] = useState(initialFolderId || '');
  const [isLoading, setIsLoading] = useState(false);

  const handleNoteSave = async () => {
    const content = editor.getHTML();
    setIsLoading(true);
    const requestBody = folderId
      ? { content, folderId }
      : { content };

    try {
      await onSubmit(requestBody);
      setIsLoading(false);
      setFolderId('');
      clearEditorContent();
      editor.commands.clearContent();
    } catch (error) {
      setIsLoading(false);
      handleError(error);
    }
  };

  const handleChange = (e) => {
    setFolderId(e.target.value);
  };

  const addImage = useCallback(() => {
    const url = window.prompt('请输入图片地址');

    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  }, [editor]);

  return (
    <div className="pr-4">
      <div
        className="
          border-2 border-black rounded max-h-64
          overflow-auto bg-white"
      >
        <div className="pl-[1em] flex items-center">
          <button onClick={addImage} className="w-8 h-8">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M2.9918 21C2.44405 21 2 20.5551 2 20.0066V3.9934C2 3.44476 2.45531 3 2.9918 3H21.0082C21.556 3 22 3.44495 22 3.9934V20.0066C22 20.5552 21.5447 21 21.0082 21H2.9918ZM20 15V5H4V19L14 9L20 15ZM20 17.8284L14 11.8284L6.82843 19H20V17.8284ZM8 11C6.89543 11 6 10.1046 6 9C6 7.89543 6.89543 7 8 7C9.10457 7 10 7.89543 10 9C10 10.1046 9.10457 11 8 11Z" />
            </svg>
          </button>
        </div>
        <EditorContent editor={editor} />
      </div>
      <div className="flex my-6">
        <FormControl className="mr-10">
          <Select placeholder="选择分类" value={folderId} onChange={handleChange}>
            {folders.map((folder) => (
              <option value={folder.id} key={folder.id}>{folder.name}</option>
            ))}
          </Select>
        </FormControl>
        <div className="text-right ml-auto">
          <Button onClick={handleNoteSave} colorScheme="teal" isLoading={isLoading}>
            保存
          </Button>
        </div>
      </div>
    </div>
  );
}

export default TextEditor;
