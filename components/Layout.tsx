import { cn } from "@/lib/utils"
import { ThemeProvider } from "@/components/theme-provider"

interface LayoutProps {
  children: React.ReactNode
  className?: string
}

export function Layout({ children, className }: LayoutProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className={cn(
        "min-h-screen bg-background font-sans antialiased",
        "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))]",
        "from-amber-100 via-background to-background",
        "dark:from-amber-900/20",
        className
      )}>
        <main className="container mx-auto px-4 py-8">
          <div className="mx-auto max-w-4xl">
            {children}
          </div>
        </main>
      </div>
    </ThemeProvider>
  )
}
