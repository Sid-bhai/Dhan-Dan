import { NextResponse } from "next/server"
import { getUsers } from "@/lib/data"
import { verifyAdmin } from "@/lib/auth"

export async function GET(request: Request) {
  try {
    // Verify admin status
    const isAdmin = await verifyAdmin(request)
    if (!isAdmin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const users = await getUsers()
    // Remove sensitive information
    const sanitizedUsers = users.map(({ password, ...user }) => user)

    return NextResponse.json({ users: sanitizedUsers })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

