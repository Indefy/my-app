'use client'

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  PlusCircle,
  History,
  Clock,
  FileText,
  Settings,
  HelpCircle,
  User,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()

  const tabs = [
    {
      name: "New Note",
      icon: PlusCircle,
      href: "/",
    },
    {
      name: "History",
      icon: History,
      href: "/history",
    },
    {
      name: "Recent Notes",
      icon: Clock,
      href: "/recent",
    },
    {
      name: "Templates",
      icon: FileText,
      href: "/templates",
    },
    {
      name: "Settings",
      icon: Settings,
      href: "/settings",
    },
    {
      name: "Help",
      icon: HelpCircle,
      href: "/help",
    },
    {
      name: "Profile",
      icon: User,
      href: "/profile",
    },
  ]

  return (
    <div className={cn("pb-12 w-64", className)}>
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold">NoteHive</h2>
          <div className="space-y-1">
            {tabs.map((tab) => (
              <Link key={tab.href} href={tab.href}>
                <Button
                  variant={pathname === tab.href ? "secondary" : "ghost"}
                  className="w-full justify-start"
                >
                  <tab.icon className="mr-2 h-4 w-4" />
                  {tab.name}
                </Button>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
