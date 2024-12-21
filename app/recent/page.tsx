'use client'

import { useState, useEffect } from 'react'
import NoteFeed from '@/components/NoteFeed'
import { useToast } from '@/components/ui/use-toast'
import type { Note } from '@/lib/types'

export default function RecentNotesPage() {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await fetch('/api/notes')
        
        if (!response.ok) {
          throw new Error(`Failed to fetch notes: ${response.statusText}`)
        }
        
        const data = await response.json()
        setNotes(data)
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to fetch notes. Please try again later.",
          variant: "destructive",
        })
      } finally {
        setIsLoading(false)
      }
    }

    fetchNotes()
  }, [toast])

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold">Recent Notes</h1>
        <div className="space-y-4">
          {isLoading ? (
            <div className="text-center py-8">
              <div className="animate-pulse space-y-4">
                <div className="h-4 bg-muted rounded w-3/4 mx-auto" />
                <div className="h-4 bg-muted rounded w-1/2 mx-auto" />
              </div>
            </div>
          ) : (
            <NoteFeed notes={notes} />
          )}
        </div>
      </div>
    </div>
  )
}
