import { useState } from 'react';
import {
  EditorContent,
  useEditor,
} from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import {
  Button,
  FormControl,
  Select,
} from '@chakra-ui/react';
import { clearEditorContent, setEditorContent } from '../utils/auth';

function TextEditor({
  handleNoteSubmit, initialContent, folders, initialFolderId, handleError,
}) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: initialContent || '',
    editorProps: {
      attributes: {
        class: 'prose prose-base focus:outline-none',
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
      await handleNoteSubmit(requestBody);
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

  return (
    <div className="py-6">
      <div
        className="
          border-2 border-black rounded max-h-48
          overflow-auto
        "
      >
        <EditorContent editor={editor} />
      </div>
      <div className="flex mt-6">
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
