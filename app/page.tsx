'use client';

import { useState, useEffect, useCallback } from 'react';
import NoteEditor from "@/components/NoteEditor";
import NoteFeed from "@/components/NoteFeed";
import { Providers } from './providers';
import type { Note } from '@/lib/types';
import { useToast } from '@/components/ui/use-toast';
import { logger } from '@/lib/logger';

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchNotes = useCallback(async () => {
    try {
      logger.debug('Fetching notes...');
      const response = await fetch('/api/notes');
      
      if (!response.ok) {
        throw new Error(`Failed to fetch notes: ${response.statusText}`);
      }
      
      const data = await response.json();
      logger.debug('Notes fetched:', { count: data.length });
      setNotes(data);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
      logger.error('Error fetching notes:', { error: errorMessage });
      toast({
        title: "Error",
        description: "Failed to fetch notes. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  return (
    <Providers>
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto space-y-8">
            <h1 className="text-4xl font-bold text-center">Welcome to NoteHive</h1>
            <div className="space-y-8">
              <div className="bg-card rounded-lg shadow-lg">
                <NoteEditor onNoteCreated={fetchNotes} />
              </div>
              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-pulse space-y-4">
                    <div className="h-4 bg-muted rounded w-3/4 mx-auto"></div>
                    <div className="h-4 bg-muted rounded w-1/2 mx-auto"></div>
                  </div>
                </div>
              ) : (
                <NoteFeed notes={notes} />
              )}
            </div>
          </div>
        </div>
      </main>
    </Providers>
  );
}