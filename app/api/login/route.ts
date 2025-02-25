import { NextResponse } from "next/server"
import { getUserByUsername } from "@/lib/data"
import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key"

export async function POST(request: Request) {
  const body = await request.json()
  const { username, password } = body

  if (!username || !password) {
    return NextResponse.json({ error: "Missing username or password" }, { status: 400 })
  }

  const user = await getUserByUsername(username)
  if (!user || user.password !== password) {
    return NextResponse.json({ error: "Invalid username or password" }, { status: 401 })
  }

  const token = jwt.sign({ userId: user.id }, JWT_SECRET, { expiresIn: "1d" })

  const { password: _, ...userWithoutPassword } = user

  return NextResponse.json({ user: userWithoutPassword, token }, { status: 200 })
}

