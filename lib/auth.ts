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
    return null
  }
}

export async function validateToken(token: string) {
  try {
    const payload = await verifyToken(token)
    return !!payload
  } catch (error) {
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
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.username || !credentials?.password) {
          throw new Error("Please enter both username and password")
        }

        const user = await getUserByUsername(credentials.username)
        if (!user || user.password !== credentials.password) {
          throw new Error("Invalid username or password")
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.avatar,
          isAdmin: user.isAdmin,
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.isAdmin = user.isAdmin
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.isAdmin = token.isAdmin as boolean
      }
      return session
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
}

