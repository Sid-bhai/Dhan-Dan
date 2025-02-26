import type { NextAuthOptions, Session } from "next-auth"
import { getServerSession } from "next-auth/next"
import type { NextRequest } from "next/server"

type UserSession = {
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
  isAdmin?: boolean
}

declare module "next-auth" {
  interface Session {
    user: UserSession
  }
}

export const verifyAdmin = async (req: NextRequest): Promise<boolean> => {
  const session = (await getServerSession()) as Session
  return !!session?.user?.isAdmin
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
}

