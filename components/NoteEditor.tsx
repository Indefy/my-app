'use client';

import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Card } from '@/components/ui/card';
import { logger } from '@/lib/logger';

interface NoteEditorProps {
  onNoteCreated?: () => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({ onNoteCreated }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const validateInput = () => {
    if (!title.trim()) {
      logger.warn('Note creation attempted without title');
      toast({
        title: "Validation Error",
        description: "Title is required",
        variant: "destructive",
      });
      return false;
    }
    if (!content.trim()) {
      logger.warn('Note creation attempted without content');
      toast({
        title: "Validation Error",
        description: "Content is required",
        variant: "destructive",
      });
      return false;
    }
    return true;
  };

  const handleSave = async () => {
    if (!validateInput()) return;

    setIsLoading(true);
    logger.info('Attempting to create note:', { title, contentLength: content.length });

    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title.trim(),
          content: content.trim(),
          tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
        })
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to create note: ${errorText}`);
      }

      const data = await response.json();
      logger.info('Note created successfully:', data);

      toast({
        title: "Success",
        description: "Note created successfully",
      });

      setTitle('');
      setContent('');
      setTags('');
      
      onNoteCreated?.();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      logger.error('Error creating note:', errorMessage);
      
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full p-4">
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={isLoading}
            spellCheck={false}
            className="text-xl font-semibold"
          />
          <Input
            placeholder="Tags (comma separated)"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            disabled={isLoading}
            spellCheck={false}
            className="max-w-[200px]"
          />
        </div>
        
        <div data-color-mode="light" className="min-h-[500px]">
          <MDEditor
            value={content}
            onChange={(val) => setContent(val || '')}
            preview="live"
            height={500}
            hideToolbar={false}
            enableScroll={true}
            textareaProps={{
              placeholder: 'Write your note in Markdown...',
              spellCheck: false,
            }}
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button 
            variant="outline"
            onClick={() => {
              setTitle('');
              setContent('');
              setTags('');
            }}
            disabled={isLoading}
          >
            Clear
          </Button>
          <Button 
            onClick={handleSave}
            disabled={isLoading}
          >
            {isLoading ? 'Creating...' : 'Create Note'}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default NoteEditor;
