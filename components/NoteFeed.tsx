'use client';

import { Note } from '@/lib/types';
import { logger } from '@/lib/logger';
import MarkdownPreview from '@uiw/react-markdown-preview';

interface NoteFeedProps {
  notes: Note[];
}

const NoteFeed: React.FC<NoteFeedProps> = ({ notes }) => {
  if (process.env.NODE_ENV === 'development') {
    logger.debug('NoteFeed received notes:', { count: notes.length });
  }

  if (!notes.length) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        No notes yet. Start by creating one!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {notes.map((note) => (
        <div
          key={note._id}
          className="bg-card rounded-lg shadow-lg overflow-hidden"
        >
          <div className="p-4 bg-muted/30">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-semibold">{note.title}</h3>
              <div className="text-xs text-muted-foreground">
                {new Date(note.createdAt).toLocaleString()}
              </div>
            </div>
            {note.tags && note.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {note.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
          
          <div className="p-4 prose prose-sm max-w-none">
            <MarkdownPreview 
              source={note.content} 
              style={{ 
                backgroundColor: 'transparent',
                color: 'inherit'
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default NoteFeed;
