import { NextResponse } from "next/server"
import { createUser, getUserByUsername } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  const body = await request.json()
  const { fullName, username, email, password, state, referCode } = body

  if (!fullName || !username || !email || !password || !state) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
  }

  const existingUser = await getUserByUsername(username)
  if (existingUser) {
    return NextResponse.json({ error: "Username already exists" }, { status: 400 })
  }

  const newUser = await createUser({ fullName, username, email, password, state, referCode })
  const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, { expiresIn: "1d" })

  const { password: _, ...userWithoutPassword } = newUser

  return NextResponse.json({ user: userWithoutPassword, token }, { status: 201 })
}

