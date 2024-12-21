import dynamic from 'next/dynamic'
import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { useState } from 'react'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)

interface NoteEditorProps {
  value?: string
  onChange?: (value: string | undefined) => void
  placeholder?: string
  onSubmit?: (content: { title: string, content: string }) => Promise<void>
}

export default function NoteEditor({ value, onChange, placeholder, onSubmit }: NoteEditorProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [title, setTitle] = useState('');

  const handleSubmit = async () => {
    if (!value?.trim() || !onSubmit || isSubmitting || !title.trim()) return;
    
    try {
      setIsSubmitting(true);
      await onSubmit({ title, content: value });
      setTitle(''); // Clear title
      onChange?.(''); // Clear content
    } catch (error) {
      console.error('Error submitting note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full rounded-lg overflow-hidden border border-border bg-card transition-all duration-200 hover:shadow-lg">
      <div className="p-4 border-b border-border">
        <Input
          type="text"
          placeholder="Note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full font-medium"
        />
      </div>
      <div data-color-mode="light" className="prose max-w-none">
        <MDEditor
          value={value}
          onChange={onChange}
          preview="edit"
          hideToolbar={false}
          height={300}
          visibleDragbar={false}
          className="!bg-transparent"
          previewOptions={{
            className: "!bg-transparent !text-foreground prose-amber",
            transformLinkUri: null
          }}
          textareaProps={{
            placeholder,
            className: "!bg-transparent !text-foreground",
            "aria-label": "Markdown editor"
          }}
        />
      </div>
      <div className="p-4 border-t border-border">
        <Button 
          onClick={handleSubmit}
          disabled={!value?.trim() || !title.trim() || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? 'Creating Note...' : 'Create Note'}
        </Button>
      </div>
    </div>
  )
}
