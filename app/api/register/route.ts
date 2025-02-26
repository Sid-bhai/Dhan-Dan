import { NextResponse } from "next/server"
import { createUser, getUserByUsername } from "@/lib/data"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { fullName, username, email, password, state, referCode } = body

    if (!fullName || !username || !email || !password || !state) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const existingUser = await getUserByUsername(username)
    if (existingUser) {
      return NextResponse.json({ error: "Username already exists" }, { status: 400 })
    }

    const newUser = await createUser({
      name: fullName,
      username,
      email,
      password,
      state,
      referCode,
      phone: "",
      avatar: "/placeholder.svg?height=128&width=128",
    })

    const token = await createToken({ userId: newUser.username })
    const { password: _, ...userWithoutPassword } = newUser

    return NextResponse.json({ user: userWithoutPassword, token }, { status: 201 })
  } catch (error) {
    console.error("Registration error:", error)
    return NextResponse.json({ error: "An error occurred during registration. Please try again." }, { status: 500 })
  }
}

