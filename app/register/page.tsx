"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Eye, EyeOff } from "lucide-react"
import { LoadingSpinner } from "@/components/loading-spinner"
import { Progress } from "@/components/ui/progress"

export default function RegisterPage() {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [fullName, setFullName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [state, setState] = useState("")
  const [referCode, setReferCode] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(0)
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [usernameSuggestions, setUsernameSuggestions] = useState<string[]>([])
  const { toast } = useToast()
  const { register } = useAuth()

  useEffect(() => {
    if (!isLoading && user) {
      router.push("/dashboard")
    }
    const referralCode = searchParams.get("ref")
    if (referralCode) {
      setReferCode(referralCode)
    }
  }, [user, isLoading, router, searchParams])

  useEffect(() => {
    const checkUsernameAvailability = async () => {
      if (username.length > 2) {
        // Simulated API call
        const isAvailable = await new Promise<boolean>((resolve) => {
          setTimeout(() => resolve(Math.random() > 0.5), 500)
        })
        setUsernameAvailable(isAvailable)
        if (!isAvailable) {
          setUsernameSuggestions([
            `${username}123`,
            `${username}_user`,
            `${username}${Math.floor(Math.random() * 1000)}`,
          ])
        }
      }
    }
    checkUsernameAvailability()
  }, [username])

  useEffect(() => {
    const strength = calculatePasswordStrength(password)
    setPasswordStrength(strength)
  }, [password])

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0
    if (password.length >= 8) strength += 25
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength += 25
    if (password.match(/\d/)) strength += 25
    if (password.match(/[^a-zA-Z\d]/)) strength += 25
    return strength
  }

  if (isLoading) {
    return <LoadingSpinner />
  }

  if (user) {
    return null
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await register({ fullName, username, email, password, state, referCode })
      toast({
        title: "Registration Successful",
        description: "You have successfully registered. Welcome to Dhan Dan!",
      })
      // Router.push is handled in the register function now
    } catch (error) {
      toast({
        title: "Registration Failed",
        description: "An error occurred during registration. Please try again.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="container mx-auto max-w-md p-6">
      <Card>
        <CardHeader>
          <CardTitle>Register for Dhan Dan</CardTitle>
          <CardDescription>Create your account to start earning</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                className={usernameAvailable ? "" : "border-red-500"}
              />
              {!usernameAvailable && (
                <div className="text-red-500 text-sm">
                  Username not available. Try these:
                  <ul className="list-disc list-inside">
                    {usernameSuggestions.map((suggestion) => (
                      <li
                        key={suggestion}
                        className="cursor-pointer hover:underline"
                        onClick={() => setUsername(suggestion)}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <Progress value={passwordStrength} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Password strength: {passwordStrength < 50 ? "Weak" : passwordStrength < 75 ? "Medium" : "Strong"}
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="state">State</Label>
              <Input id="state" type="text" value={state} onChange={(e) => setState(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="referCode">Refer Code</Label>
              <Input id="referCode" type="text" value={referCode} onChange={(e) => setReferCode(e.target.value)} />
            </div>
            <Button type="submit" className="w-full">
              Register
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="text-center w-full">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-500 hover:underline">
              Login here
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

