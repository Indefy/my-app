'use client';

import { useState, useCallback } from 'react';
import NoteEditor from "@/components/NoteEditor";
import { useToast } from '@/components/ui/use-toast';
import { Note } from '@/lib/types';

export default function Home() {
  const [editorValue, setEditorValue] = useState('');
  const { toast } = useToast();

  const handleEditorChange = (value: string | undefined) => {
    setEditorValue(value || '');
  };

  const handleCreateNote = async (data: { title: string, content: string }) => {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to create note');
      }

      toast({
        title: "Success!",
        description: "Your note has been created.",
      });

      setEditorValue(''); // Clear editor after successful creation
    } catch (error) {
      console.error('Error creating note:', error);
      toast({
        title: "Error",
        description: "Failed to create note. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Create New Note</h1>
        <div className="bg-card rounded-lg shadow-lg">
          <NoteEditor 
            value={editorValue}
            onChange={handleEditorChange}
            onSubmit={handleCreateNote}
            placeholder="Write your notes here..."
          />
        </div>
      </div>
    </div>
  );
}