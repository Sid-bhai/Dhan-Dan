import { NextResponse } from "next/server"
import { getUserByUsername } from "@/lib/data"
import { createToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    if (!username || !password) {
      return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
    }

    const user = await getUserByUsername(username)
    if (!user || user.password !== password) {
      return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
    }

    const token = await createToken({ userId: user.username })
    const { password: _, ...userWithoutPassword } = user

    return NextResponse.json({ user: userWithoutPassword, token })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ error: "An error occurred during login" }, { status: 500 })
  }
}

