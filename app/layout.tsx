import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import { Providers } from '@/components/providers'
import { Sidebar } from '@/components/Sidebar'
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'NoteHive',
  description: 'A modern note-taking application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`} suppressHydrationWarning>
      <body className="min-h-screen bg-background font-sans antialiased">
        <Providers>
          <div className="flex h-screen">
            <Sidebar className="border-r" />
            <main className="flex-1 overflow-y-auto">
              {children}
              <Toaster />
            </main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
