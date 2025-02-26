"use client"

import type React from "react"
import type { User } from "@/lib/data"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { validateToken } from "@/lib/auth"

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: Omit<User, "id">) => Promise<void>
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoading: true,
  login: async () => {},
  logout: () => {},
  register: async () => {},
})

const PUBLIC_PATHS = ["/", "/login", "/register", "/about", "/terms", "/privacy"]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  // Check for existing session on mount and route changes
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token")

        if (storedUser && storedToken) {
          // Verify token is still valid
          const isValid = await validateToken(storedToken)

          if (isValid) {
            const userData = JSON.parse(storedUser)
            setUser(userData)

            // Only redirect if not already on dashboard
            if (pathname === "/login" || pathname === "/register") {
              router.replace("/dashboard")
            }
          } else {
            // Clear invalid session
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            setUser(null)
            if (!PUBLIC_PATHS.includes(pathname)) {
              router.replace("/login")
            }
          }
        } else if (!PUBLIC_PATHS.includes(pathname)) {
          // No session and on protected route
          router.replace("/login")
        }
      } catch (error) {
        console.error("Session check error:", error)
        localStorage.removeItem("user")
        localStorage.removeItem("token")
        setUser(null)
        if (!PUBLIC_PATHS.includes(pathname)) {
          router.replace("/login")
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [pathname, router])

  const login = async (username: string, password: string) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Invalid username or password")
      }

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      setUser(data.user)
      router.replace("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    router.replace("/login")
  }

  const register = async (userData: Omit<User, "id">) => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Registration failed")
      }

      // Set user and token immediately after successful registration
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      setUser(data.user)

      // Only redirect after state is updated
      setTimeout(() => {
        router.replace("/dashboard")
      }, 100)

      return data
    } catch (error) {
      console.error("Registration error:", error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return <AuthContext.Provider value={{ user, isLoading, login, logout, register }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

