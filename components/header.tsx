"use client"

import Link from "next/link"
import Image from "next/image"
import { Bell, Menu, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useTheme } from "next-themes"
import { useAuth } from "@/components/auth-provider"
import { useRouter } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { useState, useEffect } from "react"
import { getUserMessages } from "@/lib/data"

export function Header() {
  const { theme } = useTheme()
  const { user, logout } = useAuth()
  const router = useRouter()
  const [unreadCount, setUnreadCount] = useState(0)

  useEffect(() => {
    const fetchUnreadCount = async () => {
      if (user?.username) {
        const messages = await getUserMessages(user.username)
        setUnreadCount(messages.filter((m) => !m.read).length)
      }
    }
    fetchUnreadCount()
  }, [user])

  return (
    <header className="border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center space-x-6">
          <Link href="/" className="flex items-center">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1740409968729.jpg-aW1h6p6VZZ9NvJVnYf6PsRyTuhNcre.jpeg"
              alt="Dhan Dan Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-2xl font-bold">Dhan Dan</span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/dashboard" className="w-full">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/wallet" className="w-full">
                    Wallet
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/settings" className="w-full">
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/profile" className="w-full">
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href="/withdraw" className="w-full">
                    Withdraw
                  </Link>
                </DropdownMenuItem>
                {user.isAdmin && (
                  <DropdownMenuItem>
                    <Link href="/admin/dashboard" className="w-full">
                      Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Link href="/inbox">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge
                    variant="destructive"
                    className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs flex items-center justify-center"
                  >
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </Link>
            <Avatar>
              <AvatarImage src={user.avatar || "/placeholder.svg?height=32&width=32"} alt="User Avatar" />
              <AvatarFallback>
                <User className="h-5 w-4" />
              </AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <div className="flex items-center space-x-4">
            <Button variant="ghost">
              <Link href="/login" className="w-full">
                Login
              </Link>
            </Button>
            <Button>
              <Link href="/register" className="w-full">
                Register
              </Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  )
}

