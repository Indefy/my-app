import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

interface User {
  _id: string;
  username: string;
  email: string;
  followers: number;
  following: number;
}

interface Note {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState<User | null>(null);
  const [notes, setNotes] = useState<Note[]>([]);
  const [savedNotes, setSavedNotes] = useState<Note[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  const [page, setPage] = useState(1);
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      fetchUserData();
      fetchNotes();
      fetchSavedNotes();
    }
  }, [id, page]);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`/api/users/${id}`);
      if (!response.ok) throw new Error('Failed to fetch user data');
      const userData = await response.json();
      setUser(userData);
      setIsFollowing(userData.isFollowing);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch user data",
        variant: "destructive",
      });
    }
  };

  const fetchNotes = async () => {
    try {
      const response = await fetch(`/api/users/${id}/notes?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch notes');
      const notesData = await response.json();
      setNotes(prevNotes => [...prevNotes, ...notesData.notes]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch notes",
        variant: "destructive",
      });
    }
  };

  const fetchSavedNotes = async () => {
    try {
      const response = await fetch(`/api/users/${id}/saved-notes?page=${page}`);
      if (!response.ok) throw new Error('Failed to fetch saved notes');
      const savedNotesData = await response.json();
      setSavedNotes(prevNotes => [...prevNotes, ...savedNotesData.notes]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to fetch saved notes",
        variant: "destructive",
      });
    }
  };

  const handleFollow = async () => {
    try {
      const response = await fetch(`/api/users/${id}/follow`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to follow user');
      setIsFollowing(true);
      toast({
        title: "Success",
        description: `You are now following ${user?.username}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to follow user",
        variant: "destructive",
      });
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`/api/users/${id}/unfollow`, { method: 'POST' });
      if (!response.ok) throw new Error('Failed to unfollow user');
      setIsFollowing(false);
      toast({
        title: "Success",
        description: `You have unfollowed ${user?.username}`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to unfollow user",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">{user.username}'s Profile</h1>
      <div className="mb-4">
        <p>Email: {user.email}</p>
        <p>Followers: {user.followers}</p>
        <p>Following: {user.following}</p>
        {isFollowing ? (
          <Button onClick={handleUnfollow}>Unfollow</Button>
        ) : (
          <Button onClick={handleFollow}>Follow</Button>
        )}
      </div>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Notes
          </Tab>
          <Tab className={({ selected }) =>
            `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
             ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
          }>
            Saved Notes
          </Tab>
        </Tab.List>
        <Tab.Panels className="mt-2">
          <Tab.Panel className="space-y-4">
            {notes.map((note) => (
              <Card key={note._id}>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{note.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created on {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</Button>
          </Tab.Panel>
          <Tab.Panel className="space-y-4">
            {savedNotes.map((note) => (
              <Card key={note._id}>
                <CardHeader>
                  <CardTitle>{note.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{note.content.substring(0, 100)}...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Created on {new Date(note.createdAt).toLocaleDateString()}
                  </p>
                </CardContent>
              </Card>
            ))}
            <Button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</Button>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>
    </div>
  );
}

