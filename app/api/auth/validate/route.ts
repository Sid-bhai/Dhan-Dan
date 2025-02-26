import { NextResponse } from "next/server"
import { verifyToken } from "@/lib/auth"

export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get("Authorization")
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    const token = authHeader.split(" ")[1]
    const payload = await verifyToken(token)

    if (!payload) {
      return NextResponse.json({ valid: false }, { status: 401 })
    }

    return NextResponse.json({ valid: true })
  } catch (error) {
    return NextResponse.json({ valid: false }, { status: 401 })
  }
}

