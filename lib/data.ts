import { put, list } from "@vercel/blob"

export interface Message {
  id: string
  from: string
  to: string
  subject: string
  content: string
  read: boolean
  createdAt: string
}

export interface User {
  id: string
  name: string
  username: string
  email: string
  phone: string
  state: string
  referCode: string
  referredBy?: string
  password: string
  availableAmount: number
  totalCommission: number
  totalPayout: number
  totalReferrals: number
  referralLink: string
  referrals: string[]
  avatar: string
  isAdmin?: boolean
  createdAt: string
  lastLogin?: string
}

export interface ReferralNode {
  user: User
  left?: ReferralNode
  right?: ReferralNode
}

export async function getUsers(): Promise<User[]> {
  try {
    const { blobs } = await list()
    const usersBlob = blobs.find((blob) => blob.pathname === "users.json")

    if (!usersBlob) {
      await saveUsers([])
      return []
    }

    const response = await fetch(usersBlob.url)
    if (!response.ok) return []

    const users = await response.json()
    return users as User[]
  } catch (error) {
    console.error("Error reading users:", error)
    return []
  }
}

export async function getMessages(): Promise<Message[]> {
  try {
    const { blobs } = await list()
    const messagesBlob = blobs.find((blob) => blob.pathname === "messages.json")

    if (!messagesBlob) {
      await saveMessages([])
      return []
    }

    const response = await fetch(messagesBlob.url)
    if (!response.ok) return []

    const messages = await response.json()
    return messages as Message[]
  } catch (error) {
    console.error("Error reading messages:", error)
    return []
  }
}

export async function saveUsers(users: User[]) {
  try {
    const blob = new Blob([JSON.stringify(users, null, 2)], {
      type: "application/json",
    })

    await put("users.json", blob, {
      access: "public",
      addRandomSuffix: false,
    })
  } catch (error) {
    console.error("Error saving users:", error)
    throw new Error("Failed to save users data")
  }
}

export async function saveMessages(messages: Message[]) {
  try {
    const blob = new Blob([JSON.stringify(messages, null, 2)], {
      type: "application/json",
    })

    await put("messages.json", blob, {
      access: "public",
      addRandomSuffix: false,
    })
  } catch (error) {
    console.error("Error saving messages:", error)
    throw new Error("Failed to save messages data")
  }
}

export async function getUserByUsername(username: string): Promise<User | undefined> {
  const users = await getUsers()
  return users.find((user) => user.username === username)
}

export async function createUser(userData: Omit<User, "id" | "createdAt" | "referrals">): Promise<User> {
  const users = await getUsers()

  const newUser: User = {
    ...userData,
    id: Date.now().toString(),
    availableAmount: 0,
    totalCommission: 0,
    totalPayout: 0,
    totalReferrals: 0,
    referralLink: `${process.env.NEXT_PUBLIC_BASE_URL}register?ref=${userData.username}`,
    referrals: [],
    createdAt: new Date().toISOString(),
    avatar: userData.avatar || "/placeholder.svg?height=128&width=128",
  }

  // If user was referred, update referrer's data
  if (userData.referredBy) {
    const referrer = users.find((u) => u.username === userData.referredBy)
    if (referrer) {
      referrer.referrals.push(newUser.id)
      referrer.totalReferrals += 1
      // Update referrer in users array
      const referrerIndex = users.findIndex((u) => u.id === referrer.id)
      users[referrerIndex] = referrer
    }
  }

  users.push(newUser)
  await saveUsers(users)

  // Send welcome message
  await createMessage({
    from: "admin",
    to: newUser.username,
    subject: "Welcome to Dhan Dan!",
    content: `Welcome ${newUser.name}! We're excited to have you join our community. Here are some quick steps to get started:
    1. Complete your profile
    2. Explore your dashboard
    3. Start referring friends and family
    4. Track your earnings and growth
    
    If you need any help, feel free to reach out to our support team.`,
  })

  return newUser
}

export async function updateUser(updatedUser: User) {
  const users = await getUsers()
  const index = users.findIndex((user) => user.id === updatedUser.id)
  if (index !== -1) {
    users[index] = updatedUser
    await saveUsers(users)
    return true
  }
  return false
}

export async function createMessage(messageData: Omit<Message, "id" | "read" | "createdAt">): Promise<Message> {
  const messages = await getMessages()
  const newMessage: Message = {
    ...messageData,
    id: Date.now().toString(),
    read: false,
    createdAt: new Date().toISOString(),
  }

  messages.push(newMessage)
  await saveMessages(messages)
  return newMessage
}

export async function getUserMessages(username: string): Promise<Message[]> {
  const messages = await getMessages()
  return messages.filter((msg) => msg.to === username)
}

export async function markMessageAsRead(messageId: string): Promise<boolean> {
  const messages = await getMessages()
  const index = messages.findIndex((msg) => msg.id === messageId)
  if (index !== -1) {
    messages[index].read = true
    await saveMessages(messages)
    return true
  }
  return false
}

export async function getReferralNetwork(userId: string): Promise<ReferralNode | null> {
  const users = await getUsers()
  const user = users.find((u) => u.id === userId)
  if (!user) return null

  function buildTree(referrals: string[]): { left?: ReferralNode; right?: ReferralNode } {
    if (referrals.length === 0) return {}

    const result: { left?: ReferralNode; right?: ReferralNode } = {}

    if (referrals[0]) {
      const leftUser = users.find((u) => u.id === referrals[0])
      if (leftUser) {
        result.left = {
          user: leftUser,
          ...buildTree(leftUser.referrals),
        }
      }
    }

    if (referrals[1]) {
      const rightUser = users.find((u) => u.id === referrals[1])
      if (rightUser) {
        result.right = {
          user: rightUser,
          ...buildTree(rightUser.referrals),
        }
      }
    }

    return result
  }

  const { left, right } = buildTree(user.referrals)
  return {
    user,
    left,
    right,
  }
}

