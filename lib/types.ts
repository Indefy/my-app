export interface Note {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  author: {
    _id: string;
    username: string;
  };
  createdAt: string;
  updatedAt: string;
}

export interface User {
  _id: string;
  username: string;
  email: string;
  followers?: number;
  following?: number;
  isFollowing?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  _id: string;
  content: string;
  author: {
    _id: string;
    username: string;
  };
  noteId: string;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFeedProps {
  notes: Note[];
}

export interface CommentProps {
  noteId: string;
}
