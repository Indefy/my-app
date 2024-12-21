import mongoose from 'mongoose';

export interface INote extends mongoose.Document {
  title?: string;
  content: string;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
}

// Delete any existing model to prevent schema caching issues
if (mongoose.models.Note) {
  delete mongoose.models.Note;
}

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    maxlength: [100, 'Title cannot be more than 100 characters'],
    default: function(this: any) {
      if (this.content) {
        const lines = this.content.split('\n');
        const firstLine = lines[0].trim();
        // Use first line if it's a heading, otherwise use first few words
        const title = firstLine.startsWith('#') 
          ? firstLine.replace(/^#+\s*/, '') 
          : firstLine.split(' ').slice(0, 5).join(' ');
        
        // Truncate if too long
        return title.length > 100 ? title.substring(0, 97) + '...' : title;
      }
      return 'Untitled Note';
    }
  },
  content: {
    type: String,
    required: [true, 'Please provide the content for this note'],
  },
  tags: [{
    type: String,
    trim: true,
  }],
}, {
  timestamps: true,
});

export default mongoose.model<INote>('Note', NoteSchema);
