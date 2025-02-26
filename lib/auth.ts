import type { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { getUserByUsername } from "@/lib/data"
import type { NextRequest } from "next/server"
import { SignJWT, jwtVerify } from "jose"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "your-secret-key")

export async function createToken(payload: any) {
  try {
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("30d")
      .sign(JWT_SECRET)
    return token
  } catch (error) {
    console.error("Token creation error:", error)
    throw new Error("Failed to create token")
  }
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    console.error("Token verification error:", error)
    return null
  }
}

export async function validateToken(token: string) {
  try {
    const payload = await verifyToken(token)
    if (!payload) return false

    // Additional validation - check if user exists
    const user = await getUserByUsername(payload.userId as string)
    return !!user
  } catch (error) {
    console.error("Token validation error:", error)
    return false
  }
}

export async function verifyAdmin(req: NextRequest): Promise<boolean> {
  const authHeader = req.headers.get("Authorization")
  if (!authHeader?.startsWith("Bearer ")) return false

  const token = authHeader.split(" ")[1]
  try {
    const payload = await verifyToken(token)
    if (!payload?.userId) return false

    const user = await getUserByUsername(payload.userId as string)
    return !!user?.isAdmin
  } catch (error) {
    return false
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          return null
        }

        const user = await getUserByUsername(credentials.username)
        if (!user || user.password !== credentials.password) {
          return null
        }

        return {
          id: user.username,
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user }
    },
    async session({ session, token }) {
      session.user = token as any
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
}

