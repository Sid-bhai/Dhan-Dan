import { NextResponse } from "next/server"
import { createMessage, getMessages } from "@/lib/data"
import { verifyAdmin } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const messages = await getMessages()
    return NextResponse.json({ messages })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: Request) {
  try {
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const { to, subject, content } = body

    if (!to || !subject || !content) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const message = await createMessage({
      from: "admin",
      to,
      subject,
      content,
    })

    return NextResponse.json({ message }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

