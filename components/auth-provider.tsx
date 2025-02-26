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

            // Only redirect if on login or register page
            if (pathname === "/login" || pathname === "/register") {
              router.replace("/dashboard")
            }
          } else {
            // Clear invalid session
            handleLogout()
          }
        } else if (!PUBLIC_PATHS.includes(pathname)) {
          // No session and on protected route
          router.replace("/login")
        }
      } catch (error) {
        console.error("Session check error:", error)
        handleLogout()
      } finally {
        setIsLoading(false)
      }
    }

    checkSession()
  }, [pathname, router])

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("token")
    setUser(null)
    if (!PUBLIC_PATHS.includes(pathname)) {
      router.replace("/login")
    }
  }

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

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      // Update state and redirect
      setUser(data.user)
      router.replace("/dashboard")
    } catch (error) {
      console.error("Login error:", error)
      handleLogout()
      throw error
    } finally {
      setIsLoading(false)
    }
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

      // Store user data and token
      localStorage.setItem("user", JSON.stringify(data.user))
      localStorage.setItem("token", data.token)

      // Update state
      setUser(data.user)

      // Wait a bit before redirecting to ensure state is updated
      await new Promise((resolve) => setTimeout(resolve, 100))
      router.replace("/dashboard")

      return data
    } catch (error) {
      console.error("Registration error:", error)
      handleLogout()
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    handleLogout()
  }

  const contextValue = {
    user,
    isLoading,
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

