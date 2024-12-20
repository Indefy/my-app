import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import NoteEditor from '../NoteEditor';

jest.mock('@/components/ui/use-toast', () => ({
  useToast: () => ({
    toast: jest.fn(),
  }),
}));

describe('NoteEditor', () => {
  it('renders the form fields', () => {
    render(<NoteEditor />);
    expect(screen.getByPlaceholderText('Note title')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Write your note...')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Tags (comma-separated)')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save Note' })).toBeInTheDocument();
  });

  it('updates form fields on input', () => {
    render(<NoteEditor />);
    const titleInput = screen.getByPlaceholderText('Note title');
    const contentInput = screen.getByPlaceholderText('Write your note...');
    const tagsInput = screen.getByPlaceholderText('Tags (comma-separated)');

    fireEvent.change(titleInput, { target: { value: 'Test Title' } });
    fireEvent.change(contentInput, { target: { value: 'Test Content' } });
    fireEvent.change(tagsInput, { target: { value: 'tag1,tag2' } });

    expect(titleInput).toHaveValue('Test Title');
    expect(contentInput).toHaveValue('Test Content');
    expect(tagsInput).toHaveValue('tag1,tag2');
  });
});

