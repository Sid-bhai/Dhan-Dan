"use client"

import type React from "react"
import type { User } from "@/lib/data"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

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

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        const storedUser = localStorage.getItem("user")
        const storedToken = localStorage.getItem("token")

        if (storedUser && storedToken) {
          // Verify token is still valid
          const response = await fetch("/api/user", {
            headers: {
              Authorization: `Bearer ${storedToken}`,
            },
          })

          if (response.ok) {
            setUser(JSON.parse(storedUser))
            // If on landing page, redirect to dashboard
            if (window.location.pathname === "/") {
              router.replace("/dashboard")
            }
          } else {
            // Clear invalid session
            localStorage.removeItem("user")
            localStorage.removeItem("token")
            if (window.location.pathname !== "/" && !window.location.pathname.includes("/login")) {
              router.replace("/login")
            }
          }
        }
      } catch (error) {
        console.error("Session check error:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [router])

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
        throw new Error(data.error || "Login failed")
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

      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)
      setUser(data.user)
      router.replace("/dashboard")
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

